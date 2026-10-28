import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const API_BASE = (import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:5000/api' : '/api')).replace(/\/$/, '');

// Helper to make API requests with JWT authorization header
export async function apiRequest(path, options = {}) {
  const token = localStorage.getItem('flexi_token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  };

  const url = path.startsWith('http') ? path : `${API_BASE}${path.startsWith('/') ? path : `/${path}`}`;
  const response = await fetch(url, { ...options, headers });
  const data = response.status === 204 ? null : await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data?.message || data?.msg || 'Request failed. Please check server connection.');
  }
  return data;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize from localStorage on page load
  useEffect(() => {
    try {
      const savedToken = localStorage.getItem('flexi_token');
      const savedUser = localStorage.getItem('flexi_user');
      if (savedToken && savedUser) {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
      }
    } catch (e) {
      console.error('Failed to parse saved user', e);
      localStorage.removeItem('flexi_token');
      localStorage.removeItem('flexi_user');
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    try {
      const data = await apiRequest('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      const authToken = data.token || data.jwtToken;
      setToken(authToken);
      setUser(data.user);
      localStorage.setItem('flexi_token', authToken);
      localStorage.setItem('flexi_user', JSON.stringify(data.user));
      return data;
    } catch (err) {
      throw err;
    }
  };

  const register = async (formData) => {
    try {
      const data = await apiRequest('/auth/register', {
        method: 'POST',
        body: JSON.stringify(formData),
      });
      const authToken = data.token || data.jwtToken;
      setToken(authToken);
      setUser(data.user);
      localStorage.setItem('flexi_token', authToken);
      localStorage.setItem('flexi_user', JSON.stringify(data.user));
      return data;
    } catch (err) {
      throw err;
    }
  };

  const loginDemo = async () => {
    const demoUser = {
      id: 'demo-student-id-sit',
      name: 'AAREFA AADIL',
      email: 'aarefa.aadil@sitpune.edu.in',
      prn: '25070521073',
      department: 'Computer Science & Engineering',
      semester: '5th Semester',
      status: 'Student',
      avatar: '🎓',
    };
    const demoToken = 'demo-jwt-token-sample-academic-ca03';
    
    // Attempt backend login first, fallback to offline demo session if backend/DB is offline
    try {
      return await login('aarefa.aadil@sitpune.edu.in', 'password123');
    } catch (err) {
      setToken(demoToken);
      setUser(demoUser);
      localStorage.setItem('flexi_token', demoToken);
      localStorage.setItem('flexi_user', JSON.stringify(demoUser));
      return { token: demoToken, user: demoUser };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('flexi_token');
    localStorage.removeItem('flexi_user');
  };

  const value = {
    user,
    token,
    loading,
    isAuthenticated: !!user,
    login,
    register,
    loginDemo,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
