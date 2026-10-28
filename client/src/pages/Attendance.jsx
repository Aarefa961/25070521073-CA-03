import React, { useState } from 'react';
import {
  CalendarCheck,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Plus,
  Minus,
  Sparkles,
  HelpCircle,
  Info,
  Award,
} from 'lucide-react';

const initialCourses = [
  {
    id: 1,
    code: 'CS301',
    name: 'Web Technologies (WT)',
    faculty: 'Prof. Somesh Chutel',
    attended: 28,
    total: 32,
    credits: 4,
  },
  {
    id: 2,
    code: 'CS302',
    name: 'Design & Analysis of Algorithms',
    faculty: 'Dr. Sharma',
    attended: 25,
    total: 30,
    credits: 4,
  },
  {
    id: 3,
    code: 'CS303',
    name: 'Database Management Systems',
    faculty: 'Prof. Kulkarni',
    attended: 23,
    total: 28,
    credits: 3,
  },
  {
    id: 4,
    code: 'CS304',
    name: 'Computer Networks',
    faculty: 'Dr. Verma',
    attended: 26,
    total: 30,
    credits: 3,
  },
  {
    id: 5,
    code: 'CS305',
    name: 'Software Engineering',
    faculty: 'Prof. Patil',
    attended: 21,
    total: 28,
    credits: 3,
  },
  {
    id: 6,
    code: 'CS301L',
    name: 'Web Technologies Full-Stack Lab',
    faculty: 'Prof. Somesh Chutel',
    attended: 14,
    total: 14,
    credits: 2,
  },
];

export default function Attendance() {
  const [courses, setCourses] = useState(initialCourses);
  const [targetPercent, setTargetPercent] = useState(75);

  const markPresent = (id) => {
    setCourses((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, attended: c.attended + 1, total: c.total + 1 } : c
      )
    );
  };

  const markAbsent = (id) => {
    setCourses((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, total: c.total + 1 } : c
      )
    );
  };

  const resetSubject = (id) => {
    const original = initialCourses.find((c) => c.id === id);
    if (!original) return;
    setCourses((prev) =>
      prev.map((c) => (c.id === id ? { ...original } : c))
    );
  };

  // Calculations
  const totalAttended = courses.reduce((acc, c) => acc + c.attended, 0);
  const totalConducted = courses.reduce((acc, c) => acc + c.total, 0);
  const aggregatePercent =
    totalConducted > 0 ? ((totalAttended / totalConducted) * 100).toFixed(1) : 0;

  const eligibleCount = courses.filter(
    (c) => (c.attended / c.total) * 100 >= targetPercent
  ).length;

  return (
    <div className="attendance-page-container">
      {/* Header Bar */}
      <div className="tasks-header-bar">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="badge-pill-subtle">Symbiosis Academic Policy Compliance</span>
          </div>
          <h1 className="tasks-main-title">Course Attendance Tracker & Forecaster</h1>
          <p className="tasks-subtext">
            Monitor course-by-course attendance, simulate future bunks, and ensure 75% exam eligibility
          </p>
        </div>

        <div className="attendance-target-selector">
          <span className="text-sm text-muted">Attendance Threshold:</span>
          <div className="target-toggle-group">
            {[75, 80, 85].map((thresh) => (
              <button
                key={thresh}
                onClick={() => setTargetPercent(thresh)}
                className={`target-btn ${targetPercent === thresh ? 'active' : ''}`}
              >
                {thresh}%
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Aggregate KPI Ribbon */}
      <div className="metric-cards-grid mt-4">
        <div className="metric-card">
          <div className="metric-header">
            <span className="metric-title">Aggregate Attendance</span>
            <span className="metric-icon-wrap icon-indigo">
              <CalendarCheck size={20} />
            </span>
          </div>
          <div className="metric-value">{aggregatePercent}%</div>
          <div className="metric-sub">
            {totalAttended} of {totalConducted} total lectures attended
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <span className="metric-title">Eligibility Status</span>
            <span className="metric-icon-wrap icon-emerald">
              <CheckCircle2 size={20} />
            </span>
          </div>
          <div className="metric-value">
            {eligibleCount} / {courses.length}
          </div>
          <div className="metric-sub">Courses meeting {targetPercent}% threshold</div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <span className="metric-title">Exam Hall Ticket</span>
            <span className="metric-icon-wrap icon-cyan">
              <Award size={20} />
            </span>
          </div>
          <div className="metric-value text-emerald">
            {aggregatePercent >= targetPercent ? 'Eligible ✓' : 'Shortage ⚠'}
          </div>
          <div className="metric-sub">SIT Pune Continuous Assessment CA-03</div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <span className="metric-title">Total Course Credits</span>
            <span className="metric-icon-wrap icon-amber">
              <Sparkles size={20} />
            </span>
          </div>
          <div className="metric-value">19 Credits</div>
          <div className="metric-sub">Semester 5 Coursework</div>
        </div>
      </div>

      {/* Course Cards Grid */}
      <div className="attendance-grid mt-5">
        {courses.map((course) => {
          const pct = ((course.attended / course.total) * 100).toFixed(1);
          const numPct = parseFloat(pct);
          const isSafe = numPct >= targetPercent;
          const isBorderline = numPct >= 65 && numPct < targetPercent;

          // Safe bunks or needed classes calculation
          let forecastMessage = '';
          if (isSafe) {
            // How many can bunk: floor((attended - threshold * total) / threshold)
            const canBunk = Math.floor(
              (course.attended - (targetPercent / 100) * course.total) /
                (targetPercent / 100)
            );
            forecastMessage =
              canBunk > 0
                ? `You can safely bunk next ${canBunk} lecture${canBunk > 1 ? 's' : ''} while maintaining ${targetPercent}%.`
                : `You are on the threshold. Do not miss the upcoming class!`;
          } else {
            // How many must attend consecutively: ceil((threshold * total - attended) / (1 - threshold))
            const mustAttend = Math.ceil(
              ((targetPercent / 100) * course.total - course.attended) /
                (1 - targetPercent / 100)
            );
            forecastMessage = `Shortage alert! Attend next ${mustAttend} consecutive lecture${mustAttend > 1 ? 's' : ''} to recover ${targetPercent}%.`;
          }

          return (
            <div
              key={course.id}
              className={`attendance-course-card ${isSafe ? 'card-safe' : isBorderline ? 'card-warning' : 'card-danger'}`}
            >
              <div className="att-card-header">
                <div>
                  <span className="att-course-code">{course.code}</span>
                  <h3 className="att-course-title">{course.name}</h3>
                  <span className="att-faculty-name">{course.faculty}</span>
                </div>
                <div
                  className={`att-percent-badge ${isSafe ? 'pct-safe' : isBorderline ? 'pct-warn' : 'pct-danger'}`}
                >
                  {pct}%
                </div>
              </div>

              {/* Progress Bar */}
              <div className="att-progress-track">
                <div
                  className={`att-progress-fill ${isSafe ? 'fill-safe' : isBorderline ? 'fill-warn' : 'fill-danger'}`}
                  style={{ width: `${Math.min(numPct, 100)}%` }}
                ></div>
                <div
                  className="att-threshold-marker"
                  style={{ left: `${targetPercent}%` }}
                  title={`${targetPercent}% threshold`}
                ></div>
              </div>

              {/* Counts & Status */}
              <div className="att-stats-row">
                <div className="att-stat">
                  <span className="att-stat-label">Attended</span>
                  <strong className="att-stat-val text-emerald">{course.attended}</strong>
                </div>
                <div className="att-stat">
                  <span className="att-stat-label">Conducted</span>
                  <strong className="att-stat-val">{course.total}</strong>
                </div>
                <div className="att-stat">
                  <span className="att-stat-label">Missed</span>
                  <strong className="att-stat-val text-rose">{course.total - course.attended}</strong>
                </div>
              </div>

              {/* Forecaster Text */}
              <div className="att-forecast-box">
                <Info size={15} className={isSafe ? 'text-indigo' : 'text-rose'} />
                <span>{forecastMessage}</span>
              </div>

              {/* Action Buttons */}
              <div className="att-action-buttons">
                <button
                  onClick={() => markPresent(course.id)}
                  className="btn-att-present"
                  title="Attended today's lecture"
                >
                  <Plus size={15} />
                  <span>Mark Present (+1)</span>
                </button>
                <button
                  onClick={() => markAbsent(course.id)}
                  className="btn-att-absent"
                  title="Missed today's lecture"
                >
                  <Minus size={15} />
                  <span>Absent</span>
                </button>
                <button
                  onClick={() => resetSubject(course.id)}
                  className="btn-att-reset"
                  title="Reset to default counts"
                >
                  Reset
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Academic Regulations Note */}
      <div className="dashboard-panel mt-5">
        <h3 className="panel-title mb-2">Symbiosis University Attendance Regulations</h3>
        <p className="panel-subtitle">
          As per Symbiosis Institute of Technology Academic Handbook: Every registered student must achieve a minimum of 75% aggregate attendance in lectures, tutorials, and 100% in laboratory practicals to remain eligible for Term End Semester Examinations and Continuous Assessment grading.
        </p>
      </div>
    </div>
  );
}
