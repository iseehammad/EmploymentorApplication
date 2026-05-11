const express = require('express')
const router = express.Router()
const Job = require('../models/Job')

// ===== GET ALL JOBS =====
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 })
    res.json({ success: true, jobs })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

// ===== GET SINGLE JOB =====
router.get('/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' })
    }
    res.json({ success: true, job })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

// ===== CREATE JOB =====
router.post('/', async (req, res) => {
  try {
    const { title, company, location, type, salary, description, requirements, tags, remote } = req.body

    if (!title || !company || !salary || !description) {
      return res.status(400).json({ success: false, message: 'Please fill all required fields' })
    }

    const job = await Job.create({
      title,
      company,
      location,
      type,
      salary,
      description,
      requirements,
      tags,
      remote
    })

    res.status(201).json({ success: true, job })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

// ===== UPDATE JOB =====
router.put('/:id', async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' })
    }
    res.json({ success: true, job })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

// ===== DELETE JOB =====
router.delete('/:id', async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id)
    if (!job) {
      return res.status(404).json({ success: false, message: 'Job not found' })
    }
    res.json({ success: true, message: 'Job deleted successfully' })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

module.exports = router