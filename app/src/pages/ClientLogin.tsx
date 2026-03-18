import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, ArrowLeft, KeyRound } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export default function ClientLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate authentication process
    setTimeout(async () => {
      const success = await login(email, password);
      setIsLoading(false);
      
      if (success) {
        toast.success('Welcome back to your client portal!');
        navigate('/');
      } else {
        toast.error('Invalid credentials. Please use client@example.com / password123');
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-light flex">
      {/* Left Panel - Image/Marketing */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <div className="absolute inset-0 bg-dark/40 z-10" />
        <img 
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80" 
          alt="Luxury Estate" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 z-20 flex flex-col justify-end p-12 text-white">
          <Link
            to="/"
            className="absolute top-12 left-12 inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-body text-sm font-medium">Back to Website</span>
          </Link>
          <div className="max-w-xl">
            <h2 className="font-display text-4xl font-bold mb-4">Welcome to Your Exclusive Client Portal</h2>
            <p className="font-body text-lg text-white/90">
              Manage your saved properties, track your schedule, and communicate directly with your dedicated agent in one secure place.
            </p>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12">
        <div className="w-full max-w-md">
          {/* Mobile Back Link */}
          <Link
            to="/"
            className="lg:hidden inline-flex items-center gap-2 text-dark/60 hover:text-dark mb-10 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="font-body text-sm">Back to Website</span>
          </Link>

          <div className="mb-10">
            <h1 className="font-display text-3xl font-bold text-dark mb-3">Client Sign In</h1>
            <p className="font-body text-dark/60">Enter your credentials to access your dashboard.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="font-body text-sm font-medium text-dark mb-2 block">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark/40" />
                <Input
                  type="email"
                  placeholder="client@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-12 h-14 bg-white border-dark/10 focus:border-beige focus:ring-1 focus:ring-beige rounded-xl"
                  required
                />
              </div>
            </div>

            <div>
              <label className="font-body text-sm font-medium text-dark mb-2 block">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark/40" />
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-12 pr-12 h-14 bg-white border-dark/10 focus:border-beige focus:ring-1 focus:ring-beige rounded-xl"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-dark/40 hover:text-dark transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative flex items-center justify-center">
                  <input type="checkbox" className="peer w-5 h-5 rounded border-dark/20 text-beige focus:ring-beige transition-all" />
                </div>
                <span className="font-body text-sm text-dark/70 group-hover:text-dark transition-colors">
                  Remember my device
                </span>
              </label>
              <Link
                to="#"
                className="font-body text-sm font-medium text-dark hover:text-beige transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full h-14 shadow-lg shadow-dark/5 bg-dark text-white rounded-xl hover:bg-dark/90 transition-all font-body text-base group"
              disabled={isLoading}
            >
              <span className="flex items-center justify-center gap-2">
                {isLoading ? 'Authenticating...' : 'Access Portal'}
                {!isLoading && <KeyRound className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" />}
              </span>
            </Button>
          </form>

          <div className="mt-10 text-center">
            <p className="font-body text-sm text-dark/60">
              Not a client yet?{' '}
              <Link to="/contact" className="font-medium text-dark hover:text-beige transition-colors underline underline-offset-4">
                Contact an agent
              </Link>{' '}
              to get started.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
