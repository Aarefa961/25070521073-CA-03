import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true, maxlength: 120 },
  subject: { type: String, required: true, trim: true, maxlength: 80 },
  type: { type: String, enum: ['Assignment', 'Project', 'Test', 'Study', 'Lab', 'Presentation', 'Other'], default: 'Assignment' },
  dueDate: { type: Date, required: true },
  priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
  status: { type: String, enum: ['Pending', 'In Progress', 'Completed'], default: 'Pending' },
  notes: { type: String, trim: true, maxlength: 1000, default: '' },
  userId: { type: String, default: 'default' },
}, { timestamps: true });

export default mongoose.model('Task', taskSchema);
