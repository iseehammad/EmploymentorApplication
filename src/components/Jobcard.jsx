import { Link } from 'react-router-dom'

function JobCard({ job }) {
  return (
    <div className="bg-white rounded-xl p-6 border
                    border-gray-100 hover:border-blue-200
                    hover:shadow-md transition-all">

      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">

        {/* Left side */}
        <div className="flex gap-4">

          {/* Company icon */}
          <div className="w-12 h-12 bg-blue-50 rounded-xl
                          flex items-center justify-center
                          text-2xl flex-shrink-0">
            {job.icon}
          </div>

          {/* Job info */}
          <div>
            <h3 className="font-semibold text-gray-900
                           text-lg mb-1">
              {job.title}
            </h3>
            <p className="text-gray-500 text-sm mb-3">
              {job.company} · {job.location}
            </p>

            {/* Tags */}
            <div className="flex gap-2 flex-wrap">
              <span className="text-xs px-3 py-1 rounded-full
                               bg-blue-50 text-blue-700
                               font-medium">
                {job.type}
              </span>
              {job.remote && (
                <span className="text-xs px-3 py-1
                                 rounded-full bg-green-50
                                 text-green-700 font-medium">
                  Remote
                </span>
              )}
              {job.tags.map((tag) => (
                <span key={tag}
                  className="text-xs px-3 py-1 rounded-full
                             bg-gray-100 text-gray-600">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right side */}
        <div className="sm:text-right sm:flex-shrink-0 w-full sm:w-auto">
          <p className="font-semibold text-blue-700 mb-3">
            {job.salary}
          </p>
          <Link to={`/jobs/${job._id}`}
            className="bg-blue-700 text-white text-sm
                       px-5 py-2 rounded-lg
                       hover:bg-blue-800 transition-colors">
            View Job
          </Link>
        </div>

      </div>
    </div>
  )
}

export default JobCard