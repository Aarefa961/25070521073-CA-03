import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Github, Heart, Shield, Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Col 1: Brand & Project Info */}
          <div className="footer-col brand-col">
            <div className="footer-logo">
              <GraduationCap className="footer-logo-icon" size={24} />
              <span className="footer-logo-text">FLEXI</span>
              <span className="footer-pill-tag">CA-03</span>
            </div>
            <p className="footer-desc">
              A comprehensive student academic organizer and productivity platform built for college coursework, assignment tracking, timetable scheduling, and grade analytics.
            </p>
            <div className="footer-academic-meta">
              <span className="meta-badge">Symbiosis Institute of Technology</span>
              <span className="meta-badge">Section B (sitSecB)</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="footer-col">
            <h4 className="footer-heading">Academic Modules</h4>
            <ul className="footer-links">
              <li><Link to="/dashboard">Student Dashboard</Link></li>
              <li><Link to="/tasks">Assignment Manager</Link></li>
              <li><Link to="/timetable">Weekly Timetable</Link></li>
              <li><Link to="/gpa-calculator">SGPA & CGPA Calculator</Link></li>
              <li><Link to="/notes">Study Notes Hub</Link></li>
              <li><Link to="/analytics">Performance Analytics</Link></li>
            </ul>
          </div>

          {/* Col 3: Student & Project Specs */}
          <div className="footer-col">
            <h4 className="footer-heading">Project Submission</h4>
            <ul className="footer-info-list">
              <li><strong>Student Name:</strong> Aarefa</li>
              <li><strong>PRN / Roll No:</strong> 25070521073</li>
              <li><strong>Course:</strong> Web Technologies / Full-Stack</li>
              <li><strong>Evaluation:</strong> Continuous Assessment 03</li>
              <li><strong>Faculty Guide:</strong> Prof. Somesh Chutel</li>
            </ul>
          </div>

          {/* Col 4: Tech Stack Badges */}
          <div className="footer-col">
            <h4 className="footer-heading">Architecture & Tech</h4>
            <div className="tech-tags-cloud">
              <span className="tech-tag">React 18</span>
              <span className="tech-tag">Vite</span>
              <span className="tech-tag">Node.js</span>
              <span className="tech-tag">Express.js</span>
              <span className="tech-tag">MongoDB Atlas</span>
              <span className="tech-tag">JWT Auth</span>
              <span className="tech-tag">Bcrypt</span>
              <span className="tech-tag">RESTful API</span>
            </div>
            <a
              href="https://github.com/Aarefa961/flexi-project"
              target="_blank"
              rel="noreferrer"
              className="github-footer-btn"
            >
              <Github size={16} />
              <span>View on GitHub</span>
            </a>
          </div>
        </div>

        <div className="footer-bottom-bar">
          <p>© {new Date().getFullYear()} FLEXI Academic Suite. Built with <Heart size={14} className="heart-icon" /> for academic excellence.</p>
          <div className="footer-bottom-links">
            <Link to="/about">Project Architecture</Link>
            <Link to="/contact">Support & FAQs</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
