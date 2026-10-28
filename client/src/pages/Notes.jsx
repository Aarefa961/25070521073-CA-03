import React, { useState, useEffect, useMemo } from 'react';
import { apiRequest } from '../context/AuthContext';
import { BookOpen, Plus, Search, Pin, Copy, Check, Trash2, X, Tag, Sparkles } from 'lucide-react';

const initialSampleNotes = [
  {
    _id: 'note-1',
    title: 'MERN Stack Architecture & REST API Guidelines',
    subject: 'Web Technologies',
    category: 'Lecture',
    pinned: true,
    content: `1. Frontend (React 18 + Vite): Manages client routing with react-router-dom and consumes endpoints via fetch/axios.\n2. Backend (Node.js + Express): Defines modular routers with express.Router() and applies cors + json body parsing.\n3. Database (MongoDB Atlas): Connects via Mongoose ODM; models define schemas with validation.\n4. Authentication: Uses bcrypt for 10-round password hashing and jsonwebtoken (JWT) for stateless bearer authentication.`,
  },
  {
    _id: 'note-2',
    title: 'MongoDB CRUD Cheatsheet & Operators',
    subject: 'Database Systems',
    category: 'Formula Sheet',
    pinned: true,
    content: `db.collection.find({ age: { $gte: 18 } })\ndb.collection.updateOne({ _id: ObjectId("...") }, { $set: { status: "Active" } })\ndb.collection.aggregate([\n  { $match: { status: "Completed" } },\n  { $group: { _id: "$subject", total: { $sum: 1 } } }\n])`,
  },
  {
    _id: 'note-3',
    title: 'React Hooks Core Rules & Patterns',
    subject: 'Web Technologies',
    category: 'Exam Prep',
    pinned: false,
    content: `• useState: Persistent local state across re-renders.\n• useEffect: Handles side effects; always declare dependencies in dependency array.\n• useCallback: Memoizes function instances to avoid re-triggering child component renders.\n• useMemo: Memoizes costly computed values.\n• useContext: Shares state globally without prop drilling.`,
  },
  {
    _id: 'note-4',
    title: 'Dynamic Programming Formula & Recurrences',
    subject: 'Design & Analysis of Algorithms',
    category: 'Formula Sheet',
    pinned: false,
    content: `• 0/1 Knapsack: V[i, w] = max(V[i-1, w], val[i] + V[i-1, w - wt[i]])\n• Longest Common Subsequence (LCS): if (X[i] == Y[j]) 1 + c[i-1, j-1] else max(c[i-1, j], c[i, j-1])\n• Matrix Chain Multiplication: m[i, j] = min(m[i, k] + m[k+1, j] + p[i-1]*p[k]*p[j])`,
  },
];

export default function Notes() {
  const [notes, setNotes] = useState(initialSampleNotes);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copiedId, setCopiedId] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    subject: '',
    category: 'Lecture',
    content: '',
  });

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim()) return;
    const created = { ...formData, _id: 'client-note-' + Date.now(), pinned: false };
    setNotes([created, ...notes]);
    setIsModalOpen(false);
    setFormData({ title: '', subject: '', category: 'Lecture', content: '' });
  };

  const togglePin = (id) => {
    setNotes(notes.map((n) => (n._id === id ? { ...n, pinned: !n.pinned } : n)));
  };

  const handleDelete = (id) => {
    if (!window.confirm('Delete this study note?')) return;
    setNotes(notes.filter((n) => n._id !== id));
  };

  const filteredNotes = useMemo(() => {
    return notes
      .filter((n) => {
        const matchesCategory = categoryFilter === 'All' || n.category === categoryFilter;
        const matchesSearch =
          n.title.toLowerCase().includes(search.toLowerCase()) ||
          n.subject.toLowerCase().includes(search.toLowerCase()) ||
          n.content.toLowerCase().includes(search.toLowerCase());
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0));
  }, [notes, search, categoryFilter]);

  return (
    <div className="notes-page-container">
      {/* Header */}
      <div className="tasks-header-bar">
        <div>
          <h1 className="tasks-main-title">Study Notes & Formula Sheets</h1>
          <p className="tasks-subtext">Quick revision notes, lab formulas, and exam prep sheets</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="btn-primary-large">
          <Plus size={18} />
          <span>Create Note</span>
        </button>
      </div>

      {/* Toolbar */}
      <div className="tasks-toolbar-card">
        <div className="toolbar-search-box">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search notes by subject, title, or keyword..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="toolbar-search-input"
          />
        </div>

        <div className="toolbar-filters-row">
          <div className="filter-dropdown-group">
            <label>Category:</label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="toolbar-select"
            >
              <option value="All">All Categories</option>
              <option value="Lecture">Lecture Summary</option>
              <option value="Lab">Lab Instructions</option>
              <option value="Exam Prep">Exam Preparation</option>
              <option value="Formula Sheet">Formula Sheet</option>
            </select>
          </div>
        </div>
      </div>

      {/* Notes Grid */}
      <div className="notes-cards-grid">
        {filteredNotes.map((note) => (
          <div key={note._id} className={`note-card-box ${note.pinned ? 'note-pinned' : ''}`}>
            <div className="note-card-top">
              <span className="note-category-badge">{note.category}</span>
              <div className="note-top-actions">
                <button
                  onClick={() => togglePin(note._id)}
                  className={`note-pin-btn ${note.pinned ? 'is-pinned' : ''}`}
                  title={note.pinned ? 'Unpin Note' : 'Pin to Top'}
                >
                  <Pin size={15} />
                </button>
                <button
                  onClick={() => handleCopy(note._id, note.content)}
                  className="note-copy-btn"
                  title="Copy Note Text"
                >
                  {copiedId === note._id ? <Check size={15} className="text-emerald" /> : <Copy size={15} />}
                </button>
                <button
                  onClick={() => handleDelete(note._id)}
                  className="note-del-btn"
                  title="Delete Note"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>

            <h3 className="note-card-title">{note.title}</h3>
            <span className="note-card-subject">{note.subject}</span>

            <pre className="note-card-content">{note.content}</pre>
          </div>
        ))}
      </div>

      {/* Create Note Modal */}
      {isModalOpen && (
        <div className="modal-backdrop">
          <div className="modal-dialog-box">
            <div className="modal-header">
              <h3>Create Academic Study Note</h3>
              <button onClick={() => setIsModalOpen(false)} className="modal-close-btn">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddNote} className="modal-form-body">
              <div className="form-field-group">
                <label className="field-label">Note Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dynamic Programming Recurrence Relations"
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
                    placeholder="e.g. Design & Analysis of Algorithms"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="text-input"
                  />
                </div>

                <div className="form-field-group">
                  <label className="field-label">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="text-input select-input"
                  >
                    <option value="Lecture">Lecture Summary</option>
                    <option value="Lab">Lab Instructions</option>
                    <option value="Exam Prep">Exam Preparation</option>
                    <option value="Formula Sheet">Formula Sheet</option>
                  </select>
                </div>
              </div>

              <div className="form-field-group">
                <label className="field-label">Content / Formula / Summary *</label>
                <textarea
                  rows={6}
                  required
                  placeholder="Write formulas, algorithms, or revision points here..."
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="text-input textarea-input"
                ></textarea>
              </div>

              <div className="modal-actions-bar">
                <button type="button" onClick={() => setIsModalOpen(false)} className="btn-secondary-large">
                  Cancel
                </button>
                <button type="submit" className="btn-primary-large">
                  Save Study Note
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

