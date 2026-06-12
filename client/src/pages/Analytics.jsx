import React, { useEffect, useState, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { taskService } from '../services/taskService';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const Analytics = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);

  // backendல் இருந்து tasks load
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const res = await taskService.getAll(); // res = { tasks: [...] }
        const tasksFromApi = res.tasks || res.data?.tasks || [];
        setTasks(tasksFromApi);
      } catch (err) {
        console.error('Failed to load tasks in Analytics:', err);
      }
    };
    loadTasks();
  }, []);

  const stats = useMemo(() => {
    return {
      total: tasks.length,
      completed: tasks.filter((t) => t.completed).length,
      active: tasks.filter((t) => !t.completed).length,
      high: tasks.filter((t) => t.priority === 'high').length,
      medium: tasks.filter((t) => t.priority === 'medium').length,
      low: tasks.filter((t) => t.priority === 'low').length,
    };
  }, [tasks]);

  const categoryData = useMemo(() => {
    const cats = ['personal', 'work', 'study', 'shopping'];
    return cats
      .map((c) => ({
        name: c.charAt(0).toUpperCase() + c.slice(1),
        count: tasks.filter((t) => t.category === c).length,
      }))
      .filter((c) => c.count > 0);
  }, [tasks]);

  const priorityPie = useMemo(
    () =>
      [
        { name: 'High', value: stats.high, color: '#ef4444' },
        { name: 'Medium', value: stats.medium, color: '#eab308' },
        { name: 'Low', value: stats.low, color: '#22c55e' },
      ].filter((s) => s.value > 0),
    [stats]
  );

  return (
    <div style={{ width: '100%' }}>
      <div style={{ maxWidth: 1150, margin: '0 auto' }}>
        <header style={{ marginBottom: '1.8rem' }}>
          <p
            style={{
              fontSize: '0.8rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#a5b4fc',
              marginBottom: '0.35rem',
            }}
          >
            Analytics
          </p>
          <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#f9fafb' }}>
            Insights for {user?.name}
          </h1>
          <p style={{ fontSize: '0.9rem', color: '#9ca3af' }}>
            Visual breakdown of your tasks by category and priority.
          </p>
        </header>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0,1.6fr) minmax(0,1.1fr)',
            gap: '1.5rem',
          }}
        >
          <div className="glass-shell">
            <h2
              style={{
                fontSize: '1rem',
                fontWeight: 600,
                marginBottom: '0.7rem',
                color: '#e5e7eb',
              }}
            >
              Tasks by category
            </h2>
            {categoryData.length === 0 ? (
              <p style={{ fontSize: '0.9rem', color: '#9ca3af' }}>
                No data yet. Create tasks to see charts.
              </p>
            ) : (
              <div style={{ height: 260 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={categoryData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                    <XAxis dataKey="name" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#020617',
                        border: '1px solid rgba(148,163,184,0.6)',
                        borderRadius: 10,
                        color: '#e5e7eb',
                      }}
                    />
                    <Bar dataKey="count" fill="#6366f1" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>

          <div className="glass-shell">
            <h2
              style={{
                fontSize: '1rem',
                fontWeight: 600,
                marginBottom: '0.7rem',
                color: '#e5e7eb',
              }}
            >
              Priority distribution
            </h2>
            {priorityPie.length === 0 ? (
              <p style={{ fontSize: '0.9rem', color: '#9ca3af' }}>
                No tasks available.
              </p>
            ) : (
              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ width: '55%', height: 220 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={priorityPie}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={70}
                      >
                        {priorityPie.map((entry, index) => (
                          <Cell key={index} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div style={{ flex: 1, fontSize: '0.85rem', color: '#e5e7eb' }}>
                  <p style={{ marginBottom: '0.5rem' }}>
                    Total tasks: <strong>{stats.total}</strong>
                  </p>
                  <p>
                    High: <strong>{stats.high}</strong>
                  </p>
                  <p>
                    Medium: <strong>{stats.medium}</strong>
                  </p>
                  <p>
                    Low: <strong>{stats.low}</strong>
                  </p>
                  <p style={{ marginTop: '0.7rem', color: '#9ca3af' }}>
                    Too many high priority items? Try to downgrade or reschedule
                    a few to avoid overload.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;