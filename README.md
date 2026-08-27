# TrekTrails

A trek-booking site for the Indian Himalaya and Western Ghats, built as a UI/design
portfolio piece. Next.js App Router, Tailwind CSS v4, MongoDB (Mongoose), and
JWT cookie sessions.

## Getting started

```bash
npm install
npm run dev
```

Create a `.env` file in the project root:

```
MONGODB_URI=your-mongodb-connection-string
JWT_SECRET=any-long-random-string
```

## Scripts

| Command         | Description                        |
| --------------- | ---------------------------------- |
| `npm run dev`   | Start the dev server               |
| `npm run build` | Production build                   |
| `npm run start` | Serve the production build         |
| `npm run lint`  | Lint                               |

## Layout

```
app/         Routes, pages, and API route handlers
components/   Reusable UI components
data/        Static trek and month data
lib/         Client and server helpers (auth, db, utils)
models/      Mongoose schemas
public/      Static assets
```

## Deploying

Set `MONGODB_URI` and `JWT_SECRET` in the host's environment variables, and allow
the host's IP range in MongoDB Atlas network access.
