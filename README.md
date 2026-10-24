# Gift Treaty

Two people agree not to buy each other gifts. Each donates what they would have spent to a charity the other chose. The site only records the agreement; it never handles money.

## Run locally

    pnpm install
    pnpm dev          # http://localhost:3000, SQLite file at ./data/treaty.db (created automatically)
    pnpm test         # unit tests for the Treaty flow
    pnpm typecheck && pnpm lint && pnpm build

## Deploy (Vercel + Turso, both free tiers)

1. Create a Turso database and token (turso db create / turso db tokens create).
2. In Vercel set TURSO_DATABASE_URL, TURSO_AUTH_TOKEN, ADMIN_PASSWORD, IP_HASH_SALT (see .env.example).
3. Deploy. Tables are created on first request.

## Notes

- No email in v1: the creator shares the invite link (copy, share sheet, WhatsApp, mailto). See lib/notify.ts for the future email seam.
- Only hashes of the private links are stored. The invite link is shown once, on the creator page right after creation.
- /admin shows the journey funnel (basic auth, password from ADMIN_PASSWORD).
- Moving to Postgres later: swap the Drizzle driver in lib/db/index.ts and the table definitions in lib/db/schema.ts.
