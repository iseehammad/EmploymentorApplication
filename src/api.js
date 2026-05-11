import axios from 'axios'

// Base URL of your backend
const API = axios.create({
  baseURL: 'http://192.168.100.28:5000/api'
})

// Automatically attach token to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// ===== AUTH =====
export const registerUser = (data) => API.post('/auth/register', data)
export const loginUser = (data) => API.post('/auth/login', data)
export const getMe = () => API.get('/auth/me')

// ===== JOBS =====
export const getAllJobs = () => API.get('/jobs')
export const getJobById = (id) => API.get(`/jobs/${id}`)
export const createJob = (data) => API.post('/jobs', data)
export const updateJob = (id, data) => API.put(`/jobs/${id}`, data)
export const deleteJob = (id) => API.delete(`/jobs/${id}`)

// ===== APPLICATIONS =====
export const applyForJob = (data) => API.post('/applications', data)
export const getMyApplications = () => API.get('/applications/my')
export const getJobApplications = (jobId) => API.get(`/applications/job/${jobId}`)