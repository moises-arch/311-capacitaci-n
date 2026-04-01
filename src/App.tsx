import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Processes from './pages/Processes';
import Feedback from './pages/Feedback';
import AdminPanel from './pages/AdminPanel';
import Playground from './pages/Playground';
import Resources from './pages/Resources';
import QRManager from './pages/QRManager';
import Navbar from './components/Navbar';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [isRegistered, setIsRegistered] = useState<boolean>(() => {
    return localStorage.getItem('eventum_registered') === 'true';
  });

  const handleRegistrationSuccess = () => {
    setIsRegistered(true);
    localStorage.setItem('eventum_registered', 'true');
  };

  return (
    <Router>
      <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-blue-500/30">
        {isRegistered && <Navbar />}
        
        <main className={isRegistered ? "pb-24 pt-20 md:pt-28 px-4 max-w-7xl mx-auto" : ""}>
          <AnimatePresence mode="wait">
            <Routes>
              <Route 
                path="/" 
                element={
                  isRegistered ? <Navigate to="/dashboard" replace /> : <Signup onSuccess={handleRegistrationSuccess} />
                } 
              />
              <Route 
                path="/signup" 
                element={
                  isRegistered ? <Navigate to="/dashboard" replace /> : <Signup onSuccess={handleRegistrationSuccess} />
                } 
              />
              
              {/* Protected Routes (Simulated) */}
              <Route 
                path="/dashboard" 
                element={isRegistered ? <Dashboard /> : <Navigate to="/signup" replace />} 
              />
              <Route 
                path="/processes" 
                element={isRegistered ? <Processes /> : <Navigate to="/signup" replace />} 
              />
              <Route 
                path="/playground" 
                element={isRegistered ? <Playground /> : <Navigate to="/signup" replace />} 
              />
              <Route 
                path="/feedback" 
                element={isRegistered ? <Feedback /> : <Navigate to="/signup" replace />} 
              />
              <Route 
                path="/admin" 
                element={isRegistered ? <AdminPanel /> : <Navigate to="/signup" replace />} 
              />
              <Route 
                path="/resources" 
                element={isRegistered ? <Resources /> : <Navigate to="/signup" replace />} 
              />
              <Route 
                path="/qr" 
                element={isRegistered ? <QRManager /> : <Navigate to="/signup" replace />} 
              />
            </Routes>
          </AnimatePresence>
        </main>
      </div>
    </Router>
  );
}
