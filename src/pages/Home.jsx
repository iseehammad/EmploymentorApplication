import { useState } from "react"
import { useNavigate } from "react-router-dom"

const categories = [
  { id: 1, name: 'Engineering',  icon: '💻', count: 320 },
  { id: 2, name: 'Design',       icon: '🎨', count: 140 },
  { id: 3, name: 'Marketing',    icon: '📢', count: 95  },
  { id: 4, name: 'Finance',      icon: '💰', count: 78  },
  { id: 5, name: 'Healthcare',   icon: '🏥', count: 60  },
  { id: 6, name: 'Education',    icon: '📚', count: 55  },
  { id: 7, name: 'Sales',        icon: '🤝', count: 110 },
  { id: 8, name: 'Remote',       icon: '🌍', count: 200 },
]

function Home() {
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  function handleSearch() {
    if (search.trim() !== '') {
      navigate('/jobs?search=' + search)
    }
  }

  return (
    <div className="w-full">

      {/* ===== HERO ===== */}
      <section className="bg-gradient-to-r from-blue-700 to-blue-500 text-white py-10 md:py-20 px-8">
        <div className="max-w-4xl mx-auto text-center">

          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Find Your Dream Job Today
          </h1>

          <p className="text-blue-100 text-base md:text-xl mb-10">
            Thousands of jobs from top companies — apply in one click
          </p>

          {/* Search bar */}
          <div className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto">
            <input
  type="text"
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
  placeholder="Search jobs, skills, companies..."
  className="flex-1 px-5 py-3 rounded-lg text-gray-800 text-bold outline-none bg-white"
/>
            <button
  onClick={handleSearch}
  className="bg-gray-900 hover:bg-gray-800 text-white font-semibold px-8 py-3 rounded-lg transition-colors w-full sm:w-auto">
  Search Jobs
</button>
          </div>

        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="bg-white py-12 px-8 border-b border-gray-100">
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          <div>
            <p className="text-4xl font-bold text-blue-700">1,200+</p>
            <p className="text-gray-500 mt-1">Jobs Posted</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-blue-700">800+</p>
            <p className="text-gray-500 mt-1">Companies</p>
          </div>
          <div>
            <p className="text-4xl font-bold text-blue-700">50K+</p>
            <p className="text-gray-500 mt-1">Candidates</p>
          </div>
        </div>
      </section>

      {/* ===== CATEGORIES ===== */}
      <section className="py-16 px-8 bg-gray-50 w-full">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
            Browse by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <div key={cat.id}
                className="bg-white rounded-xl p-6 text-center border border-gray-100 cursor-pointer hover:border-blue-300 hover:shadow-md transition-all">
                <div className="text-3xl mb-2">{cat.icon}</div>
                <p className="font-semibold text-gray-700">{cat.name}</p>
                <p className="text-sm text-gray-400 mt-1">{cat.count} jobs</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}

export default Home