import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
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
import { useProperties } from '@/contexts/PropertiesContext';

function formatPrice(price: number) {
  if (price >= 1000000000) {
    return `₦${(price / 1000000000).toFixed(1)}B`;
  }
  if (price >= 1000000) {
    return `₦${(price / 1000000).toFixed(1)}M`;
  }
  return `₦${(price / 1000).toFixed(0)}K`;
}

interface FilterContentProps {
  propertyType: string;
  setPropertyType: (v: string) => void;
  priceRange: string;
  setPriceRange: (v: string) => void;
  listingType: string;
  setListingType: (v: string) => void;
  beds: string;
  setBeds: (v: string) => void;
  setSearchQuery: (v: string) => void;
}

const FilterContent = ({ 
  propertyType, setPropertyType, 
  priceRange, setPriceRange, 
  listingType, setListingType,
  beds, setBeds,
  setSearchQuery 
}: FilterContentProps) => (
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
          <SelectItem value="0-50000000">₦0 - ₦50M</SelectItem>
          <SelectItem value="50000000-150000000">₦50M - ₦150M</SelectItem>
          <SelectItem value="150000000-500000000">₦150M - ₦500M</SelectItem>
          <SelectItem value="500000000-1000000000">₦500M - ₦1B</SelectItem>
          <SelectItem value="1000000000+">₦1B+</SelectItem>
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

    {/* Beds */}
    <div>
      <label className="font-body text-sm font-medium text-dark mb-2 block">
        Bedrooms
      </label>
      <Select value={beds} onValueChange={setBeds}>
        <SelectTrigger>
          <SelectValue placeholder="Any" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Any</SelectItem>
          <SelectItem value="1">1+ Beds</SelectItem>
          <SelectItem value="2">2+ Beds</SelectItem>
          <SelectItem value="3">3+ Beds</SelectItem>
          <SelectItem value="4">4+ Beds</SelectItem>
          <SelectItem value="5">5+ Beds</SelectItem>
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
        setBeds('all');
        setSearchQuery('');
      }}
    >
      <X className="w-4 h-4 mr-2" />
      Clear Filters
    </Button>
  </div>
);

export default function ListingsPage() {
  const [searchParams] = useSearchParams();
  const { properties } = useProperties();
  
  const [searchQuery, setSearchQuery] = useState(searchParams.get('location') || '');
  const [propertyType, setPropertyType] = useState(searchParams.get('propertyType') || 'all');
  const [priceRange, setPriceRange] = useState(searchParams.get('priceRange') || 'all');
  const [listingType, setListingType] = useState(searchParams.get('type') || 'all');
  const [beds, setBeds] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 12;

  const activeFiltersCount = [propertyType, priceRange, listingType, beds].filter(f => f !== 'all').length + (searchQuery ? 1 : 0);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, propertyType, priceRange, listingType, beds, sortBy]);

  // Filter properties
  const filteredProperties = properties
    .filter((property) => {
      if (property.status === 'sold') return false; // Hide sold properties from public listing
      if (
        searchQuery &&
        !property.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !property.location.toLowerCase().includes(searchQuery.toLowerCase())
      ) return false;
      if (propertyType !== 'all' && property.propertyType !== propertyType) return false;
      if (listingType !== 'all' && property.type !== listingType) return false;
      if (beds !== 'all' && property.beds < parseInt(beds)) return false;
      if (priceRange !== 'all') {
        const [minStr, maxStr] = priceRange.split('-');
        const min = parseInt(minStr) || 0;
        const max = maxStr?.endsWith('+') ? Infinity : parseInt(maxStr) || Infinity;
        if (property.price < min || property.price > max) return false;
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      // 'newest' — sort by createdAt desc, fall back to original order
      return (b.createdAt || '').localeCompare(a.createdAt || '');
    });

  // Calculate pagination
  const totalPages = Math.ceil(filteredProperties.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedProperties = filteredProperties.slice(startIndex, endIndex);

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
                <SelectTrigger className="w-36 h-12">
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
                <SelectTrigger className="w-36 h-12">
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any Price</SelectItem>
                  <SelectItem value="0-50000000">₦0 - ₦50M</SelectItem>
                  <SelectItem value="50000000-150000000">₦50M - ₦150M</SelectItem>
                  <SelectItem value="150000000-500000000">₦150M - ₦500M</SelectItem>
                  <SelectItem value="500000000-1000000000">₦500M - ₦1B</SelectItem>
                  <SelectItem value="1000000000+">₦1B+</SelectItem>
                </SelectContent>
              </Select>

              <Select value={listingType} onValueChange={setListingType}>
                <SelectTrigger className="w-32 h-12">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="sale">For Sale</SelectItem>
                  <SelectItem value="rent">For Rent</SelectItem>
                </SelectContent>
              </Select>

              <Select value={beds} onValueChange={setBeds}>
                <SelectTrigger className="w-28 h-12">
                  <SelectValue placeholder="Beds" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any Beds</SelectItem>
                  <SelectItem value="1">1+ Beds</SelectItem>
                  <SelectItem value="2">2+ Beds</SelectItem>
                  <SelectItem value="3">3+ Beds</SelectItem>
                  <SelectItem value="4">4+ Beds</SelectItem>
                  <SelectItem value="5">5+ Beds</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-36 h-12">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="price-asc">Price: Low → High</SelectItem>
                  <SelectItem value="price-desc">Price: High → Low</SelectItem>
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
                  <FilterContent 
                    propertyType={propertyType} 
                    setPropertyType={setPropertyType}
                    priceRange={priceRange}
                    setPriceRange={setPriceRange}
                    listingType={listingType}
                    setListingType={setListingType}
                    beds={beds}
                    setBeds={setBeds}
                    setSearchQuery={setSearchQuery}
                  />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Results */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Results Count + Active Filters */}
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <p className="font-body text-dark/60">
            Showing <strong>{filteredProperties.length}</strong> of {properties.length} properties
          </p>
          {activeFiltersCount > 0 && (
            <button
              onClick={() => { setPropertyType('all'); setPriceRange('all'); setListingType('all'); setBeds('all'); setSearchQuery(''); }}
              className="inline-flex items-center gap-1.5 text-xs font-body font-medium text-beige border border-beige/40 bg-beige/10 px-3 py-1.5 rounded-full hover:bg-beige/20 transition-colors"
            >
              <X className="w-3 h-3" />
              Clear {activeFiltersCount} filter{activeFiltersCount !== 1 ? 's' : ''}
            </button>
          )}
        </div>

        {/* Property Grid */}
        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginatedProperties.map((property) => (
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
          <div className="text-center py-24 bg-white rounded-2xl border border-border">
            <div className="w-16 h-16 bg-beige/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-beige" />
            </div>
            <h3 className="font-display text-2xl font-bold text-dark mb-2">
              No properties found
            </h3>
            <p className="font-body text-dark/60 max-w-md mx-auto">
              We couldn't find any properties matching your current filters. Try
              adjusting your search criteria or clearing filters.
            </p>
            <Button
              className="mt-6 font-body"
              onClick={() => {
                setPropertyType('all');
                setPriceRange('all');
                setListingType('all');
                setBeds('all');
                setSearchQuery('');
              }}
            >
              Clear All Filters
            </Button>
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-12 flex justify-center items-center gap-4">
            <Button
              variant="outline"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              className="px-6 border-dark/10"
            >
              Previous
            </Button>
            
            <div className="flex items-center gap-2">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-10 h-10 rounded-full font-display font-medium text-sm transition-colors ${
                    currentPage === i + 1 
                      ? 'bg-dark text-white' 
                      : 'text-dark/60 hover:bg-dark/5'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <Button
              variant="outline"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              className="px-6 border-dark/10"
            >
              Next
            </Button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
