# Automatic Mail Sender 

This repository is a **demo** implementation of an automated email-sending service suitable for client notifications (order confirmations, appointment reminders, marketing emails).

Core components:
- **Google Cloud Function** (`index.js`) that sends email using SendGrid (placeholder).
- **Opal flow** (`opal_flow.json`) that triggers the function (webhook -> prepare payload -> HTTP call).
- **GitHub Actions** workflow to deploy the Cloud Function.
- **Local test harness** to run against a local functions emulator.

**Important:** Do NOT commit real API keys. Replace `{{...}}` placeholders when deploying to a live environment.

## Files
- `index.js` — Cloud Function code using SendGrid
- `package.json` — dependencies and scripts
- `test/local_test.js` — test client
- `.github/workflows/deploy.yml` — CI/CD deploy workflow (uses GitHub secrets)
- `opal_flow.json` — sample Opal canvas flow (webhook -> call function)
- `README.md` — this file

## How to use (local preview)
1. Install Node.js >= 18.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run functions-framework locally:
   ```bash
   npx @google-cloud/functions-framework --target=sendClientEmail --port=8080
   ```
4. In another terminal run the test client:
   ```bash
   node test/local_test.js
   ```

## GitHub deploy (summary)
1. Create a GitHub repo and push these files.
2. Add GitHub Secrets (see below).
3. Merge to `main` to trigger the CI deploy workflow.

## Required GitHub Secrets (if you will deploy)
- `GCP_SA_KEY` — service account JSON for deploy
- `GCP_PROJECT`
- `GCP_REGION`
- `SENDGRID_API_KEY` — SendGrid API key (or your email provider)
- `SENDER_EMAIL` — verified sender email (eg no-reply@yourdomain.com)

## Notes for portfolio
- Keep API keys as placeholders; for screenshots, redact sensitive values.
- Add a short write-up describing the architecture and your role.

