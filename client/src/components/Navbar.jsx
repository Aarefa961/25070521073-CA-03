import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  GraduationCap,
  LayoutDashboard,
  CheckSquare,
  Calendar,
  Calculator,
  BookOpen,
  BarChart3,
  User,
  LogOut,
  LogIn,
  UserPlus,
  Menu,
  X,
  Zap,
} from 'lucide-react';

export default function Navbar() {
  const { user, isAuthenticated, logout, loginDemo } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleDemoClick = async () => {
    await loginDemo();
    navigate('/dashboard');
  };

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header className="site-header">
      <div className="header-inner">
        {/* Logo */}
        <Link to="/" className="brand-logo" onClick={closeMenu}>
          <div className="logo-icon-box">
            <GraduationCap className="logo-icon" size={24} />
          </div>
          <div className="logo-text-group">
            <span className="brand-title">FLEXI</span>
            <span className="brand-subtitle">Academic Suite</span>
          </div>
          <span className="badge-ca">CA-03</span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="desktop-nav">
          <NavLink to="/" end className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            Home
          </NavLink>
          {isAuthenticated && (
            <>
              <NavLink to="/dashboard" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                <LayoutDashboard size={16} />
                <span>Dashboard</span>
              </NavLink>
              <NavLink to="/tasks" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                <CheckSquare size={16} />
                <span>Tasks</span>
              </NavLink>
              <NavLink to="/timetable" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                <Calendar size={16} />
                <span>Timetable</span>
              </NavLink>
              <NavLink to="/gpa-calculator" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                <Calculator size={16} />
                <span>GPA Calc</span>
              </NavLink>
              <NavLink to="/notes" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                <BookOpen size={16} />
                <span>Notes</span>
              </NavLink>
              <NavLink to="/analytics" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                <BarChart3 size={16} />
                <span>Analytics</span>
              </NavLink>
            </>
          )}
          <NavLink to="/about" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            About
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
            Contact
          </NavLink>
        </nav>

        {/* Right Auth Section */}
        <div className="header-auth-actions">
          {isAuthenticated ? (
            <div className="user-dropdown-area">
              <Link to="/profile" className="user-pill-btn" title="View Profile">
                <span className="user-avatar">{user?.avatar || '🎓'}</span>
                <div className="user-pill-info">
                  <span className="user-name-short">{user?.name?.split(' ')[0] || 'Student'}</span>
                  <span className="user-prn-pill">{user?.prn ? `PRN: ${user.prn}` : 'Student'}</span>
                </div>
              </Link>
              <button onClick={handleLogout} className="btn-logout" title="Log Out">
                <LogOut size={16} />
                <span className="logout-text">Logout</span>
              </button>
            </div>
          ) : (
            <div className="guest-actions">
              <button onClick={handleDemoClick} className="btn-demo-quick" title="One-Click Evaluation Login">
                <Zap size={14} />
                <span>1-Click Demo</span>
              </button>
              <Link to="/login" className="btn-login-link">
                <LogIn size={15} />
                <span>Login</span>
              </Link>
              <Link to="/signup" className="btn-signup-primary">
                <UserPlus size={15} />
                <span>Sign Up</span>
              </Link>
            </div>
          )}

          {/* Mobile hamburger */}
          <button
            className="mobile-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer">
          <NavLink to="/" end className="mobile-nav-item" onClick={closeMenu}>
            Home
          </NavLink>
          {isAuthenticated ? (
            <>
              <NavLink to="/dashboard" className="mobile-nav-item" onClick={closeMenu}>
                <LayoutDashboard size={18} /> Dashboard
              </NavLink>
              <NavLink to="/tasks" className="mobile-nav-item" onClick={closeMenu}>
                <CheckSquare size={18} /> Tasks & Assignments
              </NavLink>
              <NavLink to="/timetable" className="mobile-nav-item" onClick={closeMenu}>
                <Calendar size={18} /> Weekly Timetable
              </NavLink>
              <NavLink to="/gpa-calculator" className="mobile-nav-item" onClick={closeMenu}>
                <Calculator size={18} /> GPA / CGPA Calculator
              </NavLink>
              <NavLink to="/notes" className="mobile-nav-item" onClick={closeMenu}>
                <BookOpen size={18} /> Study Notes
              </NavLink>
              <NavLink to="/analytics" className="mobile-nav-item" onClick={closeMenu}>
                <BarChart3 size={18} /> Analytics & Performance
              </NavLink>
              <NavLink to="/profile" className="mobile-nav-item" onClick={closeMenu}>
                <User size={18} /> My Student Profile
              </NavLink>
              <button
                onClick={() => {
                  handleLogout();
                  closeMenu();
                }}
                className="mobile-nav-item logout-btn-mobile"
              >
                <LogOut size={18} /> Log Out ({user?.name})
              </button>
            </>
          ) : (
            <div className="mobile-auth-buttons">
              <button
                onClick={() => {
                  handleDemoClick();
                  closeMenu();
                }}
                className="btn-demo-quick w-full"
              >
                <Zap size={16} /> 1-Click Demo Evaluation
              </button>
              <Link to="/login" className="btn-login-link w-full text-center" onClick={closeMenu}>
                Login
              </Link>
              <Link to="/signup" className="btn-signup-primary w-full text-center" onClick={closeMenu}>
                Create Student Account
              </Link>
            </div>
          )}
          <NavLink to="/about" className="mobile-nav-item" onClick={closeMenu}>
            About Project
          </NavLink>
          <NavLink to="/contact" className="mobile-nav-item" onClick={closeMenu}>
            Contact & Support
          </NavLink>
        </div>
      )}
    </header>
  );
}
