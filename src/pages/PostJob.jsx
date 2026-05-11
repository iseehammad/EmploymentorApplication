import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { createJob } from '../api'

function PostJob() {
  const { user } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    title: '',
    company: user?.name || '',
    location: '',
    type: 'Full Time',
    salary: '',
    description: '',
    requirements: '',
    tags: '',
    remote: false
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleChange(e) {
    const value = e.target.type === 'checkbox'
      ? e.target.checked
      : e.target.value
    setForm({ ...form, [e.target.name]: value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    if (!form.title || !form.company || !form.salary || !form.description) {
      setError('Please fill all required fields')
      return
    }

    if (!user) {
      navigate('/login')
      return
    }

    try {
      setLoading(true)

      // Convert requirements and tags from string to array
      const jobData = {
        ...form,
        requirements: form.requirements
          .split('\n')
          .map((r) => r.trim())
          .filter((r) => r !== ''),
        tags: form.tags
          .split(',')
          .map((t) => t.trim())
          .filter((t) => t !== '')
      }

      await createJob(jobData)
      setSubmitted(true)

    } catch (err) {
      setError(err.response?.data?.message || 'Failed to post job. Try again.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center max-w-md w-full">
          <div className="text-5xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Job Posted!</h2>
          <p className="text-gray-500 text-sm mb-6">
            Your job listing for <strong>{form.title}</strong> has been published successfully.
          </p>
          <div className="bg-blue-50 rounded-xl p-4 text-left mb-6 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Position</span>
              <span className="font-medium text-gray-700">{form.title}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Company</span>
              <span className="font-medium text-gray-700">{form.company}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Location</span>
              <span className="font-medium text-gray-700">{form.location || 'Not specified'}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Type</span>
              <span className="font-medium text-gray-700">{form.type}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Salary</span>
              <span className="font-medium text-gray-700">{form.salary}</span>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => {
                setSubmitted(false)
                setForm({
                  title: '',
                  company: user?.name || '',
                  location: '',
                  type: 'Full Time',
                  salary: '',
                  description: '',
                  requirements: '',
                  tags: '',
                  remote: false
                })
              }}
              className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 rounded-lg transition-colors text-sm">
              Post Another Job
            </button>
            <button
              onClick={() => navigate('/jobs')}
              className="w-full border border-gray-200 text-gray-600 hover:bg-gray-50 font-semibold py-3 rounded-lg transition-colors text-sm">
              View All Jobs
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Post a Job</h1>
          <p className="text-gray-500 mt-1 text-sm">
            Fill in the details below to list your job opening
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 space-y-6">

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          {/* Row 1 - Title and Company */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">
                Job Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="e.g. Senior React Developer"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-800 outline-none focus:border-blue-400 text-sm"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">
                Company Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="company"
                value={form.company}
                onChange={handleChange}
                placeholder="e.g. Google Pakistan"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-800 outline-none focus:border-blue-400 text-sm"
              />
            </div>
          </div>

          {/* Row 2 - Location and Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="e.g. Lahore, Pakistan"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-800 outline-none focus:border-blue-400 text-sm"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">
                Job Type
              </label>
              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-700 outline-none focus:border-blue-400 text-sm bg-white">
                <option>Full Time</option>
                <option>Part Time</option>
                <option>Remote</option>
                <option>Freelance</option>
                <option>Internship</option>
              </select>
            </div>
          </div>

          {/* Row 3 - Salary and Tags */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">
                Salary <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="salary"
                value={form.salary}
                onChange={handleChange}
                placeholder="e.g. Rs. 150,000 / mo"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-800 outline-none focus:border-blue-400 text-sm"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">
                Skills / Tags
              </label>
              <input
                type="text"
                name="tags"
                value={form.tags}
                onChange={handleChange}
                placeholder="e.g. React, Node.js, MongoDB"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-800 outline-none focus:border-blue-400 text-sm"
              />
            </div>
          </div>

          {/* Remote checkbox */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              name="remote"
              id="remote"
              checked={form.remote}
              onChange={handleChange}
              className="w-4 h-4 accent-blue-700"
            />
            <label htmlFor="remote" className="text-sm font-medium text-gray-700">
              This is a remote position
            </label>
          </div>

          {/* Job Description */}
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              Job Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              placeholder="Describe the role, responsibilities, and what the candidate will be doing day to day..."
              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-800 outline-none focus:border-blue-400 text-sm resize-none"
            />
          </div>

          {/* Requirements */}
          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              Requirements
            </label>
            <textarea
              name="requirements"
              value={form.requirements}
              onChange={handleChange}
              rows={4}
              placeholder={`List requirements one per line:\n3+ years React experience\nStrong JavaScript skills\nGood communication`}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-800 outline-none focus:border-blue-400 text-sm resize-none"
            />
            <p className="text-xs text-gray-400 mt-1">
              Write each requirement on a new line
            </p>
          </div>

          {/* Live preview */}
          {form.title && (
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
              <p className="text-xs font-medium text-blue-700 mb-2 uppercase tracking-wide">
                Live Preview
              </p>
              <p className="font-semibold text-gray-800">{form.title}</p>
              {form.company && (
                <p className="text-sm text-gray-500">
                  {form.company} {form.location && `· ${form.location}`}
                </p>
              )}
              <div className="flex gap-2 mt-2 flex-wrap">
                <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                  {form.type}
                </span>
                {form.remote && (
                  <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">
                    Remote
                  </span>
                )}
                {form.salary && (
                  <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                    {form.salary}
                  </span>
                )}
                {form.tags && form.tags.split(',').map((tag) => (
                  <span key={tag} className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                    {tag.trim()}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 rounded-lg transition-colors text-sm disabled:opacity-60">
            {loading ? 'Posting job...' : 'Post Job'}
          </button>

        </div>
      </div>
    </div>
  )
}

export default PostJob