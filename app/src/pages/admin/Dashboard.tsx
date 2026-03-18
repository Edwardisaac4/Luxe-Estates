import { Link } from 'react-router-dom';
import {
  Building2,
  Users,
  MessageSquare,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';
import { useProperties } from '@/contexts/PropertiesContext';
import { useAgents } from '@/contexts/AgentsContext';
import { useInquiries } from '@/contexts/InquiriesContext';
import { properties as staticProperties } from '@/data/mockData';

// Mock chart data
const monthlyData = [
  { month: 'Jan', sales: 12, inquiries: 45 },
  { month: 'Feb', sales: 15, inquiries: 52 },
  { month: 'Mar', sales: 18, inquiries: 48 },
  { month: 'Apr', sales: 22, inquiries: 61 },
  { month: 'May', sales: 25, inquiries: 58 },
  { month: 'Jun', sales: 30, inquiries: 72 },
];

// Chart data derived from static mock data (monthly historical data doesn't change in real time)
const propertyTypeData = [
  { type: 'Houses', count: staticProperties.filter(p => p.propertyType === 'house').length },
  { type: 'Apartments', count: staticProperties.filter(p => p.propertyType === 'apartment').length },
  { type: 'Villas', count: staticProperties.filter(p => p.propertyType === 'villa').length },
  { type: 'Penthouses', count: staticProperties.filter(p => p.propertyType === 'penthouse').length },
  { type: 'Condos', count: staticProperties.filter(p => p.propertyType === 'condo').length },
].filter(item => item.count > 0);

// Stat cards are now computed inside the component using live context data

export default function Dashboard() {
  const { properties } = useProperties();
  const { agents } = useAgents();
  const { inquiries } = useInquiries();

  const activeProperties = properties.filter(p => p.status !== 'sold');
  const openInquiries = inquiries.filter(i => i.status === 'new').length;
  const estimatedRevenue = properties
    .filter(p => p.status === 'sold')
    .reduce((sum, p) => sum + p.price * 0.03, 0); // 3% commission estimate

  const statCards = [
    {
      title: 'Active Properties',
      value: activeProperties.length,
      change: '+12%',
      trend: 'up',
      icon: Building2,
      color: 'bg-blue-500',
    },
    {
      title: 'Total Agents',
      value: agents.length,
      change: '+5%',
      trend: 'up',
      icon: Users,
      color: 'bg-green-500',
    },
    {
      title: 'Open Inquiries',
      value: openInquiries,
      change: openInquiries > 5 ? '+18%' : '-3%',
      trend: openInquiries > 5 ? 'up' : 'down',
      icon: MessageSquare,
      color: 'bg-yellow-500',
    },
    {
      title: 'Est. Revenue',
      value: estimatedRevenue >= 1000000
        ? `$${(estimatedRevenue / 1000000).toFixed(1)}M`
        : `$${Math.round(estimatedRevenue / 1000)}K`,
      change: '+8%',
      trend: 'up',
      icon: DollarSign,
      color: 'bg-purple-500',
    },
  ];

  const recentProperties = properties.slice(0, 5);
  const recentInquiries = inquiries.slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-dark">
            Dashboard
          </h1>
          <p className="font-body text-dark/60">
            Welcome back! Here's what's happening with your properties.
          </p>
        </div>
        <Button asChild>
          <Link to="/admin/properties">Add New Property</Link>
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-body text-sm text-dark/60 mb-1">
                      {stat.title}
                    </p>
                    <p className="font-display text-3xl font-bold text-dark">
                      {stat.value}
                    </p>
                    <div className="flex items-center gap-1 mt-2">
                      {stat.trend === 'up' ? (
                        <ArrowUpRight className="w-4 h-4 text-green-500" />
                      ) : (
                        <ArrowDownRight className="w-4 h-4 text-red-500" />
                      )}
                      <span
                        className={`font-body text-sm ${
                          stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
                        }`}
                      >
                        {stat.change}
                      </span>
                      <span className="font-body text-sm text-dark/40">
                        vs last month
                      </span>
                    </div>
                  </div>
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="font-display text-lg">
              Sales & Inquiries
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                  <XAxis dataKey="month" stroke="#666" fontSize={12} />
                  <YAxis stroke="#666" fontSize={12} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="sales"
                    stroke="#1a1a1a"
                    strokeWidth={2}
                    name="Sales"
                  />
                  <Line
                    type="monotone"
                    dataKey="inquiries"
                    stroke="#c5b8a5"
                    strokeWidth={2}
                    name="Inquiries"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Property Types Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="font-display text-lg">
              Properties by Type
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={propertyTypeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                  <XAxis dataKey="type" stroke="#666" fontSize={12} />
                  <YAxis stroke="#666" fontSize={12} />
                  <Tooltip />
                  <Bar dataKey="count" fill="#c5b8a5" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Properties */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="font-display text-lg">
              Recent Properties
            </CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/admin/properties">View All</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentProperties.map((property) => (
                <div
                  key={property.id}
                  className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-display font-medium text-dark truncate">
                      {property.title}
                    </p>
                    <p className="font-body text-sm text-dark/60">
                      {property.location}
                    </p>
                    <p className="font-body text-sm font-medium text-beige">
                      ${property.price.toLocaleString()}
                    </p>
                  </div>
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
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Inquiries */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="font-display text-lg">
              Recent Inquiries
            </CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/admin/inquiries">View All</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentInquiries.map((inquiry) => (
                <div
                  key={inquiry.id}
                  className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-beige/20 flex items-center justify-center flex-shrink-0">
                    <span className="font-display font-medium text-beige">
                      {inquiry.name?.charAt(0) ?? '?'}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-display font-medium text-dark">
                      {inquiry.name ?? 'Anonymous'}
                    </p>
                    <p className="font-body text-sm text-dark/60 truncate">
                      {inquiry.message}
                    </p>
                  </div>
                  <Badge
                    variant={
                      inquiry.status === 'new'
                        ? 'default'
                        : inquiry.status === 'contacted'
                        ? 'secondary'
                        : 'outline'
                    }
                  >
                    {inquiry.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
