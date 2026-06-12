// backend/models/Routine.js
const mongoose = require('mongoose')

const routineSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    time: { type: String, default: 'Morning' },
    done: { type: Boolean, default: false },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Routine', routineSchema)