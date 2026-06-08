# She Can Foundation (SheCan) — React + Express

Simple multipage (SPA routes) website with animations + minimal backend endpoint for the Join/Volunteer form.

## Pages

- `/` Home
- `/about` About
- `/join` Join Us (Volunteer form)

## Setup

```bash
npm install
```

## Run (client + server)

```bash
npm run dev
```

- Frontend: http://localhost:5173
- Backend API: http://localhost:4000

## Deploy/Build

```bash
npm run build
node server/index.js
```

## API

- `POST /api/volunteers`
  - Body: `{ name, email, college, interest, message }`
  - Returns: `{ ok: true, message: '...' }`
