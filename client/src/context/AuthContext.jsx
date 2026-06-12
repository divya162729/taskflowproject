// client/src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);
const RAW_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const API_URL = `${RAW_URL}/api`;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // { id, name, email, token }
  const [loading, setLoading] = useState(true);

  // settings-related
  const [darkMode, setDarkMode] = useState(true);
  const [focusMode, setFocusMode] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedTheme = localStorage.getItem('darkMode');
    const storedFocus = localStorage.getItem('focusMode');

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem('user');
      }
    }

    if (storedTheme === 'false') {
      setDarkMode(false);
      document.documentElement.removeAttribute('data-theme');
    } else {
      setDarkMode(true);
      document.documentElement.setAttribute('data-theme', 'dark');
    }

    if (storedFocus === 'true') {
      setFocusMode(true);
    }

    setLoading(false);
  }, []);

  const toggleDarkMode = () => {
    const next = !darkMode;
    setDarkMode(next);
    localStorage.setItem('darkMode', String(next));
    if (next) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  };

  const toggleFocusMode = () => {
    const next = !focusMode;
    setFocusMode(next);
    localStorage.setItem('focusMode', String(next));
  };

  const login = async (email, password) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Login failed');

    const userData = {
      id: data.user.id,
      name: data.user.name,
      email: data.user.email,
      token: data.token,
    };

    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const register = async (name, email, password) => {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Register failed');

    const userData = {
      id: data.user.id,
      name: data.user.name,
      email: data.user.email,
      token: data.token,
    };

    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const value = {
    user,
    loading,
    isAuthenticated: !!user && !!user.token,
    login,
    register,
    logout,
    darkMode,
    toggleDarkMode,
    focusMode,
    toggleFocusMode,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);