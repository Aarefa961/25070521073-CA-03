import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  prn: { type: String, trim: true, default: '' },
  department: { type: String, trim: true, default: 'Computer Science & Engineering' },
  semester: { type: String, trim: true, default: '5th Semester' },
  status: { type: String, default: 'Student' },
  age: { type: Number, default: 20 },
  avatar: { type: String, default: '🎓' },
}, { timestamps: true });

export default mongoose.model('User', userSchema);

