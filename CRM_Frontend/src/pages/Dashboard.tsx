import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { leadsAPI } from '@/lib/api';
import { LeadStatus, Lead } from '@/types/lead';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Users, 
  TrendingUp, 
  Target, 
  DollarSign, 
  Plus,
  Eye,
  BarChart3 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface DashboardStats {
  totalLeads: number;
  registeredLeads: number;
  warmLeads: number;
  opportunityLeads: number;
  recentLeads: Lead[];
}

export default function Dashboard() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [stats, setStats] = useState<DashboardStats>({
    totalLeads: 0,
    registeredLeads: 0,
    warmLeads: 0,
    opportunityLeads: 0,
    recentLeads: []
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setIsLoading(true);
      const totalCount = await leadsAPI.countAllLeads();
      const recentLeadsResponse = await leadsAPI.getAllLeads(0, 5, 'customerid', 'desc');
      const [registeredData, warmData, opportunityData] = await Promise.all([
        leadsAPI.getLeadsByStatus(LeadStatus.REGISTERED),
        leadsAPI.getLeadsByStatus(LeadStatus.WARMLEAD),
        leadsAPI.getLeadsByStatus(LeadStatus.OPPORTUNITY)
      ]);

      setStats({
        totalLeads: totalCount,
        registeredLeads: registeredData.count,
        warmLeads: warmData.count,
        opportunityLeads: opportunityData.count,
        recentLeads: recentLeadsResponse.content
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load dashboard data"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formatEnumLabel = (value: string) => {
    return value.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
  };

  const getStatusBadgeVariant = (status: LeadStatus) => {
    switch (status) {
      case LeadStatus.REGISTERED:
        return 'default';
      case LeadStatus.WARMLEAD:
        return 'secondary';
      case LeadStatus.OPPORTUNITY:
        return 'outline';
      case LeadStatus.COLDLEAD:
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6 px-4 md:px-8 lg:px-12">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-64 mb-2"></div>
          <div className="h-4 bg-muted rounded w-48"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="h-32 bg-muted rounded-lg"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 px-4 md:px-8 lg:px-12 py-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Dashboard</h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Welcome back, {user?.username}! Here's your lead overview.
          </p>
        </div>
        
        {user?.role === 'ADMIN' && (
          <Link to="/leads/create">
            <Button className="w-full sm:w-auto bg-gradient-to-r from-primary to-primary-glow hover:from-primary/90 hover:to-primary-glow/90">
              <Plus className="h-4 w-4 mr-2" />
              Create New Lead
            </Button>
          </Link>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold text-primary">{stats.totalLeads}</div>
            <p className="text-xs text-muted-foreground">All leads in system</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-success/10 to-success/5 border-success/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Registered</CardTitle>
            <TrendingUp className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold text-success">{stats.registeredLeads}</div>
            <p className="text-xs text-muted-foreground">Successfully registered</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-warning/10 to-warning/5 border-warning/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Warm Leads</CardTitle>
            <Target className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold text-warning">{stats.warmLeads}</div>
            <p className="text-xs text-muted-foreground">Potential conversions</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-blue-500/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Opportunities</CardTitle>
            <DollarSign className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-xl md:text-2xl font-bold text-blue-500">{stats.opportunityLeads}</div>
            <p className="text-xs text-muted-foreground">High-value prospects</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Leads & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Leads */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <CardTitle>Recent Leads</CardTitle>
                <CardDescription>Latest leads added to the system</CardDescription>
              </div>
              <Link to="/leads">
                <Button variant="outline" size="sm" className="w-full sm:w-auto">
                  <Eye className="h-4 w-4 mr-2" />
                  View All
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {stats.recentLeads.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No recent leads found
              </div>
            ) : (
              <div className="space-y-4">
                {stats.recentLeads.map((lead) => (
                  <div key={lead.customerid} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 bg-muted/50 rounded-lg gap-2">
                    <div className="flex-1">
                      <div className="font-medium">{lead.customerName}</div>
                      <div className="text-sm text-muted-foreground">{lead.email}</div>
                      <div className="text-sm text-muted-foreground">
                        {formatEnumLabel(lead.courses)}
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant={getStatusBadgeVariant(lead.leadStatus)} className="mb-1">
                        {formatEnumLabel(lead.leadStatus)}
                      </Badge>
                      <div className="text-sm font-medium">₹{lead.customerFeeCoated?.toLocaleString()}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Link to="/leads" className="block">
                <Button variant="outline" className="w-full justify-start">
                  <Users className="h-4 w-4 mr-3" />
                  Manage All Leads
                </Button>
              </Link>
              
              {user?.role === 'ADMIN' && (
                <Link to="/leads/create" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <Plus className="h-4 w-4 mr-3" />
                    Create New Lead
                  </Button>
                </Link>
              )}
              
              <Link to="/analytics" className="block">
                <Button variant="outline" className="w-full justify-start">
                  <BarChart3 className="h-4 w-4 mr-3" />
                  View Analytics
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
