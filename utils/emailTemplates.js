function applicationConfirmationEmail(candidateName, jobTitle, company) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #1d4ed8; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 24px;">JobPortal</h1>
      </div>
      <div style="background: white; padding: 30px; border: 1px solid #e5e7eb; border-radius: 0 0 10px 10px;">
        <h2 style="color: #111827;">Application Received! 🎉</h2>
        <p style="color: #6b7280;">Hi <strong>${candidateName}</strong>,</p>
        <p style="color: #6b7280;">Your application for <strong>${jobTitle}</strong> at <strong>${company}</strong> has been successfully submitted.</p>
        <div style="background: #eff6ff; border-radius: 8px; padding: 20px; margin: 20px 0;">
          <p style="color: #1d4ed8; margin: 0; font-weight: 500;">What happens next?</p>
          <ul style="color: #6b7280; margin-top: 10px;">
            <li>The HR team will review your application</li>
            <li>You will receive an email if shortlisted</li>
            <li>Track your status on JobPortal</li>
          </ul>
        </div>
        <p style="color: #6b7280;">Good luck! 🚀</p>
        <p style="color: #6b7280;">The JobPortal Team</p>
      </div>
    </div>
  `
}

function shortlistEmail(candidateName, jobTitle, company) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #1d4ed8; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 24px;">JobPortal</h1>
      </div>
      <div style="background: white; padding: 30px; border: 1px solid #e5e7eb; border-radius: 0 0 10px 10px;">
        <h2 style="color: #111827;">Congratulations! You've been Shortlisted! ✅</h2>
        <p style="color: #6b7280;">Hi <strong>${candidateName}</strong>,</p>
        <p style="color: #6b7280;">Great news! You have been shortlisted for <strong>${jobTitle}</strong> at <strong>${company}</strong>.</p>
        <div style="background: #f0fdf4; border-radius: 8px; padding: 20px; margin: 20px 0; border: 1px solid #bbf7d0;">
          <p style="color: #15803d; margin: 0; font-weight: 500;">🎯 Next Steps</p>
          <ul style="color: #6b7280; margin-top: 10px;">
            <li>The HR team will contact you shortly</li>
            <li>Prepare for your interview</li>
            <li>Check your email regularly</li>
          </ul>
        </div>
        <p style="color: #6b7280;">Best of luck! 🌟</p>
        <p style="color: #6b7280;">The JobPortal Team</p>
      </div>
    </div>
  `
}

function interviewEmail(candidateName, jobTitle, company) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #1d4ed8; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 24px;">JobPortal</h1>
      </div>
      <div style="background: white; padding: 30px; border: 1px solid #e5e7eb; border-radius: 0 0 10px 10px;">
        <h2 style="color: #111827;">Interview Scheduled! 🎯</h2>
        <p style="color: #6b7280;">Hi <strong>${candidateName}</strong>,</p>
        <p style="color: #6b7280;">You have been selected for an interview for <strong>${jobTitle}</strong> at <strong>${company}</strong>.</p>
        <div style="background: #faf5ff; border-radius: 8px; padding: 20px; margin: 20px 0; border: 1px solid #e9d5ff;">
          <p style="color: #7c3aed; margin: 0; font-weight: 500;">📅 Interview Tips</p>
          <ul style="color: #6b7280; margin-top: 10px;">
            <li>Research the company thoroughly</li>
            <li>Prepare answers for common questions</li>
            <li>Dress professionally</li>
            <li>Arrive 10 minutes early</li>
          </ul>
        </div>
        <p style="color: #6b7280;">You've got this! 💪</p>
        <p style="color: #6b7280;">The JobPortal Team</p>
      </div>
    </div>
  `
}

module.exports = {
  applicationConfirmationEmail,
  shortlistEmail,
  interviewEmail
}