import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, TrendingUp, BarChart3, PieChart as PieChartIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { leadsAPI } from '@/lib/api';
import { LeadStatus } from '@/types/lead';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip as RechartsTooltip,
  Legend as RechartsLegend,
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';

interface AnalyticsData {
  totalLeads: number;
  statusBreakdown: { [key in LeadStatus]: number };
}

export default function Analytics() {
  const { toast } = useToast();
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalLeads: 0,
    statusBreakdown: {} as { [key in LeadStatus]: number },
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      setIsLoading(true);

      const totalCount = await leadsAPI.countAllLeads();
      const statusBreakdown: { [key in LeadStatus]: number } = {} as any;

      await Promise.all(
        Object.values(LeadStatus).map(async (status) => {
          try {
            const statusData = await leadsAPI.getLeadsByStatus(status);
            statusBreakdown[status] = statusData.count;
          } catch {
            statusBreakdown[status] = 0;
          }
        })
      );

      setAnalytics({ totalLeads: totalCount, statusBreakdown });
    } catch {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to load analytics data',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formatEnumLabel = (value: string | null | undefined) => {
    if (!value) return '-';
    return value.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, (l) => l.toUpperCase());
  };

  const COLORS = ['#4ade80', '#facc15', '#3b82f6', '#ef4444', '#8b5cf6', '#6366f1'];

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-40 md:w-64 mb-2"></div>
          <div className="h-4 bg-muted rounded w-32 md:w-48"></div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="h-20 md:h-32 bg-muted rounded-lg"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const pieChartData = Object.entries(analytics.statusBreakdown).map(([status, count]) => ({
    name: formatEnumLabel(status),
    value: count,
  }));

  const barChartData = [
    {
      name: 'Active Leads',
      value:
        (analytics.statusBreakdown[LeadStatus.WARMLEAD] || 0) +
        (analytics.statusBreakdown[LeadStatus.OPPORTUNITY] || 0) +
        (analytics.statusBreakdown[LeadStatus.ATTENDEDDEMO] || 0),
    },
    {
      name: 'Registered Leads',
      value: analytics.statusBreakdown[LeadStatus.REGISTERED] || 0,
    },
    {
      name: 'Cold Leads',
      value: analytics.statusBreakdown[LeadStatus.COLDLEAD] || 0,
    },
  ];

  return (
    <div className="space-y-8 p-2 sm:p-4 lg:p-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">Analytics Dashboard</h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Comprehensive overview of your lead management performance
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">Total Leads</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-lg sm:text-2xl font-bold text-primary">{analytics.totalLeads}</div>
            <p className="text-xs text-muted-foreground">All leads in system</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-success/10 to-success/5 border-success/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">Conversion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-lg sm:text-2xl font-bold text-success">
              {analytics.totalLeads > 0
                ? Math.round(
                    (analytics.statusBreakdown[LeadStatus.REGISTERED] / analytics.totalLeads) * 100
                  )
                : 0}
              %
            </div>
            <p className="text-xs text-muted-foreground">Registered leads ratio</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-warning/10 to-warning/5 border-warning/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">Warm Leads</CardTitle>
            <BarChart3 className="h-4 w-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-lg sm:text-2xl font-bold text-warning">
              {analytics.statusBreakdown[LeadStatus.WARMLEAD] || 0}
            </div>
            <p className="text-xs text-muted-foreground">Potential conversions</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-blue-500/20">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium">Opportunities</CardTitle>
            <PieChartIcon className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-lg sm:text-2xl font-bold text-blue-500">
              {analytics.statusBreakdown[LeadStatus.OPPORTUNITY] || 0}
            </div>
            <p className="text-xs text-muted-foreground">High-value prospects</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Donut Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm sm:text-base">Lead Status Distribution</CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              Breakdown of leads by current status
            </CardDescription>
          </CardHeader>
          <CardContent>
            {analytics.totalLeads > 0 ? (
              <div className="h-[250px] sm:h-[300px] lg:h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieChartData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius="50%"   // makes it a donut
                      outerRadius="80%"
                      paddingAngle={4}
                      label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {pieChartData.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <RechartsTooltip formatter={(value) => [`${value}`, 'Leads']} />
                    <RechartsLegend verticalAlign="bottom" height={36} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No analytics data available
              </div>
            )}
          </CardContent>
        </Card>

        {/* Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm sm:text-base">Key Metrics Visualization</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] sm:h-[300px] lg:h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart data={barChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis allowDecimals={false} />
                  <RechartsTooltip />
                  <Bar dataKey="value" fill="#4ade80" radius={[6, 6, 0, 0]} />
                </RechartsBarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
