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
