// src/services/notesService.js
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

class NotesService {
  constructor() {
    this.base = `${API_URL}/api/notes`
  }

  _headers() {
    const token = localStorage.getItem('token')
    return {
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : '',
    }
  }

  async getAll() {
    const res = await fetch(this.base, {
      headers: this._headers(),
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'Failed to fetch notes')
    return { data }
  }

  async create(payload) {
    const res = await fetch(this.base, {
      method: 'POST',
      headers: this._headers(),
      body: JSON.stringify(payload),
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'Failed to create note')
    return { data }
  }

  async delete(id) {
    const res = await fetch(`${this.base}/${id}`, {
      method: 'DELETE',
      headers: this._headers(),
    })
    const data = await res.json().catch(() => ({}))
    if (!res.ok) throw new Error(data.message || 'Failed to delete note')
  }
}

export const notesService = new NotesService()