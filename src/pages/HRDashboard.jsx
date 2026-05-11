import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { getAllJobs, getJobApplications } from '../api'
import axios from 'axios'

function HRDashboard() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [jobs, setJobs] = useState([])
  const [selectedJob, setSelectedJob] = useState(null)
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [appLoading, setAppLoading] = useState(false)

  // Redirect if not company
 useEffect(() => {
  if (user === null) return  // still loading
  if (user.role !== 'company') {
    navigate('/')
  }
}, [user])

  // Load all jobs
  useEffect(() => {
    getAllJobs()
      .then((res) => setJobs(res.data.jobs))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false))
  }, [])

  // Load applications for selected job
  function handleSelectJob(job) {
    setSelectedJob(job)
    setAppLoading(true)
    getJobApplications(job._id)
      .then((res) => setApplications(res.data.applications))
      .catch((err) => console.log(err))
      .finally(() => setAppLoading(false))
  }

  // Update application status
  async function handleStatusChange(applicationId, newStatus) {
    try {
      const token = localStorage.getItem('token')
      await axios.patch(
        `http://localhost:5000/api/applications/${applicationId}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      // Update UI
      setApplications(applications.map((app) =>
        app._id === applicationId
          ? { ...app, status: newStatus }
          : app
      ))
    } catch (err) {
      console.log(err)
    }
  }

  const statusColors = {
    applied: 'bg-blue-50 text-blue-700',
    shortlisted: 'bg-green-50 text-green-700',
    interview: 'bg-purple-50 text-purple-700',
    rejected: 'bg-red-50 text-red-700'
  }

  if (!user || loading) {
  return (
    <div className="flex items-center justify-center py-20">
      <p className="text-gray-400">Loading dashboard...</p>
    </div>
  )
}

  return (
    <div className="max-w-6xl mx-auto px-8 py-10">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">HR Dashboard</h1>
        <p className="text-gray-500 mt-1">Manage your job postings and applicants</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Left — Jobs list */}
        <div className="md:col-span-1">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Your Jobs ({jobs.length})
          </h2>
          <div className="flex flex-col gap-3">
            {jobs.map((job) => (
              <div
                key={job._id}
                onClick={() => handleSelectJob(job)}
                className={`bg-white rounded-xl p-4 border cursor-pointer transition-all hover:border-blue-300 hover:shadow-sm ${selectedJob?._id === job._id ? 'border-blue-500 shadow-sm' : 'border-gray-100'}`}>
                <p className="font-semibold text-gray-800 text-sm">{job.title}</p>
                <p className="text-gray-400 text-xs mt-1">{job.company}</p>
                <span className="text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-700 mt-2 inline-block">
                  {job.type}
                </span>
              </div>
            ))}
            {jobs.length === 0 && (
              <p className="text-gray-400 text-sm">No jobs posted yet</p>
            )}
          </div>
        </div>

        {/* Right — Applications */}
        <div className="md:col-span-2">
          {!selectedJob ? (
            <div className="bg-white rounded-xl border border-gray-100 p-12 text-center">
              <p className="text-gray-400">Select a job on the left to see applicants</p>
            </div>
          ) : (
            <div>
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Applicants for — {selectedJob.title}
              </h2>

              {appLoading ? (
                <div className="bg-white rounded-xl border border-gray-100 p-12 text-center">
                  <p className="text-gray-400">Loading applicants...</p>
                </div>
              ) : applications.length === 0 ? (
                <div className="bg-white rounded-xl border border-gray-100 p-12 text-center">
                  <p className="text-gray-400">No applications yet for this job</p>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {applications.map((app) => (
                    <div key={app._id}
                      className="bg-white rounded-xl border border-gray-100 p-6">

                      {/* Candidate info */}
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <p className="font-semibold text-gray-800">
                            {app.candidate?.name || 'Unknown'}
                          </p>
                          <p className="text-gray-400 text-sm">
                            {app.candidate?.email || ''}
                          </p>
                        </div>
                        <span className={`text-xs px-3 py-1 rounded-full font-medium ${statusColors[app.status]}`}>
                          {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                        </span>
                      </div>

                      {/* Cover letter */}
                      <div className="mb-4">
                        <p className="text-xs font-medium text-gray-500 mb-1">
                          Cover Letter
                        </p>
                        <p className="text-gray-600 text-sm bg-gray-50 rounded-lg p-3 leading-relaxed">
                          {app.coverLetter || 'No cover letter provided'}
                        </p>
                      </div>

                      {/* CV link */}
                      {app.cvUrl && (
                        <div className="mb-4">
                          
                           <a href={app.cvUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-700 text-sm hover:underline">
                            📄 View CV
                          </a>
                        </div>
                      )}

                      {/* Status changer */}
                      <div className="flex gap-2 flex-wrap">
                        <p className="text-xs text-gray-400 w-full mb-1">
                          Update Status:
                        </p>
                        {['applied', 'shortlisted', 'interview', 'rejected'].map((status) => (
                          <button
                            key={status}
                            onClick={() => handleStatusChange(app._id, status)}
                            className={`text-xs px-3 py-1 rounded-full border transition-all ${app.status === status
                              ? statusColors[status] + ' border-transparent font-medium'
                              : 'border-gray-200 text-gray-500 hover:border-gray-300'}`}>
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                          </button>
                        ))}
                      </div>

                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  )
}

export default HRDashboard