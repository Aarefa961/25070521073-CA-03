import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 150 },
  subject: { type: String, required: true, trim: true, maxlength: 80 },
  content: { type: String, required: true, trim: true, maxlength: 5000 },
  category: { type: String, enum: ['Lecture', 'Lab', 'Exam Prep', 'Formula Sheet', 'General'], default: 'Lecture' },
  pinned: { type: Boolean, default: false },
  userId: { type: String, default: 'default' },
}, { timestamps: true });

export default mongoose.model('Note', noteSchema);

