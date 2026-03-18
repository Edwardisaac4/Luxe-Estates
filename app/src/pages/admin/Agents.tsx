import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Plus,
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  Mail,
  Phone,
  TrendingUp,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
import { useAgents } from '@/contexts/AgentsContext';
import type { Agent } from '@/types';

export default function Agents() {
  const { agents, deleteAgent } = useAgents();
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [agentToDelete, setAgentToDelete] = useState<Agent | null>(null);
  const [profileDialogOpen, setProfileDialogOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);

  const handleViewProfile = (agent: Agent) => {
    setSelectedAgent(agent);
    setProfileDialogOpen(true);
  };

  // Filter agents
  const filteredAgents = agents.filter(
    (agent) =>
      agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (agent: Agent) => {
    setAgentToDelete(agent);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (agentToDelete) {
      deleteAgent(agentToDelete.id);
      toast.success(`Agent "${agentToDelete.name}" deleted successfully`);
      setDeleteDialogOpen(false);
      setAgentToDelete(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-dark">Agents</h1>
          <p className="font-body text-dark/60">Manage your team of agents</p>
        </div>
        <Button asChild>
          <Link to="/admin/agents/new">
            <Plus className="w-4 h-4 mr-2" />
            Add Agent
          </Link>
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark/40" />
            <Input
              placeholder="Search agents by name, email, or role..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAgents.map((agent) => (
          <Card key={agent.id} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <img
                  src={agent.image}
                  alt={agent.name}
                  className="w-20 h-20 rounded-full object-cover"
                />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link to={`/admin/agents/${agent.id}/edit`}>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-red-600"
                      onClick={() => handleDelete(agent)}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <h3 className="font-display text-xl font-semibold text-dark mb-1">
                {agent.name}
              </h3>
              <Badge variant="secondary" className="mb-3">
                {agent.role}
              </Badge>

              <p className="font-body text-sm text-dark/60 mb-4 line-clamp-2">
                {agent.bio}
              </p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-dark/60">
                  <Mail className="w-4 h-4" />
                  <span className="font-body text-sm">{agent.email}</span>
                </div>
                <div className="flex items-center gap-2 text-dark/60">
                  <Phone className="w-4 h-4" />
                  <span className="font-body text-sm">{agent.phone}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-border flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-beige" />
                  <span className="font-display font-semibold text-dark">
                    {agent.sales}
                  </span>
                  <span className="font-body text-sm text-dark/60">
                    Sales
                  </span>
                </div>
                <Button variant="outline" size="sm" onClick={() => handleViewProfile(agent)}>
                  View Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredAgents.length === 0 && (
        <div className="text-center py-12">
          <p className="font-body text-dark/60 mb-4">
            No agents found matching your criteria
          </p>
          <Button variant="outline" onClick={() => setSearchQuery('')}>
            Clear Search
          </Button>
        </div>
      )}

      {/* Agent Profile Dialog */}
      <Dialog open={profileDialogOpen} onOpenChange={setProfileDialogOpen}>
        <DialogContent className="max-w-md">
          {selectedAgent && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-4 mt-2">
                  <img
                    src={selectedAgent.image}
                    alt={selectedAgent.name}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                  <div>
                    <DialogTitle className="font-display text-xl">{selectedAgent.name}</DialogTitle>
                    <DialogDescription className="font-body">{selectedAgent.role}</DialogDescription>
                    <Badge variant="secondary" className="mt-1">{selectedAgent.sales ?? 0} Sales</Badge>
                  </div>
                </div>
              </DialogHeader>
              <div className="space-y-4 mt-2">
                {selectedAgent.bio && (
                  <p className="font-body text-sm text-dark/70 leading-relaxed">{selectedAgent.bio}</p>
                )}
                <div className="border-t border-border pt-4 space-y-2">
                  <div className="flex items-center gap-2 text-dark/70">
                    <Mail className="w-4 h-4" />
                    <a href={`mailto:${selectedAgent.email}`} className="font-body text-sm hover:underline">
                      {selectedAgent.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-dark/70">
                    <Phone className="w-4 h-4" />
                    <a href={`tel:${selectedAgent.phone}`} className="font-body text-sm hover:underline">
                      {selectedAgent.phone}
                    </a>
                  </div>
                </div>
              </div>
              <DialogFooter className="mt-4 flex gap-2">
                <Button variant="outline" asChild className="flex-1 gap-2">
                  <a href={`tel:${selectedAgent.phone}`}>
                    <Phone className="w-4 h-4" /> Call
                  </a>
                </Button>
                <Button asChild className="flex-1 gap-2">
                  <a href={`mailto:${selectedAgent.email}`}>
                    <Mail className="w-4 h-4" /> Email
                  </a>
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-display">Delete Agent</DialogTitle>
            <DialogDescription className="font-body">
              Are you sure you want to delete "{agentToDelete?.name}"? This
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
