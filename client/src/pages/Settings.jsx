import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Moon, Sun, Focus, CheckCircle2 } from 'lucide-react'

const Settings = () => {
  const {
    user,
    darkMode,
    toggleDarkMode,
    focusMode,
    toggleFocusMode,
  } = useAuth()

  return (
    <div style={{ width: '100%' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        {/* Header */}
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
            Settings
          </p>
          <h1 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-main)' }}>
            Personalize your workspace
          </h1>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            Adjust your preferences to make TaskFlow feel like your own.
          </p>
        </header>

        <div
          className="glass-shell"
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.4fr) minmax(0, 1fr)',
            gap: '1.3rem',
          }}
        >
          {/* LEFT: main settings cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* Appearance / Theme card */}
            <section
              style={{
                borderRadius: 16,
                padding: '1rem',
                border: '1px solid var(--border-subtle)',
                backgroundColor: 'var(--bg-card)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '0.7rem',
                }}
              >
                <div>
                  <h2
                    style={{
                      fontSize: '0.95rem',
                      fontWeight: 600,
                      color: 'var(--text-main)',
                    }}
                  >
                    Appearance
                  </h2>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    Switch between light and dark themes.
                  </p>
                </div>
                <span
                  style={{
                    fontSize: '0.8rem',
                    color: '#a5b4fc',
                    backgroundColor: 'rgba(99, 102, 241, 0.18)',
                    padding: '0.18rem 0.55rem',
                    borderRadius: 999,
                  }}
                >
                  {darkMode ? 'Dark' : 'Light'} mode
                </span>
              </div>

              <button
                type="button"
                onClick={toggleDarkMode}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  padding: '0.55rem 0.75rem',
                  borderRadius: 999,
                  border: '1px solid var(--border-subtle)',
                  background:
                    'linear-gradient(135deg,rgba(15,23,42,1),rgba(30,64,175,0.7))',
                  cursor: 'pointer',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  {darkMode ? (
                    <Moon size={18} color="#facc15" />
                  ) : (
                    <Sun size={18} color="#f97316" />
                  )}
                  <span
                    style={{
                      fontSize: '0.9rem',
                      color: '#e5e7eb',
                      fontWeight: 500,
                    }}
                  >
                    {darkMode ? 'Dark mode enabled' : 'Light mode enabled'}
                  </span>
                </div>

                {/* Toggle pill */}
                <div
                  style={{
                    width: 44,
                    height: 22,
                    borderRadius: 999,
                    backgroundColor: darkMode ? '#4ade80' : '#4b5563',
                    padding: 2,
                    display: 'flex',
                    justifyContent: darkMode ? 'flex-end' : 'flex-start',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <div
                    style={{
                      width: 18,
                      height: 18,
                      borderRadius: '50%',
                      backgroundColor: '#020617',
                    }}
                  />
                </div>
              </button>
            </section>

            {/* Focus mode card */}
            <section
              style={{
                borderRadius: 16,
                padding: '1rem',
                border: '1px solid var(--border-subtle)',
                backgroundColor: 'var(--bg-card)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '0.7rem',
                }}
              >
                <div>
                  <h2
                    style={{
                      fontSize: '0.95rem',
                      fontWeight: 600,
                      color: 'var(--text-main)',
                    }}
                  >
                    Focus mode
                  </h2>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    Hide distractions and highlight today&apos;s important work.
                  </p>
                </div>
                {focusMode && <CheckCircle2 size={18} color="#22c55e" />}
              </div>

              <button
                type="button"
                onClick={toggleFocusMode}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  padding: '0.55rem 0.75rem',
                  borderRadius: 12,
                  border: '1px solid rgba(34,197,94,0.8)',
                  background:
                    'linear-gradient(135deg,rgba(22,163,74,0.18),rgba(15,23,42,1))',
                  cursor: 'pointer',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Focus size={18} color="#4ade80" />
                  <div style={{ textAlign: 'left' }}>
                    <p
                      style={{
                        fontSize: '0.88rem',
                        fontWeight: 500,
                        color: 'var(--text-main)',
                      }}
                    >
                      {focusMode ? 'Focus mode is ON' : 'Turn on focus mode'}
                    </p>
                    <p
                      style={{
                        fontSize: '0.78rem',
                        color: 'var(--text-muted)',
                      }}
                    >
                      {focusMode
                        ? 'Dashboard will show only today and high-priority items.'
                        : 'Limit highlights and keep your daily work front and center.'}
                    </p>
                  </div>
                </div>

                <div
                  style={{
                    width: 40,
                    height: 22,
                    borderRadius: 999,
                    backgroundColor: focusMode ? '#22c55e' : '#4b5563',
                    padding: 2,
                    display: 'flex',
                    justifyContent: focusMode ? 'flex-end' : 'flex-start',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <div
                    style={{
                      width: 18,
                      height: 18,
                      borderRadius: '50%',
                      backgroundColor: '#020617',
                    }}
                  />
                </div>
              </button>
            </section>
          </div>

          {/* RIGHT: account summary / preview */}
          <aside
            style={{
              borderRadius: 18,
              padding: '1rem',
              border: '1px solid var(--border-subtle)',
              background:
                'linear-gradient(135deg,rgba(59,130,246,0.15),rgba(15,23,42,0.96))',
            }}
          >
            <h2
              style={{
                fontSize: '0.95rem',
                fontWeight: 600,
                color: 'var(--text-main)',
                marginBottom: '0.6rem',
              }}
            >
              Account glance
            </h2>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                marginBottom: '0.7rem',
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  background:
                    'radial-gradient(circle at 30% 30%, #a5b4fc, #1d4ed8)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#020617',
                  fontWeight: 700,
                }}
              >
                {user?.name?.[0]?.toUpperCase() || 'U'}
              </div>
              <div>
                <p
                  style={{
                    fontSize: '0.9rem',
                    color: 'var(--text-main)',
                    fontWeight: 500,
                  }}
                >
                  {user?.name || 'Guest'}
                </p>
                <p
                  style={{
                    fontSize: '0.8rem',
                    color: '#cbd5f5',
                  }}
                >
                  {user?.email || 'No email'}
                </p>
              </div>
            </div>

            <div style={{ fontSize: '0.8rem', color: '#cbd5f5' }}>
              <p style={{ marginBottom: '0.35rem' }}>
                Theme: {darkMode ? 'Dark' : 'Light'} mode
              </p>
              <p style={{ marginBottom: '0.35rem' }}>
                Focus mode: {focusMode ? 'Enabled' : 'Disabled'}
              </p>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                These preferences are saved on this device so your setup stays the
                same each time you open TaskFlow.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}

export default Settings