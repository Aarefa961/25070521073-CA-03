import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'MY_SECRET_TOKEN';

// Middleware to verify JWT token
export function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    req.user = null;
    return next();
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    req.user = null;
    next();
  }
}

// Student registration / signup
router.post('/register', async (req, res, next) => {
  try {
    const { name, email, password, prn = '', department = 'Computer Science & Engineering', semester = '5th Semester', status = 'Student' } = req.body;

    if (!name?.trim() || !email?.trim() || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required.' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long.' });
    }

    const existing = await User.findOne({ email: email.trim().toLowerCase() });
    if (existing) {
      return res.status(409).json({ message: 'A student with this email is already registered.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password: hashedPassword,
      prn: prn.trim(),
      department: department.trim(),
      semester: semester.trim(),
      status,
    });

    const payload = { id: user._id, email: user.email, name: user.name, status: user.status };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({
      message: 'Registration successful!',
      token,
      jwtToken: token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        prn: user.prn,
        department: user.department,
        semester: user.semester,
        status: user.status,
        avatar: user.avatar,
      },
    });
  } catch (err) {
    next(err);
  }
});

// Student login
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email?.trim() || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    const user = await User.findOne({ email: email.trim().toLowerCase() });
    if (!user) {
      return res.status(422).json({ message: 'Invalid email or user not found.', msg: 'Invalid Email' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid password. Please check your credentials.' });
    }

    const payload = { id: user._id, email: user.email, name: user.name, status: user.status };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });

    res.json({
      message: 'Login successful!',
      token,
      jwtToken: token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        prn: user.prn,
        department: user.department,
        semester: user.semester,
        status: user.status,
        avatar: user.avatar,
      },
    });
  } catch (err) {
    next(err);
  }
});

// Get logged in student profile
router.get('/me', authMiddleware, async (req, res, next) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ message: 'Unauthorized. Please log in.' });
    }
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found.' });
    res.json(user);
  } catch (err) {
    next(err);
  }
});

export default router;
