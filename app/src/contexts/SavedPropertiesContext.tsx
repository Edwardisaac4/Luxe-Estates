/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, useRef } from 'react';
import { useAuth } from './AuthContext';
import { toast } from 'sonner';

interface SavedPropertiesContextType {
  favoriteIds: string[];
  toggleFavorite: (propertyId: string) => void;
  isFavorite: (propertyId: string) => boolean;
}

const SavedPropertiesContext = createContext<SavedPropertiesContextType | undefined>(undefined);

export function SavedPropertiesProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  
  // Initialize state directly from local storage to avoid sync setState in effect
  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => {
    if (user) {
      const storedFavorites = localStorage.getItem(`favorites_${user.id}`);
      return storedFavorites ? JSON.parse(storedFavorites) : [];
    }
    return [];
  });

  // Track the previous user ID to only run the sync when the user ACTUALLY changes
  const prevUserId = useRef(user?.id);

  // Sync state if user changes dramatically (during render)
  if (user?.id !== prevUserId.current) {
    if (user) {
      const storedFavorites = localStorage.getItem(`favorites_${user.id}`);
      setFavoriteIds(storedFavorites ? JSON.parse(storedFavorites) : []);
    } else {
      setFavoriteIds([]);
    }
    prevUserId.current = user?.id;
  }

  // Save favorites to local storage whenever they change
  useEffect(() => {
    if (user) {
      localStorage.setItem(`favorites_${user.id}`, JSON.stringify(favoriteIds));
    }
  }, [favoriteIds, user]);

  const toggleFavorite = (propertyId: string) => {
    if (!user) {
      toast.error('Please log in to save properties');
      return;
    }

    setFavoriteIds((prev) => {
      const isCurrentlySaved = prev.includes(propertyId);
      if (isCurrentlySaved) {
        toast.success('Removed from Saved Properties');
        return prev.filter((id) => id !== propertyId);
      } else {
        toast.success('Added to Saved Properties');
        return [...prev, propertyId];
      }
    });
  };

  const isFavorite = (propertyId: string) => {
    return favoriteIds.includes(propertyId);
  };

  return (
    <SavedPropertiesContext.Provider value={{ favoriteIds, toggleFavorite, isFavorite }}>
      {children}
    </SavedPropertiesContext.Provider>
  );
}

export function useSavedProperties() {
  const context = useContext(SavedPropertiesContext);
  if (context === undefined) {
    throw new Error('useSavedProperties must be used within a SavedPropertiesProvider');
  }
  return context;
}
