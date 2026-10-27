import React from 'react';import { useCallback, useEffect, useMemo, useState } from 'react';
import { BookOpen, CalendarDays, Check, CheckCircle2, ChevronDown, CircleAlert, Clock3, Filter, GraduationCap, LayoutDashboard, ListTodo, LoaderCircle, Plus, Search, Trash2, X } from 'lucide-react';

const API = (import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:5000/api' : '/api')).replace(/\/$/, '');
const blankForm = { title: '', subject: '', type: 'Assignment', dueDate: '', priority: 'Medium', notes: '' };
const todayISO = () => new Date().toISOString().slice(0, 10);
const prettyDate = (value) => value ? new Date(`${String(value).slice(0, 10)}T12:00:00`).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : 'No date';
const isOverdue = (task) => task.status !== 'Completed' && task.dueDate && String(task.dueDate).slice(0, 10) < todayISO();

async function request(path, options = {}) {
  const response = await fetch(`${API}${path}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
  });
  const data = response.status === 204 ? null : await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data?.message || 'Request failed. Check the backend connection.');
  return data;
}

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(blankForm);

  const loadTasks = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const params = new URLSearchParams();
      if (query.trim()) params.set('search', query.trim());
      if (statusFilter !== 'All') params.set('status', statusFilter);
      if (typeFilter !== 'All') params.set('type', typeFilter);
      const data = await request(`/tasks?${params.toString()}`);
      setTasks(data);
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  }, [query, statusFilter, typeFilter]);

  useEffect(() => { loadTasks(); }, [loadTasks]);

  const counts = useMemo(() => ({
    total: tasks.length,
    pending: tasks.filter((t) => t.status === 'Pending').length,
    completed: tasks.filter((t) => t.status === 'Completed').length,
    overdue: tasks.filter(isOverdue).length,
  }), [tasks]);

  function openCreate() { setEditing(null); setForm(blankForm); setShowForm(true); setNotice(''); }
  function openEdit(task) {
    setEditing(task._id);
    setForm({ title: task.title, subject: task.subject, type: task.type, dueDate: String(task.dueDate).slice(0, 10), priority: task.priority, notes: task.notes || '' });
    setShowForm(true); setNotice('');
  }
  function updateField(event) { setForm((current) => ({ ...current, [event.target.name]: event.target.value })); }

  async function submitForm(event) {
    event.preventDefault(); setSaving(true); setError(''); setNotice('');
    try {
      const body = { ...form, status: editing ? tasks.find((t) => t._id === editing)?.status || 'Pending' : 'Pending' };
      if (editing) await request(`/tasks/${editing}`, { method: 'PATCH', body: JSON.stringify(body) });
      else await request('/tasks', { method: 'POST', body: JSON.stringify(body) });
      setShowForm(false); setForm(blankForm); setEditing(null);
      setNotice(editing ? 'Task updated.' : 'Task added to your planner.');
      await loadTasks();
    } catch (err) { setError(err.message); }
    finally { setSaving(false); }
  }

  async function toggleTask(task) {
    setError(''); setNotice('');
    try {
      await request(`/tasks/${task._id}`, { method: 'PATCH', body: JSON.stringify({ status: task.status === 'Completed' ? 'Pending' : 'Completed' }) });
      setNotice(task.status === 'Completed' ? 'Task marked as pending.' : 'Task completed.');
      await loadTasks();
    } catch (err) { setError(err.message); }
  }

  async function deleteTask(task) {
    if (!window.confirm(`Delete “${task.title}”? This cannot be undone.`)) return;
    setError(''); setNotice('');
    try { await request(`/tasks/${task._id}`, { method: 'DELETE' }); setNotice('Task deleted.'); await loadTasks(); }
    catch (err) { setError(err.message); }
  }

  return <div className="app-shell">
    <aside className="sidebar">
      <div className="brand"><div className="brand-mark"><GraduationCap size={23} /></div><div><strong>FLEXI</strong><span>STUDENT SPACE</span></div></div>
      <div className="side-label">WORKSPACE</div>
      <div className="nav-item active"><LayoutDashboard size={18} /> Dashboard</div>
      <div className="nav-item"><ListTodo size={18} /> My tasks <span className="nav-count">{counts.total}</span></div>
      <div className="nav-item"><CalendarDays size={18} /> Deadlines</div>
      <div className="sidebar-bottom"><div className="mini-avatar">S</div><div className="profile-copy"><strong>Student workspace</strong><span>Personal planner</span></div><ChevronDown size={16} className="muted" /></div>
    </aside>

    <main className="main-content">
      <header className="topbar"><div className="breadcrumb">Workspace <span>/</span> <b>Dashboard</b></div><div className="topbar-right"><span className="today-label"><CalendarDays size={15} /> {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span><div className="avatar">S</div></div></header>
      <section className="welcome-row"><div><div className="eyebrow">YOUR ACADEMIC COMMAND CENTRE</div><h1>Make room for <em>what matters.</em></h1><p>Keep your assignments, projects, and deadlines in one place.</p></div><button className="primary-button" onClick={openCreate}><Plus size={18} /> Add new task</button></section>

      <section className="stats-grid" aria-label="Task overview">
        <StatCard label="Total tasks" value={counts.total} caption="In your planner" icon={<ListTodo size={19}/>} tone="lavender" />
        <StatCard label="Pending" value={counts.pending} caption="Still to work on" icon={<Clock3 size={19}/>} tone="blue" />
        <StatCard label="Completed" value={counts.completed} caption="Good progress" icon={<CheckCircle2 size={19}/>} tone="green" />
        <StatCard label="Overdue" value={counts.overdue} caption="Needs attention" icon={<CircleAlert size={19}/>} tone="peach" />
      </section>

      <section className="tasks-panel">
        <div className="panel-heading"><div><h2>Your tasks</h2><p>A clear plan beats a last-minute panic.</p></div><span className="task-total">{tasks.length} {tasks.length === 1 ? 'task' : 'tasks'}</span></div>
        <div className="toolbar"><label className="search-box"><Search size={17}/><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search task or subject..." aria-label="Search tasks"/><kbd>⌕</kbd></label><label className="filter-select"><Filter size={15}/><select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} aria-label="Filter by status"><option>All</option><option>Pending</option><option>Completed</option></select></label><label className="filter-select"><BookOpen size={15}/><select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} aria-label="Filter by type"><option>All</option><option>Assignment</option><option>Project</option><option>Test</option><option>Study</option><option>Other</option></select></label></div>
        {error && <div className="alert error-alert"><CircleAlert size={17}/><span>{error}{error.toLowerCase().includes('fetch') || error.toLowerCase().includes('failed') ? ' Make sure the backend and MongoDB are running.' : ''}</span><button onClick={() => setError('')} aria-label="Dismiss error"><X size={16}/></button></div>}
        {notice && <div className="alert success-alert"><CheckCircle2 size={17}/><span>{notice}</span><button onClick={() => setNotice('')} aria-label="Dismiss message"><X size={16}/></button></div>}
        {loading ? <div className="empty-state"><LoaderCircle className="spin" size={25}/><strong>Loading your tasks</strong><span>Connecting to your planner...</span></div> : tasks.length === 0 ? <div className="empty-state"><div className="empty-icon"><CalendarDays size={26}/></div><strong>{query || statusFilter !== 'All' || typeFilter !== 'All' ? 'No tasks match these filters' : 'Your planner is a blank canvas'}</strong><span>{query || statusFilter !== 'All' || typeFilter !== 'All' ? 'Try changing your search or filters.' : 'Add your first task to start organizing your week.'}</span>{!(query || statusFilter !== 'All' || typeFilter !== 'All') && <button className="secondary-button" onClick={openCreate}><Plus size={16}/> Create first task</button>}</div> : <div className="task-list">{tasks.map((task) => <article className={`task-row ${task.status === 'Completed' ? 'is-complete' : ''}`} key={task._id}>
          <button className={`check-button ${task.status === 'Completed' ? 'checked' : ''}`} onClick={() => toggleTask(task)} aria-label={task.status === 'Completed' ? 'Mark pending' : 'Mark complete'}>{task.status === 'Completed' && <Check size={15}/>}</button>
          <div className="task-main"><div className="task-title-line"><h3>{task.title}</h3><span className={`type-pill type-${task.type.toLowerCase()}`}>{task.type}</span></div><div className="task-meta"><span><BookOpen size={14}/>{task.subject}</span><span className={isOverdue(task) ? 'overdue-date' : ''}><CalendarDays size={14}/>{isOverdue(task) ? 'Overdue · ' : 'Due '}{prettyDate(task.dueDate)}</span>{task.notes && <span className="notes-preview" title={task.notes}>{task.notes}</span>}</div></div>
          <div className="task-side"><span className={`priority priority-${task.priority.toLowerCase()}`}><i/> {task.priority}</span><span className={`status-label ${task.status === 'Completed' ? 'status-done' : ''}`}>{task.status}</span></div>
          <div className="task-actions"><button onClick={() => openEdit(task)} title="Edit task" aria-label="Edit task"><span className="edit-glyph">✎</span></button><button onClick={() => deleteTask(task)} title="Delete task" aria-label="Delete task"><Trash2 size={16}/></button></div>
        </article>)}</div>}
        <div className="panel-footer"><span><span className="live-dot"/> Synced with your FLEXI database</span><button onClick={loadTasks} className="refresh-button">Refresh list ↻</button></div>
      </section>
      <footer className="page-footer"><span>FLEXI <b>·</b> Student Academic Organizer</span><span>Plan thoughtfully. Work steadily.</span></footer>
    </main>

    {showForm && <div className="modal-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) setShowForm(false); }}><section className="modal" role="dialog" aria-modal="true" aria-labelledby="form-title"><div className="modal-heading"><div><div className="eyebrow">YOUR PLANNER</div><h2 id="form-title">{editing ? 'Edit task' : 'Add a new task'}</h2><p>Give your next priority a place in the plan.</p></div><button className="close-button" onClick={() => setShowForm(false)} aria-label="Close form"><X size={20}/></button></div><form onSubmit={submitForm} className="task-form"><label className="field full-field">Task title *<input name="title" value={form.title} onChange={updateField} maxLength="120" placeholder="e.g. Prepare DBMS assignment" required autoFocus/></label><label className="field">Subject *<input name="subject" value={form.subject} onChange={updateField} maxLength="80" placeholder="e.g. Database Management" required/></label><label className="field">Task type<select name="type" value={form.type} onChange={updateField}><option>Assignment</option><option>Project</option><option>Test</option><option>Study</option><option>Other</option></select></label><label className="field">Due date *<input type="date" name="dueDate" value={form.dueDate} onChange={updateField} required/></label><label className="field">Priority<select name="priority" value={form.priority} onChange={updateField}><option>Low</option><option>Medium</option><option>High</option></select></label><label className="field full-field">Notes <textarea name="notes" value={form.notes} onChange={updateField} maxLength="1000" rows="3" placeholder="Optional details, links, or reminders..."/></label><div className="form-actions"><button type="button" className="secondary-button" onClick={() => setShowForm(false)}>Cancel</button><button type="submit" className="primary-button" disabled={saving}>{saving ? <><LoaderCircle size={16} className="spin"/> Saving...</> : <><Plus size={17}/>{editing ? 'Save changes' : 'Add task'}</>}</button></div></form></section></div>}
  </div>;
}

function StatCard({ label, value, caption, icon, tone }) {
  return <article className="stat-card"><div className={`stat-icon ${tone}`}>{icon}</div><div className="stat-label">{label}</div><div className="stat-bottom"><strong>{value}</strong><span>{caption}</span></div></article>;
}
