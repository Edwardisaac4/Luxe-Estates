import { useState } from 'react';
import { Search, MapPin, Home, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function Hero() {
  const [activeTab, setActiveTab] = useState<'buy' | 'rent' | 'sell'>('buy');
  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [priceRange, setPriceRange] = useState('');

  const handleSearch = () => {
    // In a real app, this would navigate to listings with filters
    console.log({ activeTab, location, propertyType, priceRange });
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/hero-bg.jpg"
          alt="Luxury home"
          className="w-full h-full object-cover scale-105 animate-[scaleIn_2s_ease-out_forwards]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-dark/80 via-dark/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 w-full">
        <div className="max-w-2xl">
          {/* Tagline */}
          <p
            className="font-display text-beige text-sm tracking-[0.3em] uppercase mb-4 animate-fade-up"
            style={{ animationDelay: '0.5s' }}
          >
            Luxury Real Estate
          </p>

          {/* Headline */}
          <h1
            className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 animate-fade-up"
            style={{ animationDelay: '0.7s' }}
          >
            Find Your
            <br />
            <span className="text-beige">Perfect Home</span>
          </h1>

          {/* Subheadline */}
          <p
            className="font-body text-lg text-white/80 mb-10 max-w-lg animate-fade-up"
            style={{ animationDelay: '0.9s' }}
          >
            Discover exceptional properties in the world's most desirable
            locations. Your dream home awaits.
          </p>

          {/* Search Widget */}
          <div
            className="bg-white rounded-xl shadow-2xl p-6 animate-fade-up"
            style={{ animationDelay: '1.1s' }}
          >
            {/* Tabs */}
            <div className="flex space-x-1 mb-6 bg-light rounded-lg p-1">
              {(['buy', 'rent', 'sell'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-2 px-4 rounded-md font-body text-sm font-medium capitalize transition-all duration-300 ${
                    activeTab === tab
                      ? 'bg-dark text-white'
                      : 'text-dark/60 hover:text-dark'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Search Fields */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Location */}
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark/40" />
                <Input
                  placeholder="Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="pl-10 h-12 border-border focus:border-beige focus:ring-beige"
                />
              </div>

              {/* Property Type */}
              <Select value={propertyType} onValueChange={setPropertyType}>
                <SelectTrigger className="h-12">
                  <Home className="w-5 h-5 text-dark/40 mr-2" />
                  <SelectValue placeholder="Property Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="house">House</SelectItem>
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="condo">Condo</SelectItem>
                  <SelectItem value="villa">Villa</SelectItem>
                  <SelectItem value="penthouse">Penthouse</SelectItem>
                </SelectContent>
              </Select>

              {/* Price Range */}
              <Select value={priceRange} onValueChange={setPriceRange}>
                <SelectTrigger className="h-12">
                  <DollarSign className="w-5 h-5 text-dark/40 mr-2" />
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-500000">$0 - $500,000</SelectItem>
                  <SelectItem value="500000-1000000">
                    $500,000 - $1M
                  </SelectItem>
                  <SelectItem value="1000000-2500000">
                    $1M - $2.5M
                  </SelectItem>
                  <SelectItem value="2500000-5000000">
                    $2.5M - $5M
                  </SelectItem>
                  <SelectItem value="5000000+">$5M+</SelectItem>
                </SelectContent>
              </Select>

              {/* Search Button */}
              <Button
                onClick={handleSearch}
                className="h-12 bg-dark text-white hover:bg-dark/90 font-body font-medium animate-pulse-glow"
              >
                <Search className="w-5 h-5 mr-2" />
                Search
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-light to-transparent z-10" />
    </section>
  );
}
