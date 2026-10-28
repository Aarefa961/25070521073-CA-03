import React from 'react';
import { BarChart3, TrendingUp, Award, CheckCircle2, Clock, Calendar, PieChart, ShieldCheck } from 'lucide-react';

export default function Analytics() {
  const subjectDistribution = [
    { subject: 'Web Technologies', tasks: 5, percentage: 35, color: '#6366f1' },
    { subject: 'Design & Analysis of Algorithms', tasks: 4, percentage: 28, color: '#10b981' },
    { subject: 'Database Management Systems', tasks: 3, percentage: 21, color: '#f59e0b' },
    { subject: 'Computer Networks', tasks: 2, percentage: 16, color: '#ec4899' },
  ];

  const categoryBreakdown = [
    { category: 'Assignments', count: 6, percent: 40 },
    { category: 'Practical Labs', count: 4, percent: 27 },
    { category: 'Project Milestones', count: 3, percent: 20 },
    { category: 'Quizzes / Tests', count: 2, percent: 13 },
  ];

  const weeklyStreak = [
    { day: 'Mon', active: true, hours: 4.5 },
    { day: 'Tue', active: true, hours: 5.0 },
    { day: 'Wed', active: true, hours: 3.5 },
    { day: 'Thu', active: true, hours: 6.0 },
    { day: 'Fri', active: true, hours: 4.0 },
    { day: 'Sat', active: true, hours: 3.0 },
    { day: 'Sun', active: false, hours: 1.0 },
  ];

  return (
    <div className="analytics-page-container">
      {/* Header */}
      <div className="tasks-header-bar">
        <div>
          <h1 className="tasks-main-title">Academic Analytics & Performance</h1>
          <p className="tasks-subtext">Insights into your coursework workload, deadlines, and study consistency</p>
        </div>
      </div>

      {/* Top 4 KPI Metrics */}
      <div className="metric-cards-grid">
        <div className="metric-card">
          <div className="metric-header">
            <span className="metric-title">On-Time Submissions</span>
            <span className="metric-icon-wrap icon-emerald"><CheckCircle2 size={20} /></span>
          </div>
          <div className="metric-value">94.2%</div>
          <div className="metric-sub">Based on previous 18 assignments</div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <span className="metric-title">Study Consistency</span>
            <span className="metric-icon-wrap icon-indigo"><TrendingUp size={20} /></span>
          </div>
          <div className="metric-value">88 / 100</div>
          <div className="metric-sub">Top 5% in Section B</div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <span className="metric-title">Weekly Study Hours</span>
            <span className="metric-icon-wrap icon-amber"><Clock size={20} /></span>
          </div>
          <div className="metric-value">27.0 hrs</div>
          <div className="metric-sub">+3.5 hrs from last week</div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <span className="metric-title">Current Semester SGPA</span>
            <span className="metric-icon-wrap icon-cyan"><Award size={20} /></span>
          </div>
          <div className="metric-value">8.92</div>
          <div className="metric-sub">Distinction classification</div>
        </div>
      </div>

      {/* Analytics Charts Grid */}
      <div className="dashboard-content-split mt-4">
        {/* Left: Subject Workload Distribution */}
        <div className="dashboard-panel">
          <div className="panel-header">
            <div>
              <h3 className="panel-title">Subject Workload Breakdown</h3>
              <p className="panel-subtitle">Proportion of tasks and assignments per course</p>
            </div>
          </div>

          <div className="distribution-bars-list">
            {subjectDistribution.map((item, idx) => (
              <div key={idx} className="distribution-bar-item">
                <div className="dist-label-row">
                  <span className="dist-subject-name">{item.subject}</span>
                  <span className="dist-percentage-val">{item.tasks} tasks ({item.percentage}%)</span>
                </div>
                <div className="dist-bar-track">
                  <div
                    className="dist-bar-fill"
                    style={{ width: `${item.percentage}%`, backgroundColor: item.color }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Weekly Study Streak Tracker */}
        <div className="dashboard-panel">
          <div className="panel-header">
            <div>
              <h3 className="panel-title">Weekly Academic Velocity</h3>
              <p className="panel-subtitle">Hours dedicated to coursework and lab prep</p>
            </div>
          </div>

          <div className="weekly-streak-chart">
            {weeklyStreak.map((item, idx) => (
              <div key={idx} className="streak-bar-col">
                <div className="streak-bar-track">
                  <div
                    className="streak-bar-fill"
                    style={{ height: `${(item.hours / 6.0) * 100}%` }}
                  ></div>
                </div>
                <span className="streak-day-label">{item.day}</span>
                <span className="streak-hours-label">{item.hours}h</span>
              </div>
            ))}
          </div>

          <div className="streak-footer-badge">
            <ShieldCheck size={18} className="text-emerald" />
            <span>Active Study Streak: <strong>6 Days in a Row</strong> 🔥</span>
          </div>
        </div>
      </div>

      {/* Task Categories Grid */}
      <div className="dashboard-panel mt-4">
        <h3 className="panel-title mb-3">Task Category Distribution</h3>
        <div className="category-cards-row">
          {categoryBreakdown.map((cat, idx) => (
            <div key={idx} className="category-metric-box">
              <span className="cat-name">{cat.category}</span>
              <span className="cat-count">{cat.count} Tasks</span>
              <span className="cat-percent">{cat.percent}% of semester load</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

