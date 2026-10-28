import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogIn, Mail, Lock, Eye, EyeOff, AlertCircle, Zap, GraduationCap, CheckCircle2 } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, loginDemo } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      setError('Please provide both email and password.');
      return;
    }
    setError('');
    setLoading(true);

    try {
      await login(email.trim(), password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || 'Login failed. Please verify your credentials or server connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setError('');
    setLoading(true);
    try {
      await loginDemo();
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setError('Demo login error: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-card-box">
        {/* Header */}
        <div className="auth-card-header">
          <div className="auth-icon-circle">
            <GraduationCap size={28} />
          </div>
          <h2 className="auth-title">Student Login</h2>
          <p className="auth-subtitle">Sign in to manage your academic tasks and timetable</p>
        </div>

        {/* Demo Callout Button for Professor / Evaluator */}
        <div className="demo-login-callout">
          <button
            type="button"
            onClick={handleDemoLogin}
            disabled={loading}
            className="btn-demo-quick w-full py-2"
          >
            <Zap size={16} />
            <span>⚡ 1-Click Demo Login (Fast Evaluation)</span>
          </button>
          <span className="demo-hint-text">Autofills pre-loaded tasks, timetable & student profile</span>
        </div>

        <div className="auth-divider">
          <span>or sign in with email</span>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="alert-error-banner">
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-field-group">
            <label className="field-label">College Email Address</label>
            <div className="input-with-icon">
              <Mail size={18} className="input-icon" />
              <input
                type="email"
                required
                placeholder="student@sit.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="text-input"
              />
            </div>
          </div>

          <div className="form-field-group">
            <label className="field-label">Password</label>
            <div className="input-with-icon">
              <Lock size={18} className="input-icon" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

          <button
            type="submit"
            disabled={loading}
            className="btn-primary-large w-full mt-4"
          >
            {loading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <LogIn size={18} />
                <span>Sign In to Dashboard</span>
              </>
            )}
          </button>
        </form>

        {/* Footer Link */}
        <div className="auth-card-footer">
          <p>
            Don't have an academic account?{' '}
            <Link to="/signup" className="auth-accent-link">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

