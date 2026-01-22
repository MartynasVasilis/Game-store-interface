# Game Store Interface

A full-stack internship project inspired by Eneba. The project demonstrates a complete flow from backend API design to frontend UI, including search, pagination, and client-side state management.

## Live Demo

- Frontend (Vercel): https://game-store-interface.vercel.app
- Backend (Railway): https://game-store-interface-production.up.railway.app

## Tech Stack

### Frontend

- React
- Vite
- TypeScript
- Tailwind CSS
- Lucide Icons

### Backend

- Node.js
- Express
- SQLite3
- better-sqlite3
- SQLite FTS5 (full-text search)

### Hosting

- Frontend: Vercel
- Backend: Railway (Docker-based deployment)

## Features

- Game listing with pagination
- Fuzzy search using SQLite FTS5
- Game cards with hover animations
- Wishlist functionality using LocalStorage
- Fully responsive layout
- CORS-enabled API
- Realistic seeded game data

## API

### GET /list

Returns a paginated list of games with optional fuzzy search.

#### Query Parameters

- `search` (optional): search query string
- `page` (optional, default: 1): page number
- `limit` (optional, default: 10): items per page

#### Example

/list?search=fifa&page=1&limit=8

#### Response Format

```json
{
  "data": [
    {
      "id": 1,
      "title": "FIFA 23",
      "platform": "PC",
      "region": "EU",
      "price": 5999,
      "cover_url": "...",
      "currency": "EUR",
      "cashback_cents": 300,
      "likes": 1500
    }
  ],
  "meta": {
    "page": 1,
    "limit": 8,
    "total": 120,
    "hasNext": true
  }
}
```
