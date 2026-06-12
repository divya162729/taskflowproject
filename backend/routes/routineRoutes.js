// backend/routes/routineRoutes.js
const express = require('express')
const Routine = require('../models/Routine')
const auth = require('../middleware/authMiddleware')

const router = express.Router()

// GET /api/routines - all routines for user
router.get('/', auth, async (req, res) => {
  const routines = await Routine.find({ user: req.user._id }).sort({ createdAt: 1 })
  res.json({ routines })
})

// POST /api/routines - create new routine
router.post('/', auth, async (req, res) => {
  const { title, time } = req.body
  if (!title) return res.status(400).json({ message: 'Title required' })

  const routine = await Routine.create({
    user: req.user._id,
    title,
    time: time || 'Morning',
    done: false,
  })
  res.status(201).json({ routine })
})

// PUT /api/routines/:id - update (e.g. toggle done, edit)
router.put('/:id', auth, async (req, res) => {
  const routine = await Routine.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    req.body,
    { new: true }
  )
  if (!routine) return res.status(404).json({ message: 'Routine not found' })
  res.json({ routine })
})

// DELETE /api/routines/:id - delete
router.delete('/:id', auth, async (req, res) => {
  const routine = await Routine.findOneAndDelete({
    _id: req.params.id,
    user: req.user._id,
  })
  if (!routine) return res.status(404).json({ message: 'Routine not found' })
  res.json({ message: 'Deleted' })
})

module.exports = router