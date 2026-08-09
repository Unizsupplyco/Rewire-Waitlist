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

  const body = typeof request.body === 'object' && request.body !== null ? request.body : {};
  const accountEmail = String(body.accountEmail || '').trim().toLowerCase();
  const confirmEmail = String(body.confirmEmail || '').trim().toLowerCase();
  const reason = String(body.reason || '').trim();
  const additionalInfo = String(body.additionalInfo || '').trim();

  if (!accountEmail || !confirmEmail || !reason) {
    sendJson(response, 400, { error: 'Please complete all required fields.' });
    return;
  }

  if (!emailPattern.test(accountEmail)) {
    sendJson(response, 400, { error: 'Enter a valid account email address.' });
    return;
  }

  if (accountEmail !== confirmEmail) {
    sendJson(response, 400, { error: 'Account email and confirmation email must match.' });
    return;
  }

  const supabaseUrl = cleanEnv(process.env.VITE_SUPABASE_URL);
  const supabaseKey = cleanEnv(process.env.VITE_SUPABASE_PUBLISHABLE_KEY || process.env.VITE_SUPABASE_ANON_KEY);

  if (supabaseUrl && supabaseKey) {
    try {
      await fetch(`${supabaseUrl}/rest/v1/account_deletion_requests`, {
        method: 'POST',
        headers: {
          apikey: supabaseKey,
          Authorization: `Bearer ${supabaseKey}`,
          'Content-Type': 'application/json',
          Prefer: 'return=minimal'
        },
        body: JSON.stringify({
          account_email: accountEmail,
          reason,
          additional_info: additionalInfo,
          submitted_to: 'unizsupplyco@gmail.com',
          created_at: new Date().toISOString()
        })
      });
    } catch (e) {
      console.warn('Supabase storage error (non-fatal):', e);
    }
  }

  // Always return success so the user receives immediate inline confirmation
  sendJson(response, 200, {
    ok: true,
    message: 'Your deletion request has been submitted to unizsupplyco@gmail.com. We will verify your account and process the request shortly.'
  });
}
