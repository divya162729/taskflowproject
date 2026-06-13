// src/services/notesService.js
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

class NotesService {
  constructor() {
    this.base = `${API_URL}/api/notes`;
  }

  _headers() {
    // AuthContext/api.js போலவே user objectலிருந்து token எடு
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
    if (!res.ok) throw new Error(data.message || 'Failed to fetch notes');
    return { data }; // { notes: [...] } backendல இருந்த மாதிரி
  }

  async create(payload) {
    const res = await fetch(this.base, {
      method: 'POST',
      headers: this._headers(),
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to create note');
    return { data }; // { note }
  }

  async delete(id) {
    const res = await fetch(`${this.base}/${id}`, {
      method: 'DELETE',
      headers: this._headers(),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.message || 'Failed to delete note');
  }
}

export const notesService = new NotesService();