const express = require('express')
const router = express.Router()
const Application = require('../models/Application')
const Job = require('../models/Job')
const User = require('../models/User')
const protect = require('../middleware/authMiddleware')
const sendEmail = require('../utils/sendEmail')
const {
  applicationConfirmationEmail,
  shortlistEmail,
  interviewEmail
} = require('../utils/emailTemplates')

// ===== APPLY FOR JOB =====
router.post('/', protect, async (req, res) => {
  try {
    const { job, coverLetter, cvUrl } = req.body

    if (!job) {
      return res.status(400).json({
        success: false,
        message: 'Job ID is required'
      })
    }

    // Check if already applied
    const existing = await Application.findOne({
      job,
      candidate: req.user._id
    })

    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'You have already applied for this job'
      })
    }

    const application = await Application.create({
      job,
      candidate: req.user._id,
      coverLetter,
      cvUrl
    })

    // Send confirmation email
    const jobDetails = await Job.findById(job)
    await sendEmail({
      to: req.user.email,
      subject: `Application Received — ${jobDetails?.title}`,
      html: applicationConfirmationEmail(
        req.user.name,
        jobDetails?.title,
        jobDetails?.company
      )
    })

    res.status(201).json({ success: true, application })

  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

// ===== GET MY APPLICATIONS (candidate) =====
router.get('/my', protect, async (req, res) => {
  try {
    const applications = await Application.find({
      candidate: req.user._id
    }).populate('job', 'title company location salary')

    res.json({ success: true, applications })

  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

// ===== GET ALL APPLICATIONS FOR A JOB (HR) =====
router.get('/job/:jobId', protect, async (req, res) => {
  try {
    const applications = await Application.find({
      job: req.params.jobId
    }).populate('candidate', 'name email')

    res.json({ success: true, applications })

  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

// ===== UPDATE APPLICATION STATUS =====
router.patch('/:id/status', protect, async (req, res) => {
  try {
    const { status } = req.body

    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate('candidate', 'name email')
     .populate('job', 'title company')

    if (!application) {
      return res.status(404).json({
        success: false,
        message: 'Application not found'
      })
    }

    // Send email based on new status
    if (status === 'shortlisted') {
      await sendEmail({
        to: application.candidate.email,
        subject: `You've been Shortlisted — ${application.job.title}`,
        html: shortlistEmail(
          application.candidate.name,
          application.job.title,
          application.job.company
        )
      })
    }

    if (status === 'interview') {
      await sendEmail({
        to: application.candidate.email,
        subject: `Interview Scheduled — ${application.job.title}`,
        html: interviewEmail(
          application.candidate.name,
          application.job.title,
          application.job.company
        )
      })
    }

    res.json({ success: true, application })

  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

module.exports = router