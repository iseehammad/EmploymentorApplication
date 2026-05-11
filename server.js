const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);

dotenv.config()

const app = express()

// Middleware
app.use(cors({
  origin: '*'
}))
app.use(express.json())

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'JobPortal API is running!' })
})

// Routes
app.use('/api/auth', require('./Routes/auth'))
app.use('/api/jobs', require('./Routes/jobs'))
app.use('/api/applications', require('./Routes/applications'))

// Connect to MongoDB then start server
const PORT = process.env.PORT || 5000

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected!')
    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`)
    })
  })
  .catch((err) => {
    console.log('❌ MongoDB connection error:', err.message)
  })