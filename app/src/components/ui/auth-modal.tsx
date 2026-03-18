import { useState } from 'react';
import { X, Mail, Lock, User as UserIcon } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  defaultTab?: 'login' | 'signup';
  customMessage?: string;
}

export function AuthModal({ 
  isOpen, 
  onClose, 
  onSuccess, 
  defaultTab = 'login',
  customMessage 
}: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>(defaultTab);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (activeTab === 'login') {
        const success = await login(email, password);
        if (success) {
          toast.success('Successfully logged in!');
          onSuccess();
          onClose();
        } else {
          toast.error('Invalid credentials. Try client@example.com / password123');
        }
      } else {
        // Mock Signup
        setTimeout(() => {
          toast.success('Account created successfully!');
          // Force a login with the mock client for demonstration
          login('client@example.com', 'password123');
          onSuccess();
          onClose();
        }, 1000);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-0">
      <div 
        className="absolute inset-0 bg-dark/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-dark/10">
          <h2 className="font-display font-bold text-2xl text-dark">
            {activeTab === 'login' ? 'Welcome Back' : 'Create Account'}
          </h2>
          <button 
            onClick={onClose}
            className="p-2 text-dark/40 hover:text-dark hover:bg-dark/5 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {customMessage && (
            <div className="mb-6 p-4 bg-beige/10 rounded-xl border border-beige/20 text-center">
              <p className="font-body text-sm font-medium text-dark/80">{customMessage}</p>
            </div>
          )}

          {/* Tabs */}
          <div className="flex p-1 bg-dark/5 rounded-xl mb-6">
            <button
              onClick={() => setActiveTab('login')}
              className={`flex-1 py-2 font-display text-sm font-bold rounded-lg transition-all ${
                activeTab === 'login' 
                  ? 'bg-white text-dark shadow-sm' 
                  : 'text-dark/60 hover:text-dark'
              }`}
            >
              Log In
            </button>
            <button
              onClick={() => setActiveTab('signup')}
              className={`flex-1 py-2 font-display text-sm font-bold rounded-lg transition-all ${
                activeTab === 'signup' 
                  ? 'bg-white text-dark shadow-sm' 
                  : 'text-dark/60 hover:text-dark'
              }`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {activeTab === 'signup' && (
              <div className="space-y-2">
                <label className="font-display text-sm font-bold text-dark">Full Name</label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark/40" />
                  <Input 
                    required 
                    type="text" 
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10 h-12 bg-white" 
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="font-display text-sm font-bold text-dark">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark/40" />
                <Input 
                  required 
                  type="email" 
                  placeholder="client@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-12 bg-white" 
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="font-display text-sm font-bold text-dark">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark/40" />
                <Input 
                  required 
                  type="password" 
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 h-12 bg-white" 
                />
              </div>
            </div>

            <Button 
              type="submit" 
              disabled={isLoading}
              className="w-full h-12 bg-dark text-white hover:bg-dark/90 font-display font-bold text-base mt-2"
            >
              {isLoading ? 'Processing...' : activeTab === 'login' ? 'Sign In' : 'Create Account'}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            {activeTab === 'login' && (
              <p className="font-body text-sm text-dark/60">
                Mock login: <strong className="text-dark">client@example.com / password123</strong>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
