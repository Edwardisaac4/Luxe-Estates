import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useProperties } from '@/contexts/PropertiesContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Save } from 'lucide-react';
import { toast } from 'sonner';

export default function PropertyForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { properties, addProperty, updateProperty } = useProperties();
  const isEditing = Boolean(id);

  const property = isEditing ? properties.find((p) => p.id === id) : null;

  const [formData, setFormData] = useState({
    title: property?.title || '',
    price: property?.price?.toString() || '',
    beds: property?.beds?.toString() || '',
    baths: property?.baths?.toString() || '',
    sqft: property?.sqft?.toString() || '',
    location: property?.location || '',
    image: property?.image || '',
    type: property?.type || 'sale',
    propertyType: property?.propertyType || 'house',
    status: property?.status || 'active',
  });

  useEffect(() => {
    if (isEditing && id && !property) {
      toast.error('Property not found');
      navigate('/admin/properties');
    }
  }, [id, isEditing, property, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newPropertyData = {
      title: formData.title,
      price: Number(formData.price),
      beds: Number(formData.beds),
      baths: Number(formData.baths),
      sqft: Number(formData.sqft),
      location: formData.location,
      image: formData.image || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2075&q=80',
      type: formData.type as 'sale' | 'rent',
      propertyType: formData.propertyType as 'house' | 'apartment' | 'condo' | 'villa' | 'penthouse',
      status: formData.status as 'active' | 'pending' | 'sold',
    };

    if (isEditing && id) {
      updateProperty(id, newPropertyData);
      toast.success('Property updated successfully');
    } else {
      addProperty(newPropertyData);
      toast.success('Property added successfully');
    }

    navigate('/admin/properties');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/admin/properties')}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="font-display text-3xl font-bold text-dark">
            {isEditing ? 'Edit Property' : 'Add New Property'}
          </h1>
          <p className="font-body text-dark/60">
            {isEditing ? 'Update property details below' : 'Fill in the details for the new listing'}
          </p>
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 md:col-span-2">
                <label className="font-body text-sm font-medium">Property Title</label>
                <Input
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Modern Villa in Beverly Hills"
                />
              </div>

              <div className="space-y-2">
                <label className="font-body text-sm font-medium">Price ($)</label>
                <Input
                  required
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="2500000"
                />
              </div>

              <div className="space-y-2">
                <label className="font-body text-sm font-medium">Location</label>
                <Input
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="e.g. Beverly Hills, CA"
                />
              </div>

              <div className="space-y-2">
                <label className="font-body text-sm font-medium">Bedrooms</label>
                <Input
                  required
                  type="number"
                  value={formData.beds}
                  onChange={(e) => setFormData({ ...formData, beds: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label className="font-body text-sm font-medium">Bathrooms</label>
                <Input
                  required
                  type="number"
                  value={formData.baths}
                  onChange={(e) => setFormData({ ...formData, baths: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label className="font-body text-sm font-medium">Square Footage</label>
                <Input
                  required
                  type="number"
                  value={formData.sqft}
                  onChange={(e) => setFormData({ ...formData, sqft: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label className="font-body text-sm font-medium">Image URL</label>
                <Input
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                />
              </div>

              <div className="space-y-2">
                <label className="font-body text-sm font-medium">Status</label>
                <select
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as 'active' | 'pending' | 'sold' })}
                >
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="sold">Sold</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="font-body text-sm font-medium">Property Type</label>
                <select
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={formData.propertyType}
                  onChange={(e) => setFormData({ ...formData, propertyType: e.target.value as 'house' | 'apartment' | 'condo' | 'villa' | 'penthouse' })}
                >
                  <option value="house">House</option>
                  <option value="apartment">Apartment</option>
                  <option value="condo">Condo</option>
                  <option value="villa">Villa</option>
                  <option value="penthouse">Penthouse</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-4 pt-4">
              <Button type="button" variant="outline" onClick={() => navigate('/admin/properties')}>
                Cancel
              </Button>
              <Button type="submit" className="gap-2">
                <Save className="w-4 h-4" />
                {isEditing ? 'Save Changes' : 'Create Property'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
