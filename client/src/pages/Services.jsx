import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  CheckSquare,
  Calendar,
  Calculator,
  BookOpen,
  BarChart3,
  User,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  CalendarCheck,
  Users,
  FileText,
  Clock,
  Zap,
} from 'lucide-react';

export default function Services() {
  const { isAuthenticated } = useAuth();

  const servicesList = [
    {
      id: 'tasks',
      title: 'Assignment & Deadline Management',
      icon: <CheckSquare size={26} className="text-indigo" />,
      desc: 'Centralized tracking of coursework assignments, project milestones, quizzes, and practical lab submissions with priority flags and overdue alarms.',
      link: isAuthenticated ? '/tasks' : '/login',
      tag: 'Core Academic Module',
    },
    {
      id: 'attendance',
      title: 'Course Attendance & 75% Bunk Forecaster',
      icon: <CalendarCheck size={26} className="text-emerald" />,
      desc: 'Real-time subject-by-subject attendance tracker with live eligibility simulation to ensure adherence to Symbiosis 75% threshold.',
      link: isAuthenticated ? '/attendance' : '/login',
      tag: 'University Compliance',
    },
    {
      id: 'timetable',
      title: 'Weekly Lecture & Lab Timetable',
      icon: <Calendar size={26} className="text-cyan" />,
      desc: 'Interactive schedule for Section B students across all weekdays (Mon-Sat), specifying course codes, classroom locations, and professor allocations.',
      link: isAuthenticated ? '/timetable' : '/login',
      tag: 'Schedule Planner',
    },
    {
      id: 'gpa',
      title: 'SGPA & CGPA Grade Predictor',
      icon: <Calculator size={26} className="text-amber" />,
      desc: 'Credit-weighted academic GPA calculator conforming to the university 10-point scale with instant First Class with Distinction forecast.',
      link: isAuthenticated ? '/gpa-calculator' : '/login',
      tag: 'Academic Grading',
    },
    {
      id: 'faculty',
      title: 'Department Faculty & Consultation Hours',
      icon: <Users size={26} className="text-purple" />,
      desc: 'Connect with course professors (including Prof. Somesh Chutel), review cabin consultation slots, and book academic reviews.',
      link: isAuthenticated ? '/faculty' : '/login',
      tag: 'Faculty Mentorship',
    },
    {
      id: 'syllabus',
      title: 'Curriculum Outlines & Question Bank',
      icon: <FileText size={26} className="text-rose" />,
      desc: 'Module-by-module course syllabus for Semester 5 with previous year Continuous Assessment question papers (CA-01, CA-02, CA-03).',
      link: isAuthenticated ? '/syllabus' : '/login',
      tag: 'Study Materials',
    },
    {
      id: 'exam-schedule',
      title: 'Assessment & Exam Timetable',
      icon: <Clock size={26} className="text-indigo" />,
      desc: 'Official schedule for CA-01, CA-02, CA-03 evaluations and practical vivas featuring live countdown clocks and hall ticket checks.',
      link: isAuthenticated ? '/exam-schedule' : '/login',
      tag: 'Exams & Viva',
    },
    {
      id: 'notes',
      title: 'Course Study Notes & Formula Sheets',
      icon: <BookOpen size={26} className="text-emerald" />,
      desc: 'Repository for lecture summaries, lab algorithm cheatsheets, and dynamic programming formulas with 1-click clipboard copying.',
      link: isAuthenticated ? '/notes' : '/login',
      tag: 'Quick Reference',
    },
    {
      id: 'analytics',
      title: 'Workload & Productivity Analytics',
      icon: <BarChart3 size={26} className="text-amber" />,
      desc: 'Visual insight charts covering submission on-time ratios, weekly study velocity, and subject distribution across the semester.',
      link: isAuthenticated ? '/analytics' : '/login',
      tag: 'Performance Insights',
    },
    {
      id: 'id-card',
      title: 'Verified Digital Student Identity',
      icon: <User size={26} className="text-cyan" />,
      desc: 'Digital student credential card verifying enrollment at Symbiosis Institute of Technology with Roll No / PRN and degree branch details.',
      link: isAuthenticated ? '/profile' : '/login',
      tag: 'Student Identity',
    },
  ];

  return (
    <div className="services-page-container">
      {/* Header */}
      <section className="about-header-card text-center">
        <div className="about-badge-wrap">
          <Sparkles size={16} />
          <span>Academic Services Suite • Section B (sitSecB)</span>
        </div>
        <h1 className="about-main-title">Academic Services & Productivity Suite</h1>
        <p className="about-subtext">
          10 integrated university-level modules engineered to help Symbiosis students excel in Continuous Assessment and semester evaluations.
        </p>
      </section>

      {/* Services Grid */}
      <div className="features-grid mt-4">
        {servicesList.map((srv) => (
          <div key={srv.id} className="feature-card">
            <div className="feature-icon-wrapper">
              {srv.icon}
            </div>
            <span className="badge-pill-subtle mb-2" style={{ width: 'fit-content' }}>
              {srv.tag}
            </span>
            <h3 className="feature-card-title">{srv.title}</h3>
            <p className="feature-card-body">{srv.desc}</p>
            <Link to={srv.link} className="feature-card-link">
              <span>Launch Service</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        ))}
      </div>

      {/* Security & Authentication Guarantee */}
      <section className="tech-spotlight-section mt-5">
        <div className="spotlight-box">
          <div className="spotlight-header">
            <ShieldCheck size={32} className="text-emerald" />
            <div>
              <h3>Protected by Bcrypt & JWT Security Architecture</h3>
              <p>All academic modules enforce student identity verification with JSON Web Tokens and encrypted credentials.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
