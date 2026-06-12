import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { LayoutDashboard, ChartNoAxesColumn, ListChecks, StickyNote, Target, Settings as SettingsIcon, Info } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
  const { user, logout } = useAuth()

  return (
    <nav
      style={{
        background: 'var(--nav-bg)',
        borderBottom: '1px solid var(--border-subtle)',
        padding: '0.6rem 1.5rem',
        backdropFilter: 'blur(10px)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <Link
            to="/dashboard"
            style={{
              fontWeight: 700,
              fontSize: '1rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--text-main)',
            }}
          >
            TASKFLOW
          </Link>

          <div
            style={{
              display: 'flex',
              gap: '0.2rem',
              padding: '0.18rem',
              borderRadius: 999,
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            <NavItem to="/dashboard" icon={<LayoutDashboard size={15} />} label="Dashboard" />
            <NavItem to="/analytics" icon={<ChartNoAxesColumn size={15} />} label="Analytics" />
            <NavItem to="/routines" icon={<ListChecks size={15} />} label="Routines" />
            <NavItem to="/notes" icon={<StickyNote size={15} />} label="Notes" />
            <NavItem to="/focus" icon={<Target size={15} />} label="Focus" />
            <NavItem to="/settings" icon={<SettingsIcon size={15} />} label="Settings" highlight />
            <NavItem to="/about" icon={<Info size={15} />} label="About" />
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
          {user && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '0.25rem 0.65rem',
                borderRadius: 999,
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                fontSize: '0.8rem',
                color: 'var(--text-main)',
              }}
            >
              <div
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: '50%',
                  background:
                    'radial-gradient(circle at 30% 20%, #22c55e, transparent 55%), #0f172a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 600,
                  fontSize: '0.8rem',
                  color: '#f9fafb',
                }}
              >
                {user.name?.[0]?.toUpperCase() || 'U'}
              </div>
              <span>{user.name}</span>
            </div>
          )}

          {/* theme toggle button உன்கிட்ட வேற இருப்பதால் இங்க simple placeholder */}
          {/* Logout */}
          <button
            className="btn btn-ghost"
            style={{ fontSize: '0.8rem', paddingInline: '0.9rem' }}
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}

const NavItem = ({ to, icon, label, highlight }) => (
  <NavLink
    to={to}
    style={({ isActive }) => ({
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4,
      padding: '0.25rem 0.7rem',
      borderRadius: 999,
      fontSize: '0.8rem',
      fontWeight: highlight ? 600 : 500,
      background: isActive || highlight ? 'var(--primary)' : 'transparent',
      color: isActive || highlight ? '#f9fafb' : 'var(--text-main)',
    })}
  >
    {icon}
    <span>{label}</span>
  </NavLink>
)

export default Navbar