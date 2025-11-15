import fetch from 'node-fetch';

(async () => {
  const url = 'http://localhost:8080/';
  const payload = {
    to: 'client@example.com',
    subject: 'Test: Your Appointment Confirmation',
    html: '<p>Hi there, this is a test appointment confirmation.</p>',
    text: 'Hi, this is a test appointment confirmation.'
  };
  try {
    const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
    console.log('status', res.status);
    console.log(await res.text());
  } catch (e) {
    console.error('error connecting to local function', e);
  }
})();
