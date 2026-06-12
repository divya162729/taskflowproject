import React from 'react'
import { Star } from 'lucide-react'

const TaskItem = ({ task, onToggle, onDelete, onEdit, onStar }) => {
  const isOverdue =
    task.dueDate && !task.completed && new Date(task.dueDate) < new Date()

  return (
    <div
      style={{
        backgroundColor: '#020617',
        borderRadius: 14,
        border: '1px solid rgba(148,163,184,0.45)',
        padding: '0.65rem 0.8rem',
        marginBottom: '0.6rem',
        display: 'flex',
        gap: '0.6rem',
        opacity: task.completed ? 0.7 : 1,
      }}
    >
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task._id, !task.completed)}
        style={{ marginTop: 6 }}
      />

      <div style={{ flex: 1 }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: '0.4rem',
          }}
        >
          <div>
            <h3
              style={{
                fontSize: '0.95rem',
                fontWeight: 600,
                textDecoration: task.completed ? 'line-through' : 'none',
              }}
            >
              {task.title}
            </h3>
            {task.description && (
              <p
                style={{
                  fontSize: '0.8rem',
                  color: 'var(--text-muted)',
                  marginTop: '0.1rem',
                }}
              >
                {task.description}
              </p>
            )}

            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.25rem',
                marginTop: '0.35rem',
              }}
            >
              <span className="badge badge-soft">{task.category}</span>
              <span className="badge badge-soft">Priority: {task.priority}</span>
              {task.dueDate && (
                <span
                  className="badge"
                  style={{
                    backgroundColor: isOverdue
                      ? 'rgba(248,113,113,0.12)'
                      : 'rgba(59,130,246,0.15)',
                    color: isOverdue ? '#fecaca' : '#bfdbfe',
                  }}
                >
                  Due {new Date(task.dueDate).toLocaleDateString()}
                </span>
              )}
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              gap: '0.25rem',
            }}
          >
            <button onClick={() => onStar(task._id)}>
              <Star
                size={18}
                color={task.starred ? '#facc15' : '#6b7280'}
                fill={task.starred ? '#facc15' : 'none'}
              />
            </button>
            <button
              className="btn btn-ghost"
              style={{ fontSize: '0.75rem', padding: '0.25rem 0.6rem' }}
              onClick={() => onEdit(task._id, { completed: !task.completed })}
            >
              Toggle
            </button>
            <button
              className="btn btn-danger"
              style={{ fontSize: '0.75rem', padding: '0.25rem 0.6rem' }}
              onClick={() => onDelete(task._id)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TaskItem