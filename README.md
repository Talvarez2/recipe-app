# 🍳 Recipe App

Full-stack recipe and meal planning application built with Node.js, Express, SQLite, and vanilla HTML/CSS/JS.

## Features

- **Recipe Management** — Create, read, update, and delete recipes with image uploads
- **Search & Filter** — Search recipes by keyword and filter by category (breakfast, lunch, dinner, dessert, snack)
- **Weekly Meal Planner** — Assign recipes to days and meals with a click-to-assign interface
- **Responsive Design** — Clean, modern UI that works on desktop and mobile
- **Docker Support** — One-command deployment with Docker Compose

## Quick Start

```bash
npm install
npm run seed    # Load sample recipes
npm start       # http://localhost:3000
```

### Docker

```bash
docker-compose up --build
```

## Screenshots

<!-- Add screenshots here -->

## API Reference

### Recipes

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/recipes` | List all recipes |
| GET | `/api/recipes?q=search&category=dinner` | Search and filter |
| GET | `/api/recipes/:id` | Get single recipe |
| POST | `/api/recipes` | Create recipe (multipart/form-data) |
| PUT | `/api/recipes/:id` | Update recipe |
| DELETE | `/api/recipes/:id` | Delete recipe |

**Recipe fields:** title, description, ingredients, instructions, category, prep_time, cook_time, servings, image (file)

### Meal Planner

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/planner` | Get meal plan |
| POST | `/api/planner` | Add recipe to plan (`{recipe_id, day, meal}`) |
| DELETE | `/api/planner/:id` | Remove entry |
| DELETE | `/api/planner` | Clear entire plan |

## Tech Stack

- **Backend:** Node.js, Express, better-sqlite3, multer
- **Frontend:** Vanilla HTML, CSS, JavaScript
- **Database:** SQLite
- **Deployment:** Docker
