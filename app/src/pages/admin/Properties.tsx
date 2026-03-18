import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Plus,
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Bed,
  Bath,
  Square,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import { useProperties } from '@/contexts/PropertiesContext';
import type { Property } from '@/types';

function formatPrice(price: number) {
  if (price >= 1000000) {
    return `$${(price / 1000000).toFixed(1)}M`;
  }
  return `$${(price / 1000).toFixed(0)}K`;
}

export default function Properties() {
  const { properties, deleteProperty } = useProperties();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [propertyToDelete, setPropertyToDelete] = useState<Property | null>(null);

  // Filter properties
  const filteredProperties = properties.filter((property) => {
    const matchesSearch =
      property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === 'all' || property.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleDelete = (property: Property) => {
    setPropertyToDelete(property);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (propertyToDelete) {
      deleteProperty(propertyToDelete.id);
      toast.success(`Property "${propertyToDelete.title}" deleted successfully`);
      setDeleteDialogOpen(false);
      setPropertyToDelete(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-dark">
            Properties
          </h1>
          <p className="font-body text-dark/60">
            Manage your property listings
          </p>
        </div>
        <Button asChild>
          <Link to="/admin/properties/new">
            <Plus className="w-4 h-4 mr-2" />
            Add Property
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark/40" />
              <Input
                placeholder="Search properties..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={statusFilter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('all')}
              >
                All
              </Button>
              <Button
                variant={statusFilter === 'active' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('active')}
              >
                Active
              </Button>
              <Button
                variant={statusFilter === 'pending' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('pending')}
              >
                Pending
              </Button>
              <Button
                variant={statusFilter === 'sold' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('sold')}
              >
                Sold
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Properties Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProperties.map((property) => (
          <Card key={property.id} className="overflow-hidden group">
            {/* Image */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={property.image}
                alt={property.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute top-3 left-3 flex gap-2">
                {property.badge && (
                  <Badge
                    className={
                      property.badge === 'Hot'
                        ? 'bg-red-500'
                        : property.badge === 'New'
                        ? 'bg-green-500'
                        : 'bg-beige text-dark'
                    }
                  >
                    {property.badge}
                  </Badge>
                )}
              </div>
              <div className="absolute top-3 right-3">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="bg-white/90 hover:bg-white"
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link to={`/property/${property.id}`} target="_blank">
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to={`/admin/properties/${property.id}/edit`}>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-red-600"
                      onClick={() => handleDelete(property)}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="absolute bottom-3 right-3">
                <Badge
                  variant={
                    property.status === 'active'
                      ? 'default'
                      : property.status === 'pending'
                      ? 'secondary'
                      : 'outline'
                  }
                >
                  {property.status}
                </Badge>
              </div>
            </div>

            {/* Content */}
            <CardContent className="p-4">
              <h3 className="font-display text-lg font-semibold text-dark mb-1 truncate">
                {property.title}
              </h3>
              <p className="font-body text-sm text-dark/60 mb-3">
                {property.location}
              </p>

              <p className="font-display text-xl font-bold text-beige mb-3">
                {formatPrice(property.price)}
              </p>

              {/* Features */}
              <div className="flex items-center gap-4 pt-3 border-t border-border">
                <div className="flex items-center gap-1 text-dark/60">
                  <Bed className="w-4 h-4" />
                  <span className="font-body text-sm">{property.beds}</span>
                </div>
                <div className="flex items-center gap-1 text-dark/60">
                  <Bath className="w-4 h-4" />
                  <span className="font-body text-sm">{property.baths}</span>
                </div>
                <div className="flex items-center gap-1 text-dark/60">
                  <Square className="w-4 h-4" />
                  <span className="font-body text-sm">
                    {property.sqft.toLocaleString()}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredProperties.length === 0 && (
        <div className="text-center py-12">
          <p className="font-body text-dark/60 mb-4">
            No properties found matching your criteria
          </p>
          <Button
            variant="outline"
            onClick={() => {
              setSearchQuery('');
              setStatusFilter('all');
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-display">Delete Property</DialogTitle>
            <DialogDescription className="font-body">
              Are you sure you want to delete "{propertyToDelete?.title}"? This
              action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
