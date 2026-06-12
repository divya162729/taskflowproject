// client/src/services/api.js
import axios from 'axios';

const RAW_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const API_URL = `${RAW_URL}/api`;

// Axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach JWT token from localStorage before each request
api.interceptors.request.use(
  (config) => {
    const stored = localStorage.getItem('user');
    if (stored) {
      try {
        const user = JSON.parse(stored);
        if (user?.token) {
          config.headers.Authorization = `Bearer ${user.token}`;
        }
      } catch {
        // ignore parse error
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ---- AUTH API ----
export const authAPI = {
  login: async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    return res.data; // { user, token }
  },
  register: async (name, email, password) => {
    const res = await api.post('/auth/register', { name, email, password });
    return res.data; // { user, token }
  },
};

// ---- TASKS API ----
export const tasksAPI = {
  getAll: async () => {
    const res = await api.get('/tasks');
    return res.data; // { tasks: [...] }
  },
  create: async (data) => {
    const res = await api.post('/tasks', data);
    return res.data; // { task }
  },
  update: async (id, data) => {
    const res = await api.put(`/tasks/${id}`, data);
    return res.data; // { task }
  },
  delete: async (id) => {
    const res = await api.delete(`/tasks/${id}`);
    return res.data; // { message }
  },
};

// Notes / routines வேண்டும்னா இதே pattern follow பண்ணிக் கொள்ளலாம்

export default api;