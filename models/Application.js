const mongoose = require('mongoose')

const applicationSchema = new mongoose.Schema({
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true
  },
  candidate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  coverLetter: {
    type: String,
    default: ''
  },
  cvUrl: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['applied', 'shortlisted', 'rejected', 'interview'],
    default: 'applied'
  },
  aiScore: {
    type: Number,
    default: null
  },
  aiReason: {
    type: String,
    default: ''
  }
}, { timestamps: true })

module.exports = mongoose.model('Application', applicationSchema)