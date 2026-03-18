/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { useAuth } from './AuthContext';
import { toast } from 'sonner';

export interface InquiryMessage {
  id: string;
  propertyId?: string;
  propertyTitle?: string;
  message: string;
  status: 'sent' | 'read' | 'replied' | 'new' | 'contacted' | 'closed';
  createdAt: string;
  agentName?: string;
  email?: string;
  phone?: string;
  name?: string;
  userId?: string;
}

interface InquiriesContextType {
  inquiries: InquiryMessage[];
  sendInquiry: (propertyId: string, propertyTitle: string, message: string, agentName: string, guestEmail?: string, guestName?: string, guestPhone?: string) => void;
  updateInquiryStatus: (id: string, status: 'new' | 'contacted' | 'closed') => void;
}

const InquiriesContext = createContext<InquiriesContextType | undefined>(undefined);

import { inquiries as mockInquiries } from '@/data/mockData';

export function InquiriesProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  
  // Initialize state directly from local storage, merging with mock data if admin
  const [inquiries, setInquiries] = useState<InquiryMessage[]>(() => {
    const saved = localStorage.getItem('all_inquiries');
    if (saved) return JSON.parse(saved);
    return mockInquiries as unknown as InquiryMessage[]; // Cast correctly to bypass strict type overlap issues
  });

  const prevUserId = useRef(user?.id);

  // Sync state if user ID changes (during render)
  if (user?.id !== prevUserId.current) {
    if (user && user.role !== 'admin') {
      const storedInquiries = localStorage.getItem(`inquiries_${user.id}`);
      if (storedInquiries) {
        setInquiries(JSON.parse(storedInquiries));
      }
    } else if (user?.role === 'admin') {
       const saved = localStorage.getItem('all_inquiries');
       setInquiries(saved ? JSON.parse(saved) : mockInquiries as unknown as InquiryMessage[]);
    }
    prevUserId.current = user?.id;
  }

  // Save inquiries to local storage whenever they change
  useEffect(() => {
    localStorage.setItem('all_inquiries', JSON.stringify(inquiries));
    if (user && user.role !== 'admin') {
      // Save user-specific inquiries
      const userInqs = inquiries.filter(i => i.userId === user.id || i.agentName === user.name);
      localStorage.setItem(`inquiries_${user.id}`, JSON.stringify(userInqs));
    }
  }, [inquiries, user]);

  const sendInquiry = (propertyId: string, propertyTitle: string, message: string, agentName: string, guestEmail?: string, guestName?: string, guestPhone?: string) => {
    // If there's no logged-in user, we still accept the inquiry but save the guest fields
    const newInquiry: InquiryMessage = {
      id: Math.random().toString(36).substr(2, 9),
      propertyId,
      propertyTitle,
      message,
      status: 'new', // Using 'new' instead of 'sent' for admin dashboard compatibility
      createdAt: new Date().toISOString(),
      agentName,
      userId: user?.id || 'guest', // Tie to the user or guest
      email: guestEmail || user?.email,
      name: guestName || user?.name,
      phone: guestPhone,
    };

    setInquiries((prev) => [newInquiry, ...prev]);
    toast.success('Inquiry sent successfully! Our agent will contact you shortly.');
  };

  const updateInquiryStatus = (id: string, status: 'new' | 'contacted' | 'closed') => {
    setInquiries(prev => prev.map(inq => inq.id === id ? { ...inq, status } : inq));
  };

  return (
    <InquiriesContext.Provider value={{ inquiries, sendInquiry, updateInquiryStatus }}>
      {children}
    </InquiriesContext.Provider>
  );
}

export function useInquiries() {
  const context = useContext(InquiriesContext);
  if (context === undefined) {
    throw new Error('useInquiries must be used within an InquiriesProvider');
  }
  return context;
}
