import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { getMyApplications } from '../api'

function MyApplications() {
  const { user, loading: authLoading } = useAuth()
  const navigate = useNavigate()
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (authLoading) return

    if (!user) {
      navigate('/login')
      return
    }

    getMyApplications()
      .then((res) => setApplications(res.data.applications))
      .catch(() => setError('Failed to load applications'))
      .finally(() => setLoading(false))
  }, [user, authLoading])

  const statusColors = {
    applied:     'bg-blue-50 text-blue-700',
    shortlisted: 'bg-green-50 text-green-700',
    interview:   'bg-purple-50 text-purple-700',
    rejected:    'bg-red-50 text-red-700'
  }

  const statusIcons = {
    applied:     '📝',
    shortlisted: '✅',
    interview:   '🎯',
    rejected:    '❌'
  }

  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-gray-400 text-lg">Loading your applications...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-red-400">{error}</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-8 py-10">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Applications</h1>
        <p className="text-gray-500 mt-1">
          Track all your job applications in one place
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {['applied', 'shortlisted', 'interview', 'rejected'].map((status) => (
          <div key={status}
            className="bg-white rounded-xl border border-gray-100 p-4 text-center">
            <div className="text-2xl mb-1">{statusIcons[status]}</div>
            <div className="text-2xl font-bold text-gray-800">
              {applications.filter((a) => a.status === status).length}
            </div>
            <div className="text-xs text-gray-400 capitalize mt-1">{status}</div>
          </div>
        ))}
      </div>

      {/* Applications list */}
      {applications.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center">
          <div className="text-5xl mb-4">📋</div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            No applications yet
          </h2>
          <p className="text-gray-400 text-sm mb-6">
            Start applying for jobs to track them here
          </p>
          <Link to="/jobs"
            className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-lg text-sm font-medium transition-colors">
            Browse Jobs
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {applications.map((app) => (
            <div key={app._id}
              className="bg-white rounded-xl border border-gray-100 p-6 hover:border-blue-200 hover:shadow-sm transition-all">

              <div className="flex flex-col sm:flex-row justify-between items-start gap-4">

                {/* Job info */}
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 text-lg">
                    {app.job?.title || 'Job no longer available'}
                  </h3>
                  <p className="text-gray-500 text-sm mt-1">
                    {app.job?.company} · {app.job?.location}
                  </p>
                  <p className="text-blue-700 font-medium text-sm mt-1">
                    {app.job?.salary}
                  </p>

                  {/* Cover letter preview */}
                  {app.coverLetter && (
                    <div className="mt-3">
                      <p className="text-xs font-medium text-gray-400 mb-1">
                        Your Cover Letter
                      </p>
                      <p className="text-gray-600 text-sm bg-gray-50 rounded-lg p-3 line-clamp-2">
                        {app.coverLetter}
                      </p>
                    </div>
                  )}

                  {/* Applied date */}
                  <p className="text-xs text-gray-400 mt-3">
                    Applied on {new Date(app.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>

                {/* Right side */}
                <div className="flex flex-col items-start sm:items-end gap-3">
                  {/* Status badge */}
                  <span className={`text-xs px-3 py-1 rounded-full font-medium ${statusColors[app.status]}`}>
                    {statusIcons[app.status]} {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                  </span>

                  {/* View job button */}
                  {app.job?._id && (
                    <Link to={`/jobs/${app.job._id}`}
                      className="text-sm text-blue-700 hover:underline">
                      View Job →
                    </Link>
                  )}

                  {/* CV link */}
                  {app.cvUrl && (
                    <a href={app.cvUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm text-gray-500 hover:text-gray-700 hover:underline">
                      📄 My CV
                    </a>
                  )}
                </div>

              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  )
}

export default MyApplications