/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { Dialog, 
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
 } from "@/components/ui/dialog";

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        toast.success('Welcome back!');
        navigate('/admin/dashboard');
      } else {
        toast.error('Invalid credentials. Please try again.');
      }
    } catch (_error) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!resetEmail) {
      toast.error('please enter your registered Email Address');
      return;
    }

    toast.success('Password reset link sent to your email address');
    setResetEmail('');
    setForgotPasswordOpen(false);
  };

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Back Link */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-white/60 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="font-body text-sm">Back to Website</span>
        </Link>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <h1 className="font-display text-2xl font-bold text-dark mb-2">
              LUXE ESTATES
            </h1>
            <p className="font-body text-dark/60">Admin Login</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="font-body text-sm font-medium text-dark mb-2 block">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark/40" />
                <Input
                  type="email"
                  placeholder="eg. tea@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-12"
                  required
                />
              </div>
            </div>

            <div>
              <label className="font-body text-sm font-medium text-dark mb-2 block">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark/40" />
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 h-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-dark/40 hover:text-dark"
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
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-border" />
                <span className="font-body text-sm text-dark/60">
                  Remember me
                </span>
              </label>
              <button
                type='button'
                onClick={() => setForgotPasswordOpen(true)}
                className='font-body text-sm text-dark/60 hover:text-dark'
              >
                Forgot Password?
              </button>
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-dark text-white hover:bg-dark/90"
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-beige/10 rounded-lg">
            <p className="font-body text-xs text-dark/60 text-center">
              Demo Credentials:
              <br />
              Email: admin@luxestates.com
              <br />
              Password: admin123
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-white/40 text-sm mt-8">
          © 2026 Luxe Estates. All rights reserved.
        </p>
      </div>

      <Dialog open={forgotPasswordOpen} onOpenChange={setForgotPasswordOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display">Reset Password</DialogTitle>
            <DialogDescription className="font-body">
              Enter your email address and we'll send you a link to reset your password.
            </DialogDescription>
          </DialogHeader>

          <div className="py-2">
            <label className="font-body text-sm font-medium text-dark mb-2 block">
              Email Address
            </label>
            <Input
              type="email"
              placeholder="admin@luxestates.com"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
            />
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setForgotPasswordOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleForgotPassword}>
              Send Reset Link
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  );
}
