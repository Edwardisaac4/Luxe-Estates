import { useState } from 'react';
import {
  Search,
  Mail,
  Phone,
  Calendar,
  CheckCircle,
  XCircle,
  MessageCircle,
  MoreHorizontal,
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
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import { inquiries } from '@/data/mockData';
import type { Inquiry } from '@/types';

export default function Inquiries() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);

  // Filter inquiries
  const filteredInquiries = inquiries.filter((inquiry) => {
    const matchesSearch =
      inquiry.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inquiry.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inquiry.message.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === 'all' || inquiry.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleView = (inquiry: Inquiry) => {
    setSelectedInquiry(inquiry);
    setViewDialogOpen(true);
  };

  const handleStatusChange = (_inquiry: Inquiry, newStatus: string) => {
    toast.success(`Inquiry status updated to ${newStatus}`);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new':
        return <Badge className="bg-blue-500">New</Badge>;
      case 'contacted':
        return <Badge variant="secondary">Contacted</Badge>;
      case 'closed':
        return <Badge variant="outline">Closed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="font-display text-3xl font-bold text-dark">
          Inquiries
        </h1>
        <p className="font-body text-dark/60">
          Manage customer inquiries and messages
        </p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark/40" />
              <Input
                placeholder="Search inquiries..."
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
                variant={statusFilter === 'new' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('new')}
              >
                New
              </Button>
              <Button
                variant={statusFilter === 'contacted' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('contacted')}
              >
                Contacted
              </Button>
              <Button
                variant={statusFilter === 'closed' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('closed')}
              >
                Closed
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Inquiries List */}
      <div className="space-y-4">
        {filteredInquiries.map((inquiry) => (
          <Card key={inquiry.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-beige/20 flex items-center justify-center flex-shrink-0">
                    <span className="font-display font-medium text-beige text-lg">
                      {inquiry.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-display font-semibold text-dark">
                        {inquiry.name}
                      </h3>
                      {getStatusBadge(inquiry.status)}
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-dark/60">
                      <div className="flex items-center gap-1">
                        <Mail className="w-4 h-4" />
                        <span className="font-body text-sm">
                          {inquiry.email}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Phone className="w-4 h-4" />
                        <span className="font-body text-sm">
                          {inquiry.phone}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span className="font-body text-sm">
                          {inquiry.createdAt}
                        </span>
                      </div>
                    </div>
                    <p className="font-body text-dark/70 mt-2 line-clamp-2">
                      {inquiry.message}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleView(inquiry)}
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    View
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() =>
                          handleStatusChange(inquiry, 'contacted')
                        }
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Mark as Contacted
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleStatusChange(inquiry, 'closed')}
                      >
                        <XCircle className="w-4 h-4 mr-2" />
                        Mark as Closed
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredInquiries.length === 0 && (
        <div className="text-center py-12">
          <p className="font-body text-dark/60 mb-4">
            No inquiries found matching your criteria
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

      {/* View Inquiry Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-display">Inquiry Details</DialogTitle>
            <DialogDescription className="font-body">
              From {selectedInquiry?.name}
            </DialogDescription>
          </DialogHeader>

          {selectedInquiry && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-beige/20 flex items-center justify-center">
                  <span className="font-display font-medium text-beige text-2xl">
                    {selectedInquiry.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h3 className="font-display font-semibold text-dark text-lg">
                    {selectedInquiry.name}
                  </h3>
                  {getStatusBadge(selectedInquiry.status)}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-dark/60">
                  <Mail className="w-4 h-4" />
                  <span className="font-body">{selectedInquiry.email}</span>
                </div>
                <div className="flex items-center gap-2 text-dark/60">
                  <Phone className="w-4 h-4" />
                  <span className="font-body">{selectedInquiry.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-dark/60">
                  <Calendar className="w-4 h-4" />
                  <span className="font-body">
                    {selectedInquiry.createdAt}
                  </span>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <p className="font-body text-dark">
                  {selectedInquiry.message}
                </p>
              </div>

              <div className="flex gap-2">
                <Button className="flex-1">
                  <Mail className="w-4 h-4 mr-2" />
                  Reply via Email
                </Button>
                <Button variant="outline" className="flex-1">
                  <Phone className="w-4 h-4 mr-2" />
                  Call
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
