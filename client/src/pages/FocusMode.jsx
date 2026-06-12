import React, { useEffect, useState, useMemo } from 'react';
import { taskService } from '../services/taskService';
import { Play, Pause, RotateCcw } from 'lucide-react';

const FocusMode = () => {
  const [seconds, setSeconds] = useState(25 * 60);
  const [running, setRunning] = useState(false);
  const [tasks, setTasks] = useState([]);

  // backendல் இருந்து tasks load
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const res = await taskService.getAll(); // { tasks: [...] }
        const tasksFromApi = res.tasks || res.data?.tasks || [];
        setTasks(tasksFromApi);
      } catch (err) {
        console.error('Failed to load tasks in FocusMode:', err);
      }
    };
    loadTasks();
  }, []);

  const focusTasks = useMemo(
    () =>
      tasks
        .filter((t) => !t.completed && t.priority === 'high')
        .slice(0, 3),
    [tasks]
  );

  useEffect(() => {
    if (!running) return;
    if (seconds <= 0) {
      setRunning(false);
      return;
    }
    const id = setInterval(() => setSeconds((s) => s - 1), 1000);
    return () => clearInterval(id);
  }, [running, seconds]);

  const minutesDisplay = String(Math.floor(seconds / 60)).padStart(2, '0');
  const secondsDisplay = String(seconds % 60).padStart(2, '0');

  const resetTimer = () => {
    setSeconds(25 * 60);
    setRunning(false);
  };

  return (
    <div style={{ width: '100%' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
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
            Focus mode
          </p>
          <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#f9fafb' }}>
            Deep work timer
          </h1>
          <p style={{ fontSize: '0.9rem', color: '#9ca3af' }}>
            Use a 25-minute pomodoro to finish your most important tasks.
          </p>
        </header>

        <div
          className="glass-shell"
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0,1.1fr) minmax(0,1.3fr)',
            gap: '1.4rem',
          }}
        >
          {/* Timer */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1.2rem 0.6rem',
            }}
          >
            <div
              style={{
                width: 200,
                height: 200,
                borderRadius: '50%',
                border: '6px solid rgba(148,163,184,0.7)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1rem',
              }}
            >
              <span
                style={{
                  fontSize: '2rem',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                }}
              >
                {minutesDisplay}:{secondsDisplay}
              </span>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                className="btn btn-primary"
                onClick={() => setRunning((r) => !r)}
                style={{ paddingInline: '1rem' }}
              >
                {running ? <Pause size={16} /> : <Play size={16} />}
                {running ? 'Pause' : 'Start'}
              </button>
              <button
                className="btn btn-ghost"
                onClick={resetTimer}
                style={{ paddingInline: '0.9rem' }}
              >
                <RotateCcw size={16} />
                Reset
              </button>
            </div>
          </div>

          {/* Focus tasks & tips */}
          <div>
            <h2
              style={{
                fontSize: '1rem',
                fontWeight: 600,
                color: '#e5e7eb',
                marginBottom: '0.6rem',
              }}
            >
              Focus on these
            </h2>
            {focusTasks.length === 0 ? (
              <p style={{ fontSize: '0.9rem', color: '#9ca3af' }}>
                No high-priority tasks found. Mark some tasks as &quot;High&quot; to
                see them here.
              </p>
            ) : (
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  marginBottom: '0.8rem',
                }}
              >
                {focusTasks.map((t) => (
                  <li
                    key={t._id}
                    style={{
                      borderRadius: 12,
                      padding: '0.55rem 0.7rem',
                      backgroundColor: '#020617',
                      border: '1px solid rgba(148,163,184,0.45)',
                      marginBottom: '0.4rem',
                    }}
                  >
                    <div
                      style={{
                        fontSize: '0.9rem',
                        fontWeight: 500,
                        marginBottom: '0.15rem',
                      }}
                    >
                      {t.title}
                    </div>
                    {t.description && (
                      <div
                        style={{
                          fontSize: '0.8rem',
                          color: '#9ca3af',
                        }}
                      >
                        {t.description}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            )}

            <div
              style={{
                fontSize: '0.85rem',
                color: '#9ca3af',
                borderRadius: 12,
                border: '1px dashed rgba(148,163,184,0.6)',
                padding: '0.7rem 0.8rem',
              }}
            >
              Tip: Before you start the timer, close all other tabs and put your
              phone away. This page is designed to keep you in true focus mode.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FocusMode;