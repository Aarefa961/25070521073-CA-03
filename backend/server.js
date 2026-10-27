import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import tasksRouter from './routes/tasks.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.resolve(__dirname, '../frontend/dist');

// Load .env from root or backend directory
dotenv.config();
dotenv.config({ path: path.resolve(__dirname, '.env') });

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/flexi';

const app = express();

// Flexible CORS support for local development and separate frontend deployment
const originSetting = process.env.FRONTEND_ORIGIN;
app.use(cors({
  origin: originSetting
    ? (originSetting.includes(',') ? originSetting.split(',').map(s => s.trim()) : originSetting)
    : true,
  credentials: true,
}));

app.use(express.json({ limit: '1mb' }));
app.get('/api/health', (_req, res) => res.json({ status: 'ok', database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected' }));
app.use('/api/tasks', tasksRouter);

// Serve frontend build if dist folder is present (single-service production deployment)
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) return next();
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

app.use((req, res) => res.status(404).json({ message: `Route not found: ${req.method} ${req.path}` }));
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ message: 'Internal server error.' });
});

app.listen(PORT, () => console.log(`FLEXI API running at http://localhost:${PORT}`));

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Could not connect to MongoDB:', err.message);
    console.error('Tip: Check your MONGODB_URI in environment variables and ensure 0.0.0.0/0 is whitelisted in Atlas Network Access.');
  });
