import React, { useEffect, useState } from 'react'
import { StickyNote, Trash2 } from 'lucide-react'
import { notesService } from '../services/notesService'

const Notes = () => {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const res = await notesService.getAll()
        setNotes(res.data.notes)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const addNote = async (e) => {
    e.preventDefault()
    if (!title.trim() && !body.trim()) return
    try {
      const res = await notesService.create({
        title: title.trim() || 'Untitled',
        body: body.trim(),
      })
      setNotes(prev => [res.data.note, ...prev])
      setTitle('')
      setBody('')
    } catch (err) {
      console.error(err)
      alert(err.message)
    }
  }

  const deleteNote = async (id) => {
    try {
      await notesService.delete(id)
      setNotes(prev => prev.filter(n => n._id !== id))
    } catch (err) {
      console.error(err)
      alert(err.message)
    }
  }

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
            Notes
          </p>
          <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#f9fafb' }}>
            Quick notes
          </h1>
          <p style={{ fontSize: '0.9rem', color: '#9ca3af' }}>
            Capture ideas, reminders, and thoughts alongside your tasks.
          </p>
        </header>

        <div
          className="glass-shell"
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0,1.1fr) minmax(0,1.6fr)',
            gap: '1.4rem',
          }}
        >
          <div>
            <form onSubmit={addNote}>
              <h2
                style={{
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: '#e5e7eb',
                  marginBottom: '0.6rem',
                }}
              >
                New note
              </h2>
              <div style={{ marginBottom: '0.6rem' }}>
                <input
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="Note title"
                  style={{
                    width: '100%',
                    padding: '0.42rem 0.78rem',
                    borderRadius: 10,
                    border: '1px solid rgba(148,163,184,0.7)',
                    backgroundColor: '#020617',
                    color: '#e5e7eb',
                    fontSize: '0.9rem',
                    marginBottom: '0.4rem',
                  }}
                />
                <textarea
                  value={body}
                  onChange={e => setBody(e.target.value)}
                  rows={4}
                  placeholder="Write something..."
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
              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: '100%', justifyContent: 'center' }}
              >
                Add note
              </button>
            </form>
          </div>

          <div
            style={{
              maxHeight: '60vh',
              overflowY: 'auto',
            }}
          >
            {loading ? (
              <div
                style={{
                  padding: '1.5rem 0.5rem',
                  textAlign: 'center',
                  color: '#9ca3af',
                  fontSize: '0.9rem',
                }}
              >
                Loading notes...
              </div>
            ) : notes.length === 0 ? (
              <div
                style={{
                  padding: '1.5rem 0.5rem',
                  textAlign: 'center',
                  color: '#9ca3af',
                  fontSize: '0.9rem',
                }}
              >
                No notes yet. Start writing your thoughts here.
              </div>
            ) : (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))',
                  gap: '0.8rem',
                }}
              >
                {notes.map(note => (
                  <div
                    key={note._id}
                    style={{
                      backgroundColor: '#020617',
                      borderRadius: 14,
                      border: '1px solid rgba(148,163,184,0.45)',
                      padding: '0.7rem 0.8rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.4rem',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: '0.4rem',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 6,
                        }}
                      >
                        <StickyNote size={16} color="#a5b4fc" />
                        <h3
                          style={{
                            fontSize: '0.9rem',
                            fontWeight: 600,
                          }}
                        >
                          {note.title}
                        </h3>
                      </div>
                      <button onClick={() => deleteNote(note._id)}>
                        <Trash2 size={16} color="#f87171" />
                      </button>
                    </div>
                    {note.body && (
                      <p
                        style={{
                          fontSize: '0.8rem',
                          color: '#e5e7eb',
                        }}
                      >
                        {note.body}
                      </p>
                    )}
                    <div
                      style={{
                        fontSize: '0.7rem',
                        color: '#9ca3af',
                        marginTop: '0.2rem',
                      }}
                    >
                      {new Date(note.createdAt).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Notes