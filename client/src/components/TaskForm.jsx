import React, { useState } from 'react'

const TaskForm = ({ onAddTask }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState('medium')
  const [category, setCategory] = useState('personal')
  const [dueDate, setDueDate] = useState('')
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)

  const validate = () => {
    const e = {}
    if (!title.trim()) e.title = 'Title required'
    else if (title.trim().length < 3) e.title = 'Min 3 characters'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setSubmitting(true)
    await onAddTask({
      title: title.trim(),
      description: description.trim(),
      priority,
      category,
      dueDate: dueDate || null,
    })
    setSubmitting(false)
    setTitle('')
    setDescription('')
    setPriority('medium')
    setCategory('personal')
    setDueDate('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2
        style={{
          fontSize: '1.1rem',
          fontWeight: 600,
          color: '#e5e7eb',
          marginBottom: '0.9rem',
        }}
      >
        Add new task
      </h2>

      <div style={{ marginBottom: '0.8rem' }}>
        <label
          style={{
            display: 'block',
            fontSize: '0.85rem',
            color: 'var(--text-muted)',
            marginBottom: '0.2rem',
          }}
        >
          Title *
        </label>
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="E.g. Study React, pay bills..."
          style={{
            width: '100%',
            padding: '0.42rem 0.78rem',
            borderRadius: 10,
            border: `1px solid ${
              errors.title ? '#ef4444' : 'rgba(148,163,184,0.7)'
            }`,
            backgroundColor: '#020617',
            color: '#e5e7eb',
            fontSize: '0.9rem',
          }}
        />
        {errors.title && (
          <div
            style={{
              color: '#fecaca',
              fontSize: '0.75rem',
              marginTop: '0.18rem',
            }}
          >
            {errors.title}
          </div>
        )}
      </div>

      <div style={{ marginBottom: '0.8rem' }}>
        <label
          style={{
            display: 'block',
            fontSize: '0.85rem',
            color: 'var(--text-muted)',
            marginBottom: '0.2rem',
          }}
        >
          Description
        </label>
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          rows={3}
          placeholder="Optional details..."
          style={{
            width: '100%',
            padding: '0.42rem 0.78rem',
            borderRadius: 10,
            border: '1px solid rgba(148,163,184,0.7)',
            backgroundColor: '#020617',
            color: '#e5e7eb',
            fontSize: '0.9rem',
          }}
        />
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3,minmax(0,1fr))',
          gap: '0.5rem',
          marginBottom: '0.9rem',
        }}
      >
        <div>
          <label
            style={{
              display: 'block',
              fontSize: '0.8rem',
              color: 'var(--text-muted)',
              marginBottom: '0.15rem',
            }}
          >
            Priority
          </label>
          <select
            value={priority}
            onChange={e => setPriority(e.target.value)}
            style={{
              width: '100%',
              padding: '0.35rem 0.6rem',
              borderRadius: 999,
              border: '1px solid rgba(148,163,184,0.7)',
              backgroundColor: '#020617',
              color: '#e5e7eb',
              fontSize: '0.85rem',
            }}
          >
            <option value="low">Low 🟢</option>
            <option value="medium">Medium 🟡</option>
            <option value="high">High 🔴</option>
          </select>
        </div>

        <div>
          <label
            style={{
              display: 'block',
              fontSize: '0.8rem',
              color: 'var(--text-muted)',
              marginBottom: '0.15rem',
            }}
          >
            Category
          </label>
          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            style={{
              width: '100%',
              padding: '0.35rem 0.6rem',
              borderRadius: 999,
              border: '1px solid rgba(148,163,184,0.7)',
              backgroundColor: '#020617',
              color: '#e5e7eb',
              fontSize: '0.85rem',
            }}
          >
            <option value="personal">Personal 👤</option>
            <option value="work">Work 💼</option>
            <option value="study">Study 📚</option>
            <option value="shopping">Shopping 🛒</option>
          </select>
        </div>

        <div>
          <label
            style={{
              display: 'block',
              fontSize: '0.8rem',
              color: 'var(--text-muted)',
              marginBottom: '0.15rem',
            }}
          >
            Due date
          </label>
          <input
            type="date"
            value={dueDate}
            onChange={e => setDueDate(e.target.value)}
            style={{
              width: '100%',
              padding: '0.35rem 0.6rem',
              borderRadius: 999,
              border: '1px solid rgba(148,163,184,0.7)',
              backgroundColor: '#020617',
              color: '#e5e7eb',
              fontSize: '0.85rem',
            }}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="btn btn-primary"
        style={{ width: '100%', justifyContent: 'center' }}
      >
        {submitting ? 'Adding...' : 'Add task'}
      </button>
    </form>
  )
}

export default TaskForm