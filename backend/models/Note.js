// backend/models/Note.js
const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    body: String,
  },
  { timestamps: true }
)

module.exports = mongoose.model('Note', noteSchema)