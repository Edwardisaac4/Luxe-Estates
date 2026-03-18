import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Toaster } from '@/components/ui/sonner';

// Public Pages
import HomePage from '@/pages/HomePage';
import ListingsPage from '@/pages/ListingsPage';
import PropertyDetailPage from '@/pages/PropertyDetailPage';
import AboutPage from '@/pages/AboutPage';
import ContactPage from '@/pages/ContactPage';
import ServicesPage from '@/pages/ServicesPage';
import ClientPortal from '@/pages/ClientPortal';
import ClientLogin from '@/pages/ClientLogin';

// Admin Pages
import AdminLayout from '@/layouts/AdminLayout';
import Dashboard from '@/pages/admin/Dashboard';
import Properties from '@/pages/admin/Properties';
import PropertyForm from '@/pages/admin/PropertyForm';
import Agents from '@/pages/admin/Agents';
import AgentForm from '@/pages/admin/AgentForm';
import Inquiries from '@/pages/admin/Inquiries';
import Settings from '@/pages/admin/Settings';
import LoginPage from '@/pages/admin/LoginPage';

// Context
import { AuthProvider } from '@/contexts/AuthContext';
import { SavedPropertiesProvider } from '@/contexts/SavedPropertiesContext';
import { InquiriesProvider } from '@/contexts/InquiriesContext';
import { PropertiesProvider } from '@/contexts/PropertiesContext';
import { AgentsProvider } from '@/contexts/AgentsContext';
import { ToursProvider } from '@/contexts/ToursContext';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-light flex items-center justify-center z-50">
        <div className="text-center">
          <h1 className="font-display text-3xl font-bold text-dark mb-4 animate-pulse">
            LUXE ESTATES
          </h1>
          <div className="w-32 h-1 bg-beige/30 rounded-full overflow-hidden">
            <div className="w-full h-full bg-beige animate-[slideLeft_1s_ease-in-out_infinite]" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <AuthProvider>
      <PropertiesProvider>
        <AgentsProvider>
          <SavedPropertiesProvider>
            <InquiriesProvider>
              <ToursProvider>
                <Router>
                  <Routes>
                  {/* Public Routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/listings" element={<ListingsPage />} />
                <Route path="/property/:id" element={<PropertyDetailPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/portal" element={<ClientPortal />} />
                <Route path="/client-login" element={<ClientLogin />} />
                
                {/* Admin Routes */}
                <Route path="/admin/login" element={<LoginPage />} />
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<Navigate to="/admin/dashboard" replace />} />
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="properties" element={<Properties />} />
                  <Route path="properties/new" element={<PropertyForm />} />
                  <Route path="properties/:id/edit" element={<PropertyForm />} />
                  <Route path="agents" element={<Agents />} />
                  <Route path="agents/new" element={<AgentForm />} />
                  <Route path="agents/:id/edit" element={<AgentForm />} />
                  <Route path="inquiries" element={<Inquiries />} />
                  <Route path="settings" element={<Settings />} />
                </Route>
                
                {/* Catch all */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Router>
              </ToursProvider>
              <Toaster position="top-right" />
            </InquiriesProvider>
          </SavedPropertiesProvider>
        </AgentsProvider>
      </PropertiesProvider>
    </AuthProvider>
  );
}

export default App;
