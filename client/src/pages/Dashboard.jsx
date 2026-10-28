import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth, apiRequest } from '../context/AuthContext';
import {
  GraduationCap,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Calendar,
  Calculator,
  BookOpen,
  Plus,
  ArrowRight,
  TrendingUp,
  Sparkles,
  Award,
  Layers,
  ChevronRight,
  CalendarCheck,
  Users,
  FileText,
} from 'lucide-react';

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Sample seed tasks if DB is empty or fresh
  const sampleTasks = [
    { _id: 'sample-1', title: 'Submit CA-03 Full Stack Project Report', subject: 'Web Technologies', type: 'Project', dueDate: new Date(Date.now() + 86400000 * 2).toISOString(), priority: 'High', status: 'Pending' },
    { _id: 'sample-2', title: 'Algorithm Analysis Assignment 3', subject: 'Design & Analysis of Algorithms', type: 'Assignment', dueDate: new Date(Date.now() + 86400000 * 4).toISOString(), priority: 'Medium', status: 'Pending' },
    { _id: 'sample-3', title: 'Database Indexing Lab Exercise', subject: 'Database Management Systems', type: 'Lab', dueDate: new Date(Date.now() - 86400000).toISOString(), priority: 'High', status: 'Completed' },
    { _id: 'sample-4', title: 'Mid-term Quiz Preparation', subject: 'Computer Networks', type: 'Test', dueDate: new Date(Date.now() + 86400000 * 7).toISOString(), priority: 'Medium', status: 'Pending' },
  ];

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const data = await apiRequest('/tasks');
      if (Array.isArray(data) && data.length > 0) {
        setTasks(data);
      } else {
        setTasks(sampleTasks);
      }
    } catch (err) {
      console.warn('Could not fetch from server, using sample tasks', err.message);
      setTasks(sampleTasks);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const toggleTaskStatus = async (taskId) => {
    const task = tasks.find((t) => t._id === taskId);
    if (!task) return;
    const newStatus = task.status === 'Completed' ? 'Pending' : 'Completed';

    // Optimistic UI update
    setTasks((prev) =>
      prev.map((t) => (t._id === taskId ? { ...t, status: newStatus } : t))
    );

    try {
      await apiRequest(`/tasks/${taskId}`, {
        method: 'PATCH',
        body: JSON.stringify({ status: newStatus }),
      });
    } catch (err) {
      console.warn('Sync failed, kept local state', err);
    }
  };

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === 'Completed').length;
  const pendingTasks = tasks.filter((t) => t.status !== 'Completed').length;
  const urgentTasks = tasks.filter(
    (t) => t.status !== 'Completed' && t.priority === 'High'
  ).length;

  const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const todayClasses = [
    { time: '09:00 AM - 10:00 AM', course: 'Web Technologies (WT)', room: 'Lab 302', faculty: 'Prof. Somesh Chutel' },
    { time: '11:15 AM - 12:15 PM', course: 'Design & Analysis of Algorithms', room: 'Room 204', faculty: 'Dr. Sharma' },
    { time: '02:00 PM - 04:00 PM', course: 'Database Management Systems Lab', room: 'Computing Lab 4', faculty: 'Prof. Kulkarni' },
  ];

  return (
    <div className="dashboard-container">
      {/* Welcome Banner */}
      <section className="dashboard-welcome-banner">
        <div className="welcome-avatar-wrap">
          <span className="welcome-avatar-emoji">{user?.avatar || '🎓'}</span>
        </div>
        <div className="welcome-text-wrap">
          <div className="welcome-badge-line">
            <span className="badge-pill-accent">{user?.department || 'Computer Science & Engineering'}</span>
            <span className="badge-pill-subtle">{user?.semester || '5th Semester'}</span>
            {user?.prn && <span className="badge-pill-prn">PRN: {user.prn}</span>}
          </div>
          <h1 className="welcome-heading">Welcome back, {user?.name || 'Student'}! 👋</h1>
          <p className="welcome-subtext">
            Here is your academic progress summary for today. You have <strong>{pendingTasks} tasks pending</strong> and <strong>{urgentTasks} high-priority deadlines</strong> approaching.
          </p>
        </div>
        <div className="welcome-action-wrap">
          <Link to="/tasks" className="btn-primary-dashboard">
            <Plus size={16} />
            <span>Add New Task</span>
          </Link>
        </div>
      </section>

      {/* Metric Cards Row */}
      <section className="metric-cards-grid">
        <div className="metric-card">
          <div className="metric-header">
            <span className="metric-title">Total Tasks</span>
            <span className="metric-icon-wrap icon-indigo"><Layers size={20} /></span>
          </div>
          <div className="metric-value">{totalTasks}</div>
          <div className="metric-sub">{completedTasks} marked as finished</div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <span className="metric-title">Pending Tasks</span>
            <span className="metric-icon-wrap icon-amber"><Clock size={20} /></span>
          </div>
          <div className="metric-value">{pendingTasks}</div>
          <div className="metric-sub">Across all enrolled subjects</div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <span className="metric-title">High Priority</span>
            <span className="metric-icon-wrap icon-rose"><AlertTriangle size={20} /></span>
          </div>
          <div className="metric-value">{urgentTasks}</div>
          <div className="metric-sub">Requires immediate attention</div>
        </div>

        <div className="metric-card">
          <div className="metric-header">
            <span className="metric-title">Completion Rate</span>
            <span className="metric-icon-wrap icon-emerald"><CheckCircle2 size={20} /></span>
          </div>
          <div className="metric-value">{completionPercentage}%</div>
          <div className="metric-progress-bar">
            <div className="progress-fill" style={{ width: `${completionPercentage}%` }}></div>
          </div>
        </div>
      </section>

      {/* Two Columns Section: Tasks & Schedule */}
      <div className="dashboard-content-split">
        {/* Left Column: Upcoming Deadlines */}
        <div className="dashboard-panel">
          <div className="panel-header">
            <div>
              <h3 className="panel-title">Upcoming Deadlines</h3>
              <p className="panel-subtitle">Tasks sorted by approaching due dates</p>
            </div>
            <Link to="/tasks" className="panel-view-all">
              <span>View All</span>
              <ChevronRight size={16} />
            </Link>
          </div>

          <div className="tasks-compact-list">
            {tasks.slice(0, 5).map((task) => {
              const isDone = task.status === 'Completed';
              return (
                <div key={task._id} className={`compact-task-item ${isDone ? 'task-done' : ''}`}>
                  <button
                    onClick={() => toggleTaskStatus(task._id)}
                    className={`task-checkbox-btn ${isDone ? 'checked' : ''}`}
                    title={isDone ? 'Mark as Pending' : 'Mark as Completed'}
                  >
                    <CheckCircle2 size={18} />
                  </button>

                  <div className="compact-task-info">
                    <span className="compact-task-title">{task.title}</span>
                    <div className="compact-task-meta">
                      <span className="compact-subject-tag">{task.subject}</span>
                      <span className={`priority-pill priority-${task.priority.toLowerCase()}`}>
                        {task.priority}
                      </span>
                      <span className="compact-due-date">
                        Due: {new Date(task.dueDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="panel-footer-action">
            <Link to="/tasks" className="btn-outline-wide">
              <Plus size={16} />
              <span>Create Another Task</span>
            </Link>
          </div>
        </div>

        {/* Right Column: Schedule & Quick Tools */}
        <div className="dashboard-side-column">
          {/* Today's Schedule Card */}
          <div className="dashboard-panel">
            <div className="panel-header">
              <div>
                <h3 className="panel-title">Today's Class Schedule</h3>
                <p className="panel-subtitle">Lectures & practical labs</p>
              </div>
              <Link to="/timetable" className="panel-view-all">
                <span>Timetable</span>
                <ChevronRight size={16} />
              </Link>
            </div>

            <div className="schedule-preview-list">
              {todayClasses.map((item, idx) => (
                <div key={idx} className="schedule-preview-item">
                  <div className="schedule-time-badge">{item.time}</div>
                  <div className="schedule-details">
                    <strong className="schedule-course">{item.course}</strong>
                    <div className="schedule-sub">
                      <span>{item.room}</span> • <span>{item.faculty}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Academic Navigation shortcuts */}
          <div className="dashboard-panel mt-4">
            <h3 className="panel-title mb-3">Academic Tool Hub</h3>
            <div className="quick-tools-grid">
              <Link to="/attendance" className="quick-tool-card">
                <div className="tool-icon icon-emerald"><CalendarCheck size={20} /></div>
                <div>
                  <strong>Attendance</strong>
                  <p>75% bunk forecaster</p>
                </div>
              </Link>

              <Link to="/exam-schedule" className="quick-tool-card">
                <div className="tool-icon icon-indigo"><Clock size={20} /></div>
                <div>
                  <strong>Exam Schedule</strong>
                  <p>CA-03 evaluation dates</p>
                </div>
              </Link>

              <Link to="/gpa-calculator" className="quick-tool-card">
                <div className="tool-icon icon-amber"><Calculator size={20} /></div>
                <div>
                  <strong>GPA Calculator</strong>
                  <p>SGPA & CGPA predictor</p>
                </div>
              </Link>

              <Link to="/notes" className="quick-tool-card">
                <div className="tool-icon icon-purple"><BookOpen size={20} /></div>
                <div>
                  <strong>Study Notes</strong>
                  <p>Formula & code sheets</p>
                </div>
              </Link>

              <Link to="/faculty" className="quick-tool-card">
                <div className="tool-icon icon-rose"><Users size={20} /></div>
                <div>
                  <strong>Faculty Directory</strong>
                  <p>Prof. Somesh Chutel & staff</p>
                </div>
              </Link>

              <Link to="/syllabus" className="quick-tool-card">
                <div className="tool-icon icon-cyan"><FileText size={20} /></div>
                <div>
                  <strong>Course Syllabus</strong>
                  <p>Units & question banks</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

