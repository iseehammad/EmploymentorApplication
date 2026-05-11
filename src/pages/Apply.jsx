import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { applyForJob } from '../api'

function Apply() {
  const { id } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    coverLetter: '',
    cvUrl: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    if (!user) {
      navigate('/login')
      return
    }

    if (!form.coverLetter) {
      setError('Please write a cover letter')
      return
    }

    try {
      setLoading(true)
      await applyForJob({
        job: id,
        coverLetter: form.coverLetter,
        cvUrl: form.cvUrl
      })
      setSuccess(true)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to apply. Try again.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center max-w-md w-full">
          <div className="text-5xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Application Submitted!
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            Your application has been sent successfully. The HR team will review it and get back to you.
          </p>
          <Link to="/jobs"
            className="block w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 rounded-lg transition-colors text-sm text-center">
            Browse More Jobs
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <Link to={`/jobs/${id}`}
            className="text-blue-700 text-sm hover:underline">
            ← Back to job
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mt-4">
            Apply for this Job
          </h1>
          <p className="text-gray-500 mt-1 text-sm">
            Fill in your details below
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 space-y-6">

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          {/* Candidate info — readonly */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">
                Your Name
              </label>
              <input
                type="text"
                value={user?.name || ''}
                readOnly
                className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-500 bg-gray-50 text-sm"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">
                Your Email
              </label>
              <input
                type="email"
                value={user?.email || ''}
                readOnly
                className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-500 bg-gray-50 text-sm"
              />
            </div>
          </div>

          {/* CV URL */}
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              CV Link
            </label>
            <input
              type="url"
              name="cvUrl"
              value={form.cvUrl}
              onChange={handleChange}
              placeholder="https://drive.google.com/your-cv-link"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-800 outline-none focus:border-blue-400 text-sm"
            />
            <p className="text-xs text-gray-400 mt-1">
              Upload your CV to Google Drive and paste the link here
            </p>
          </div>

          {/* Cover Letter */}
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              Cover Letter <span className="text-red-500">*</span>
            </label>
            <textarea
              name="coverLetter"
              value={form.coverLetter}
              onChange={handleChange}
              rows={6}
              placeholder="Tell the employer why you are the best candidate for this role..."
              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-800 outline-none focus:border-blue-400 text-sm resize-none"
            />
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 rounded-lg transition-colors text-sm disabled:opacity-60">
            {loading ? 'Submitting...' : 'Submit Application'}
          </button>

        </div>
      </div>
    </div>
  )
}

export default Apply