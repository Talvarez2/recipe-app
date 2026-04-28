# AGENTS.md

## Project Overview
Full-stack recipe and meal planning app. Node.js/Express backend with SQLite (better-sqlite3), vanilla HTML/CSS/JS frontend.

## Structure
- `server.js` — Express entry point, serves static files and API routes
- `src/db.js` — SQLite database setup (recipes + meal_plan tables)
- `src/routes/recipes.js` — CRUD API for recipes with image upload (multer)
- `src/routes/planner.js` — Weekly meal planner API
- `public/` — Frontend: index.html (list), recipe.html (detail), add.html (form), planner.html (meal planner)
- `public/js/app.js` — Shared frontend JS (fetch API calls, search/filter)
- `public/css/style.css` — All styles
- `scripts/seed.js` — Seeds 8 sample recipes
- `data/` — SQLite database files (gitignored)
- `uploads/` — Uploaded recipe images (gitignored)

## Key Conventions
- Ingredients stored as JSON array strings in SQLite
- Categories: breakfast, lunch, dinner, dessert, snack
- Meal planner days: Monday–Sunday; meals: breakfast, lunch, dinner
- No frontend framework — vanilla JS with fetch API
- Images served from `/uploads/` static path

## Commands
- `npm install` — Install dependencies
- `npm run seed` — Seed sample data
- `npm start` — Start server on port 3000
- `docker-compose up --build` — Run with Docker
