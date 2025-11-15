// index.js
import sgMail from '@sendgrid/mail';

// Cloud Function: sendClientEmail
// Expects POST JSON: { to: string, subject: string, template_vars?: object, html?: string, text?: string }
// Responds with { status: 'ok' } or { status: 'error', error_message: '...' }

export async function sendClientEmail(req, res) {
  try {
    const { to, subject, html, text } = req.body || {};
    if (!to || !subject) {
      return res.status(400).json({ status: 'error', error_message: 'Missing required fields: to, subject' });
    }

    const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY || '{{SENDGRID_API_KEY}}';
    const SENDER_EMAIL = process.env.SENDER_EMAIL || 'no-reply@example.com';

    if (!SENDGRID_API_KEY) {
      return res.status(500).json({ status: 'error', error_message: 'Missing SENDGRID_API_KEY' });
    }

    sgMail.setApiKey(SENDGRID_API_KEY);

    const msg = {
      to,
      from: SENDER_EMAIL,
      subject,
      text: text || 'Please view this message in an HTML-capable client.',
      html: html || `<p>This is an automated message regarding <strong>${subject}</strong>.</p>`,
    };

    await sgMail.send(msg);

    return res.status(200).json({ status: 'ok' });
  } catch (err) {
    console.error('sendClientEmail error', err);
    const message = err?.response?.body || err.message || String(err);
    return res.status(500).json({ status: 'error', error_message: message });
  }
}
