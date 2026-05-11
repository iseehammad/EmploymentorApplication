const jwt = require('jsonwebtoken')
const User = require('../models/User')

const protect = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized — no token'
      })
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // Get user from database
    req.user = await User.findById(decoded.id).select('-password')

    next()

  } catch (err) {
    res.status(401).json({
      success: false,
      message: 'Not authorized — invalid token'
    })
  }
}

module.exports = protect