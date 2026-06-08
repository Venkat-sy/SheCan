Join Us form submission details (where data goes)

When you submit the Join/Volunteer form on the site (page: /join):

1. Frontend

- `src/pages/Join.jsx` sends the form as JSON to:
  - `${VITE_API_BASE_URL || 'http://localhost:4000'}/api/volunteers`

2. Backend

- `server/index.js` handles:
  - `POST /api/volunteers`

3. Storage location

- The server writes each submission into a JSON file here:
  - `server/data/volunteers.json`

4. How records are stored

- The entry is added to the beginning of the list (newest first).
- Only the latest 500 entries are kept.

To check saved submissions:

- Open `server/data/volunteers.json` after you submit the form.
