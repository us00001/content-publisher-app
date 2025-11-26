# Backend (Rails API) - Content Publisher

This is a Rails API scaffold configured to use SQLite for local development.

## Setup

1. Install Ruby and Bundler.
2. `cd backend`
3. `bundle install`
4. `rails db:create db:migrate db:seed`
5. `rails server -p 3000`

Environment variables:
- `JWT_SECRET` (optional) — default development secret provided.

Notes:
- CORS is configured to allow `http://localhost:5173` (Vite dev server).
- For production, switch to PostgreSQL and set `JWT_SECRET`.
