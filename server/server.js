import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

import authRouter, { authMiddleware } from './routes/auth.js';
import tasksRouter from './routes/tasks.js';
import notesRouter from './routes/notes.js';
import Task from './models/Task.js';
import User from './models/User.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.resolve(__dirname, '../client/dist');

// Load environment variables
dotenv.config();
dotenv.config({ path: path.resolve(__dirname, '.env') });

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/flexi';

const app = express();

// Enable CORS
const originSetting = process.env.FRONTEND_ORIGIN;
app.use(cors({
  origin: originSetting
    ? (originSetting.includes(',') ? originSetting.split(',').map(s => s.trim()) : originSetting)
    : true,
  credentials: true,
}));

app.use(express.json({ limit: '5mb' }));

// Health Check API
app.get('/api/health', (_req, res) => res.json({
  status: 'ok',
  project: 'FLEXI — Academic Organizer (CA-03)',
  database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
  databaseName: mongoose.connection.name || 'sitSecB',
}));

// API Routes
app.use('/api/auth', authRouter);
app.use('/api/tasks', tasksRouter);
app.use('/api/notes', notesRouter);

// -------------------------------------------------------------
// PROFESSOR COMPATIBILITY ENDPOINTS (Matching 25070521060-CA-03)
// -------------------------------------------------------------
app.post('/create', async (req, res, next) => {
  // Alias for registration / user creation matching professor's route
  req.url = '/register';
  return authRouter(req, res, next);
});

app.post('/login', async (req, res, next) => {
  // Alias for login matching professor's route
  return authRouter(req, res, next);
});

  app.get('/getall', async (req, res, next) => {
    try {
      if (req.query.type === 'student' || req.query.collection === 'student') {
        const students = await User.find().select('-password').sort({ createdAt: -1 });
        return res.json(students);
      }
      const tasks = await Task.find().sort({ createdAt: -1 });
      if (tasks.length === 0) {
        const students = await User.find().select('-password').sort({ createdAt: -1 });
        return res.json(students);
      }
      res.json(tasks);
    } catch (err) {
      next(err);
    }
  });

  app.get('/get/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const student = await User.findById(id).select('-password');
      if (student) return res.json(student);
      const task = await Task.findById(id);
      if (task) return res.json(task);
      res.status(404).json({ msg: 'Student Id Invalid' });
    } catch (err) {
      next(err);
    }
  });

  app.put('/update/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const student = await User.findById(id);
      if (student) {
        const { status } = req.body;
        if (status) student.status = status;
        await student.save();
        return res.json({ acknowledged: true, modifiedCount: 1, student });
      }
      const task = await Task.findByIdAndUpdate(id, req.body, { new: true });
      if (task) return res.json(task);
      res.status(404).json({ msg: 'Student Id Invalid' });
    } catch (err) {
      next(err);
    }
  });

  app.delete('/delete/:id', async (req, res, next) => {
    try {
      const id = req.params.id;
      const student = await User.findByIdAndDelete(id);
      if (student) return res.json({ acknowledged: true, deletedCount: 1, student });
      const task = await Task.findByIdAndDelete(id);
      if (task) return res.json({ acknowledged: true, deletedCount: 1, task });
      res.status(404).json({ msg: 'Student Id Invalid' });
    } catch (err) {
      next(err);
    }
  });

  // Serve compiled client in production if dist exists
  if (fs.existsSync(distPath)) {
    app.use(express.static(distPath));
    app.get('*', (req, res, next) => {
      if (req.path.startsWith('/api') || req.path.startsWith('/getall') || req.path === '/login' || req.path === '/create') {
        return next();
      }
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  // 404 handler
  app.use('/api/*', (req, res) => res.status(404).json({ message: `API route not found: ${req.method} ${req.path}` }));
  app.use((req, res) => res.status(404).json({ message: `Route not found: ${req.method} ${req.path}` }));

  // Error handler
  app.use((err, _req, res, _next) => {
    console.error(err);
    res.status(500).json({ message: 'Internal server error.', error: err.message });
  });

  // Start listening
  app.listen(PORT, () => {
    console.log(`FLEXI Academic Organizer server running at http://localhost:${PORT}`);
  });

  // Connect to MongoDB (Community Server / Compass)
  mongoose.connect(MONGODB_URI)
    .then(() => {
      console.log('Connected to MongoDB database:', mongoose.connection.name);
      console.log(`Connection endpoint: ${MONGODB_URI.includes('@') ? MONGODB_URI.replace(/\/\/.*@/, '//***@') : MONGODB_URI}`);
    })
    .catch((err) => {
      console.error('MongoDB connection error:', err.message);
      console.log('Note: Make sure MongoDB Community Server is installed and running locally on port 27017.');
      console.log('In MongoDB Compass, connect to: mongodb://127.0.0.1:27017');
    });
