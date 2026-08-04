# The Isle Asia Community

Production-oriented Next.js 15 project for an English-speaking Asia community server for **The Isle**, focused on Japan, Mongolia, Korea, Hong Kong, Taiwan, Singapore, and Southeast Asia.

## Stack

- Next.js 15 App Router
- TypeScript
- TailwindCSS with shadcn/ui-style components
- Framer Motion
- Prisma + PostgreSQL
- NextAuth with Discord OAuth
- Vercel-ready deployment

## Local Setup

```bash
pnpm install
cp .env.example .env
pnpm prisma:generate
pnpm dev
```

## GitHub Pages

GitHub Pages can host the static preview in `docs/`.

In repository settings, use:

- Source: Deploy from a branch
- Branch: `main`
- Folder: `/docs`

The full Next.js app should still be deployed to Vercel for NextAuth, Prisma, API routes, and server-rendered admin features.

## Integration Points

Future live systems are isolated under `src/lib/integrations`:

- Discord Bot and OAuth
- BattleMetrics API
- Steam API
- Server Query API
- Stripe/PayPal
- Webhooks

## Database

The Prisma schema includes players, announcements, news, events, reports, bans, donations, staff, profiles, accounts, sessions, and verification tokens.
