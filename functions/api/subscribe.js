export async function onRequestPost(context) {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'https://unrulychain.com',
  };

  try {
    const body = await context.request.json();
    const email = (body.email || '').trim().toLowerCase();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response(JSON.stringify({ error: 'Valid email required.' }), {
        status: 400,
        headers,
      });
    }

    const kv = context.env.SUBSCRIBERS;
    const existing = await kv.get(email);

    if (existing) {
      return new Response(JSON.stringify({ ok: true, message: 'You are already subscribed.' }), {
        status: 200,
        headers,
      });
    }

    await kv.put(email, JSON.stringify({
      subscribed: new Date().toISOString(),
      source: context.request.headers.get('Referer') || 'direct',
    }));

    return new Response(JSON.stringify({ ok: true, message: 'Subscribed.' }), {
      status: 200,
      headers,
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Something went wrong. Try again.' }), {
      status: 500,
      headers,
    });
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': 'https://unrulychain.com',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
