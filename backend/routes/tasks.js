import express from 'express';
import mongoose from 'mongoose';
import Task from '../models/Task.js';

const router = express.Router();
const validId = (id) => mongoose.isValidObjectId(id);

router.get('/', async (req, res, next) => {
  try {
    const { search = '', status, type } = req.query;
    const filter = {};
    if (status && ['Pending', 'Completed'].includes(status)) filter.status = status;
    if (type && ['Assignment', 'Project', 'Test', 'Study', 'Other'].includes(type)) filter.type = type;
    if (search.trim()) {
      const safeSearch = search.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      filter.$or = [{ title: { $regex: safeSearch, $options: 'i' } }, { subject: { $regex: safeSearch, $options: 'i' } }];
    }
    const tasks = await Task.find(filter).sort({ dueDate: 1, createdAt: -1 });
    res.json(tasks);
  } catch (err) { next(err); }
});

router.get('/:id', async (req, res, next) => {
  try {
    if (!validId(req.params.id)) return res.status(400).json({ message: 'Invalid task ID.' });
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found.' });
    res.json(task);
  } catch (err) { next(err); }
});

router.post('/', async (req, res, next) => {
  try {
    const { title, subject, dueDate } = req.body;
    if (!title?.trim() || !subject?.trim() || !dueDate) {
      return res.status(400).json({ message: 'Title, subject, and due date are required.' });
    }
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (err) {
    if (err.name === 'ValidationError') return res.status(400).json({ message: err.message });
    next(err);
  }
});

router.patch('/:id', async (req, res, next) => {
  try {
    if (!validId(req.params.id)) return res.status(400).json({ message: 'Invalid task ID.' });
    const allowed = ['title', 'subject', 'type', 'dueDate', 'priority', 'status', 'notes'];
    const updates = Object.fromEntries(Object.entries(req.body).filter(([key]) => allowed.includes(key)));
    const task = await Task.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });
    if (!task) return res.status(404).json({ message: 'Task not found.' });
    res.json(task);
  } catch (err) {
    if (err.name === 'ValidationError') return res.status(400).json({ message: err.message });
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    if (!validId(req.params.id)) return res.status(400).json({ message: 'Invalid task ID.' });
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found.' });
    res.json({ message: 'Task deleted.' });
  } catch (err) { next(err); }
});

export default router;
