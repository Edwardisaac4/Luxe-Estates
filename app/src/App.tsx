import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Toaster } from '@/components/ui/sonner';

// Public Pages
import HomePage from '@/pages/HomePage';
import ListingsPage from '@/pages/ListingsPage';
import PropertyDetailPage from '@/pages/PropertyDetailPage';
import AboutPage from '@/pages/AboutPage';
import ContactPage from '@/pages/ContactPage';

// Admin Pages
import AdminLayout from '@/layouts/AdminLayout';
import Dashboard from '@/pages/admin/Dashboard';
import Properties from '@/pages/admin/Properties';
import Agents from '@/pages/admin/Agents';
import Inquiries from '@/pages/admin/Inquiries';
import Settings from '@/pages/admin/Settings';
import LoginPage from '@/pages/admin/LoginPage';

// Context
import { AuthProvider } from '@/contexts/AuthContext';

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
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/listings" element={<ListingsPage />} />
          <Route path="/property/:id" element={<PropertyDetailPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<LoginPage />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="properties" element={<Properties />} />
            <Route path="agents" element={<Agents />} />
            <Route path="inquiries" element={<Inquiries />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          
          {/* Catch all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
      <Toaster position="top-right" />
    </AuthProvider>
  );
}

export default App;
