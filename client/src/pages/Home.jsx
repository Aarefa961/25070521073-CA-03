import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  GraduationCap,
  CheckCircle2,
  Calendar,
  Calculator,
  BookOpen,
  BarChart3,
  Shield,
  Zap,
  ArrowRight,
  Sparkles,
  Clock,
  Layers,
  Award,
} from 'lucide-react';

export default function Home() {
  const { isAuthenticated, loginDemo } = useAuth();
  const navigate = useNavigate();

  const handleDemo = async () => {
    await loginDemo();
    navigate('/dashboard');
  };

  return (
    <div className="home-page-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-badge-pill">
          <Sparkles size={16} className="sparkle-icon" />
          <span>Continuous Assessment CA-03 • Full-Stack Web Technologies</span>
        </div>

        <h1 className="hero-main-title">
          Master Your Semester with <span className="gradient-text">FLEXI</span>
        </h1>

        <p className="hero-lead-text">
          A high-performance academic management suite built with React, Node.js, Express, MongoDB Atlas, and JWT authentication. Plan assignments, calculate GPA, track weekly timetables, and conquer your exams with ease.
        </p>

        {/* CTA Button Group */}
        <div className="hero-cta-group">
          {isAuthenticated ? (
            <Link to="/dashboard" className="btn-primary-large">
              <span>Go to Your Dashboard</span>
              <ArrowRight size={18} />
            </Link>
          ) : (
            <>
              <button onClick={handleDemo} className="btn-demo-large" title="Instant test login for evaluator">
                <Zap size={18} />
                <span>⚡ 1-Click Professor / Demo Login</span>
              </button>
              <Link to="/signup" className="btn-primary-large">
                <span>Create Student Account</span>
                <ArrowRight size={18} />
              </Link>
              <Link to="/login" className="btn-secondary-large">
                <span>Student Login</span>
              </Link>
            </>
          )}
        </div>

        {/* Evaluation Banner for Professor */}
        <div className="prof-callout-banner">
          <div className="callout-icon-wrap">
            <Award size={22} />
          </div>
          <div className="callout-content">
            <h4>Evaluation Ready for Prof. Somesh Chutel</h4>
            <p>
              Includes complete <strong>JWT & Bcrypt Authentication</strong>, multiple academic pages, student profile with PRN, 
              full MongoDB persistence, and backward compatibility with the sample repo endpoints.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Quick Ribbon */}
      <section className="stats-ribbon">
        <div className="stat-ribbon-card">
          <div className="stat-number">100%</div>
          <div className="stat-label">Assignment Tracking</div>
        </div>
        <div className="stat-ribbon-card">
          <div className="stat-number">JWT + Bcrypt</div>
          <div className="stat-label">Security & Protection</div>
        </div>
        <div className="stat-ribbon-card">
          <div className="stat-number">10-Point</div>
          <div className="stat-label">SGPA/CGPA Algorithm</div>
        </div>
        <div className="stat-ribbon-card">
          <div className="stat-number">MongoDB Atlas</div>
          <div className="stat-label">Cloud Persistence</div>
        </div>
      </section>

      {/* Feature Modules Showcase */}
      <section className="features-showcase-section">
        <div className="section-header-centered">
          <span className="section-eyebrow">Academic Modules</span>
          <h2 className="section-title">Everything a College Student Needs in One Hub</h2>
          <p className="section-subtext">
            Designed to replace messy paper planners, multiple spreadsheets, and last-minute deadline panics.
          </p>
        </div>

        <div className="features-grid">
          {/* Card 1: Task Manager */}
          <div className="feature-card highlight-card">
            <div className="feature-icon-wrapper icon-indigo">
              <CheckCircle2 size={24} />
            </div>
            <h3 className="feature-card-title">Assignment & Task Tracker</h3>
            <p className="feature-card-body">
              Organize college assignments, project milestones, quizzes, and lab submissions. Filter by priority, subject, and status with automatic overdue indicators.
            </p>
            <Link to={isAuthenticated ? "/tasks" : "/login"} className="feature-card-link">
              <span>Explore Task Manager</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* Card 2: Timetable */}
          <div className="feature-card">
            <div className="feature-icon-wrapper icon-emerald">
              <Calendar size={24} />
            </div>
            <h3 className="feature-card-title">Interactive Class Timetable</h3>
            <p className="feature-card-body">
              Weekly schedule planner displaying periods, room numbers, course codes, and faculty details. Never miss a lecture or practical lab session.
            </p>
            <Link to={isAuthenticated ? "/timetable" : "/login"} className="feature-card-link">
              <span>View Timetable</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* Card 3: GPA Calculator */}
          <div className="feature-card">
            <div className="feature-icon-wrapper icon-amber">
              <Calculator size={24} />
            </div>
            <h3 className="feature-card-title">SGPA & CGPA Grade Predictor</h3>
            <p className="feature-card-body">
              Calculate current semester SGPA with credit weighting across subjects. Predict cumulative CGPA and view grading criteria breakdowns instantly.
            </p>
            <Link to={isAuthenticated ? "/gpa-calculator" : "/login"} className="feature-card-link">
              <span>Calculate GPA</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* Card 4: Study Notes */}
          <div className="feature-card">
            <div className="feature-icon-wrapper icon-purple">
              <BookOpen size={24} />
            </div>
            <h3 className="feature-card-title">Study Notes & Formula Sheets</h3>
            <p className="feature-card-body">
              Store quick revision summaries, lab algorithms, and exam formula sheets organized by subject tags with 1-click copy-to-clipboard functionality.
            </p>
            <Link to={isAuthenticated ? "/notes" : "/login"} className="feature-card-link">
              <span>Access Notes</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* Card 5: Analytics */}
          <div className="feature-card">
            <div className="feature-icon-wrapper icon-rose">
              <BarChart3 size={24} />
            </div>
            <h3 className="feature-card-title">Workload Analytics</h3>
            <p className="feature-card-body">
              Visual performance metrics displaying submission on-time ratios, subject workload distribution, and weekly academic consistency trends.
            </p>
            <Link to={isAuthenticated ? "/analytics" : "/login"} className="feature-card-link">
              <span>View Analytics</span>
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* Card 6: Profile & Security */}
          <div className="feature-card">
            <div className="feature-icon-wrapper icon-cyan">
              <Shield size={24} />
            </div>
            <h3 className="feature-card-title">Secure Student Profile & ID</h3>
            <p className="feature-card-body">
              Equipped with a digital college ID badge displaying your Roll No / PRN, department, semester, and protected by industry-standard JWT authentication.
            </p>
            <Link to={isAuthenticated ? "/profile" : "/login"} className="feature-card-link">
              <span>Open Student ID</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Architecture & Tech Ribbon */}
      <section className="tech-spotlight-section">
        <div className="spotlight-box">
          <div className="spotlight-header">
            <Layers className="spotlight-icon" size={28} />
            <div>
              <h3>Built with Modern Full-Stack Architecture</h3>
              <p>Clean separation of concerns with REST API and Single Page React App</p>
            </div>
          </div>
          <div className="tech-pills-row">
            <div className="tech-badge"><span>⚡</span> Vite 6 & React 18</div>
            <div className="tech-badge"><span>🌐</span> Node.js & Express 4</div>
            <div className="tech-badge"><span>🍃</span> MongoDB Atlas Mongoose</div>
            <div className="tech-badge"><span>🔐</span> Bcrypt & JWT Auth</div>
            <div className="tech-badge"><span>🎨</span> Responsive Modern UI</div>
            <div className="tech-badge"><span>🚀</span> Multi-Cloud Deployment Ready</div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="bottom-cta-banner">
        <h2>Start Organizing Your Academic Work Today</h2>
        <p>No more missed assignment deadlines or lost study materials.</p>
        <div className="bottom-cta-buttons">
          <button onClick={handleDemo} className="btn-demo-large">
            <Zap size={18} />
            <span>Try Instant Demo (Evaluation)</span>
          </button>
          <Link to="/signup" className="btn-primary-large">
            <span>Create Account Now</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
