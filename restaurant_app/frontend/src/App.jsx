import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Menu from './pages/Menu'
import Reservations from './pages/Reservations'
import Events from './pages/Events'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import EventDetail from './pages/EventDetail'
import DarkKitchen from './pages/DarkKitchen'
import { ConfigProvider } from './context/ConfigContext'
import { ThemeProvider } from './context/ThemeContext'
import './App.css'

import Footer from './components/Footer'
import EditModeIndicator from './components/Admin/EditModeIndicator';

/**
 * Main Application Component
 * Sets up routing, configuration context, and theme providers.
 */
function App() {
    return (
        <ConfigProvider>
            <ThemeProvider>
                <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
                    <div className="app-container">
                        <header>
                            <Navbar />
                        </header>
                        <main>
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/menu" element={<Menu />} />
                                <Route path="/reservations" element={<Reservations />} />
                                <Route path="/events" element={<Events />} />
                                <Route path="/admin" element={<AdminLogin />} />
                                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                                <Route path="/events/:id" element={<EventDetail />} />
                                <Route path="/dark-kitchen" element={<DarkKitchen />} />
                            </Routes>
                        </main>
                        <EditModeIndicator />
                        <Footer />
                    </div>
                </Router>
            </ThemeProvider>
        </ConfigProvider>
    )
}

export default App
