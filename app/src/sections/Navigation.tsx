import { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Listings', href: '/listings' },
  { name: 'Services', href: '/services' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const FULL_TEXT = 'LUXE ESTATES';

  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const displayedText = useTransform(rounded, (latest) => FULL_TEXT.slice(0, latest));

  // Typewriter effect on mount
  useEffect(() => {
    const controls = animate(count, FULL_TEXT.length, {
      type: "tween",
      duration: FULL_TEXT.length * 0.07,
      ease: "linear",
      onComplete: () => {
        setTimeout(() => setShowCursor(false), 1200);
      }
    });
    return controls.stop;
  }, [count, FULL_TEXT.length]);
  const location = useLocation();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(href);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'glass shadow-sm py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className={`font-display text-xl font-bold tracking-wider transition-all duration-300 flex items-center ${
              isScrolled ? 'text-dark scale-90' : 'text-white'
            }`}
          >
            <motion.span>{displayedText}</motion.span>
            {showCursor && (
              <span className="animate-pulse ml-0.5">|</span>
            )}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`relative font-body text-sm font-medium transition-colors duration-300 group ${
                  isScrolled
                    ? isActive(link.href)
                      ? 'text-dark'
                      : 'text-dark/70 hover:text-dark'
                    : isActive(link.href)
                    ? 'text-white'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                {link.name}
                <span
                  className={`absolute -bottom-1 left-1/2 w-0 h-0.5 bg-beige transition-all duration-300 group-hover:w-full group-hover:left-0 ${
                    isActive(link.href) ? 'w-full left-0' : ''
                  }`}
                />
              </Link>
            ))}
          </div>

          {/* CTA Button / Profile */}
          <div className="hidden md:block">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className={`w-10 h-10 rounded-full flex items-center justify-center font-display font-bold text-sm transition-all duration-300 ${
                    isScrolled ? 'bg-dark text-white hover:bg-dark/90 hover:ring-2 hover:ring-beige/30' : 'bg-white text-dark hover:bg-white/90 hover:ring-2 hover:ring-white/30'
                  }`}>
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 mt-2 pt-0 pb-2 bg-white/95 backdrop-blur-md rounded-xl shadow-xl border-dark/5">
                  <div className="px-4 py-4 border-b border-dark/5 mb-1">
                    <p className="text-sm font-display font-bold leading-none text-dark">{user.name}</p>
                    <p className="text-xs leading-none text-dark/50 mt-1.5">{user.email}</p>
                  </div>
                  <DropdownMenuItem asChild className="cursor-pointer font-body hover:bg-beige/10 py-2.5 px-4 focus:bg-beige/10">
                    <Link to="/portal?tab=Dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="cursor-pointer font-body hover:bg-beige/10 py-2.5 px-4 focus:bg-beige/10">
                    <Link to="/portal?tab=Saved+Properties">Saved Properties</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="cursor-pointer font-body hover:bg-beige/10 py-2.5 px-4 focus:bg-beige/10">
                    <Link to="/portal?tab=Viewing+Schedule">Viewing Schedule</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="cursor-pointer font-body hover:bg-beige/10 py-2.5 px-4 focus:bg-beige/10">
                    <Link to="/portal?tab=Messages+%26+Offers">Messages & Offers</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild className="cursor-pointer font-body hover:bg-beige/10 py-2.5 px-4 focus:bg-beige/10">
                    <Link to="/portal?tab=Account+Settings">Account Settings</Link>
                  </DropdownMenuItem>
                  <div className="h-px bg-dark/5 my-1" />
                  <DropdownMenuItem onClick={logout} className="cursor-pointer font-body font-medium text-red-600 hover:text-red-700 hover:bg-red-50 focus:bg-red-50 focus:text-red-700 py-2.5 px-4">
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                asChild
                className={`font-body text-sm font-medium px-6 transition-all duration-300 ${
                  isScrolled
                    ? 'bg-dark text-white hover:bg-dark/90'
                    : 'bg-white text-dark hover:bg-white/90'
                }`}
              >
                <Link to="/client-login">LOGIN</Link>
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className={`w-6 h-6 ${isScrolled ? 'text-dark' : 'text-white'}`} />
            ) : (
              <Menu className={`w-6 h-6 ${isScrolled ? 'text-dark' : 'text-white'}`} />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ${
            isMobileMenuOpen ? 'max-h-96 mt-4' : 'max-h-0'
          }`}
        >
          <div className="glass rounded-lg p-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`block font-body text-sm font-medium py-2 px-3 rounded-md transition-colors ${
                  isActive(link.href)
                    ? 'bg-beige/20 text-dark'
                    : 'text-dark/70 hover:bg-beige/10 hover:text-dark'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            {user ? (
              <div className="pt-2">
                <div className="px-3 py-3 mb-2 border-b border-dark/10 bg-dark/5 rounded-lg">
                  <p className="text-sm font-display font-bold text-dark">{user.name}</p>
                  <p className="text-xs text-dark/60 mt-0.5">{user.email}</p>
                </div>
                {['Dashboard', 'Saved Properties', 'Viewing Schedule', 'Messages & Offers', 'Account Settings'].map((tab) => (
                  <Link
                    key={tab}
                    to={`/portal?tab=${encodeURIComponent(tab)}`}
                    className="block font-body text-sm font-medium py-2 px-3 rounded-md text-dark/70 hover:bg-beige/10 hover:text-dark transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {tab}
                  </Link>
                ))}
                <button
                  onClick={() => {
                    logout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-left font-body text-sm font-bold py-2 px-3 rounded-md text-red-600 hover:bg-red-50 transition-colors mt-2"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Button
                asChild
                className="w-full bg-dark text-white hover:bg-dark/90 mt-3"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Link to="/client-login">Client Portal Login</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}


