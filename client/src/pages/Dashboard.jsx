import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { taskService } from '../services/taskService';
import TaskForm from '../components/TaskForm';
import TaskItem from '../components/TaskItem';
import {
  Search,
  Zap,
  ListTodo,
  Clock,
  CheckCircle2,
  Target,
  Flame,
} from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // 🔹 important: async/await + backend call
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const res = await taskService.getAll(); // backend: { tasks: [...] }
        // taskService.getAll()ல் நாம் already res.data return பண்ணியிருந்தால்,
        // res.tasks இருக்கும்; இல்லன்னா res.data.tasks இருக்கும்.
        const tasksFromApi = res.tasks || res.data?.tasks || [];
        setTasks(tasksFromApi);
      } catch (err) {
        console.error('Failed to load tasks:', err);
      }
    };
    loadTasks();
  }, []);

  const addTask = async (data) => {
    try {
      const res = await taskService.create(data); // { task } or { data: { task } }
      const newTask = res.task || res.data?.task;
      if (newTask) {
        setTasks((prev) => [newTask, ...prev]);
      }
    } catch (err) {
      console.error('Failed to add task:', err);
    }
  };

  const toggleTask = async (id, completed) => {
    try {
      await taskService.update(id, { completed }); // backend update
      setTasks((prev) =>
        prev.map((t) => (t._id === id ? { ...t, completed } : t))
      );
    } catch (err) {
      console.error('Failed to toggle task:', err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await taskService.delete(id);
      setTasks((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      console.error('Failed to delete task:', err);
    }
  };

  const editTask = async (id, data) => {
    try {
      const res = await taskService.update(id, data); // { task } or { data: { task } }
      const updatedTask = res.task || res.data?.task;
      if (updatedTask) {
        setTasks((prev) =>
          prev.map((t) => (t._id === id ? updatedTask : t))
        );
      }
    } catch (err) {
      console.error('Failed to edit task:', err);
    }
  };

  // இப்ப backendல் toggleStar route இல்ல, so UI‑ல மட்டும் toggle
  const toggleStar = async (id) => {
    setTasks((prev) =>
      prev.map((t) =>
        t._id === id ? { ...t, starred: !t.starred } : t
      )
    );
  };

  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.completed).length;
    const active = total - completed;
    const high = tasks.filter(
      (t) => t.priority === 'high' && !t.completed
    ).length;
    const today = tasks.filter((t) => {
      if (!t.dueDate) return false;
      const d = new Date(t.dueDate);
      const now = new Date();
      return (
        d.getFullYear() === now.getFullYear() &&
        d.getMonth() === now.getMonth() &&
        d.getDate() === now.getDate()
      );
    }).length;
    return { total, completed, active, high, today };
  }, [tasks]);

  const filtered = useMemo(() => {
    return tasks
      .filter((t) => {
        if (filter === 'active') return !t.completed;
        if (filter === 'completed') return t.completed;
        return true;
      })
      .filter((t) => {
        if (categoryFilter === 'all') return true;
        return t.category === categoryFilter;
      })
      .filter((t) => {
        if (!search.trim()) return true;
        const q = search.toLowerCase();
        return (
          t.title.toLowerCase().includes(q) ||
          (t.description || '').toLowerCase().includes(q)
        );
      });
  }, [tasks, filter, categoryFilter, search]);

  const completionPercent =
    stats.total === 0 ? 0 : Math.round((stats.completed / stats.total) * 100);

  return (
    <div
      className="app-main"
      style={{
        paddingTop: '1.7rem',
        paddingBottom: '2.5rem',
      }}
    >
      <div style={{ width: '100%', maxWidth: 1280 }}>
        {/* TOP STRIP */}
        <section
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0,1.6fr) minmax(0,1.4fr)',
            gap: '1.4rem',
            marginBottom: '1.6rem',
          }}
        >
          <div
            style={{
              padding: '1.1rem 1.3rem',
              borderRadius: 18,
              background:
                'linear-gradient(135deg,rgba(99,102,241,0.18),rgba(37,99,235,0.05))',
              border: '1px solid rgba(129,140,248,0.6)',
              boxShadow: '0 18px 50px rgba(30,64,175,0.9)',
            }}
          >
            <p
              style={{
                fontSize: '0.8rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#a5b4fc',
                marginBottom: '0.35rem',
              }}
            >
              Today overview
            </p>
            <h1
              style={{
                fontSize: '2rem',
                fontWeight: 700,
                color: '#f9fafb',
                marginBottom: '0.35rem',
              }}
            >
              Hey, {user?.name} 👋
            </h1>
            <p style={{ fontSize: '0.9rem', color: '#e5e7eb' }}>
              {stats.active} active, {stats.completed} done, {stats.high} high
              priority waiting.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4,minmax(0,1fr))',
              gap: '0.55rem',
            }}
          >
            <div
              style={{
                backgroundColor: '#020617',
                borderRadius: 14,
                padding: '0.55rem 0.65rem',
                border: '1px solid rgba(148,163,184,0.5)',
              }}
            >
              <div
                style={{
                  fontSize: '0.75rem',
                  color: '#9ca3af',
                  marginBottom: '0.15rem',
                }}
              >
                Total
              </div>
              <div style={{ fontSize: '1.35rem', fontWeight: 700 }}>
                {stats.total}
              </div>
            </div>
            <div
              style={{
                backgroundColor: '#020617',
                borderRadius: 14,
                padding: '0.55rem 0.65rem',
                border: '1px solid rgba(148,163,184,0.5)',
              }}
            >
              <div
                style={{
                  fontSize: '0.75rem',
                  color: '#9ca3af',
                  marginBottom: '0.15rem',
                }}
              >
                Active
              </div>
              <div style={{ fontSize: '1.35rem', fontWeight: 700, color: '#22c55e' }}>
                {stats.active}
              </div>
            </div>
            <div
              style={{
                backgroundColor: '#020617',
                borderRadius: 14,
                padding: '0.55rem 0.65rem',
                border: '1px solid rgba(148,163,184,0.5)',
              }}
            >
              <div
                style={{
                  fontSize: '0.75rem',
                  color: '#9ca3af',
                  marginBottom: '0.15rem',
                }}
              >
                Completed
              </div>
              <div style={{ fontSize: '1.35rem', fontWeight: 700, color: '#38bdf8' }}>
                {stats.completed}
              </div>
            </div>
            <div
              style={{
                backgroundColor: '#020617',
                borderRadius: 14,
                padding: '0.55rem 0.65rem',
                border: '1px solid rgba(248,250,252,0.25)',
              }}
            >
              <div
                style={{
                  fontSize: '0.75rem',
                  color: '#fbbf24',
                  marginBottom: '0.15rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                }}
              >
                <Flame size={14} />
                Today
              </div>
              <div style={{ fontSize: '1.35rem', fontWeight: 700, color: '#fbbf24' }}>
                {stats.today}
              </div>
            </div>
          </div>
        </section>

        {/* MIDDLE GRID */}
        <section
          style={{
            display: 'grid',
            gridTemplateColumns:
              'minmax(0,0.9fr) minmax(0,1.6fr) minmax(0,0.9fr)',
            gap: '1.4rem',
            marginBottom: '1.6rem',
          }}
        >
          {/* LEFT: quick filters */}
          <div
            className="glass-shell"
            style={{
              padding: '0.95rem 1rem 1.2rem',
              backgroundColor: 'rgba(15,23,42,0.95)',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                marginBottom: '0.7rem',
              }}
            >
              <Zap size={16} color="#facc15" />
              <h2 style={{ fontSize: '0.9rem', fontWeight: 600, color: '#e5e7eb' }}>
                Quick filters
              </h2>
            </div>

            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.4rem',
                marginBottom: '0.7rem',
              }}
            >
              {[
                { key: 'all', label: 'All tasks' },
                { key: 'active', label: 'Active only' },
                { key: 'completed', label: 'Completed' },
              ].map((item) => {
                const active = filter === item.key;
                return (
                  <button
                    key={item.key}
                    onClick={() => setFilter(item.key)}
                    className="btn"
                    style={{
                      paddingInline: '0.7rem',
                      fontSize: '0.8rem',
                      borderRadius: 999,
                      background: active ? '#6366f1' : 'transparent',
                      color: active ? '#f9fafb' : '#e5e7eb',
                      borderColor: active
                        ? 'transparent'
                        : 'rgba(148,163,184,0.7)',
                    }}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>

            <div style={{ marginBottom: '0.7rem' }}>
              <p
                style={{
                  fontSize: '0.8rem',
                  color: '#9ca3af',
                  marginBottom: '0.25rem',
                }}
              >
                Category
              </p>
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.35rem',
                }}
              >
                {[
                  { key: 'all', label: 'All' },
                  { key: 'personal', label: 'Personal' },
                  { key: 'work', label: 'Work' },
                  { key: 'study', label: 'Study' },
                  { key: 'shopping', label: 'Shopping' },
                ].map((item) => {
                  const active = categoryFilter === item.key;
                  return (
                    <button
                      key={item.key}
                      onClick={() => setCategoryFilter(item.key)}
                      style={{
                        padding: '0.25rem 0.7rem',
                        borderRadius: 999,
                        border: '1px solid rgba(148,163,184,0.6)',
                        backgroundColor: active
                          ? 'rgba(99,102,241,0.25)'
                          : 'transparent',
                        color: '#e5e7eb',
                        fontSize: '0.8rem',
                      }}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <p
                style={{
                  fontSize: '0.8rem',
                  color: '#9ca3af',
                  marginBottom: '0.25rem',
                }}
              >
                Completion
              </p>
              <div
                style={{
                  width: '100%',
                  height: 6,
                  borderRadius: 999,
                  backgroundColor: '#020617',
                  overflow: 'hidden',
                  border: '1px solid rgba(31,41,55,0.9)',
                }}
              >
                <div
                  style={{
                    width: `${completionPercent}%`,
                    height: '100%',
                    background:
                      'linear-gradient(90deg,#22c55e,#a3e635,#facc15)',
                  }}
                />
              </div>
              <p
                style={{
                  fontSize: '0.75rem',
                  color: '#9ca3af',
                  marginTop: '0.25rem',
                }}
              >
                {completionPercent}% of your tasks completed
              </p>
            </div>
          </div>

          {/* CENTER: form + tasks */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.9rem',
            }}
          >
            <div
              className="glass-shell"
              style={{
                padding: '0.7rem 0.9rem',
                backgroundColor: 'rgba(15,23,42,0.95)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  gap: '0.6rem',
                  alignItems: 'center',
                  marginBottom: '0.4rem',
                  flexWrap: 'wrap',
                }}
              >
                <div style={{ position: 'relative', flex: 1, minWidth: 220 }}>
                  <Search
                    size={17}
                    style={{
                      position: 'absolute',
                      left: 9,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: '#6b7280',
                    }}
                  />
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search tasks..."
                    style={{
                      width: '100%',
                      padding: '0.4rem 0.8rem 0.4rem 2.1rem',
                      borderRadius: 999,
                      border: '1px solid rgba(148,163,184,0.7)',
                      backgroundColor: '#020617',
                      color: '#e5e7eb',
                      fontSize: '0.85rem',
                    }}
                  />
                </div>
                <div
                  style={{
                    fontSize: '0.78rem',
                    color: '#9ca3af',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                  }}
                >
                  <ListTodo size={15} />
                  {filtered.length} tasks shown
                </div>
              </div>
            </div>

            <div
              className="glass-shell"
              style={{
                backgroundColor: 'rgba(15,23,42,0.97)',
                padding: '1rem 1.05rem 1.1rem',
              }}
            >
              <TaskForm onAddTask={addTask} />
              <div style={{ height: 10 }} />
              {filtered.length === 0 ? (
                <div
                  style={{
                    padding: '1.5rem 0.5rem',
                    textAlign: 'center',
                    color: '#9ca3af',
                    fontSize: '0.9rem',
                  }}
                >
                  No tasks found. Adjust filters or add a new one.
                </div>
              ) : (
                <div
                  style={{
                    maxHeight: '46vh',
                    overflowY: 'auto',
                    paddingRight: 2,
                    marginTop: '0.3rem',
                  }}
                >
                  {filtered.map((t) => (
                    <TaskItem
                      key={t._id}
                      task={t}
                      onToggle={toggleTask}
                      onDelete={deleteTask}
                      onEdit={editTask}
                      onStar={toggleStar}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: summary */}
          <div
            className="glass-shell"
            style={{
              padding: '0.95rem 1rem 1.2rem',
              backgroundColor: 'rgba(15,23,42,0.98)',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                marginBottom: '0.7rem',
              }}
            >
              <Target size={16} color="#22c55e" />
              <h2 style={{ fontSize: '0.9rem', fontWeight: 600, color: '#e5e7eb' }}>
                Focus summary
              </h2>
            </div>

            <ul
              style={{
                listStyle: 'none',
                fontSize: '0.85rem',
                color: '#e5e7eb',
                marginBottom: '0.7rem',
              }}
            >
              <li style={{ marginBottom: '0.3rem' }}>
                <Clock size={14} style={{ marginRight: 6 }} />
                Today due: <strong>{stats.today}</strong>
              </li>
              <li style={{ marginBottom: '0.3rem' }}>
                <CheckCircle2 size={14} style={{ marginRight: 6 }} />
                Completed: <strong>{stats.completed}</strong> ({completionPercent}
                %)
              </li>
              <li style={{ marginBottom: '0.3rem' }}>
                <Flame size={14} style={{ marginRight: 6 }} />
                High priority: <strong>{stats.high}</strong>
              </li>
            </ul>

            <div
              style={{
                marginTop: '0.5rem',
                fontSize: '0.8rem',
                color: '#9ca3af',
              }}
            >
              Tip:
              <br />
              Focus on 2–3 high priority tasks first, then clear easy ones to keep
              momentum.
            </div>
          </div>
        </section>

        {/* BOTTOM STRIP */}
        <section
          className="glass-shell"
          style={{
            background:
              'radial-gradient(circle at top,#020617 0,#020617 100%)',
            padding: '0.9rem 1rem',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              gap: '0.7rem',
              fontSize: '0.8rem',
              color: '#9ca3af',
            }}
          >
            <div>
              <strong>Pro workflow:</strong> Group tasks by category and
              dedicate focused blocks (e.g. 30 mins only for “Study”).
            </div>
            <div>
              This footer area fills the bottom space so the page never looks
              empty.
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;