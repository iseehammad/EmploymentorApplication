import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Jobs from './pages/Jobs'
import JobDetail from './pages/Jobdetail'
import Login from './pages/Login'
import Register from './pages/Register'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import PostJob from './pages/PostJob'
import Apply from './pages/Apply'
import HRDashboard from './pages/HRDashboard'
import MyApplications from './pages/MyApplications'


function App() {
  return (
    <BrowserRouter>

    <div className="min-h-screen flex flex-col bg-gray-50">

      <Navbar />

      {/* Page content goes here */}
      <main className="flex-1 ">
        <Routes>
       <Route path ="/"element ={<Home/>}/>
       <Route path="/jobs" element={<Jobs />} />
      <Route path="/jobs/:id" element={<JobDetail />} />
    <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/post-job" element={<PostJob/>}/>
      <Route path="/apply/:id" element={<Apply />} />
      <Route path="/hr-dashboard" element={<HRDashboard />} />
      <Route path="/my-applications" element={<MyApplications />} />
      </Routes>
      </main>

      <Footer />

    </div>
    </BrowserRouter>
  )
}

export default App