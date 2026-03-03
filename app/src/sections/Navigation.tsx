import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Listings', href: '/listings' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

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
            className={`font-display text-xl font-bold tracking-wider transition-all duration-300 ${
              isScrolled ? 'text-dark scale-90' : 'text-white'
            }`}
          >
            LUXE ESTATES
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

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button
              asChild
              className={`font-body text-sm font-medium px-6 transition-all duration-300 ${
                isScrolled
                  ? 'bg-dark text-white hover:bg-dark/90'
                  : 'bg-white text-dark hover:bg-white/90'
              }`}
            >
              <Link to="/admin/login">Admin Login</Link>
            </Button>
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
            <Button
              asChild
              className="w-full bg-dark text-white hover:bg-dark/90 mt-3"
            >
              <Link to="/admin/login">Admin Login</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
