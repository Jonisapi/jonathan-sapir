# WNB World Cup Office Draw

Next.js + TypeScript + Tailwind app for an internal office prediction game.

## Run locally

```bash
npm install
npm run dev
```

If Supabase environment variables are not set, the app falls back to browser localStorage for local testing.

## Shared Data Setup

For employee testing across multiple phones, configure Supabase:

1. Create a Supabase project.
2. Open the Supabase SQL editor.
3. Run `supabase-schema.sql`.
4. Add these environment variables in Netlify:

```bash
SUPABASE_URL=https://your-project-ref.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
ADMIN_PASSCODE=8888
```

Use the Supabase service role key only as a server-side Netlify environment variable. Do not expose it as a `NEXT_PUBLIC_` variable.

## Deploy

Netlify uses `netlify.toml`:

```bash
npm run build
```

Publish directory:

```bash
.next
```

## Notes

- One entry per email.
- One team can be chosen once.
- Admin can lock entries, update actual totals/prizes, and edit or remove predictions.
- This is a free internal office game with company-funded prizes.
