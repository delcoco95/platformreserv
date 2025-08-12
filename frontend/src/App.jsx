import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '@contexts/AuthContext';

// Layout
import Header from '@components/Header';
import Footer from '@components/Footer';

// Pages
import HomePage from '@pages/HomePage';
import LoginPage from '@pages/LoginPage';
import RegisterPage from '@pages/RegisterPage';
import DashboardPage from '@pages/DashboardPage';
import ProfessionalsPage from '@pages/ProfessionalsPage';
import ServicesPage from '@pages/ServicesPage';
import BookingPage from '@pages/BookingPage';
import ProfilePage from '@pages/ProfilePage';
import AboutPage from '@pages/AboutPage';
import ContactPage from '@pages/ContactPage';
import FAQPage from '@pages/FAQPage';
import NotFoundPage from '@pages/NotFoundPage';

// Composants de protection
import ProtectedRoute from '@components/ProtectedRoute';
import PublicRoute from '@components/PublicRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-gray-50">
          <Header />
          
          <main className="flex-1">
            <Routes>
              {/* Routes publiques */}
              <Route path="/" element={<HomePage />} />
              <Route path="/professionals" element={<ProfessionalsPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/faq" element={<FAQPage />} />
              
              {/* Routes d'authentification (redirige si déjà connecté) */}
              <Route 
                path="/login" 
                element={
                  <PublicRoute>
                    <LoginPage />
                  </PublicRoute>
                } 
              />
              <Route 
                path="/register" 
                element={
                  <PublicRoute>
                    <RegisterPage />
                  </PublicRoute>
                } 
              />
              
              {/* Routes protégées */}
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/profile" 
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/booking/:serviceId" 
                element={
                  <ProtectedRoute>
                    <BookingPage />
                  </ProtectedRoute>
                } 
              />
              
              {/* 404 */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          
          <Footer />
        </div>
        
        {/* Notifications toast */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              theme: {
                primary: '#4ade80',
              },
            },
            error: {
              duration: 5000,
              theme: {
                primary: '#ef4444',
              },
            },
          }}
        />
      </Router>
    </AuthProvider>
  );
}

export default App;
