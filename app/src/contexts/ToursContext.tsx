/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { toast } from 'sonner';

export interface Tour {
  id: string;
  propertyId: string;
  userId: string;
  date: string; // ISO date string
  time: string; // e.g. "10:00 AM"
  status: 'upcoming' | 'completed' | 'cancelled';
  createdAt: string;
}

interface ToursContextType {
  tours: Tour[];
  userTours: Tour[];
  scheduleTour: (propertyId: string, date: string, time: string) => void;
  rescheduleTour: (tourId: string, newDate: string, newTime: string) => void;
  cancelTour: (tourId: string) => void;
}

const ToursContext = createContext<ToursContextType | undefined>(undefined);

export function ToursProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  
  // Load from all tours for admin, or filter for user
  const [tours, setTours] = useState<Tour[]>(() => {
    const saved = localStorage.getItem('property_tours');
    if (saved) return JSON.parse(saved);
    return [];
  });

  // Derived state for the logged-in user
  const userTours = tours.filter(t => t.userId === user?.id).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // Save to localStorage when changed
  useEffect(() => {
    localStorage.setItem('property_tours', JSON.stringify(tours));
  }, [tours]);

  const scheduleTour = (propertyId: string, date: string, time: string) => {
    if (!user) {
      toast.error('Please log in to schedule a tour');
      return;
    }

    const newTour: Tour = {
      id: Math.random().toString(36).substr(2, 9),
      propertyId,
      userId: user.id,
      date,
      time,
      status: 'upcoming',
      createdAt: new Date().toISOString()
    };

    setTours(prev => [...prev, newTour]);
    toast.success('Tour successfully scheduled!');
  };

  const rescheduleTour = (tourId: string, newDate: string, newTime: string) => {
    setTours(prev => prev.map(t => 
      t.id === tourId ? { ...t, date: newDate, time: newTime } : t
    ));
    toast.success('Tour successfully rescheduled.');
  };

  const cancelTour = (tourId: string) => {
    setTours(prev => prev.map(t => 
      t.id === tourId ? { ...t, status: 'cancelled' } : t
    ));
    toast.success('Tour has been cancelled.');
  };

  return (
    <ToursContext.Provider value={{ tours, userTours, scheduleTour, rescheduleTour, cancelTour }}>
      {children}
    </ToursContext.Provider>
  );
}

export function useTours() {
  const context = useContext(ToursContext);
  if (context === undefined) {
    throw new Error('useTours must be used within a ToursProvider');
  }
  return context;
}
