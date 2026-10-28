import express from 'express';
import mongoose from 'mongoose';
import Note from '../models/Note.js';

const router = express.Router();
const validId = (id) => mongoose.isValidObjectId(id);

// GET /api/notes
router.get('/', async (req, res, next) => {
  try {
    const { search = '', category, userId } = req.query;
    const filter = {};
    if (category && category !== 'All') filter.category = category;
    if (userId) filter.userId = userId;
    if (search.trim()) {
      const safe = search.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      filter.$or = [
        { title: { $regex: safe, $options: 'i' } },
        { subject: { $regex: safe, $options: 'i' } },
        { content: { $regex: safe, $options: 'i' } },
      ];
    }
    const notes = await Note.find(filter).sort({ pinned: -1, updatedAt: -1 });
    res.json(notes);
  } catch (err) {
    next(err);
  }
});

// POST /api/notes
router.post('/', async (req, res, next) => {
  try {
    const { title, subject, content } = req.body;
    if (!title?.trim() || !subject?.trim() || !content?.trim()) {
      return res.status(400).json({ message: 'Title, subject, and content are required.' });
    }
    const note = await Note.create(req.body);
    res.status(201).json(note);
  } catch (err) {
    next(err);
  }
});

// PATCH /api/notes/:id
router.patch('/:id', async (req, res, next) => {
  try {
    if (!validId(req.params.id)) return res.status(400).json({ message: 'Invalid note ID.' });
    const note = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!note) return res.status(404).json({ message: 'Note not found.' });
    res.json(note);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/notes/:id
router.delete('/:id', async (req, res, next) => {
  try {
    if (!validId(req.params.id)) return res.status(400).json({ message: 'Invalid note ID.' });
    const note = await Note.findByIdAndDelete(req.params.id);
    if (!note) return res.status(404).json({ message: 'Note not found.' });
    res.json({ message: 'Note deleted successfully.' });
  } catch (err) {
    next(err);
  }
});

export default router;

