"""Read-only HTTP, navigation and responsive-browser audit of a branch preview.
No form submissions, purchases, production deployments, or repository writes.
"""
import asyncio
import hashlib
import json
import os
import re
import time
import urllib.error
import urllib.parse
import urllib.request
from html.parser import HTMLParser
from pathlib import Path
from playwright.async_api import async_playwright

OUT = Path('.audit')
OUT.mkdir(exist_ok=True)
REPO = os.environ['GITHUB_REPOSITORY']
SHA = os.environ['GITHUB_SHA']
FAILURES = []
REPORT = {'commit': SHA, 'failures': FAILURES, 'pages': [], 'viewports': [], 'navigation': []}
CACHE = {}

def api(path):
    req = urllib.request.Request('https://api.github.com/repos/' + REPO + path,
        headers={'Accept': 'application/vnd.github+json', 'Authorization': 'Bearer ' + os.environ['GH_READ_TOKEN']})
    with urllib.request.urlopen(req, timeout=30) as res:
        return json.load(res)

def get(url):
    url = urllib.parse.urldefrag(url)[0]
    if url not in CACHE:
        req = urllib.request.Request(url, headers={'User-Agent': 'UnrulyChain-Preview-Verification/1.0'})
        try:
            with urllib.request.urlopen(req, timeout=30) as res:
                CACHE[url] = (res.status, res.geturl(), res.headers.get_content_type(), res.read())
        except urllib.error.HTTPError as exc:
            CACHE[url] = (exc.code, url, exc.headers.get_content_type(), exc.read())
    return CACHE[url]

class Document(HTMLParser):
    def __init__(self, text):
        super().__init__()
        self.ids = set()
        self.duplicate_ids = []
        self.links = []
        self.assets = []
        self.feed(text)
    def handle_starttag(self, tag, attributes):
        a = dict(attributes)
        if a.get('id'):
            if a['id'] in self.ids:
                self.duplicate_ids.append(a['id'])
            self.ids.add(a['id'])
        if tag == 'a' and a.get('href'):
            self.links.append(a['href'])
        if tag in ('img', 'script') and a.get('src'):
            self.assets.append(a['src'])
        if tag == 'link' and a.get('href') and a.get('rel') in ('stylesheet', 'icon', 'shortcut icon', 'apple-touch-icon', 'manifest'):
            self.assets.append(a['href'])
        if tag == 'img' and a.get('srcset'):
            self.assets.extend(x.strip().split()[0] for x in a['srcset'].split(','))

def require(condition, message):
    if not condition:
        FAILURES.append(message)

def route(path):
    s = path.as_posix()
    if s == 'index.html':
        return '/'
    if s.endswith('/index.html'):
        return '/' + s[:-10]
    return '/' + s

def resolve_preview():
    for _ in range(80):
        for c in api('/commits/' + SHA + '/check-runs').get('check_runs', []):
            if c.get('name') == 'Cloudflare Pages' and c.get('conclusion') == 'success':
                m = re.search(r"https://[a-f0-9]+\.unrulychain-site\.pages\.dev", c.get('output', {}).get('summary', ''))
                if m:
                    return m.group(0)
        time.sleep(3)
    raise RuntimeError('No successful immutable Cloudflare preview for exact commit')

async def paint_images(page):
    await page.locator('img').evaluate_all("els => els.forEach(i => i.loading = 'eager')")
    await page.wait_for_function("Array.from(document.images).every(i => i.complete)", timeout=20000)
    await page.evaluate("Promise.all(Array.from(document.images).map(i => i.decode().catch(() => null)))")
    await page.evaluate('document.fonts.ready')

async def browser_checks(base, paths):
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        context = await browser.new_context(viewport={'width':1440, 'height':1000}, reduced_motion='reduce')
        async def read_only(reqroute):
            req = reqroute.request
            if req.method not in ('GET', 'HEAD') or urllib.parse.urlparse(req.url).netloc != urllib.parse.urlparse(base).netloc:
                await reqroute.abort()
            else:
                await reqroute.continue_()
        await context.route('**/*', read_only)
        page = await context.new_page()
        page.on('pageerror', lambda exc: FAILURES.append('Browser JS: ' + str(exc)))
        for width in (320, 390, 800, 890, 1050, 1440):
            await page.set_viewport_size({'width': width, 'height': 1000})
            for path in paths:
                await page.goto(base + route(path), wait_until='load', timeout=45000)
                await paint_images(page)
                data = await page.evaluate("""() => {
                    const visible = e => {
                      const s=getComputedStyle(e), r=e.getBoundingClientRect();
                      // Offscreen columns inside the intentionally clipped ebook reader are not document overflow.
                      if(e.closest('.reader.is-paged .reader-flow')) return false;
                      return s.display!=='none' && s.visibility!=='hidden' && r.width>0 && r.height>0;
                    };
                    return {overflow:document.documentElement.scrollWidth>innerWidth+2,
                      clipped:Array.from(document.querySelectorAll('main h1,main h2,main h3,main p')).filter(visible).filter(e=>{const r=e.getBoundingClientRect();return r.right>innerWidth+2||r.left< -2;}).map(e=>e.textContent.trim().slice(0,100)),
                      broken:Array.from(document.images).filter(i=>!i.naturalWidth).map(i=>i.src)};
                }""")
                require(not data['overflow'], f'Document overflow: {width} {path}')
                require(not data['clipped'], f'Clipped text: {width} {path} {data["clipped"]}')
                require(not data['broken'], f'Broken image: {width} {path} {data["broken"]}')
                REPORT['viewports'].append({'width':width, 'page':str(path), **data})
                if str(path) == 'author.html':
                    photo = await page.locator('#amanda-kelly img').evaluate('(e)=>({width:e.clientWidth,height:e.clientHeight,nw:e.naturalWidth,nh:e.naturalHeight})')
                    require(abs(photo['width']/photo['height']-photo['nw']/photo['nh']) < .02, f'Amanda photo ratio: {width}')
                capture = width in (390,1440) and str(path) in ('books/index.html','editions/index.html','editions/standard-oil/index.html','editions/the-prince/index.html','author.html')
                capture = capture or (width==320 and str(path)=='editions/back-to-methuselah/index.html')
                if capture:
                    for img in await page.locator('img').all():
                        if await img.is_visible():
                            await img.scroll_into_view_if_needed()
                    await page.evaluate('window.scrollTo(0,0)')
                    await page.wait_for_timeout(150)
                    await page.screenshot(path=str(OUT/(str(path).replace('/','-')+f'-{width}.png')), full_page=True)
            print('BROWSER width', width, 'pages', len(paths), 'failures', len(FAILURES), flush=True)
        for width in (390,1440):
            await page.set_viewport_size({'width':width,'height':1000})
            await page.goto(base+'/books/',wait_until='load')
            require(await page.locator('#editions .tarbell-pair').count()==1,'Books must have exactly one unified Tarbell entry')
            require(await page.locator('.tarbell-books-heading').count()==0,'Rejected Books heading remains')
            require(await page.locator('.tarbell-volume-book').count()==0,'Separate Books volume cards remain')
            for slug in ('i','ii'):
                await page.goto(base+'/books/',wait_until='load')
                await page.locator(f'#editions .tarbell-pair a[href$="#volume-{slug}"]').click()
                await page.wait_for_url('**/editions/standard-oil/#volume-'+slug)
                require(await page.locator(f'#volume-{slug} img').count()==1,'Volume anchor must lead to its independent cover listing')
                pos = await page.locator(f'#volume-{slug}').evaluate('(e)=>({top:e.getBoundingClientRect().top,header:document.querySelector("header").getBoundingClientRect().bottom})')
                require(pos['top']>=pos['header']-3, 'Volume anchor obscured by header '+str(pos))
                REPORT['navigation'].append({'width':width,'catalogToVolume':slug,'passed':True})
            await page.goto(base+'/editions/the-prince/',wait_until='load')
            await page.locator('.editor-credit a').click()
            await page.wait_for_url('**/author*#amanda-kelly')
            require('cabin pressure' in (await page.locator('#amanda-kelly').inner_text()).lower(),'Prince editor link reaches Amanda')
            pos = await page.locator('#amanda-kelly').evaluate('(e)=>({top:e.getBoundingClientRect().top,header:document.querySelector("header").getBoundingClientRect().bottom})')
            require(pos['top']>=pos['header']-3,'Amanda anchor obscured by header')
            REPORT['navigation'].append({'width':width,'PrinceToAmanda':True})
            for label, suffix in [('Home','/'),('Books','/books/'),('Authors','/author'),('Editors & Authors','/editors-authors'),('The Imprint','/about'),('Press','/press')]:
                await page.goto(base+'/editions/standard-oil/',wait_until='load')
                if width==390:
                    await page.locator('.menu-button').click()
                    require(await page.locator('.menu-button').get_attribute('aria-expanded')=='true','Mobile menu does not open')
                    link=page.locator('#mobile-nav a').get_by_text(label,exact=True)
                else:
                    link=page.locator('.nav a').get_by_text(label,exact=True)
                await link.click()
                await page.wait_for_load_state('load')
                parsed=urllib.parse.urlparse(page.url)
                require(parsed.netloc==urllib.parse.urlparse(base).netloc,'Navigation left preview')
                actual=parsed.path.removesuffix('.html')
                require(actual==suffix,'Wrong nav destination '+label+': '+actual)
                REPORT['navigation'].append({'width':width,'menu':label,'destination':actual})
            await page.goto(base+'/centrifuge/#introduction',wait_until='load')
            await page.locator('.reader').scroll_into_view_if_needed()
            require(await page.locator('.reader.is-paged').count()==1,'Reader failed to initialize')
            require(int(await page.locator('.reader-total').inner_text())>1,'Reader pagination absent')
            await page.locator('.reader-forward').click()
            require(int(await page.locator('.reader-current').inner_text())==2,'Reader next page failed')
            await page.locator('.reader-back').click()
            require(int(await page.locator('.reader-current').inner_text())==1,'Reader previous page failed')
            await page.locator('.reader-type button').last.click()
            require('19 pixels' in await page.locator('.reader-size-status').inner_text(),'Reader text size failed')
            await page.locator('.reader-enlarge').click()
            require(await page.locator('.reader.is-enlarged').count()==1,'Reader enlarge failed')
            await page.keyboard.press('Escape')
            require(await page.locator('.reader.is-enlarged').count()==0,'Reader close failed')
            REPORT['navigation'].append({'width':width,'readerControls':'next, previous, size, enlarge, close'})
        await browser.close()

def main():
    require(os.environ.get('GITHUB_REF')=='refs/heads/feat/tarbell-two-volumes-oct2026','Must run only on preview branch')
    before=api('/branches/main')['commit']['sha']
    base=resolve_preview()
    REPORT['preview']=base
    REPORT['productionBefore']=before
    paths=sorted(p for p in Path('.').rglob('*.html') if not any(x.startswith('.') or x in ('node_modules','docs') for x in p.parts))
    require(len(paths)==18,'Unexpected public HTML route count: '+str(len(paths)))
    print('EXACT PREVIEW',base,SHA,flush=True)
    for path in paths:
        url=base+route(path)
        status,final,mime,body=get(url)
        require(status==200,'Page status '+str(status)+' '+url)
        require(body==path.read_bytes(),'Hosted source differs from commit: '+str(path))
        doc=Document(body.decode('utf-8'))
        require(not doc.duplicate_ids,'Duplicate IDs '+str(path)+': '+str(doc.duplicate_ids))
        REPORT['pages'].append({'path':str(path),'url':final,'status':status,'matchesCommit':body==path.read_bytes()})
        for ref in doc.assets+doc.links:
            dest=urllib.parse.urljoin(final,ref)
            u=urllib.parse.urlparse(dest)
            if u.scheme not in ('http','https') or u.netloc!=urllib.parse.urlparse(base).netloc:
                continue
            stat,landing,mt,payload=get(dest)
            require(stat==200, 'Internal resource '+str(stat)+' '+dest+' from '+str(path))
            if u.fragment and mt=='text/html':
                require(urllib.parse.unquote(u.fragment) in Document(payload.decode('utf-8')).ids,'Missing anchor '+dest)
    for asset in ['assets/catalog.css','assets/styles.css','assets/tarbell-volume.css','assets/tarbell-pair.css','assets/amanda-kelly-bw.jpg']:
        require(get(base+'/'+asset)[3]==Path(asset).read_bytes(),'Hosted asset does not match commit: '+asset)
    author=Path('author.html').read_bytes()
    require(hashlib.sha1(b'blob '+str(len(author)).encode()+b'\0'+author).hexdigest()=='33524433b8ca98d1a347a5b5a860a1718345e337','Approved Authors HTML changed')
    require('Amanda has a B.A. in Theater Arts from The University of Massachusetts, Boston.' in author.decode(),'Approved degree absent')
    require('Cabin Pressure Ask \u2192' not in author.decode(),'Wrong Substack title')
    books=Path('books/index.html').read_bytes()
    require(hashlib.sha1(b'blob '+str(len(books)).encode()+b'\0'+books).hexdigest()=='6b1ec07ff6c3956e6f7c9c5897ce00f3b2ed35f5','Unified Books restoration not exact')
    asyncio.run(browser_checks(base,paths))
    after=api('/branches/main')['commit']['sha']
    REPORT['productionAfter']=after
    require(before==after,'Production branch changed during audit')
    REPORT['internalRequests']=len(CACHE)
    REPORT['passed']=not FAILURES

try:
    main()
except Exception as exc:
    FAILURES.append(type(exc).__name__+': '+str(exc))
finally:
    (OUT/'report.json').write_text(json.dumps(REPORT,indent=2))
    print(json.dumps({'preview':REPORT.get('preview'),'pages':len(REPORT['pages']),'viewportChecks':len(REPORT['viewports']),'navigationChecks':len(REPORT['navigation']),'internalRequests':REPORT.get('internalRequests'),'failures':FAILURES},indent=2),flush=True)
raise SystemExit(1 if FAILURES else 0)
