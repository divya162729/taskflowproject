// backend/routes/noteRoutes.js
const express = require('express')
const Note = require('../models/Note')
const auth = require('../middleware/authMiddleware')

const router = express.Router()

// GET /api/notes - list notes of logged-in user
router.get('/', auth, async (req, res) => {
  const notes = await Note.find({ user: req.user._id }).sort({ createdAt: -1 })
  res.json({ notes })
})

// POST /api/notes - create note
router.post('/', auth, async (req, res) => {
  const { title, body } = req.body
  if (!title) return res.status(400).json({ message: 'Title required' })
  const note = await Note.create({
    user: req.user._id,
    title,
    body,
  })
  res.status(201).json({ note })
})

// DELETE /api/notes/:id - delete note
router.delete('/:id', auth, async (req, res) => {
  const note = await Note.findOneAndDelete({
    _id: req.params.id,
    user: req.user._id,
  })
  if (!note) return res.status(404).json({ message: 'Note not found' })
  res.json({ message: 'Deleted' })
})

module.exports = router