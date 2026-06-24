const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function cleanEnv(value) {
  return String(value || '').replace(/^\uFEFF/, '').trim();
}

function sendJson(response, status, body) {
  response.statusCode = status;
  response.setHeader('Content-Type', 'application/json');
  response.end(JSON.stringify(body));
}

export default async function handler(request, response) {
  if (request.method === 'OPTIONS') {
    response.statusCode = 204;
    response.end();
    return;
  }

  if (request.method !== 'POST') {
    sendJson(response, 405, { error: 'Method not allowed.' });
    return;
  }

  const supabaseUrl = cleanEnv(process.env.VITE_SUPABASE_URL);
  const supabaseKey = cleanEnv(process.env.VITE_SUPABASE_PUBLISHABLE_KEY || process.env.VITE_SUPABASE_ANON_KEY);

  if (!supabaseUrl || !supabaseKey) {
    sendJson(response, 500, { error: 'Waitlist setup is incomplete.' });
    return;
  }

  const body = typeof request.body === 'object' && request.body !== null ? request.body : {};
  const email = String(body.email || '').trim().toLowerCase();
  const promoCode = String(body.promoCode || '').trim().toUpperCase();
  const source = String(body.source || '').trim().slice(0, 80);

  if (!emailPattern.test(email)) {
    sendJson(response, 400, { error: 'Enter a valid email address.' });
    return;
  }

  if (promoCode && promoCode !== 'PRAISEFRED') {
    sendJson(response, 400, { error: 'That promo code is not valid.' });
    return;
  }

  try {
    const supabaseResponse = await fetch(`${supabaseUrl}/rest/v1/waitlist`, {
      method: 'POST',
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal'
      },
      body: JSON.stringify({
        email,
        promo_code: promoCode || null,
        source: source || 'website'
      })
    });

    const responseText = await supabaseResponse.text();
    let supabaseResult = null;
    try {
      supabaseResult = responseText ? JSON.parse(responseText) : null;
    } catch {}

    if (supabaseResponse.status === 409 && supabaseResult?.code === '23505') {
      sendJson(response, 200, { ok: true, duplicate: true });
      return;
    }

    if (!supabaseResponse.ok) {
      sendJson(response, supabaseResponse.status, {
        error: supabaseResult?.message || 'We could not add you right now. Please try again.'
      });
      return;
    }

    sendJson(response, 200, { ok: true });
  } catch (error) {
    console.error('Waitlist Supabase request failed', error);
    sendJson(response, 502, { error: 'Waitlist service is unavailable. Please try again.' });
  }
}
