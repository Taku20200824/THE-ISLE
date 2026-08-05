# The Isle Asia Community

Production-oriented Next.js 15 project for an English-speaking Asia community server for **The Isle**, focused on Japan, Mongolia, Korea, Hong Kong, Taiwan, Singapore, and Southeast Asia.

## Stack

- Next.js 15 App Router
- TypeScript
- TailwindCSS with shadcn/ui-style components
- Framer Motion
- Prisma + PostgreSQL
- Firebase Firestore for live community/game data
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

The production architecture is:

- BisectHosting runs the actual The Isle Evrima game server.
- GitHub stores the website source code.
- Vercel deploys the website.
- Firebase stores website data and admin-managed server information.

Do not attempt to host or run The Isle from GitHub, Vercel, or Firebase.

The project is structured to use Firebase Firestore project `taku-f8db6` for live community/game data such as server status, announcements, events, staff, reports, and admin-managed data.

The Prisma schema remains in the repository as an optional relational/auth persistence layer for Vercel deployments. For Firestore-backed data, configure the Firebase environment variables in `.env`.

The Firestore console document currently referenced by the project is:

```text
projects/taku-f8db6/databases/(default)/documents/scores/HFN8KMCQfpaSv1vQoPUwsvpbyZe2
```

### Firestore Server Status

The website reads public server information from:

```text
serverStatus/main
```

Initial document:

```json
{
  "serverName": "TAKU's The Isle",
  "status": "online",
  "ip": "",
  "port": 7777,
  "location": "Hong Kong",
  "onlinePlayers": 0,
  "maxPlayers": 100,
  "version": "Evrima",
  "map": "Gateway",
  "discordUrl": "",
  "description": "An English-speaking The Isle Asia community server for players from Japan, Mongolia, Korea, Hong Kong, Taiwan, Singapore, and Southeast Asia.",
  "hostingProvider": "BisectHosting",
  "lastUpdated": "Firestore server timestamp"
}
```

Create it with:

```bash
pnpm firebase:seed-server
```

Or sign into `/admin/server` with a Firebase administrator account and press **Create default document**.

### Automatic Server Status

The public website uses `serverStatus/main` as the configured server record, then attempts a server-side live query against the configured `ip` and `port`.

For The Isle Evrima, set these Firestore fields to the BisectHosting query address:

```text
ip=103.70.2.164
port=9145
```

When the live query succeeds, the site displays `online` and updates the visible player count from the game server response. When the query fails, the site displays `offline` with `onlinePlayers=0`. This only checks the BisectHosting game server; GitHub, Vercel, and Firebase do not run The Isle.

Set `SERVER_QUERY_ENABLED=false` on Vercel only if you want to disable automatic game-server checks and show the manual Firebase values instead.

If BisectHosting gives a separate query port, set `SERVER_QUERY_PORT` on Vercel. If it is empty, the website queries the Firestore `port` value.

The Isle Evrima can leave stale public query records behind for a short time. The website treats query data older than `SERVER_QUERY_MAX_AGE_SECONDS` as offline. The default is 180 seconds.

### Firebase Environment

Configure these on Vercel:

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=taku-f8db6.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=taku-f8db6
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=taku-f8db6.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
FIREBASE_PROJECT_ID=taku-f8db6
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=
FIREBASE_ADMIN_EMAILS=your-admin-email@example.com
SERVER_QUERY_ENABLED=true
SERVER_QUERY_PORT=
SERVER_QUERY_MAX_AGE_SECONDS=180
```

`FIREBASE_PRIVATE_KEY` must keep escaped newlines, for example `-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n`.

### Security Rules

Deploy `firestore.rules` to Firebase. Public users can read `serverStatus/main`. Only administrators can update server status. Administrators are users with either:

- Firebase custom claim `admin: true`
- A document at `admins/{uid}`
- An email listed in `FIREBASE_ADMIN_EMAILS` for the server-side Admin API
