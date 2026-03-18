export interface Property {
  id: string;
  title: string;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  location: string;
  image: string;
  badge?: 'Featured' | 'New' | 'Hot';
  type: 'sale' | 'rent';
  propertyType?: 'house' | 'apartment' | 'condo' | 'villa' | 'penthouse';
  description?: string;
  amenities?: string[];
  agent?: Agent;
  createdAt?: string;
  status?: 'active' | 'pending' | 'sold';
}

export interface Agent {
  id: string;
  name: string;
  email: string;
  phone: string;
  image: string;
  role: string;
  bio?: string;
  sales?: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  avatar: string;
  rating: number;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
  icon: string;
  image: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'agent' | 'user';
  avatar?: string;
  bio?: string;
  phone?: string;
}

export interface DashboardStats {
  totalProperties: number;
  totalAgents: number;
  totalUsers: number;
  monthlyRevenue: number;
  recentProperties: Property[];
  recentInquiries: Inquiry[];
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  propertyId?: string;
  createdAt: string;
  status: 'new' | 'contacted' | 'closed';
}
