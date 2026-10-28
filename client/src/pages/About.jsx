import React from 'react';
import {
  GraduationCap,
  Layers,
  Shield,
  Database,
  Server,
  Code2,
  Cpu,
  CheckCircle2,
  FileText,
  ExternalLink,
} from 'lucide-react';

export default function About() {
  const apiEndpoints = [
    { method: 'POST', endpoint: '/api/auth/register', alias: '/create', desc: 'Registers new student with bcrypt hashed password & issues JWT token' },
    { method: 'POST', endpoint: '/api/auth/login', alias: '/login', desc: 'Authenticates student credentials and returns signed JWT token' },
    { method: 'GET', endpoint: '/api/auth/me', alias: '—', desc: 'Retrieves authenticated student profile using Bearer token' },
    { method: 'GET', endpoint: '/api/tasks', alias: '/getall', desc: 'Fetches academic tasks with optional search, status, and type query params' },
    { method: 'GET', endpoint: '/api/tasks/:id', alias: '/get/:id', desc: 'Retrieves a single task by its MongoDB ObjectId' },
    { method: 'POST', endpoint: '/api/tasks', alias: '—', desc: 'Creates a new task with validation (title, subject, due date, priority)' },
    { method: 'PATCH', endpoint: '/api/tasks/:id', alias: '/update/:id', desc: 'Updates task fields or toggles completion status' },
    { method: 'DELETE', endpoint: '/api/tasks/:id', alias: '/delete/:id', desc: 'Deletes a task record from MongoDB' },
    { method: 'GET', endpoint: '/api/notes', alias: '—', desc: 'Lists study notes and formula cheat sheets' },
    { method: 'GET', endpoint: '/api/health', alias: '—', desc: 'Server and MongoDB (Community / Compass) connection status probe' },
  ];

  return (
    <div className="about-page-container">
      {/* Header Banner */}
      <section className="about-header-card">
        <div className="about-badge-wrap">
          <GraduationCap size={20} />
          <span>Symbiosis Institute of Technology • Section B</span>
        </div>
        <h1 className="about-main-title">Project Documentation: FLEXI</h1>
        <p className="about-subtext">
          Continuous Assessment 03 (CA-03) Submission for Web Technologies / Full-Stack Development
        </p>

        <div className="about-meta-grid">
          <div className="meta-card">
            <span className="meta-label">Student Name:</span>
            <strong>AAREFA AADIL</strong>
          </div>
          <div className="meta-card">
            <span className="meta-label">PRN / Roll Number:</span>
            <strong className="text-indigo">25070521073</strong>
          </div>
          <div className="meta-card">
            <span className="meta-label">Course Evaluation:</span>
            <strong>Continuous Assessment 03 (CA-03)</strong>
          </div>
          <div className="meta-card">
            <span className="meta-label">Faculty Mentor & Guide:</span>
            <strong>Prof. Somesh Chutel</strong>
          </div>
        </div>
      </section>

      {/* Developer Profile Spotlight */}
      <section className="about-section-panel mt-4">
        <div className="developer-spotlight-box">
          <div className="dev-avatar-wrap">
            <span className="dev-avatar-icon">🎓</span>
            <span className="dev-status-badge">Developer & Project Lead</span>
          </div>
          <div className="dev-details-wrap">
            <h2 className="dev-name">AAREFA AADIL</h2>
            <p className="dev-subtitle">B.Tech Computer Science & Engineering • PRN: 25070521073</p>
            <p className="dev-bio">
              Engineered this full-stack academic management solution for Continuous Assessment CA-03 under the supervision of <strong>Prof. Somesh Chutel</strong>. Built strictly following the required decoupled client-server architecture, JSON Web Token (JWT) stateless authentication, Bcrypt password hashing, MongoDB database persistence, and comprehensive university workflow modules.
            </p>
            <div className="dev-stats-row">
              <div className="dev-stat-item">
                <span className="dev-stat-num">25070521073</span>
                <span className="dev-stat-lbl">Student PRN</span>
              </div>
              <div className="dev-stat-item">
                <span className="dev-stat-num">Section B</span>
                <span className="dev-stat-lbl">Batch / Class</span>
              </div>
              <div className="dev-stat-item">
                <span className="dev-stat-num">CA-03</span>
                <span className="dev-stat-lbl">Assessment</span>
              </div>
              <div className="dev-stat-item">
                <span className="dev-stat-num">MERN + Vite</span>
                <span className="dev-stat-lbl">Tech Stack</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Architecture Overview */}
      <section className="about-section-panel mt-4">
        <div className="panel-title-with-icon">
          <Layers className="text-indigo" size={24} />
          <h2>System Architecture & Folder Format</h2>
        </div>
        <p className="section-text">
          This project strictly adheres to the requested professor repository format (<code>25070521060-CA-03</code>), featuring a dedicated <strong><code>client/</code></strong> and <strong><code>server/</code></strong> structure:
        </p>

        <div className="architecture-grid">
          <div className="arch-card">
            <div className="arch-header">
              <Code2 size={20} className="text-indigo" />
              <h3>Client (Frontend)</h3>
            </div>
            <ul>
              <li><strong>Framework:</strong> React 18 + Vite</li>
              <li><strong>Routing:</strong> React Router DOM with multi-page navigation</li>
              <li><strong>State:</strong> React Context API (AuthContext) for JWT storage</li>
              <li><strong>Icons:</strong> Lucide React iconography</li>
              <li><strong>Styling:</strong> Custom modern CSS with responsive layouts</li>
            </ul>
          </div>

          <div className="arch-card">
            <div className="arch-header">
              <Server size={20} className="text-emerald" />
              <h3>Server (Backend)</h3>
            </div>
            <ul>
              <li><strong>Runtime:</strong> Node.js & Express.js</li>
              <li><strong>Security:</strong> Bcrypt (10 rounds) + JSON Web Tokens (JWT)</li>
              <li><strong>Cross-Origin:</strong> CORS enabled with flexible origin handling</li>
              <li><strong>Compatibility:</strong> Direct aliases for <code>/login</code>, <code>/create</code>, <code>/getall</code></li>
              <li><strong>Validation:</strong> Input sanitation and Mongoose schemas</li>
            </ul>
          </div>

          <div className="arch-card">
            <div className="arch-header">
              <Database size={20} className="text-amber" />
              <h3>Database (MongoDB)</h3>
            </div>
            <ul>
              <li><strong>ODM:</strong> Mongoose</li>
              <li><strong>Database Name:</strong> <code>sitSecB</code> / <code>flexi</code></li>
              <li><strong>Schemas:</strong> Users, Tasks, Study Notes, Timetables</li>
              <li><strong>Deployment:</strong> Compatible with MongoDB Atlas & Local Compass</li>
            </ul>
          </div>
        </div>
      </section>

      {/* REST API Endpoints Table */}
      <section className="about-section-panel mt-4">
        <div className="panel-title-with-icon">
          <FileText className="text-emerald" size={24} />
          <h2>REST API Specification & Backward Compatibility</h2>
        </div>
        <p className="section-text">
          To ensure 100% compliance with both RESTful standards and the sample repository (<code>somesh-chutel/25070521060-CA-03</code>), both sets of endpoints are fully supported:
        </p>

        <div className="api-table-wrapper">
          <table className="api-spec-table">
            <thead>
              <tr>
                <th style={{ width: '90px' }}>Method</th>
                <th>Standard Route</th>
                <th style={{ width: '130px' }}>Sample Repo Alias</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {apiEndpoints.map((item, idx) => (
                <tr key={idx}>
                  <td>
                    <span className={`method-pill method-${item.method.toLowerCase()}`}>
                      {item.method}
                    </span>
                  </td>
                  <td><code>{item.endpoint}</code></td>
                  <td>{item.alias !== '—' ? <code>{item.alias}</code> : <span className="text-gray-500">—</span>}</td>
                  <td>{item.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Key Modules */}
      <section className="about-section-panel mt-4">
        <h2>Implemented Modules (Continuous Assessment CA-03)</h2>
        <div className="modules-check-grid">
          <div className="module-check-item">
            <CheckCircle2 size={18} className="text-emerald" />
            <span><strong>Authentication Module:</strong> Bcrypt password hashing & JWT token verification</span>
          </div>
          <div className="module-check-item">
            <CheckCircle2 size={18} className="text-emerald" />
            <span><strong>Student Profile Module:</strong> Verified digital ID badge with PRN & department</span>
          </div>
          <div className="module-check-item">
            <CheckCircle2 size={18} className="text-emerald" />
            <span><strong>Assignment Manager:</strong> Full CRUD operations, priority tags, and overdue alerts</span>
          </div>
          <div className="module-check-item">
            <CheckCircle2 size={18} className="text-emerald" />
            <span><strong>Attendance Forecaster:</strong> 75% eligibility simulation and safe lecture bunk calculator</span>
          </div>
          <div className="module-check-item">
            <CheckCircle2 size={18} className="text-emerald" />
            <span><strong>Timetable Planner:</strong> Daily lecture schedule with professors, rooms & lab timings</span>
          </div>
          <div className="module-check-item">
            <CheckCircle2 size={18} className="text-emerald" />
            <span><strong>GPA / CGPA Engine:</strong> UGC 10-point scale grade prediction with credits calculation</span>
          </div>
          <div className="module-check-item">
            <CheckCircle2 size={18} className="text-emerald" />
            <span><strong>Faculty Directory:</strong> Cabin office hours, prof profiles & consultation booking</span>
          </div>
          <div className="module-check-item">
            <CheckCircle2 size={18} className="text-emerald" />
            <span><strong>Curriculum & Questions:</strong> Unit-wise syllabus breakdown and previous assessment papers</span>
          </div>
          <div className="module-check-item">
            <CheckCircle2 size={18} className="text-emerald" />
            <span><strong>Exam & Assessment Timetable:</strong> Real-time countdown clocks and exam guidelines</span>
          </div>
          <div className="module-check-item">
            <CheckCircle2 size={18} className="text-emerald" />
            <span><strong>Study Notes Hub:</strong> Course cheat sheets, lab formulas, and 1-click clipboard copy</span>
          </div>
          <div className="module-check-item">
            <CheckCircle2 size={18} className="text-emerald" />
            <span><strong>Analytics Engine:</strong> Workload breakdown, weekly velocity, and deadline metrics</span>
          </div>
          <div className="module-check-item">
            <CheckCircle2 size={18} className="text-emerald" />
            <span><strong>Production Deployment:</strong> Containerized Docker & unified Render Web Service</span>
          </div>
        </div>
      </section>
    </div>
  );
}
