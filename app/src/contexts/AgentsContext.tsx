import React, { createContext, useContext, useState, useEffect } from 'react';
import { agents as initialMockAgents } from '@/data/mockData';
import type { Agent } from '@/types';

interface AgentsContextType {
  agents: Agent[];
  addAgent: (agent: Omit<Agent, 'id'>) => void;
  updateAgent: (id: string, agent: Partial<Agent>) => void;
  deleteAgent: (id: string) => void;
}

const AgentsContext = createContext<AgentsContextType | undefined>(undefined);

export function AgentsProvider({ children }: { children: React.ReactNode }) {
  // Initialize with mockData on first load
  const [agents, setAgents] = useState<Agent[]>(() => {
    const saved = localStorage.getItem('luxe_agents');
    if (saved) {
      return JSON.parse(saved);
    }
    return initialMockAgents;
  });

  // Save to localStorage whenever agents change
  useEffect(() => {
    localStorage.setItem('luxe_agents', JSON.stringify(agents));
  }, [agents]);

  const addAgent = (newAgentData: Omit<Agent, 'id'>) => {
    const newAgent: Agent = {
      ...newAgentData,
      id: Math.random().toString(36).substring(2, 9), // Simple fake ID generator
    };
    setAgents(prev => [newAgent, ...prev]);
  };

  const updateAgent = (id: string, updatedData: Partial<Agent>) => {
    setAgents(prev => 
      prev.map(p => p.id === id ? { ...p, ...updatedData } : p)
    );
  };

  const deleteAgent = (id: string) => {
    setAgents(prev => prev.filter(p => p.id !== id));
  };

  return (
    <AgentsContext.Provider value={{ agents, addAgent, updateAgent, deleteAgent }}>
      {children}
    </AgentsContext.Provider>
  );
}

export function useAgents() {
  const context = useContext(AgentsContext);
  if (context === undefined) {
    throw new Error('useAgents must be used within an AgentsProvider');
  }
  return context;
}
