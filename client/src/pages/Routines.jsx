import React, { useEffect, useState } from 'react'
import { CheckCircle2, Clock, RefreshCw, Trash2, Plus } from 'lucide-react'
import { routinesService } from '../services/routinesService'

const Routines = () => {
  const [routines, setRoutines] = useState([])
  const [title, setTitle] = useState('')
  const [timeOfDay, setTimeOfDay] = useState('Morning')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const res = await routinesService.getAll()
        setRoutines(res.data.routines)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const toggleRoutine = async (id) => {
    const current = routines.find(r => r._id === id)
    if (!current) return
    try {
      const res = await routinesService.update(id, { done: !current.done })
      setRoutines(prev => prev.map(r => (r._id === id ? res.data.routine : r)))
    } catch (err) {
      console.error(err)
      alert(err.message)
    }
  }

  const resetDay = async () => {
    // simple approach: client-side loop
    try {
      const updated = await Promise.all(
        routines.map(async r => {
          if (!r.done) return r
          const res = await routinesService.update(r._id, { done: false })
          return res.data.routine
        })
      )
      setRoutines(updated)
    } catch (err) {
      console.error(err)
      alert(err.message)
    }
  }

  const addRoutine = async (e) => {
    e.preventDefault()
    if (!title.trim()) return
    try {
      const res = await routinesService.create({
        title: title.trim(),
        time: timeOfDay,
      })
      setRoutines(prev => [...prev, res.data.routine])
      setTitle('')
      setTimeOfDay('Morning')
    } catch (err) {
      console.error(err)
      alert(err.message)
    }
  }

  const deleteRoutine = async (id) => {
    try {
      await routinesService.delete(id)
      setRoutines(prev => prev.filter(r => r._id !== id))
    } catch (err) {
      console.error(err)
      alert(err.message)
    }
  }

  const doneCount = routines.filter(r => r.done).length

  return (
    <div style={{ width: '100%' }}>
      <div style={{ maxWidth: 1150, margin: '0 auto' }}>
        <header style={{ marginBottom: '1.5rem' }}>
          <p
            style={{
              fontSize: '0.8rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#a5b4fc',
              marginBottom: '0.35rem',
            }}
          >
            Routines
          </p>
          <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#f9fafb' }}>
            Daily habits
          </h1>
          <p style={{ fontSize: '0.9rem', color: '#9ca3af' }}>
            Keep track of the small habits that make your day better.
          </p>
        </header>

        <div
          className="glass-shell"
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0,1.5fr) minmax(0,1.1fr)',
            gap: '1.4rem',
          }}
        >
          {/* LEFT: add form + list */}
          <div>
            {/* Add routine form */}
            <form
              onSubmit={addRoutine}
              style={{
                marginBottom: '0.9rem',
                padding: '0.7rem 0.8rem',
                borderRadius: 14,
                border: '1px solid rgba(148,163,184,0.5)',
                backgroundColor: '#020617',
              }}
            >
              <h2
                style={{
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  color: '#e5e7eb',
                  marginBottom: '0.5rem',
                }}
              >
                Add routine
              </h2>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'minmax(0,1.4fr) minmax(0,0.8fr)',
                  gap: '0.5rem',
                  marginBottom: '0.5rem',
                }}
              >
                <input
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="E.g. Meditate 10 mins"
                  style={{
                    width: '100%',
                    padding: '0.4rem 0.75rem',
                    borderRadius: 10,
                    border: '1px solid rgba(148,163,184,0.7)',
                    backgroundColor: '#020617',
                    color: '#e5e7eb',
                    fontSize: '0.85rem',
                  }}
                />
                <select
                  value={timeOfDay}
                  onChange={e => setTimeOfDay(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.4rem 0.75rem',
                    borderRadius: 999,
                    border: '1px solid rgba(148,163,184,0.7)',
                    backgroundColor: '#020617',
                    color: '#e5e7eb',
                    fontSize: '0.85rem',
                  }}
                >
                  <option>Morning</option>
                  <option>Afternoon</option>
                  <option>Evening</option>
                  <option>Night</option>
                </select>
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <Plus size={16} />
                Add routine
              </button>
            </form>

            {/* Checklist */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '0.6rem',
                alignItems: 'center',
              }}
            >
              <h2
                style={{
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  color: '#e5e7eb',
                }}
              >
                Today&apos;s checklist
              </h2>
              <button
                className="btn btn-ghost"
                style={{ fontSize: '0.8rem', paddingInline: '0.7rem' }}
                onClick={resetDay}
              >
                <RefreshCw size={14} />
                Reset day
              </button>
            </div>

            {loading ? (
              <div
                style={{
                  padding: '1rem 0.5rem',
                  textAlign: 'center',
                  color: '#9ca3af',
                  fontSize: '0.85rem',
                }}
              >
                Loading routines...
              </div>
            ) : (
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {routines.map(r => (
                  <li
                    key={r._id}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '0.55rem 0.7rem',
                      borderRadius: 12,
                      border: '1px solid rgba(148,163,184,0.4)',
                      backgroundColor: r.done
                        ? 'rgba(22,163,74,0.15)'
                        : '#020617',
                      marginBottom: '0.45rem',
                      gap: '0.4rem',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={r.done}
                        onChange={() => toggleRoutine(r._id)}
                      />
                      <div>
                        <div
                          style={{
                            fontSize: '0.9rem',
                            fontWeight: 500,
                            textDecoration: r.done ? 'line-through' : 'none',
                          }}
                        >
                          {r.title}
                        </div>
                        <div
                          style={{
                            fontSize: '0.75rem',
                            color: '#9ca3af',
                          }}
                        >
                          {r.time}
                        </div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      {r.done && <CheckCircle2 size={18} color="#22c55e" />}
                      <button onClick={() => deleteRoutine(r._id)}>
                        <Trash2 size={16} color="#f97373" />
                      </button>
                    </div>
                  </li>
                ))}
                {routines.length === 0 && !loading && (
                  <li
                    style={{
                      fontSize: '0.85rem',
                      color: '#9ca3af',
                      textAlign: 'center',
                      padding: '0.8rem 0.4rem',
                    }}
                  >
                    No routines yet. Add your first habit above.
                  </li>
                )}
              </ul>
            )}
          </div>

          {/* RIGHT: summary card */}
          <div
            style={{
              borderRadius: 18,
              padding: '1rem',
              background:
                'linear-gradient(135deg,rgba(16,185,129,0.25),rgba(15,23,42,0.95))',
              border: '1px solid rgba(34,197,94,0.65)',
            }}
          >
            <h2
              style={{
                fontSize: '1rem',
                fontWeight: 600,
                marginBottom: '0.5rem',
                color: '#e5e7eb',
              }}
            >
              Routine summary
            </h2>
            <p
              style={{
                fontSize: '0.9rem',
                marginBottom: '0.6rem',
              }}
            >
              {doneCount} / {routines.length} habits completed today.
            </p>
            <div
              style={{
                fontSize: '0.85rem',
                color: '#e5e7eb',
                marginBottom: '0.5rem',
              }}
            >
              <Clock size={14} style={{ marginRight: 6 }} />
              Try to finish all habits before the day ends.
            </div>
            <p style={{ fontSize: '0.8rem', color: '#e5e7eb' }}>
              Your routines are now stored securely in the backend, so they stay
              in sync across refreshes and devices.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Routines