import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UserPlus, User, Mail, Lock, Eye, EyeOff, AlertCircle, Hash, Building2, BookMarked, CheckCircle2 } from 'lucide-react';

export default function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    prn: '',
    email: '',
    department: 'Computer Science & Engineering',
    semester: '5th Semester',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name.trim() || !formData.email.trim() || !formData.password) {
      setError('Name, email, and password are required.');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      await register({
        name: formData.name.trim(),
        prn: formData.prn.trim(),
        email: formData.email.trim(),
        department: formData.department,
        semester: formData.semester,
        password: formData.password,
        status: 'Student',
      });
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-card-box auth-card-wide">
        {/* Header */}
        <div className="auth-card-header">
          <div className="auth-icon-circle">
            <UserPlus size={28} />
          </div>
          <h2 className="auth-title">Student Registration</h2>
          <p className="auth-subtitle">Create your academic profile for continuous assessment tracking</p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="alert-error-banner">
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="auth-form-grid">
          {/* Full Name */}
          <div className="form-field-group">
            <label className="field-label">Student Full Name *</label>
            <div className="input-with-icon">
              <User size={18} className="input-icon" />
              <input
                type="text"
                name="name"
                required
                placeholder="e.g. Aarefa"
                value={formData.name}
                onChange={handleChange}
                className="text-input"
              />
            </div>
          </div>

          {/* Roll No / PRN */}
          <div className="form-field-group">
            <label className="field-label">Roll Number / PRN</label>
            <div className="input-with-icon">
              <Hash size={18} className="input-icon" />
              <input
                type="text"
                name="prn"
                placeholder="e.g. 25070521060"
                value={formData.prn}
                onChange={handleChange}
                className="text-input"
              />
            </div>
          </div>

          {/* College Email */}
          <div className="form-field-group full-width-field">
            <label className="field-label">College Email Address *</label>
            <div className="input-with-icon">
              <Mail size={18} className="input-icon" />
              <input
                type="email"
                name="email"
                required
                placeholder="e.g. aarefa.student@sit.edu"
                value={formData.email}
                onChange={handleChange}
                className="text-input"
              />
            </div>
          </div>

          {/* Department */}
          <div className="form-field-group">
            <label className="field-label">Branch / Department</label>
            <div className="input-with-icon">
              <Building2 size={18} className="input-icon" />
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="text-input select-input"
              >
                <option value="Computer Science & Engineering">Computer Science & Engineering</option>
                <option value="Information Technology">Information Technology</option>
                <option value="Artificial Intelligence & ML">Artificial Intelligence & ML</option>
                <option value="Electronics & Telecommunication">Electronics & Telecommunication</option>
                <option value="Robotics & Automation">Robotics & Automation</option>
                <option value="Mechanical Engineering">Mechanical Engineering</option>
                <option value="Civil Engineering">Civil Engineering</option>
              </select>
            </div>
          </div>

          {/* Semester */}
          <div className="form-field-group">
            <label className="field-label">Current Semester</label>
            <div className="input-with-icon">
              <BookMarked size={18} className="input-icon" />
              <select
                name="semester"
                value={formData.semester}
                onChange={handleChange}
                className="text-input select-input"
              >
                <option value="1st Semester">1st Semester</option>
                <option value="2nd Semester">2nd Semester</option>
                <option value="3rd Semester">3rd Semester</option>
                <option value="4th Semester">4th Semester</option>
                <option value="5th Semester">5th Semester</option>
                <option value="6th Semester">6th Semester</option>
                <option value="7th Semester">7th Semester</option>
                <option value="8th Semester">8th Semester</option>
              </select>
            </div>
          </div>

          {/* Password */}
          <div className="form-field-group">
            <label className="field-label">Password * (min 6 chars)</label>
            <div className="input-with-icon">
              <Lock size={18} className="input-icon" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                required
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className="text-input"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="toggle-password-btn"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="form-field-group">
            <label className="field-label">Confirm Password *</label>
            <div className="input-with-icon">
              <Lock size={18} className="input-icon" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="confirmPassword"
                required
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="text-input"
              />
            </div>
          </div>

          {/* Submit */}
          <div className="full-width-field mt-3">
            <button
              type="submit"
              disabled={loading}
              className="btn-primary-large w-full"
            >
              {loading ? (
                <span>Registering Student Account...</span>
              ) : (
                <>
                  <CheckCircle2 size={18} />
                  <span>Complete Student Registration</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Footer Link */}
        <div className="auth-card-footer">
          <p>
            Already have an account?{' '}
            <Link to="/login" className="auth-accent-link">
              Log in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
