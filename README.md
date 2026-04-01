# Helpdesk Support Ticket Management

A full-stack helpdesk support ticket management application built with React and Express.js.

## Features

- Create support tickets with title, description, and contact information
- Update ticket information and status (pending, accepted, resolved, rejected)
- Kanban board view organized by ticket status
- Filter tickets by status
- Sort tickets by latest update or created date
- Tickets cannot be deleted once created
- API documentation via Swagger

## Tech Stack

**Frontend**
- React + Vite

**Backend**
- Express.js
- SQLite + better-sqlite3

**Testing**
- Jest

**API Documentation**
- Swagger

**Infrastructure**
- Docker + docker-compose

## Getting Started

### Prerequisites
- Docker
- Docker Compose
- Node.js 20+

### Run with Docker

```bash
docker-compose up -d --build
```

| Service  | URL |
|----------|-----|
| Frontend | http://localhost:5173 |
| Backend  | http://localhost:3000 |
| API Docs | http://localhost:3000/api/docs |

### Run Tests

```bash
cd backend
npm install
npm test
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/tickets | Get all tickets (support filter & sort) |
| GET | /api/tickets/:id | Get ticket by ID |
| POST | /api/tickets | Create a new ticket |
| PATCH | /api/tickets/:id | Update ticket info or status |
