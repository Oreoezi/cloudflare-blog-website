# Cloudflare workers blog website

This is the repository for an open source project that anyone will be able to deploy on Cloudflare workers. It will allow people to create their personal blogs.

## Tech stack

- Sveltekit
- Cloudflare Workers
- Lucia Auth
- Cloudflare D1 (storing users and articles)
- Cloudflare R2 (storing images and other assets)
- Cloudflare Turnstile for captcha

## Key guidelines

- Make sure `npm run lint` passes.
- Make sure `npm run test` passes.
- Write tests for your changes:
  - Unit tests for functions in subfolders in `/webapp/test/unit`.
  - Mocks / Facades for things interacting with external services.
  - E2E playwright tests in subfolders in `/webapp/test/e2e`.
- Use libraries, no need to re-invent the wheel.