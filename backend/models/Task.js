// backend/models/Task.js
const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: String,
    priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
    category: {
      type: String,
      enum: ['personal', 'work', 'study', 'shopping'],
      default: 'personal',
    },
    dueDate: Date,
    completed: { type: Boolean, default: false },
    starred: { type: Boolean, default: false },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Task', taskSchema)