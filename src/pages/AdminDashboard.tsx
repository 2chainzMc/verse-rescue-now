import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart3,
  Users,
  Truck,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Activity,
  AlertCircle,
  Shield,
  Settings,
  Download,
  UserCheck,
  Clock,
  Star
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const platformStats = {
    totalUsers: 1847,
    totalDrivers: 283,
    totalOperators: 24,
    activeJobs: 67,
    completedJobs: 8429,
    totalRevenue: "R 2,847,390",
    monthlyGrowth: 18.3,
    platformUptime: "99.7%",
    avgRating: 4.6,
    responseTime: "4.8 mins"
  };

  const recentActivity = [
    {
      id: 1,
      type: "job_completed",
      description: "Job TOW-8429 completed by Sipho Mthembu",
      timestamp: "2 minutes ago",
      value: "R 450"
    },
    {
      id: 2,
      type: "driver_registered",
      description: "New driver registered: Maria Santos",
      timestamp: "15 minutes ago",
      value: "Driver #284"
    },
    {
      id: 3,
      type: "payment_processed",
      description: "Payment processed for 5 completed jobs",
      timestamp: "1 hour ago",
      value: "R 2,150"
    },
    {
      id: 4,
      type: "system_alert",
      description: "High demand detected in Johannesburg area",
      timestamp: "2 hours ago",
      value: "Alert"
    }
  ];

  const topPerformers = [
    {
      name: "Sipho Mthembu",
      type: "Driver",
      rating: 4.9,
      completedJobs: 124,
      earnings: "R 18,420"
    },
    {
      name: "Fleet Masters JHB",
      type: "Operator",
      rating: 4.8,
      managedJobs: 1456,
      revenue: "R 312,850"
    },
    {
      name: "Maria Santos",
      type: "Driver", 
      rating: 4.9,
      completedJobs: 98,
      earnings: "R 14,720"
    }
  ];

  const systemAlerts = [
    {
      type: "warning",
      message: "Server response time increased by 15% in the last hour",
      severity: "medium"
    },
    {
      type: "info",
      message: "Scheduled maintenance window: Sunday 2AM-4AM",
      severity: "low"
    },
    {
      type: "error",
      message: "Payment gateway experiencing intermittent issues",
      severity: "high"
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'job_completed': return <Truck className="h-4 w-4 text-success" />;
      case 'driver_registered': return <UserCheck className="h-4 w-4 text-primary" />;
      case 'payment_processed': return <DollarSign className="h-4 w-4 text-success" />;
      case 'system_alert': return <AlertCircle className="h-4 w-4 text-warning" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  const getAlertSeverity = (severity: string) => {
    switch (severity) {
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      case 'low': return 'default';
      default: return 'default';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation 
        title="TowVerse Admin" 
        showBack
        actions={
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        }
      />
      
      <div className="max-w-7xl mx-auto p-4 space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <Users className="h-6 w-6 text-primary mx-auto mb-2" />
                  <p className="text-2xl font-bold">{platformStats.totalUsers.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Total Users</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 text-center">
                  <Truck className="h-6 w-6 text-primary mx-auto mb-2" />
                  <p className="text-2xl font-bold">{platformStats.totalDrivers}</p>
                  <p className="text-sm text-muted-foreground">Active Drivers</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 text-center">
                  <Activity className="h-6 w-6 text-warning mx-auto mb-2" />
                  <p className="text-2xl font-bold">{platformStats.activeJobs}</p>
                  <p className="text-sm text-muted-foreground">Active Jobs</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 text-center">
                  <DollarSign className="h-6 w-6 text-success mx-auto mb-2" />
                  <p className="text-2xl font-bold">{platformStats.totalRevenue}</p>
                  <p className="text-sm text-muted-foreground">Total Revenue</p>
                </CardContent>
              </Card>
            </div>

            {/* Platform Health */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-success" />
                    Growth Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span>Monthly Growth</span>
                    <span className="font-semibold text-success">+{platformStats.monthlyGrowth}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>New Users (30d)</span>
                    <span className="font-semibold">+342</span>
                  </div>
                  <div className="flex justify-between">
                    <span>New Drivers (30d)</span>
                    <span className="font-semibold">+28</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    System Health
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span>Uptime</span>
                    <span className="font-semibold text-success">{platformStats.platformUptime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Avg Response Time</span>
                    <span className="font-semibold">{platformStats.responseTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Active Servers</span>
                    <span className="font-semibold text-success">8/8</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-warning" />
                    Quality Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span>Platform Rating</span>
                    <span className="font-semibold">{platformStats.avgRating}/5</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Completed Jobs</span>
                    <span className="font-semibold">{platformStats.completedJobs.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Success Rate</span>
                    <span className="font-semibold text-success">96.8%</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity & Alerts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/50">
                      {getActivityIcon(activity.type)}
                      <div className="flex-1">
                        <p className="text-sm font-medium">{activity.description}</p>
                        <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                      </div>
                      <span className="text-sm font-semibold">{activity.value}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>System Alerts</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {systemAlerts.map((alert, index) => (
                    <div key={index} className="flex items-start space-x-3 p-2 rounded-lg border">
                      <AlertCircle className="h-4 w-4 text-warning mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm">{alert.message}</p>
                        <Badge variant={getAlertSeverity(alert.severity)} className="mt-1 text-xs">
                          {alert.severity.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted rounded-lg h-64 flex items-center justify-center">
                    <div className="text-center">
                      <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                      <p className="text-muted-foreground">Revenue Chart</p>
                      <p className="text-sm text-muted-foreground mt-1">Monthly revenue trends</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Performers</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {topPerformers.map((performer, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-semibold">{performer.name}</h4>
                        <p className="text-sm text-muted-foreground">{performer.type}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="h-3 w-3 fill-warning text-warning" />
                          <span className="text-xs">{performer.rating}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold">
                          {performer.type === 'Driver' ? performer.earnings : performer.revenue}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {performer.type === 'Driver' 
                            ? `${performer.completedJobs} jobs` 
                            : `${performer.managedJobs} managed`
                          }
                        </p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-muted rounded-lg h-64 flex items-center justify-center">
                  <div className="text-center">
                    <Users className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground">User Management Interface</p>
                    <p className="text-sm text-muted-foreground mt-1">Manage drivers, operators, and users</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* System Tab */}
          <TabsContent value="system" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>System Configuration</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-muted rounded-lg h-64 flex items-center justify-center">
                  <div className="text-center">
                    <Settings className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground">System Settings</p>
                    <p className="text-sm text-muted-foreground mt-1">Configure platform settings and parameters</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Reports & Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-muted rounded-lg h-64 flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground">Advanced Reports</p>
                    <p className="text-sm text-muted-foreground mt-1">Generate and export detailed reports</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;