import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bed, Bath, Square, MapPin, Search, Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import Navigation from '@/sections/Navigation';
import Footer from '@/sections/Footer';
import { properties } from '@/data/mockData';

function formatPrice(price: number) {
  if (price >= 1000000) {
    return `$${(price / 1000000).toFixed(1)}M`;
  }
  return `$${(price / 1000).toFixed(0)}K`;
}

export default function ListingsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [propertyType, setPropertyType] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [listingType, setListingType] = useState('all');

  // Filter properties
  const filteredProperties = properties.filter((property) => {
    // Search query filter
    if (
      searchQuery &&
      !property.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !property.location.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    // Property type filter
    if (propertyType !== 'all') {
      // In a real app, you'd have a type field on the property
      return true;
    }

    // Price range filter
    if (priceRange !== 'all') {
      const [min, max] = priceRange.split('-').map((v) => {
        if (v.endsWith('+')) return parseInt(v) || 0;
        return parseInt(v) || 0;
      });
      if (max && (property.price < min || property.price > max)) return false;
      if (!max && property.price < min) return false;
    }

    // Listing type filter
    if (listingType !== 'all' && property.type !== listingType) {
      return false;
    }

    return true;
  });

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Property Type */}
      <div>
        <label className="font-body text-sm font-medium text-dark mb-2 block">
          Property Type
        </label>
        <Select value={propertyType} onValueChange={setPropertyType}>
          <SelectTrigger>
            <SelectValue placeholder="All Types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="house">House</SelectItem>
            <SelectItem value="apartment">Apartment</SelectItem>
            <SelectItem value="condo">Condo</SelectItem>
            <SelectItem value="villa">Villa</SelectItem>
            <SelectItem value="penthouse">Penthouse</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Price Range */}
      <div>
        <label className="font-body text-sm font-medium text-dark mb-2 block">
          Price Range
        </label>
        <Select value={priceRange} onValueChange={setPriceRange}>
          <SelectTrigger>
            <SelectValue placeholder="Any Price" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any Price</SelectItem>
            <SelectItem value="0-500000">$0 - $500,000</SelectItem>
            <SelectItem value="500000-1000000">$500,000 - $1M</SelectItem>
            <SelectItem value="1000000-2500000">$1M - $2.5M</SelectItem>
            <SelectItem value="2500000-5000000">$2.5M - $5M</SelectItem>
            <SelectItem value="5000000+">$5M+</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Listing Type */}
      <div>
        <label className="font-body text-sm font-medium text-dark mb-2 block">
          Listing Type
        </label>
        <Select value={listingType} onValueChange={setListingType}>
          <SelectTrigger>
            <SelectValue placeholder="All Listings" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Listings</SelectItem>
            <SelectItem value="sale">For Sale</SelectItem>
            <SelectItem value="rent">For Rent</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Clear Filters */}
      <Button
        variant="outline"
        className="w-full"
        onClick={() => {
          setPropertyType('all');
          setPriceRange('all');
          setListingType('all');
          setSearchQuery('');
        }}
      >
        <X className="w-4 h-4 mr-2" />
        Clear Filters
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-light">
      <Navigation />

      {/* Page Header */}
      <div className="pt-24 pb-8 bg-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            Property Listings
          </h1>
          <p className="font-body text-white/70">
            Discover your perfect property from our exclusive collection
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="sticky top-16 z-40 bg-white border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark/40" />
              <Input
                placeholder="Search by location or property name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12"
              />
            </div>

            {/* Desktop Filters */}
            <div className="hidden md:flex gap-3">
              <Select value={propertyType} onValueChange={setPropertyType}>
                <SelectTrigger className="w-40 h-12">
                  <SelectValue placeholder="Property Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="house">House</SelectItem>
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="condo">Condo</SelectItem>
                  <SelectItem value="villa">Villa</SelectItem>
                  <SelectItem value="penthouse">Penthouse</SelectItem>
                </SelectContent>
              </Select>

              <Select value={priceRange} onValueChange={setPriceRange}>
                <SelectTrigger className="w-40 h-12">
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any Price</SelectItem>
                  <SelectItem value="0-500000">$0 - $500K</SelectItem>
                  <SelectItem value="500000-1000000">$500K - $1M</SelectItem>
                  <SelectItem value="1000000-2500000">$1M - $2.5M</SelectItem>
                  <SelectItem value="2500000-5000000">$2.5M - $5M</SelectItem>
                  <SelectItem value="5000000+">$5M+</SelectItem>
                </SelectContent>
              </Select>

              <Select value={listingType} onValueChange={setListingType}>
                <SelectTrigger className="w-40 h-12">
                  <SelectValue placeholder="Listing Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Listings</SelectItem>
                  <SelectItem value="sale">For Sale</SelectItem>
                  <SelectItem value="rent">For Rent</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Mobile Filter Button */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="md:hidden h-12">
                  <Filter className="w-5 h-5 mr-2" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <SheetHeader>
                  <SheetTitle className="font-display">Filters</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <FilterContent />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Results */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Results Count */}
        <div className="mb-6">
          <p className="font-body text-dark/60">
            Showing {filteredProperties.length} properties
          </p>
        </div>

        {/* Property Grid */}
        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((property) => (
              <Link
                key={property.id}
                to={`/property/${property.id}`}
                className="group block bg-white rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-500 hover:-translate-y-2"
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Badge */}
                  {property.badge && (
                    <Badge
                      className={`absolute top-4 left-4 font-body text-xs ${
                        property.badge === 'Hot'
                          ? 'bg-red-500 text-white'
                          : property.badge === 'New'
                          ? 'bg-green-500 text-white'
                          : 'bg-beige text-dark'
                      }`}
                    >
                      {property.badge}
                    </Badge>
                  )}

                  {/* Type Badge */}
                  <Badge
                    className={`absolute top-4 right-4 font-body text-xs capitalize ${
                      property.type === 'sale'
                        ? 'bg-dark text-white'
                        : 'bg-beige text-dark'
                    }`}
                  >
                    For {property.type}
                  </Badge>

                  {/* Price Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                    <span className="font-display text-2xl font-bold text-white">
                      {formatPrice(property.price)}
                    </span>
                    <span className="font-body text-sm text-white/80">
                      {property.type === 'rent' ? '/month' : ''}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-display text-xl font-semibold text-dark mb-2 group-hover:text-beige transition-colors">
                    {property.title}
                  </h3>

                  <div className="flex items-center text-dark/60 mb-4">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span className="font-body text-sm">
                      {property.location}
                    </span>
                  </div>

                  {/* Features */}
                  <div className="flex items-center gap-4 pt-4 border-t border-border">
                    <div className="flex items-center gap-1 text-dark/70">
                      <Bed className="w-4 h-4" />
                      <span className="font-body text-sm">{property.beds}</span>
                    </div>
                    <div className="flex items-center gap-1 text-dark/70">
                      <Bath className="w-4 h-4" />
                      <span className="font-body text-sm">
                        {property.baths}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-dark/70">
                      <Square className="w-4 h-4" />
                      <span className="font-body text-sm">
                        {property.sqft.toLocaleString()} sqft
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="font-body text-lg text-dark/60 mb-4">
              No properties found matching your criteria
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setPropertyType('all');
                setPriceRange('all');
                setListingType('all');
                setSearchQuery('');
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
