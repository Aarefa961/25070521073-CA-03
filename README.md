# FLEXI — Comprehensive Student Academic Organizer (CA-03)

**Continuous Assessment 03 (CA-03) Submission**  
**Course:** Web Technologies / Full-Stack Web Development  
**Institute:** Symbiosis Institute of Technology (SIT), Pune  
**Batch / Section:** Section B (`sitSecB`)  
**Student Name:** Aarefa  
**PRN / Roll Number:** 25070521060  
**Faculty Evaluator & Guide:** Prof. Somesh Chutel  
**Reference Format Repository:** [somesh-chutel/25070521060-CA-03](https://github.com/somesh-chutel/25070521060-CA-03)

---

## 📌 1. Project Overview & Abstract

**FLEXI** is a full-stack, solo-friendly academic organizer engineered specifically for university students to streamline semester coursework, assignment submissions, class timetable management, and GPA forecasting.

Built with a decoupled **Client-Server Architecture** utilizing **React 18 + Vite**, **Node.js + Express**, **MongoDB Atlas**, **Bcrypt password hashing**, and **JSON Web Tokens (JWT)**.

---

## 🗂️ 2. Repository Structure (Exact Match to Professor's Format)

Following the format specified in `somesh-chutel/25070521060-CA-03`:

```
flexi-project/
├── client/                     # Frontend: React 18 + Vite + React Router DOM
│   ├── public/
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   │   ├── Navbar.jsx      # Sticky navbar with student pill & quick demo button
│   │   │   ├── Footer.jsx      # Academic submission footer with developer specs
│   │   │   └── ProtectedRoute.jsx # Client-side JWT route protection
│   │   ├── context/
│   │   │   └── AuthContext.jsx # Global JWT authentication state & localStorage persistence
│   │   ├── pages/              # 12 Feature-Rich Academic Pages
│   │   │   ├── Home.jsx        # Landing page with module showcase & stats
│   │   │   ├── Login.jsx       # Student login + ⚡ 1-Click Evaluation Login
│   │   │   ├── Signup.jsx      # Student registration (Name, PRN, Dept, Semester)
│   │   │   ├── Dashboard.jsx   # Metric cards, pending tasks & class overview
│   │   │   ├── Tasks.jsx       # Complete CRUD task manager with filters & sort
│   │   │   ├── Timetable.jsx   # Weekly timetable planner (Monday to Saturday)
│   │   │   ├── GpaCalculator.jsx # UGC 10-point scale SGPA & CGPA predictor
│   │   │   ├── Notes.jsx       # Course study notes & formula cheat sheets
│   │   │   ├── Analytics.jsx   # Academic workload & study streak charts
│   │   │   ├── Profile.jsx     # Verified Digital Student ID Card with PRN
│   │   │   ├── About.jsx       # System architecture & REST API documentation
│   │   │   └── Contact.jsx     # Faculty consultation & student inquiry portal
│   │   ├── App.jsx             # React Router v7 routes declaration
│   │   ├── main.jsx            # React root with BrowserRouter & AuthProvider
│   │   └── styles.css          # Sleek modern dark academic design
│   ├── package.json
│   ├── vite.config.js
│   └── vercel.json
├── server/                     # Backend: Node.js Express REST API + MongoDB
│   ├── models/
│   │   ├── User.js             # Student schema with PRN, dept, and hashed password
│   │   ├── Task.js             # Academic task schema (title, subject, priority, dueDate)
│   │   └── Note.js             # Study notes schema
│   ├── routes/
│   │   ├── auth.js             # /register, /login, /me endpoints
│   │   ├── tasks.js            # /api/tasks full CRUD
│   │   └── notes.js            # /api/notes full CRUD
│   ├── server.js               # Express app, CORS, JWT middleware & DB connection
│   └── package.json
├── package.json                # Root package runner (npm start, npm run build)
├── render.yaml                 # One-click Render cloud deployment Blueprint
├── Dockerfile                  # Production container build
├── .dockerignore
├── .gitignore
└── README.md                   # Complete CA-03 Project Documentation
```

---

## 🔐 3. Authentication & Security (Mandatory Feature)

The application implements a secure authentication flow:
1. **Password Hashing:** Upon registration (`/create` or `/api/auth/register`), student passwords are encrypted with `bcryptjs` using 10 salt rounds before persisting to MongoDB.
2. **Stateless JWT Tokens:** Upon successful login (`/login` or `/api/auth/login`), the server issues a signed JSON Web Token using `jsonwebtoken` signed with `MY_SECRET_TOKEN` (matching the professor's sample configuration).
3. **Protected Routes:** Frontend pages (`/dashboard`, `/tasks`, `/timetable`, `/gpa-calculator`, `/notes`, `/analytics`, `/profile`) are protected using `<ProtectedRoute>`. Unauthenticated requests redirect to `/login`.
4. **1-Click Demo Evaluation:** For instant grading without registering, click the **"⚡ 1-Click Demo"** button on the Navbar or Login page to automatically authenticate as **Aarefa (PRN: 25070521060)**.

---

## 🚀 4. Full List of Implemented Academic Modules (12 Pages)

| Page | URL Path | Purpose & Features |
| :--- | :--- | :--- |
| **Home** | `/` | Academic hero section, module overview, key statistics, and evaluation callout. |
| **Student Login** | `/login` | Email/password sign-in with show/hide password and ⚡ 1-Click Demo evaluation button. |
| **Student Sign Up** | `/signup` | Full registration with Name, PRN / Roll Number, Department, Semester, and validation. |
| **Dashboard** | `/dashboard` | Quick metric cards (Total, Pending, Urgent, Completion %), upcoming deadlines, and today's schedule preview. |
| **Assignments & Tasks** | `/tasks` | Full CRUD task manager with live search, status filters (Pending/Completed), priority badges, due dates, and modal editors. |
| **Weekly Timetable** | `/timetable` | Interactive day-by-day class schedule (Mon-Sat) showing course codes, rooms, and professors (e.g. Prof. Somesh Chutel). |
| **GPA / CGPA Calculator** | `/gpa-calculator` | Real-time SGPA and cumulative CGPA calculation based on UGC 10-point credit weighting. |
| **Study Notes & Formulas** | `/notes` | Course revision hub, lab formula cheat sheets, 1-click clipboard copy, and note pinning. |
| **Academic Analytics** | `/analytics` | Visual workload breakdown bars, weekly study velocity streak, and submission performance metrics. |
| **Student ID Profile** | `/profile` | Realistic Digital Student ID Card (SIT Pune) displaying PRN, branch, academic status, and avatar picker. |
| **Project Documentation** | `/about` | Technical architecture specifications, tech stack breakdown, and REST endpoint tables. |
| **Contact & Support** | `/contact` | Department consultation hours (Prof. Somesh Chutel), campus location card, and interactive FAQ accordion. |

---

## 📡 5. REST API Specification (With Professor Compatibility Aliases)

To ensure 100% compatibility with both REST standards and the professor's sample repo (`somesh-chutel/25070521060-CA-03`), both sets of routes are active:

| HTTP Method | Standard Endpoint | Sample Repo Alias | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | `/create` | Creates student record with bcrypt password hashing & returns JWT token |
| `POST` | `/api/auth/login` | `/login` | Validates credentials and returns `{ token, jwtToken, user }` |
| `GET` | `/api/auth/me` | — | Retrieves authenticated student profile via Bearer token |
| `GET` | `/api/tasks` | `/getall` | Retrieves tasks with search, status, and priority query filters |
| `GET` | `/api/tasks/:id` | `/get/:id` | Retrieves a single task by its MongoDB ObjectId |
| `POST` | `/api/tasks` | — | Creates an academic task with input validation |
| `PATCH` | `/api/tasks/:id` | `/update/:id` | Updates task fields / toggles completion status |
| `DELETE` | `/api/tasks/:id` | `/delete/:id` | Deletes a task from MongoDB |
| `GET` | `/api/notes` | — | Lists study notes and revision sheets |
| `GET` | `/api/health` | — | Health probe returning server and database connectivity status |

---

## 💻 6. How to Run Locally

### Prerequisites
- Node.js 18+ installed
- MongoDB installed locally OR a free MongoDB Atlas connection string

### Quick Start (From Project Root)
```bash
# 1. Install all dependencies across server and client
npm run install:all

# 2. Build the client production assets
npm run build

# 3. Start the unified server (serves API + Frontend on port 5000)
npm start
```
Open **`http://localhost:5000`** in your browser.

### Development Mode (With Hot Reloading)
In two separate terminals:
```bash
# Terminal 1 - Backend (Node.js API)
cd server
npm run dev

# Terminal 2 - Frontend (Vite React HMR)
cd client
npm run dev
```
Open **`http://localhost:5173`** for local frontend development.

---

## 🌐 7. Cloud Deployment Guide (Render / Vercel)

### Option 1: Unified Full-Stack on Render (Recommended)
1. Push this repository to GitHub.
2. In [Render Dashboard](https://dashboard.render.com/), click **New +** > **Web Service**.
3. Select your repository.
4. Set:
   - **Build Command:** `npm run build`
   - **Start Command:** `npm start`
5. Add Environment Variables:
   - `NODE_ENV` = `production`
   - `PORT` = `5000`
   - `MONGODB_URI` = your Atlas connection string (e.g. `mongodb+srv://user:pass@cluster.mongodb.net/sitSecB?retryWrites=true&w=majority`)
6. Deploy! Render will build the React client and serve it alongside the Express REST API under a single HTTPS URL.

### MongoDB Atlas Checklist:
- In MongoDB Atlas **Network Access**, ensure `0.0.0.0/0` (Allow Access from Anywhere) is whitelisted.
- Ensure the connection string does not contain literal `<` and `>` brackets around your password.

---

## 🎓 8. Evaluation Checklist for Prof. Somesh Chutel

- [x] Folder structure contains `client/` and `server/` matching `somesh-chutel/25070521060-CA-03`.
- [x] Secure Student Authentication with **Bcrypt 10-round password hashing** and **JSON Web Tokens (JWT)**.
- [x] Direct aliases supported for `/create`, `/login`, `/getall`, `/get/:id`, `/update/:id`, `/delete/:id`.
- [x] 12 comprehensive, attractive academic pages with glassmorphism UI, stats cards, and charts.
- [x] Real-time **SGPA & CGPA Calculator** using university 10-point scale.
- [x] Interactive **Weekly Timetable** featuring Symbiosis Institute of Technology course codes & faculties.
- [x] Full MongoDB persistence across tasks, notes, and students.
- [x] ⚡ **1-Click Evaluation Login** for seamless, zero-friction grading.
