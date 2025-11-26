# Content Publisher — Full Project (Rails API + React + TypeScript)

This archive contains a runnable scaffold of a Content Publisher app.

## Backend (Rails API)

- Folder: backend
- Uses sqlite for easy local setup
- To run:
  - Install Ruby & Bundler
  - cd backend
  - bundle install
  - rails db:create db:migrate db:seed
  - rails server -p 3000

## Frontend (Vite + React + TypeScript)

- Folder: frontend
- To run:
  - cd frontend
  - npm install
  - set VITE_API_BASE in a .env file (default: http://localhost:3000)
  - npm run dev

This scaffold includes:

- JWT authentication (auth cookie)
- Users and Publications models & controllers
- Publications CRUD & status change endpoints
- Public view endpoint to list published items
