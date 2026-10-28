import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { apiRequest } from '../context/AuthContext';
import {
  CheckSquare,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  AlertCircle,
  Trash2,
  Edit2,
  Calendar,
  Layers,
  X,
  BookOpen,
  ArrowUpDown,
} from 'lucide-react';

const blankForm = {
  title: '',
  subject: '',
  type: 'Assignment',
  dueDate: '',
  priority: 'Medium',
  status: 'Pending',
  notes: '',
};

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [sortBy, setSortBy] = useState('dueDateAsc');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [formData, setFormData] = useState(blankForm);
  const [formSubmitting, setFormSubmitting] = useState(false);

  const initialSeedTasks = [
    { _id: 'seed-1', title: 'Continuous Assessment 03 Submission', subject: 'Web Technologies', type: 'Project', dueDate: new Date(Date.now() + 86400000 * 2).toISOString().slice(0, 10), priority: 'High', status: 'Pending', notes: 'Upload full repository and presentation to university portal.' },
    { _id: 'seed-2', title: 'Dynamic Programming Practice Sheet', subject: 'Design & Analysis of Algorithms', type: 'Assignment', dueDate: new Date(Date.now() + 86400000 * 4).toISOString().slice(0, 10), priority: 'High', status: 'Pending', notes: 'Complete Knapsack and Longest Common Subsequence problems.' },
    { _id: 'seed-3', title: 'MongoDB Indexing & Aggregation Lab', subject: 'Database Management Systems', type: 'Lab', dueDate: new Date(Date.now() - 86400000).toISOString().slice(0, 10), priority: 'Medium', status: 'Completed', notes: 'Verify explain() output for compound index on student collection.' },
    { _id: 'seed-4', title: 'Subnetting & TCP Handshake Quiz', subject: 'Computer Networks', type: 'Test', dueDate: new Date(Date.now() + 86400000 * 6).toISOString().slice(0, 10), priority: 'Medium', status: 'Pending', notes: 'Review CIDR notation and 3-way handshake sequence diagrams.' },
    { _id: 'seed-5', title: 'Software Architecture Presentation', subject: 'Software Engineering', type: 'Presentation', dueDate: new Date(Date.now() + 86400000 * 9).toISOString().slice(0, 10), priority: 'Low', status: 'Pending', notes: 'Prepare 10-minute slide deck on microservices vs monolith.' },
  ];

  const loadTasks = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await apiRequest('/tasks');
      if (Array.isArray(data) && data.length > 0) {
        setTasks(data);
      } else {
        setTasks(initialSeedTasks);
      }
    } catch (err) {
      console.warn('API error, using initial sample data', err.message);
      setTasks(initialSeedTasks);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const handleOpenAddModal = () => {
    setEditingTask(null);
    setFormData({
      ...blankForm,
      dueDate: new Date(Date.now() + 86400000 * 3).toISOString().slice(0, 10),
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (task) => {
    setEditingTask(task);
    setFormData({
      title: task.title,
      subject: task.subject,
      type: task.type,
      dueDate: String(task.dueDate).slice(0, 10),
      priority: task.priority,
      status: task.status,
      notes: task.notes || '',
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
    setFormData(blankForm);
  };

  const handleSaveTask = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.subject.trim() || !formData.dueDate) {
      alert('Please fill out the title, subject, and due date.');
      return;
    }

    setFormSubmitting(true);
    try {
      if (editingTask) {
        // Update task
        try {
          await apiRequest(`/tasks/${editingTask._id}`, {
            method: 'PATCH',
            body: JSON.stringify(formData),
          });
        } catch (e) {
          console.warn('Server patch failed, updating local state', e);
        }
        setTasks((prev) =>
          prev.map((t) => (t._id === editingTask._id ? { ...t, ...formData } : t))
        );
      } else {
        // Create new task
        let created = { ...formData, _id: 'client-' + Date.now() };
        try {
          const res = await apiRequest('/tasks', {
            method: 'POST',
            body: JSON.stringify(formData),
          });
          if (res?._id) created = res;
        } catch (e) {
          console.warn('Server post failed, keeping in local state', e);
        }
        setTasks((prev) => [created, ...prev]);
      }
      handleCloseModal();
    } finally {
      setFormSubmitting(false);
    }
  };

  const toggleStatus = async (task) => {
    const newStatus = task.status === 'Completed' ? 'Pending' : 'Completed';
    setTasks((prev) =>
      prev.map((t) => (t._id === task._id ? { ...t, status: newStatus } : t))
    );
    try {
      await apiRequest(`/tasks/${task._id}`, {
        method: 'PATCH',
        body: JSON.stringify({ status: newStatus }),
      });
    } catch (e) {
      console.warn('Sync status update failed', e);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this academic task?')) return;
    setTasks((prev) => prev.filter((t) => t._id !== taskId));
    try {
      await apiRequest(`/tasks/${taskId}`, { method: 'DELETE' });
    } catch (e) {
      console.warn('Sync delete failed', e);
    }
  };

  // Filtered & sorted tasks
  const filteredTasks = useMemo(() => {
    return tasks
      .filter((t) => {
        const matchesSearch =
          t.title.toLowerCase().includes(search.toLowerCase()) ||
          t.subject.toLowerCase().includes(search.toLowerCase()) ||
          (t.notes && t.notes.toLowerCase().includes(search.toLowerCase()));

        const matchesStatus =
          statusFilter === 'All' ||
          (statusFilter === 'Pending' && t.status !== 'Completed') ||
          (statusFilter === 'Completed' && t.status === 'Completed');

        const matchesType = typeFilter === 'All' || t.type === typeFilter;

        return matchesSearch && matchesStatus && matchesType;
      })
      .sort((a, b) => {
        if (sortBy === 'dueDateAsc') return new Date(a.dueDate) - new Date(b.dueDate);
        if (sortBy === 'dueDateDesc') return new Date(b.dueDate) - new Date(a.dueDate);
        if (sortBy === 'priority') {
          const weight = { High: 3, Medium: 2, Low: 1 };
          return (weight[b.priority] || 0) - (weight[a.priority] || 0);
        }
        return 0;
      });
  }, [tasks, search, statusFilter, typeFilter, sortBy]);

  const counts = useMemo(() => ({
    total: tasks.length,
    pending: tasks.filter((t) => t.status !== 'Completed').length,
    completed: tasks.filter((t) => t.status === 'Completed').length,
    overdue: tasks.filter(
      (t) => t.status !== 'Completed' && String(t.dueDate).slice(0, 10) < new Date().toISOString().slice(0, 10)
    ).length,
  }), [tasks]);

  return (
    <div className="tasks-page-container">
      {/* Top Header */}
      <div className="tasks-header-bar">
        <div>
          <h1 className="tasks-main-title">Assignments & Tasks</h1>
          <p className="tasks-subtext">Manage, schedule, and filter all academic deadlines</p>
        </div>
        <button onClick={handleOpenAddModal} className="btn-primary-large">
          <Plus size={18} />
          <span>Add Academic Task</span>
        </button>
      </div>

      {/* Mini Stats Summary */}
      <div className="task-summary-ribbon">
        <div className="task-summary-item">
          <span className="summary-number">{counts.total}</span>
          <span className="summary-label">Total Registered</span>
        </div>
        <div className="task-summary-item text-amber">
          <span className="summary-number">{counts.pending}</span>
          <span className="summary-label">Pending</span>
        </div>
        <div className="task-summary-item text-emerald">
          <span className="summary-number">{counts.completed}</span>
          <span className="summary-label">Completed</span>
        </div>
        <div className="task-summary-item text-rose">
          <span className="summary-number">{counts.overdue}</span>
          <span className="summary-label">Overdue</span>
        </div>
      </div>

      {/* Filter and Search Toolbar */}
      <div className="tasks-toolbar-card">
        {/* Search */}
        <div className="toolbar-search-box">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search by title, course, or notes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="toolbar-search-input"
          />
          {search && (
            <button onClick={() => setSearch('')} className="search-clear-btn">
              <X size={16} />
            </button>
          )}
        </div>

        {/* Filters Row */}
        <div className="toolbar-filters-row">
          {/* Status Filter */}
          <div className="filter-dropdown-group">
            <label>Status:</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="toolbar-select"
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          {/* Type Filter */}
          <div className="filter-dropdown-group">
            <label>Type:</label>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="toolbar-select"
            >
              <option value="All">All Types</option>
              <option value="Assignment">Assignment</option>
              <option value="Project">Project</option>
              <option value="Test">Test / Quiz</option>
              <option value="Lab">Lab Work</option>
              <option value="Presentation">Presentation</option>
              <option value="Study">Self Study</option>
            </select>
          </div>

          {/* Sort By */}
          <div className="filter-dropdown-group">
            <label>Sort By:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="toolbar-select"
            >
              <option value="dueDateAsc">Due Date (Earliest First)</option>
              <option value="dueDateDesc">Due Date (Latest First)</option>
              <option value="priority">Priority (High to Low)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tasks List */}
      <div className="tasks-cards-stack">
        {filteredTasks.length === 0 ? (
          <div className="empty-tasks-placeholder">
            <CheckSquare size={44} className="empty-icon" />
            <h3>No Academic Tasks Found</h3>
            <p>Try adjusting your search criteria or create a new task.</p>
            <button onClick={handleOpenAddModal} className="btn-primary-large mt-3">
              <Plus size={16} /> Create Task
            </button>
          </div>
        ) : (
          filteredTasks.map((task) => {
            const isCompleted = task.status === 'Completed';
            const isOverdue =
              !isCompleted &&
              String(task.dueDate).slice(0, 10) < new Date().toISOString().slice(0, 10);

            return (
              <div
                key={task._id}
                className={`task-row-card ${isCompleted ? 'task-row-completed' : ''} ${
                  isOverdue ? 'task-row-overdue' : ''
                }`}
              >
                {/* Complete Checkbox */}
                <button
                  onClick={() => toggleStatus(task)}
                  className={`task-status-circle ${isCompleted ? 'is-complete' : ''}`}
                  title={isCompleted ? 'Mark Pending' : 'Mark Completed'}
                >
                  <CheckCircle2 size={22} />
                </button>

                {/* Main Content */}
                <div className="task-content-main">
                  <div className="task-title-line">
                    <span className="task-title-text">{task.title}</span>
                    {isOverdue && (
                      <span className="badge-overdue-pill">
                        <AlertCircle size={13} /> Overdue
                      </span>
                    )}
                  </div>

                  <div className="task-tags-row">
                    <span className="tag-subject-badge">{task.subject}</span>
                    <span className="tag-type-badge">{task.type}</span>
                    <span className={`tag-priority-badge priority-${task.priority.toLowerCase()}`}>
                      {task.priority} Priority
                    </span>
                    <span className="tag-due-badge">
                      <Calendar size={13} />
                      <span>
                        Due:{' '}
                        {new Date(task.dueDate).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </span>
                    </span>
                  </div>

                  {task.notes && <p className="task-notes-snippet">{task.notes}</p>}
                </div>

                {/* Actions */}
                <div className="task-actions-col">
                  <button
                    onClick={() => handleOpenEditModal(task)}
                    className="task-action-btn edit-btn"
                    title="Edit Task"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => handleDeleteTask(task._id)}
                    className="task-action-btn delete-btn"
                    title="Delete Task"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Add / Edit Task Modal */}
      {isModalOpen && (
        <div className="modal-backdrop">
          <div className="modal-dialog-box">
            <div className="modal-header">
              <h3>{editingTask ? 'Edit Academic Task' : 'Create New Academic Task'}</h3>
              <button onClick={handleCloseModal} className="modal-close-btn">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveTask} className="modal-form-body">
              <div className="form-field-group">
                <label className="field-label">Task Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. CA-03 Full Stack Project Submission"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="text-input"
                />
              </div>

              <div className="form-grid-two">
                <div className="form-field-group">
                  <label className="field-label">Subject / Course *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Web Technologies"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="text-input"
                  />
                </div>

                <div className="form-field-group">
                  <label className="field-label">Category Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="text-input select-input"
                  >
                    <option value="Assignment">Assignment</option>
                    <option value="Project">Project</option>
                    <option value="Test">Test / Quiz</option>
                    <option value="Lab">Lab Work</option>
                    <option value="Presentation">Presentation</option>
                    <option value="Study">Self Study</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="form-grid-three">
                <div className="form-field-group">
                  <label className="field-label">Due Date *</label>
                  <input
                    type="date"
                    required
                    value={formData.dueDate}
                    onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                    className="text-input"
                  />
                </div>

                <div className="form-field-group">
                  <label className="field-label">Priority</label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                    className="text-input select-input"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>

                <div className="form-field-group">
                  <label className="field-label">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="text-input select-input"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>

              <div className="form-field-group">
                <label className="field-label">Notes & Instructions</label>
                <textarea
                  rows={3}
                  placeholder="Additional submission guidelines, professor remarks, or resources..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="text-input textarea-input"
                ></textarea>
              </div>

              <div className="modal-actions-bar">
                <button type="button" onClick={handleCloseModal} className="btn-secondary-large">
                  Cancel
                </button>
                <button type="submit" disabled={formSubmitting} className="btn-primary-large">
                  {formSubmitting ? 'Saving...' : editingTask ? 'Update Task' : 'Save Task'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

