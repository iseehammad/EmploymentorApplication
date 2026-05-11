const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

// ===== REGISTER =====
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body

    // Check all fields
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please fill all fields'
      })
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Email already registered'
      })
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || 'candidate'
    })

    // Create JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    })

  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

// ===== LOGIN =====
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    // Check fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please enter email and password'
      })
    }

    // Find user by email
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email or password'
      })
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email or password'
      })
    }

    // Create JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    })

  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

// ===== GET CURRENT USER =====
router.get('/me', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'No token provided'
      })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(decoded.id).select('-password')

    res.json({ success: true, user })

  } catch (err) {
    res.status(401).json({ success: false, message: 'Invalid token' })
  }
})

module.exports = router