# FLEXI — Student Academic Organizer

A solo-friendly full-stack college project using React, Node.js, Express, and MongoDB.

## Features
- Create, list, update, complete, and delete academic tasks
- Search tasks and filter by status/type
- Dashboard counts for total, pending, completed, and overdue tasks
- MongoDB persistence
- REST API with basic input validation

## Requirements
- Node.js 20+ recommended
- MongoDB Community Server running locally, or a MongoDB Atlas connection string
- MongoDB Compass (optional GUI for inspecting data)

## 1. Configure the backend
Open a terminal in `backend`:

```bash
npm install
```

Copy `.env.example` to `.env`. The default local URI is:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/flexi
PORT=5000
```

Start the API:

```bash
npm run dev
```

Health check: http://localhost:5000/api/health

## 2. Configure the frontend
Open another terminal in `frontend`:

```bash
npm install
npm run dev
```

Open the local URL Vite prints (normally http://localhost:5173).

## 3. Verify persistence
1. Add a task in the UI.
2. Open MongoDB Compass and connect to `mongodb://127.0.0.1:27017`.
3. Open database `flexi`, collection `tasks`.
4. Refresh the page or restart the frontend; the task should remain because it is stored in MongoDB.

## API endpoints
- `GET /api/tasks` — list tasks; supports `search`, `status`, and `type` query parameters
- `GET /api/tasks/:id` — retrieve one task
- `POST /api/tasks` — create a task
- `PATCH /api/tasks/:id` — update task fields / completion
- `DELETE /api/tasks/:id` — delete a task
- `GET /api/health` — health check

## Database model
Each task document contains:
- `title` (required string)
- `subject` (required string)
- `type` (`Assignment`, `Project`, `Test`, `Study`, or `Other`)
- `dueDate` (date, required)
- `priority` (`Low`, `Medium`, `High`)
- `status` (`Pending` or `Completed`)
- `notes` (optional string)
- `createdAt`, `updatedAt` (timestamps)

## Troubleshooting
- `ECONNREFUSED` / database connection error: start MongoDB Community Server or use a valid Atlas URI.
- CORS/network error: ensure backend is running on port 5000.
- `npm` not found: install Node.js, then reopen the terminal.
- Port already in use: change `PORT` in `backend/.env` and update `VITE_API_URL` in `frontend/.env` accordingly.

## Suggested project report sections
1. Abstract and problem statement
2. Objectives and scope
3. Software/hardware requirements
4. System architecture and data flow
5. Database schema
6. Module descriptions
7. API endpoint table
8. Screenshots of UI and MongoDB Compass records
9. Testing and results
10. Limitations and future scope
