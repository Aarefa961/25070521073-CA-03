import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  User,
  GraduationCap,
  Mail,
  Hash,
  Building2,
  BookMarked,
  Shield,
  Calendar,
  LogOut,
  Sparkles,
  Award,
  CheckCircle2,
} from 'lucide-react';

export default function Profile() {
  const { user, logout } = useAuth();
  const [selectedAvatar, setSelectedAvatar] = useState(user?.avatar || '🎓');

  const avatarOptions = ['🎓', '💻', '🔬', '📚', '🚀', '🧠', '⚡', '💡'];

  return (
    <div className="profile-page-container">
      {/* Header */}
      <div className="tasks-header-bar">
        <div>
          <h1 className="tasks-main-title">Student Profile & Credentials</h1>
          <p className="tasks-subtext">Verified academic identity & Continuous Assessment records</p>
        </div>
      </div>

      <div className="profile-layout-grid">
        {/* Left Column: Digital Student ID Card */}
        <div className="digital-id-card-wrap">
          <div className="digital-id-card">
            {/* ID Card Header */}
            <div className="id-card-header">
              <div className="id-card-univ-logo">
                <GraduationCap size={22} />
              </div>
              <div>
                <h4 className="univ-name">SYMBIOSIS INSTITUTE OF TECHNOLOGY</h4>
                <span className="univ-sub">Symbiosis International (Deemed University)</span>
              </div>
            </div>

            {/* ID Card Body */}
            <div className="id-card-body">
              <div className="id-card-photo-box">
                <span className="id-card-avatar">{selectedAvatar}</span>
                <span className="id-card-verified-badge" title="Verified Student">✓</span>
              </div>

              <div className="id-card-info-table">
                <h2 className="id-student-name">{user?.name || 'Aarefa'}</h2>
                <span className="id-student-role">{user?.status || 'Student'} • Section B</span>

                <div className="id-data-rows">
                  <div className="id-row">
                    <span className="id-label">PRN / Roll No:</span>
                    <strong className="id-value text-indigo">{user?.prn || '25070521073'}</strong>
                  </div>
                  <div className="id-row">
                    <span className="id-label">Department:</span>
                    <strong className="id-value">{user?.department || 'Computer Science & Eng.'}</strong>
                  </div>
                  <div className="id-row">
                    <span className="id-label">Semester:</span>
                    <strong className="id-value">{user?.semester || '5th Semester'}</strong>
                  </div>
                  <div className="id-row">
                    <span className="id-label">Email:</span>
                    <strong className="id-value">{user?.email || 'student@sit.edu'}</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* ID Card Footer */}
            <div className="id-card-footer">
              <div className="id-barcode-graphic">
                |||| | ||||| || |||||| | |||| ||||| |||| | ||
              </div>
              <span className="id-validity-text">VALID FOR ACADEMIC YEAR 2026-27</span>
            </div>
          </div>

          {/* Avatar Selector */}
          <div className="avatar-picker-card mt-3">
            <span className="picker-title">Personalize Student Avatar</span>
            <div className="avatar-options-row">
              {avatarOptions.map((av) => (
                <button
                  key={av}
                  onClick={() => setSelectedAvatar(av)}
                  className={`avatar-choice-btn ${selectedAvatar === av ? 'avatar-active' : ''}`}
                >
                  {av}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Account Specifications & Security */}
        <div className="profile-details-column">
          <div className="dashboard-panel">
            <h3 className="panel-title mb-3">Academic Project Account</h3>

            <div className="account-specs-list">
              <div className="spec-item">
                <div className="spec-icon icon-indigo"><GraduationCap size={18} /></div>
                <div>
                  <span className="spec-label">Course Evaluation</span>
                  <strong>Continuous Assessment 03 (CA-03)</strong>
                </div>
              </div>

              <div className="spec-item">
                <div className="spec-icon icon-emerald"><Award size={18} /></div>
                <div>
                  <span className="spec-label">Faculty Mentor / Evaluator</span>
                  <strong>Prof. Somesh Chutel</strong>
                </div>
              </div>

              <div className="spec-item">
                <div className="spec-icon icon-cyan"><Shield size={18} /></div>
                <div>
                  <span className="spec-label">Authentication Security</span>
                  <strong>Bcrypt 10-Round Hashing + JWT Bearer Token</strong>
                </div>
              </div>

              <div className="spec-item">
                <div className="spec-icon icon-amber"><Calendar size={18} /></div>
                <div>
                  <span className="spec-label">Registration Status</span>
                  <strong>Active Session • SitSecB Database</strong>
                </div>
              </div>
            </div>

            <div className="profile-logout-area mt-4">
              <button onClick={logout} className="btn-logout-prominent">
                <LogOut size={18} />
                <span>Sign Out from Device</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
