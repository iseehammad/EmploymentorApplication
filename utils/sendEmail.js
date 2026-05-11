const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
})

async function sendEmail({ to, subject, html }) {
  try {
    await transporter.sendMail({
      from: `"JobPortal" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html
    })
    console.log(`✅ Email sent to ${to}`)
  } catch (err) {
    console.log('❌ Email error:', err.message)
  }
}

module.exports = sendEmail