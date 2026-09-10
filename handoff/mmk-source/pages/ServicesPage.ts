import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import '../../styles/pages/services-page.css';
import '../components/ServiceCard.js';
import '../components/PageHero.js';
import '../components/EngagementPath.js';
import '../components/CtaSection.js';

import executiveOfficeSrc from '../../assets/executive-office.jpg';
import leadershipDiscussionSrc from '../../assets/leadership-discussion.jpg';
import learningSessionSrc from '../../assets/learning-session.jpg';
import teamFrameworksSrc from '../../assets/team-frameworks.jpg';
import executiveMeetingSrc from '../../assets/executive-meeting.jpg';
import dueDiligenceSrc from '../../assets/due-diligence.jpg';
import conferenceRoomSrc from '../../assets/conference-room.jpg';
import officeLightSrc from '../../assets/office-light.jpg';
import workingSessionSrc from '../../assets/working-session.jpg';
import executiveLeadingSrc from '../../assets/executive-leading.jpg';

/** Seven discrete consulting engagements with JSON-LD structured data, engagement paths, and CTA. */
@customElement('services-page')
export class ServicesPage extends LitElement {
  createRenderRoot() {
    return this;
  }

  private _jsonLdScript: HTMLScriptElement | null = null;

  connectedCallback() {
    super.connectedCallback();
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(this._jsonLd);
    document.head.appendChild(script);
    this._jsonLdScript = script;
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._jsonLdScript?.remove();
    this._jsonLdScript = null;
  }

  /** Service entries rendered via .map() into service-card elements in the service list section. */
  private readonly _services = [
    {
      number: '01',
      category:'Strategic Readiness',
      heading: 'AI Decision Readiness Assessment',
      meta: 'Duration: 3 to 4 weeks',
      tagline: 'Before you spend another dollar on AI, find out whether your organization can actually make AI decisions that stick.',
      description: 'Most organizations have no idea who is authorized to make AI decisions, where experimentation ends and standards begin, or whether their leadership team even agrees on what AI is supposed to do. The result is paralysis dressed up as caution, or chaos dressed up as innovation. We interview your leadership team, map your decision-making structure, identify where authority breaks down, and deliver a clear go/no-go recommendation on serious AI investment.',
      imageSrc: leadershipDiscussionSrc,
      imageAlt: 'Leadership team in a structured discussion around a conference table',
      deliverables: [
        'AI Decision Authority Map',
        'Leadership Alignment Report',
        'Risk & Exposure Snapshot',
        'Go/No-Go Recommendation',
        'Executive Briefing Session',
      ],
    },
    {
      number: '02',
      category:'Executive Education',
      heading: 'Executive AI Literacy Program',
      meta: 'Duration: 4 to 6 weeks',
      tagline: 'Your leadership team cannot make good AI decisions if they do not understand what AI actually does. This program fixes that.',
      description: 'Most executive teams are making AI decisions based on vendor demos, conference keynotes, and whatever their most enthusiastic employee showed them last month. This is not a technology seminar. It is a private executive education engagement delivered using your actual business problems as case studies, built to give your leadership team a shared vocabulary and the judgment to evaluate AI investments with confidence.',
      imageSrc: learningSessionSrc,
      imageAlt: 'Executives in a focused learning session',
      deliverables: [
        'Tailored Curriculum (4 to 6 modules)',
        'Executive AI Decision Framework',
        'Organizational AI Maturity Snapshot',
        'Facilitated Sessions (4 to 6 sessions, 90 minutes each)',
      ],
    },
    {
      number: '03',
      category:'Organizational Infrastructure',
      heading: 'AI Operating Model Design',
      meta: 'Duration: 6 to 10 weeks',
      tagline: 'You have decided to move forward with AI. Now build the organizational infrastructure that makes AI decisions actually work.',
      description: 'You have executive buy-in and a general sense that AI matters. What you do not have is a structure for how AI decisions flow, who owns experimentation versus standardization, or who is accountable when things go sideways. Without this operating model, every AI initiative becomes a political negotiation, and most of them die. We design the governance, accountability, and workflow architecture with your leadership team, not for them, and deliver a sequenced roadmap of AI initiatives mapped to business outcomes.',
      imageSrc: teamFrameworksSrc,
      imageAlt: 'Team working through organizational frameworks and structure',
      deliverables: [
        'AI Operating Model Document',
        'Governance Framework',
        'Accountability Matrix',
        'AI Strategic Roadmap (12 to 18 months)',
        'Workforce Impact and Transition Plan',
        'Board-Ready Executive Summary',
        'Executive Workshop Series (3 sessions, 90 minutes each)',
      ],
    },
    {
      number: '04',
      category:'Ongoing Leadership',
      heading: 'Fractional Chief AI Officer',
      meta: '6-month minimum',
      tagline: "The AI executive function your organization needs, without the $300K salary you are not ready to commit to.",
      description: 'AI transformation is not a project. It is an ongoing organizational challenge that surfaces new decisions every month. Vendor evaluations, internal politics, employee concerns, board questions, competitive moves. Your organization needs someone with executive-level AI judgment owning this function. The Fractional CAIO provides that leadership on a monthly engagement, with clear accountability for strategic AI decisions, vendor evaluation, governance design, and internal capability development.',
      imageSrc: executiveMeetingSrc,
      imageAlt: 'Executive leading a small group meeting in a modern office',
      deliverables: [
        'Strategic AI Leadership and Initiative Prioritization',
        'Two Advisory Sessions per Month (60 to 90 minutes each)',
        'Asynchronous Access via Dedicated Channel',
        'Quarterly Strategic Review (90 minutes)',
        'Vendor and Tool Evaluation',
        'Board and Stakeholder Preparation',
        'Internal Capability Development',
      ],
    },
    {
      number: '05',
      category:'Governance',
      heading: 'AI Due Diligence for Boards and Investors',
      meta: 'Duration: 2 to 3 weeks',
      tagline: 'Your board is asking questions about AI that your management team cannot answer. We produce the answers.',
      description: 'Boards and investors are increasingly demanding visibility into how companies are positioned relative to AI. How exposed are we to disruption? How much are we spending and what are we getting? Is our AI usage creating regulatory risk? Most management teams cannot answer these questions with the rigor that board-level governance requires. We produce a board-ready assessment of your organization\'s AI posture and stand beside your presenter in the room to handle the follow-ups.',
      imageSrc: dueDiligenceSrc,
      imageAlt: 'Professionals reviewing documents in a formal due diligence setting',
      deliverables: [
        'AI Posture Assessment',
        'Risk and Compliance Exposure Report',
        'Competitive Positioning Analysis',
        'Board Briefing Document (10 to 15 pages)',
        'Board Presentation (90 minutes)',
      ],
    },
    {
      number: '06',
      category: 'Technical Governance',
      heading: 'AI Software Reliability Operating Model',
      meta: 'Duration: 6 to 8 weeks',
      tagline: 'Your team is building software faster than ever with AI. You have no way of knowing whether any of it works.',
      description: 'AI coding tools have made your development team dramatically faster. The industry calls it vibe coding. It produces software that breaks in ways nobody can trace, diagnose, or fix. The AI does not remember what it built yesterday. It does not know your business rules. It does not check its own work. The problem is not AI. The problem is that AI-assisted development is operating without a lifecycle, without verification gates, and without persistent knowledge of what has been built and why. We install a structured operating model with seven lifecycle stages and evidence-based quality gates that makes AI-assisted coding reliable and governable. Your developers keep the speed. Your organization gets the confidence.',
      imageSrc: conferenceRoomSrc,
      imageAlt: 'Conference room with structured oversight materials on the table',
      deliverables: [
        'AI Software Development Lifecycle Framework (seven-stage operating model)',
        'Quality Gate Definitions and Evidence Pack Standards',
        'AI Agent Failure Mode Assessment (current development practices)',
        'Structured Knowledge Retention Architecture',
        'Developer Workflow Integration Plan',
        'Verification and Governance Playbook',
        'Executive Briefing on Risk Posture and Remediation',
        'Implementation Roadmap (6 to 12 months)',
      ],
    },
    {
      number: '07',
      category: 'Knowledge Infrastructure',
      heading: 'Knowledge Architecture for AI Operations',
      meta: 'Duration: 6 to 12 weeks',
      tagline: 'Your AI agents are fast, uninformed, and starting from zero every session. The knowledge they need exists in your organization. Nothing connects it to them.',
      description: 'Most solutions chunk your documents into vector embeddings and hope search returns something useful. That loses the structure and context that make documents worth reading. We build a purpose-built knowledge architecture where your documents remain canonical and human-readable. No chunking, no embedding, no lossy retrieval. Enforcement mechanisms ensure agents actually consult what they are given. A queryable graph indexes your institutional knowledge without replacing it. Three implementation tiers, from knowledge design through structural enforcement to graph-based retrieval.',
      imageSrc: officeLightSrc,
      imageAlt: 'Modern office with natural light and collaborative workspace',
      deliverables: [
        'Knowledge Architecture and Routing Index',
        'Behavioral Baseline Framework',
        'Session Discipline Protocol (start, checkpoint, anti-compaction)',
        'Enforcement Architecture (platform-specific compliance hooks)',
        'Knowledge Graph Schema and MCP Query Interface',
        'Compliance Monitoring and Drift Detection',
        'Automated Sync Pipeline (canonical sources to consumption surfaces)',
        'Executive Briefing on AI Knowledge Posture',
      ],
    },
  ];

  /** ItemList schema for Google rich results, derived from _services data. */
  private get _jsonLd() {
    return {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "M&M Kelly Advisory Services",
      "url": "https://mandmkelly.com/services/",
      "itemListElement": this._services.map((s, i) => ({
        "@type": "ListItem",
        "position": i + 1,
        "item": {
          "@type": "Service",
          "name": s.heading,
          "description": `${s.tagline} ${s.description}`,
          "provider": { "@type": "Organization", "name": "M&M Kelly Advisory" },
          "offers": { "@type": "Offer", "description": s.meta }
        }
      }))
    };
  }

  render() {
    return html`
      <main class="services-page" id="main-content" aria-label="Main content">

        <!-- Hero -->
        <page-hero
          layout="grid"
          eyebrowMeta="Perspective No. 02"
          eyebrowLabel="Services"
          heading="Built for executive teams navigating AI."
          .renderAside=${() => html`
            <p class="hero-subtitle">
              Every service is designed to deliver organizational clarity, not technical
              complexity. Senior partners lead every engagement.
            </p>
            <div class="img-container img-container--horizontal services-page__hero-image">
              <img class="img-editorial" src=${executiveOfficeSrc} alt="Open-plan executive office with floor-to-ceiling windows and a collaborative workspace" width="2069" height="1379" loading="eager" fetchpriority="high" />
            </div>
          `}
        ></page-hero>

        <!-- Service List -->
        <section class="page-section">
          <div class="page-inner">
            <div class="services-page__list">
              ${this._services.map(s => html`
                <service-card
                  number=${s.number}
                  category=${s.category}
                  heading=${s.heading}
                  meta=${s.meta}
                  tagline=${s.tagline}
                  description=${s.description}
                  imageSrc=${s.imageSrc}
                  imageAlt=${s.imageAlt}
                  .deliverables=${s.deliverables}
                ></service-card>
              `)}
            </div>
          </div>
        </section>

        <!-- Transition Image -->
        <section class="page-section services-page__section--image">
          <div class="page-inner">
            <div class="img-container img-container--horizontal services-page__transition-img">
              <img class="img-editorial" src=${workingSessionSrc} alt="Professionals engaged in a serious working session around a shared table" width="2070" height="1380" loading="lazy" />
            </div>
          </div>
        </section>

        <!-- Engagement Paths -->
        <section class="page-section page-section--alternate">
          <div class="page-inner">
            <h2 class="section-title">Engagement paths</h2>
            <p class="section-lead">
              Most clients don&rsquo;t need every service. These paths address the most
              common scenarios.
            </p>
            <div class="services-page__path-grid">

              <engagement-path
                pathLabel="Path A"
                icon="ph-magnifying-glass"
                heading="I Need to Know Where We Stand"
                description="For leaders who know they need to act but suspect their organization is not ready. This is the lowest-barrier entry point and the fastest path to a reference engagement. Delivers clarity on decision-making readiness and identifies the most urgent gaps. Naturally leads to Path B or Path D depending on what the assessment reveals."
                includes="AI Decision Readiness Assessment"
                timeline="3 to 4 weeks"
              ></engagement-path>

              <engagement-path
                pathLabel="Path B"
                icon="ph-chalkboard-teacher"
                heading="Get My Team Up to Speed, Then Assess"
                description="For leaders whose teams need foundational understanding before a formal assessment will be productive. The literacy program builds shared vocabulary and surfaces the real concerns, which makes the subsequent assessment sharper and more actionable. This is the best path when the leadership team includes members who are resistant to or confused by AI."
                includes="Executive AI Literacy Program + AI Decision Readiness Assessment"
                timeline="6 to 8 weeks"
              ></engagement-path>

              <engagement-path
                pathLabel="Path C"
                icon="ph-buildings"
                heading="We Are Ready to Build the Foundation"
                description="For leaders who are committed to doing AI right. Assess readiness, build the operating model, and produce a board-ready strategic roadmap. This is the comprehensive foundation engagement and the highest single-project value. This path typically transitions into a Fractional CAIO engagement for ongoing execution support."
                includes="AI Decision Readiness Assessment + AI Operating Model Design"
                timeline="10 to 14 weeks"
              ></engagement-path>

              <engagement-path
                pathLabel="Path D"
                icon="ph-user-circle"
                heading="Give Us an AI Executive"
                description="For leaders who have established their AI foundation and need ongoing senior leadership to navigate execution. Or for leaders who recognize they need the executive function immediately and want to begin with the CAIO engagement directly. The Fractional CAIO can incorporate elements of the Assessment and Literacy Program into the first quarter of the engagement, providing a single-contract path for clients who prefer simplicity. This is the path where the relationship deepens the most. The CAIO becomes a trusted member of the leadership team who knows the business, knows the people, and can be called on when a decision needs to be made before the next scheduled session."
                includes="Fractional Chief AI Officer (following any project engagement)"
                timeline="Ongoing · 6-month minimum"
              ></engagement-path>

              <engagement-path
                pathLabel="Path E"
                icon="ph-presentation-chart"
                heading="The Board Wants Answers"
                description="For CEOs or board chairs who need a structured, independent assessment of the organization's AI posture for governance purposes. This is an opportunistic offering that can be delivered quickly and often leads to broader engagement once the board sees the gaps."
                includes="AI Due Diligence for Boards and Investors"
                timeline="2 to 3 weeks"
              ></engagement-path>

              <engagement-path
                pathLabel="Path F"
                icon="ph-shield-check"
                heading="Our AI-Built Software Needs Guardrails"
                description="For leaders whose organizations have adopted AI coding tools and are now seeing the consequences: unexplained defects, fragile systems, institutional knowledge that disappears when a developer rotates off a project. This engagement installs the lifecycle discipline and governance structure that makes AI-assisted development a reliable capability rather than an unmanaged experiment. Can follow a Readiness Assessment or stand alone for organizations whose primary AI exposure is in software development. Often transitions into a Fractional CAIO engagement for ongoing technical governance."
                includes="AI Software Reliability Operating Model"
                timeline="6 to 8 weeks"
              ></engagement-path>

              <engagement-path
                pathLabel="Path G"
                icon="ph-tree-structure"
                heading="Our AI Tools Have No Organizational Context"
                description="For leaders whose AI investments are underperforming because agents operate without institutional memory. They hallucinate answers, reinvent existing solutions, and break systems because they cannot see dependencies. This engagement builds the knowledge infrastructure that connects your AI tools to what your organization already knows. Three implementation tiers from foundational knowledge architecture through structural enforcement to graph-based retrieval. Can follow a Readiness Assessment or stand alone. Often transitions into a Fractional CAIO engagement for ongoing knowledge governance."
                includes="Knowledge Architecture for AI Operations"
                timeline="6 to 12 weeks"
              ></engagement-path>

              <div class="services-page__path-image">
                <img class="img-editorial" src=${executiveLeadingSrc} alt="Male executive in his 50s leading a company meeting at a conference table" width="2070" height="1380" loading="lazy" />
              </div>

            </div>
          </div>
        </section>

        <!-- Final CTA -->
        <cta-section
          heading="Ready to find the right path?"
          description="Every engagement starts with a conversation. Tell us where you are and we'll help you determine the right next step."
        ></cta-section>

      </main>
    `;
  }
}
