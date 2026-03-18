import React, { createContext, useContext, useState, useEffect } from 'react';
import { properties as initialMockProperties } from '@/data/mockData';
import type { Property } from '@/types';

interface PropertiesContextType {
  properties: Property[];
  addProperty: (property: Omit<Property, 'id'>) => void;
  updateProperty: (id: string, property: Partial<Property>) => void;
  deleteProperty: (id: string) => void;
}

const PropertiesContext = createContext<PropertiesContextType | undefined>(undefined);

export function PropertiesProvider({ children }: { children: React.ReactNode }) {
  // Initialize with mockData on first load
  const [properties, setProperties] = useState<Property[]>(initialMockProperties);

  // Load from localStorage if available
  useEffect(() => {
    const saved = localStorage.getItem('luxe_properties');
    if (saved) {
      setProperties(JSON.parse(saved));
    }
  }, []);

  // Save to localStorage whenever properties change
  useEffect(() => {
    localStorage.setItem('luxe_properties', JSON.stringify(properties));
  }, [properties]);

  const addProperty = (newPropertyData: Omit<Property, 'id'>) => {
    const newProperty: Property = {
      ...newPropertyData,
      id: Math.random().toString(36).substring(2, 9), // Simple fake ID generator
      createdAt: new Date().toISOString().split('T')[0], // e.g. "2026-03-13"
    };
    setProperties(prev => [newProperty, ...prev]);
  };

  const updateProperty = (id: string, updatedData: Partial<Property>) => {
    setProperties(prev => 
      prev.map(p => p.id === id ? { ...p, ...updatedData } : p)
    );
  };

  const deleteProperty = (id: string) => {
    setProperties(prev => prev.filter(p => p.id !== id));
  };

  return (
    <PropertiesContext.Provider value={{ properties, addProperty, updateProperty, deleteProperty }}>
      {children}
    </PropertiesContext.Provider>
  );
}

export function useProperties() {
  const context = useContext(PropertiesContext);
  if (context === undefined) {
    throw new Error('useProperties must be used within a PropertiesProvider');
  }
  return context;
}
