import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Register() {
  const [form, setForm] = useState({
    name: '', email: '', password: '', role: 'candidate'
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { register } = useAuth()
  const navigate = useNavigate()

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    if (!form.name || !form.email || !form.password) {
      setError('Please fill in all fields')
      return
    }

    try {
      setLoading(true)
      await register(form.name, form.email, form.password, form.role)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 w-full max-w-md">

        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Create an account</h1>
          <p className="text-gray-500 mt-1 text-sm">Join JobPortal today — it's free</p>
        </div>

        {/* Role selector */}
        <div className="flex rounded-lg border border-gray-200 p-1 mb-6">
          <button
            onClick={() => setForm({ ...form, role: 'candidate' })}
            className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${form.role === 'candidate' ? 'bg-blue-700 text-white' : 'text-gray-500 hover:text-gray-700'}`}>
            I'm a Candidate
          </button>
          <button
            onClick={() => setForm({ ...form, role: 'company' })}
            className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${form.role === 'company' ? 'bg-blue-700 text-white' : 'text-gray-500 hover:text-gray-700'}`}>
            I'm a Company
          </button>
        </div>

        {/* Error message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <div className="space-y-5">

          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              {form.role === 'candidate' ? 'Full Name' : 'Company Name'}
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder={form.role === 'candidate' ? 'Umar Amin' : 'Google Pakistan'}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-800 outline-none focus:border-blue-400 text-sm"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              Email address
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-800 outline-none focus:border-blue-400 text-sm"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Create a strong password"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-800 outline-none focus:border-blue-400 text-sm"
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 rounded-lg transition-colors text-sm disabled:opacity-60">
            {loading ? 'Creating account...' : 'Create Account'}
          </button>

        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-700 font-medium hover:underline">
            Login here
          </Link>
        </p>

      </div>
    </div>
  )
}

export default Register