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

## Deployment Guide

### Option 1: Unified Full-Stack Deployment on Render (Recommended & Free)
Deploy the frontend and backend together on a single Render Web Service:

1. **Push your code to GitHub** (if not already pushed).
2. Go to [Render.com](https://render.com) and create an account.
3. Click **New +** -> **Web Service**.
4. Connect your GitHub repository (`flexi-project`).
5. Configure the service:
   - **Name**: `flexi-academic-organizer`
   - **Environment**: `Node`
   - **Build Command**: `npm run build`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free`
6. Add the following **Environment Variables**:
   - `NODE_ENV` = `production`
   - `PORT` = `5000`
   - `MONGODB_URI` = your MongoDB Atlas connection string (e.g. `mongodb+srv://username:password@cluster.mongodb.net/flexi?retryWrites=true&w=majority`)
7. Click **Deploy Web Service**.
   Render will build the React frontend and serve it with the Express API under a single HTTPS URL with zero CORS issues!

---

### Option 2: Split Deployment (Frontend on Vercel + Backend on Render)

#### Backend (Render):
1. Create a **New Web Service** on Render.
2. Root Directory: `backend`
3. Build Command: `npm install`
4. Start Command: `node server.js`
5. Environment Variables:
   - `MONGODB_URI` = your Atlas connection string
   - `FRONTEND_ORIGIN` = `https://your-app.vercel.app`

#### Frontend (Vercel):
1. Go to [Vercel.com](https://vercel.com) and import the repository.
2. Set Root Directory to `frontend`.
3. Add Environment Variable:
   - `VITE_API_URL` = `https://your-backend.onrender.com/api`
4. Click **Deploy**.

---

### MongoDB Atlas Setup Checklist
When configuring your database in MongoDB Atlas:
1. Under **Network Access**, add IP `0.0.0.0/0` (Allow access from anywhere) so cloud servers can connect.
2. In your connection string, make sure you **remove the `<` and `>` brackets** around your username and password:
   - ❌ `mongodb+srv://<user>:<pass>@...`
   - ✅ `mongodb+srv://user:pass@...`

---

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
