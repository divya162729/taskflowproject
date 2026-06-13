// src/services/routinesService.js
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

class RoutinesService {
  constructor() {
    this.base = `${API_URL}/api/routines`;
  }

  _headers() {
    // user objectலிருந்து token எடு (auth/API interceptor மாதிரி)
    const stored = localStorage.getItem('user');
    let token = null;

    if (stored) {
      try {
        const user = JSON.parse(stored);
        token = user?.token || null;
      } catch {
        token = null;
      }
    }

    return {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
  }

  async getAll() {
    const res = await fetch(this.base, {
      headers: this._headers(),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to fetch routines');
    return { data };
  }

  async create(payload) {
    const res = await fetch(this.base, {
      method: 'POST',
      headers: this._headers(),
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to create routine');
    return { data };
  }

  async update(id, payload) {
    const res = await fetch(`${this.base}/${id}`, {
      method: 'PUT',
      headers: this._headers(),
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to update routine');
    return { data };
  }

  async delete(id) {
    const res = await fetch(`${this.base}/${id}`, {
      method: 'DELETE',
      headers: this._headers(),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.message || 'Failed to delete routine');
  }
}

export const routinesService = new RoutinesService();