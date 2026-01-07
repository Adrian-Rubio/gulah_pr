import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Menu from './pages/Menu'
import Reservations from './pages/Reservations'
import Blog from './pages/Blog'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import { ConfigProvider } from './context/ConfigContext'
import './App.css'

function App() {
    return (
        <ConfigProvider>
            <Router>
                <div className="app-container">
                    <header>
                        <Navbar />
                    </header>
                    <main>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/menu" element={<Menu />} />
                            <Route path="/reservations" element={<Reservations />} />
                            <Route path="/blog" element={<Blog />} />
                            <Route path="/admin" element={<AdminLogin />} />
                            <Route path="/admin/dashboard" element={<AdminDashboard />} />
                        </Routes>
                    </main>
                </div>
            </Router>
        </ConfigProvider>
    )
}

export default App
