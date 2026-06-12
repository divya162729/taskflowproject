import React from 'react'

const About = () => {
  return (
    <div style={{ width: '100%' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
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
            About
          </p>
          <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#f9fafb' }}>
            About TaskFlow
          </h1>
          <p style={{ fontSize: '0.9rem', color: '#9ca3af' }}>
            A small productivity hub built with React, designed for personal use.
          </p>
        </header>

        <div className="glass-shell">
          <p style={{ fontSize: '0.9rem', color: '#e5e7eb', marginBottom: '0.7rem' }}>
            This app brings together tasks, routines, notes, analytics, and focus
            mode into a single dark-themed dashboard. Each page is meaningful:
          </p>
          <ul
            style={{
              listStyle: 'disc',
              paddingLeft: '1.2rem',
              fontSize: '0.9rem',
              color: '#e5e7eb',
              marginBottom: '0.7rem',
            }}
          >
            <li>Dashboard – manage day-to-day tasks.</li>
            <li>Analytics – see how your tasks are distributed.</li>
            <li>Routines – track daily habits.</li>
            <li>Notes – store quick ideas and reminders.</li>
            <li>Focus – run deep work sessions with a timer.</li>
          </ul>
          <p style={{ fontSize: '0.85rem', color: '#9ca3af' }}>
            Feel free to extend this further with your own ideas: tags, projects,
            reminders, or integrations. This is your playground to learn frontend
            and build something real.
          </p>
        </div>
      </div>
    </div>
  )
}

export default About