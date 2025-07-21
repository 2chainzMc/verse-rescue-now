import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Users, 
  MapPin, 
  Truck, 
  Clock, 
  DollarSign, 
  AlertTriangle,
  CheckCircle,
  Activity,
  TrendingUp,
  Phone,
  MessageCircle,
  Navigation as NavigationIcon
} from 'lucide-react';

const OperatorDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const fleetStats = {
    totalDrivers: 24,
    activeDrivers: 18,
    busyDrivers: 8,
    availableDrivers: 10,
    offlineDrivers: 6,
    todayJobs: 45,
    pendingJobs: 7,
    completedJobs: 38,
    avgResponseTime: "6.2 mins",
    totalEarnings: "R 18,420"
  };

  const activeJobs = [
    {
      id: "TOW-001",
      driver: "Sipho Mthembu",
      customer: "Sarah Johnson",
      location: "M1 Highway, JHB",
      status: "En Route",
      eta: "12 mins",
      priority: "high"
    },
    {
      id: "TOW-002", 
      driver: "Maria Santos",
      customer: "David Chen",
      location: "R21 near OR Tambo",
      status: "Loading Vehicle",
      eta: "35 mins",
      priority: "medium"
    },
    {
      id: "TOW-003",
      driver: "John van der Merwe", 
      customer: "Lisa Adams",
      location: "N3 Germiston",
      status: "Completed",
      eta: "Done",
      priority: "low"
    }
  ];

  const fleetDrivers = [
    {
      id: 1,
      name: "Sipho Mthembu",
      status: "busy",
      location: "Johannesburg Central",
      currentJob: "TOW-001",
      rating: 4.8,
      todayJobs: 3
    },
    {
      id: 2,
      name: "Maria Santos", 
      status: "busy",
      location: "OR Tambo Area",
      currentJob: "TOW-002",
      rating: 4.9,
      todayJobs: 2
    },
    {
      id: 3,
      name: "John van der Merwe",
      status: "available",
      location: "Sandton",
      currentJob: null,
      rating: 4.7,
      todayJobs: 4
    },
    {
      id: 4,
      name: "Thabo Mokoena",
      status: "available", 
      location: "Midrand",
      currentJob: null,
      rating: 4.6,
      todayJobs: 2
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'default';
      case 'busy': return 'secondary';
      case 'offline': return 'destructive';
      default: return 'secondary';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      case 'low': return 'default';
      default: return 'secondary';
    }
  };

  // Modal content components
  const CallModal = ({ contact }: { contact: any }) => (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Call {contact.name}</DialogTitle>
      </DialogHeader>
      <div className="space-y-4">
        <div className="text-center space-y-2">
          <div className="bg-primary/10 rounded-full p-4 w-fit mx-auto">
            <Phone className="h-8 w-8 text-primary" />
          </div>
          <h3 className="font-semibold text-lg">{contact.name}</h3>
          <p className="text-muted-foreground">+27 11 123 4567</p>
        </div>
        <div className="flex gap-2">
          <Button className="flex-1" onClick={() => window.open('tel:+27111234567')}>
            Call Now
          </Button>
          <Button variant="outline" className="flex-1">
            Cancel
          </Button>
        </div>
      </div>
    </DialogContent>
  );

  const MessageModal = ({ contact }: { contact: any }) => (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Message {contact.name}</DialogTitle>
      </DialogHeader>
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Quick Messages</label>
          <div className="grid grid-cols-1 gap-2">
            <Button variant="outline" size="sm" className="justify-start">
              "What's your current status?"
            </Button>
            <Button variant="outline" size="sm" className="justify-start">
              "Please proceed to pickup location"
            </Button>
            <Button variant="outline" size="sm" className="justify-start">
              "Customer is waiting for you"
            </Button>
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Custom Message</label>
          <Textarea placeholder="Type your message..." />
        </div>
        <div className="flex gap-2">
          <Button className="flex-1">
            <MessageCircle className="h-4 w-4 mr-2" />
            Send Message
          </Button>
          <Button variant="outline" className="flex-1">
            Cancel
          </Button>
        </div>
      </div>
    </DialogContent>
  );

  const NavigationModal = ({ location }: { location: string }) => (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Navigation Options</DialogTitle>
      </DialogHeader>
      <div className="space-y-4">
        <div className="text-center space-y-2">
          <div className="bg-primary/10 rounded-full p-4 w-fit mx-auto">
            <NavigationIcon className="h-8 w-8 text-primary" />
          </div>
          <h3 className="font-semibold">Navigate to Location</h3>
          <p className="text-sm text-muted-foreground">{location}</p>
        </div>
        <div className="grid grid-cols-1 gap-2">
          <Button className="justify-start" onClick={() => window.open(`https://maps.google.com/maps?q=${encodeURIComponent(location)}`)}>
            <NavigationIcon className="h-4 w-4 mr-2" />
            Open in Google Maps
          </Button>
          <Button variant="outline" className="justify-start" onClick={() => window.open(`https://waze.com/ul?q=${encodeURIComponent(location)}`)}>
            <NavigationIcon className="h-4 w-4 mr-2" />
            Open in Waze
          </Button>
          <Button variant="outline" className="justify-start">
            <MapPin className="h-4 w-4 mr-2" />
            Track on Internal Map
          </Button>
        </div>
        <Button variant="outline" className="w-full">
          Cancel
        </Button>
      </div>
    </DialogContent>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navigation title="Fleet Operations" showBack />
      
      <div className="max-w-7xl mx-auto p-4 space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="jobs">Active Jobs</TabsTrigger>
            <TabsTrigger value="fleet">Fleet Status</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <Users className="h-5 w-5 text-primary" />
                    <span className="text-sm text-muted-foreground">Active Drivers</span>
                  </div>
                  <p className="text-2xl font-bold text-primary">
                    {fleetStats.activeDrivers}/{fleetStats.totalDrivers}
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <Activity className="h-5 w-5 text-warning" />
                    <span className="text-sm text-muted-foreground">Jobs Today</span>
                  </div>
                  <p className="text-2xl font-bold text-warning">{fleetStats.todayJobs}</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <Clock className="h-5 w-5 text-success" />
                    <span className="text-sm text-muted-foreground">Avg Response</span>
                  </div>
                  <p className="text-2xl font-bold text-success">{fleetStats.avgResponseTime}</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <DollarSign className="h-5 w-5 text-primary" />
                    <span className="text-sm text-muted-foreground">Earnings</span>
                  </div>
                  <p className="text-2xl font-bold text-primary">{fleetStats.totalEarnings}</p>
                </CardContent>
              </Card>
            </div>

            {/* Live Map */}
            <Card>
              <CardHeader>
                <CardTitle>Live Fleet Map</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-muted rounded-lg h-64 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground">Real-time fleet tracking</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      All {fleetStats.activeDrivers} active drivers visible on map
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Active Jobs Tab */}
          <TabsContent value="jobs" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Active Jobs ({activeJobs.length})</h3>
              <Button>Assign New Job</Button>
            </div>
            
            <div className="grid gap-4">
              {activeJobs.map((job) => (
                <Card key={job.id} className="hover:shadow-medium transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-3">
                          <Badge variant={getPriorityColor(job.priority)}>
                            {job.priority.toUpperCase()}
                          </Badge>
                          <span className="font-mono text-sm">{job.id}</span>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Driver</p>
                            <p className="font-semibold">{job.driver}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Customer</p>
                            <p className="font-semibold">{job.customer}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Location</p>
                            <p>{job.location}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Status</p>
                            <p className="font-semibold text-primary">{job.status}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right space-y-2">
                        <p className="text-lg font-bold">{job.eta}</p>
                        <div className="flex gap-1">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button size="sm" variant="outline">
                                <Phone className="h-3 w-3" />
                              </Button>
                            </DialogTrigger>
                            <CallModal contact={{ name: job.driver }} />
                          </Dialog>
                          
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button size="sm" variant="outline">
                                <MessageCircle className="h-3 w-3" />
                              </Button>
                            </DialogTrigger>
                            <MessageModal contact={{ name: job.driver }} />
                          </Dialog>
                          
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button size="sm" variant="outline">
                                <NavigationIcon className="h-3 w-3" />
                              </Button>
                            </DialogTrigger>
                            <NavigationModal location={job.location} />
                          </Dialog>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Fleet Status Tab */}
          <TabsContent value="fleet" className="space-y-4">
            <div className="grid gap-4">
              {fleetDrivers.map((driver) => (
                <Card key={driver.id} className="hover:shadow-medium transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="bg-primary/10 rounded-full p-3">
                          <Truck className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h4 className="font-semibold">{driver.name}</h4>
                            <Badge variant={getStatusColor(driver.status)}>
                              {driver.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{driver.location}</p>
                          {driver.currentJob && (
                            <p className="text-xs text-primary">Working on: {driver.currentJob}</p>
                          )}
                        </div>
                      </div>
                      
                      <div className="text-right space-y-1">
                        <p className="text-sm">Rating: ⭐ {driver.rating}</p>
                        <p className="text-sm text-muted-foreground">
                          {driver.todayJobs} jobs today
                        </p>
                        <div className="flex gap-1">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button size="sm" variant="outline">
                                <Phone className="h-3 w-3" />
                              </Button>
                            </DialogTrigger>
                            <CallModal contact={{ name: driver.name }} />
                          </Dialog>
                          
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button size="sm" variant="outline">
                                <MessageCircle className="h-3 w-3" />
                              </Button>
                            </DialogTrigger>
                            <MessageModal contact={{ name: driver.name }} />
                          </Dialog>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Completed Jobs</span>
                    <span className="font-semibold">{fleetStats.completedJobs}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pending Jobs</span>
                    <span className="font-semibold text-warning">{fleetStats.pendingJobs}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Success Rate</span>
                    <span className="font-semibold text-success">96.2%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Customer Satisfaction</span>
                    <span className="font-semibold">4.7/5</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Analytics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Today's Revenue</span>
                    <span className="font-semibold text-primary">{fleetStats.totalEarnings}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>This Week</span>
                    <span className="font-semibold">R 89,340</span>
                  </div>
                  <div className="flex justify-between">
                    <span>This Month</span>
                    <span className="font-semibold">R 312,850</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Growth</span>
                    <span className="font-semibold text-success flex items-center gap-1">
                      <TrendingUp className="h-4 w-4" />
                      +12.3%
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default OperatorDashboard;