import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getJobById } from '../api'

function JobDetail() {
  const { id } = useParams()
  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getJobById(id)
      .then((res) => setJob(res.data.job))
      .catch(() => setError('Job not found'))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-gray-400 text-lg">Loading job...</p>
      </div>
    )
  }

  if (error || !job) {
    return (
      <div className="max-w-4xl mx-auto px-8 py-20 text-center">
        <p className="text-gray-400 text-xl">Job not found.</p>
        <Link to="/jobs" className="text-blue-700 mt-4 inline-block">← Back to Jobs</Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-8 py-10">

      {/* Back link */}
      <Link to="/jobs" className="text-blue-700 text-sm hover:underline">
        ← Back to all jobs
      </Link>

      {/* Header */}
      <div className="bg-white rounded-xl p-8 border border-gray-100 mt-4 mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
          <div className="flex gap-4">
            <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center text-3xl">
              💼
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">{job.title}</h1>
              <p className="text-gray-500">{job.company} · {job.location}</p>
              <div className="flex gap-2 mt-3 flex-wrap">
                <span className="text-xs px-3 py-1 rounded-full bg-blue-50 text-blue-700 font-medium">{job.type}</span>
                {job.remote && (
                  <span className="text-xs px-3 py-1 rounded-full bg-green-50 text-green-700 font-medium">Remote</span>
                )}
                {job.tags.map((tag) => (
                  <span key={tag} className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-600">{tag}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start sm:items-end gap-2 w-full sm:w-auto">
            <p className="text-xl font-bold text-blue-700">{job.salary}</p>
            <Link to={`/apply/${job._id}`}
              className="bg-blue-700 text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition-colors text-sm font-medium w-full sm:w-auto text-center">
              Apply Now
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Description */}
        <div className="md:col-span-2 bg-white rounded-xl p-8 border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Job Description</h2>
          <p className="text-gray-600 leading-relaxed mb-6">{job.description}</p>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Requirements</h2>
          <ul className="space-y-2">
            {job.requirements.map((req) => (
              <li key={req} className="flex gap-2 text-gray-600 text-sm">
                <span className="text-blue-700 font-bold mt-0.5">✓</span>
                {req}
              </li>
            ))}
          </ul>
        </div>

        {/* Sidebar */}
        <div className="bg-white rounded-xl p-6 border border-gray-100 h-fit">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Job Overview</h2>
          <div className="space-y-3 text-sm">
            <div>
              <p className="text-gray-400">Company</p>
              <p className="font-medium text-gray-700">{job.company}</p>
            </div>
            <div>
              <p className="text-gray-400">Location</p>
              <p className="font-medium text-gray-700">{job.location}</p>
            </div>
            <div>
              <p className="text-gray-400">Job Type</p>
              <p className="font-medium text-gray-700">{job.type}</p>
            </div>
            <div>
              <p className="text-gray-400">Salary</p>
              <p className="font-medium text-gray-700">{job.salary}</p>
            </div>
            <div>
              <p className="text-gray-400">Remote</p>
              <p className="font-medium text-gray-700">{job.remote ? 'Yes' : 'No'}</p>
            </div>
          </div>
          <Link to={`/apply/${job._id}`}
            className="mt-6 block text-center bg-blue-700 text-white py-2 rounded-lg hover:bg-blue-800 transition-colors text-sm font-medium">
            Apply Now
          </Link>
        </div>

      </div>
    </div>
  )
}

export default JobDetail