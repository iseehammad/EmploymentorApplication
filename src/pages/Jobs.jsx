import { useState, useEffect } from 'react'
import JobCard from '../components/JobCard'
import { getAllJobs } from '../api'

function Jobs() {
  const [jobs, setJobs] = useState([])
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getAllJobs()
      .then((res) => setJobs(res.data.jobs))
      .catch(() => setError('Failed to load jobs'))
      .finally(() => setLoading(false))
  }, [])

  const filtered = jobs.filter((job) => {
    const matchSearch =
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase())
    const matchFilter =
      filter === 'All' || job.type === filter
    return matchSearch && matchFilter
  })

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-gray-400 text-lg">Loading jobs...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-red-400 text-lg">{error}</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-8 py-10">

      <h1 className="text-3xl font-bold text-gray-900 mb-2">Browse Jobs</h1>
      <p className="text-gray-500 mb-8">{filtered.length} jobs found</p>

      {/* Filter bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search job title or company..."
          className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-gray-800 outline-none focus:border-blue-400"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2 border border-gray-200 rounded-lg text-gray-700 outline-none focus:border-blue-400 bg-white">
          <option>All</option>
          <option>Full Time</option>
          <option>Part Time</option>
          <option>Remote</option>
        </select>
      </div>

      {/* Jobs list */}
      <div className="flex flex-col gap-4">
        {filtered.length > 0 ? (
          filtered.map((job) => (
            <JobCard key={job._id} job={job} />
          ))
        ) : (
          <div className="text-center py-20 text-gray-400">
            No jobs found
          </div>
        )}
      </div>

    </div>
  )
}

export default Jobs