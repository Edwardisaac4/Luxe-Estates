import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAgents } from '@/contexts/AgentsContext';
import { useProperties } from '@/contexts/PropertiesContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Save } from 'lucide-react';
import { toast } from 'sonner';

export default function AgentForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { agents, addAgent, updateAgent } = useAgents();
  const { properties } = useProperties();
  const isEditing = Boolean(id);

  const agent = isEditing ? agents.find((a) => a.id === id) : null;

  // Auto-compute sales count: properties that are 'sold' and have the agent's name as the agent
  const computedSales = agent
    ? properties.filter(
        (p) => p.status === 'sold' && p.agent?.name === agent.name
      ).length
    : 0;

  const [formData, setFormData] = useState({
    name: agent?.name || '',
    email: agent?.email || '',
    phone: agent?.phone || '',
    role: agent?.role || 'Sales Agent',
    bio: agent?.bio || '',
    image: agent?.image || '',
  });

  useEffect(() => {
    if (isEditing && id && !agent) {
      toast.error('Agent not found');
      navigate('/admin/agents');
    }
  }, [id, isEditing, agent, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const agentData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      role: formData.role,
      bio: formData.bio,
      image:
        formData.image ||
        'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      sales: computedSales, // Always derived from sold properties
    };

    if (isEditing && id) {
      updateAgent(id, agentData);
      toast.success('Agent updated successfully');
    } else {
      addAgent(agentData);
      toast.success('Agent added successfully');
    }

    navigate('/admin/agents');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/admin/agents')}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="font-display text-3xl font-bold text-dark">
            {isEditing ? 'Edit Agent' : 'Add New Agent'}
          </h1>
          <p className="font-body text-dark/60">
            {isEditing ? 'Update agent profile details' : 'Fill in the details for your new team member'}
          </p>
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="font-body text-sm font-medium">Full Name</label>
                <Input
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Sarah Johnson"
                />
              </div>

              <div className="space-y-2">
                <label className="font-body text-sm font-medium">Role / Title</label>
                <select
                  required
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <option value="Sales Agent">Sales Agent</option>
                  <option value="Senior Sales Agent">Senior Sales Agent</option>
                  <option value="Luxury Specialist">Luxury Specialist</option>
                  <option value="Rental Specialist">Rental Specialist</option>
                  <option value="Commercial Agent">Commercial Agent</option>
                  <option value="Property Manager">Property Manager</option>
                  <option value="Branch Manager">Branch Manager</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="font-body text-sm font-medium">Email Address</label>
                <Input
                  required
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="sarah@luxestates.com"
                />
              </div>

              <div className="space-y-2">
                <label className="font-body text-sm font-medium">Phone Number</label>
                <Input
                  required
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+1 (555) 000-0000"
                />
              </div>

              <div className="space-y-2">
                <label className="font-body text-sm font-medium">Total Sales (auto-calculated)</label>
                <div className="flex h-10 w-full rounded-md border border-input bg-muted px-3 py-2 text-sm items-center text-dark/60">
                  {computedSales} {computedSales === 1 ? 'property sold' : 'properties sold'}
                </div>
                <p className="text-xs text-dark/40">Automatically counted from properties marked as <strong>Sold</strong> linked to this agent.</p>
              </div>

              <div className="space-y-2">
                <label className="font-body text-sm font-medium">Profile Photo URL</label>
                <Input
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="font-body text-sm font-medium">Bio</label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  rows={4}
                  className="w-full px-3 py-2 border border-border rounded-md font-body text-sm focus:outline-none focus:ring-2 focus:ring-beige"
                  placeholder="Brief professional biography..."
                />
              </div>
            </div>

            <div className="flex justify-end gap-4 pt-4">
              <Button type="button" variant="outline" onClick={() => navigate('/admin/agents')}>
                Cancel
              </Button>
              <Button type="submit" className="gap-2">
                <Save className="w-4 h-4" />
                {isEditing ? 'Save Changes' : 'Add Agent'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
