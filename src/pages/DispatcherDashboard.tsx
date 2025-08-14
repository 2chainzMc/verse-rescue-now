import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { 
  MapPin, 
  Truck, 
  Clock, 
  Phone, 
  MessageSquare, 
  AlertTriangle, 
  UserCheck, 
  Navigation,
  Plus,
  Eye,
  RotateCcw,
  CheckCircle,
  XCircle
} from 'lucide-react';

interface Incident {
  id: string;
  type: 'SOS' | 'Manual';
  location: string;
  coordinates: { lat: number; lng: number };
  status: 'Unassigned' | 'Assigned' | 'En Route' | 'On Scene' | 'Complete';
  assignedDriver?: string;
  eta?: string;
  createdTime: string;
  customerName: string;
  customerPhone: string;
  vehicleType: string;
  issueDescription: string;
  priority: 'Low' | 'Medium' | 'High' | 'Emergency';
}

interface Driver {
  id: string;
  name: string;
  location: string;
  coordinates: { lat: number; lng: number };
  status: 'Available' | 'On Job' | 'Offline';
  vehicleType: string;
  currentJobId?: string;
  rating: number;
  phone: string;
  licensePlate: string;
}

const DispatcherDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
  const [isAssignDriverOpen, setIsAssignDriverOpen] = useState(false);
  const [isNewIncidentOpen, setIsNewIncidentOpen] = useState(false);

  // Mock data
  const [incidents, setIncidents] = useState<Incident[]>([
    {
      id: 'INC-001',
      type: 'SOS',
      location: '123 Main St, Downtown',
      coordinates: { lat: 40.7128, lng: -74.0060 },
      status: 'Unassigned',
      createdTime: '2024-01-15 14:30:00',
      customerName: 'John Doe',
      customerPhone: '+1-555-0123',
      vehicleType: 'Sedan',
      issueDescription: 'Car won\'t start, battery seems dead',
      priority: 'High'
    },
    {
      id: 'INC-002',
      type: 'Manual',
      location: '456 Oak Ave, Suburbs',
      coordinates: { lat: 40.7589, lng: -73.9851 },
      status: 'Assigned',
      assignedDriver: 'Mike Johnson',
      eta: '15 mins',
      createdTime: '2024-01-15 14:15:00',
      customerName: 'Sarah Wilson',
      customerPhone: '+1-555-0456',
      vehicleType: 'SUV',
      issueDescription: 'Flat tire on highway',
      priority: 'Medium'
    },
    {
      id: 'INC-003',
      type: 'SOS',
      location: '789 Pine St, Industrial',
      coordinates: { lat: 40.6892, lng: -74.0445 },
      status: 'En Route',
      assignedDriver: 'Alex Chen',
      eta: '8 mins',
      createdTime: '2024-01-15 13:45:00',
      customerName: 'Robert Brown',
      customerPhone: '+1-555-0789',
      vehicleType: 'Truck',
      issueDescription: 'Engine overheated, need towing',
      priority: 'Emergency'
    }
  ]);

  const [drivers, setDrivers] = useState<Driver[]>([
    {
      id: 'DRV-001',
      name: 'Mike Johnson',
      location: 'Downtown Area',
      coordinates: { lat: 40.7505, lng: -73.9934 },
      status: 'On Job',
      vehicleType: 'Heavy Duty Tow',
      currentJobId: 'INC-002',
      rating: 4.8,
      phone: '+1-555-1001',
      licensePlate: 'TOW-001'
    },
    {
      id: 'DRV-002',
      name: 'Alex Chen',
      location: 'Industrial District',
      coordinates: { lat: 40.6776, lng: -74.0139 },
      status: 'On Job',
      vehicleType: 'Standard Tow',
      currentJobId: 'INC-003',
      rating: 4.9,
      phone: '+1-555-1002',
      licensePlate: 'TOW-002'
    },
    {
      id: 'DRV-003',
      name: 'Sarah Davis',
      location: 'Uptown',
      coordinates: { lat: 40.7831, lng: -73.9712 },
      status: 'Available',
      vehicleType: 'Light Duty Tow',
      rating: 4.7,
      phone: '+1-555-1003',
      licensePlate: 'TOW-003'
    },
    {
      id: 'DRV-004',
      name: 'David Martinez',
      location: 'Suburbs',
      coordinates: { lat: 40.7282, lng: -73.7949 },
      status: 'Available',
      vehicleType: 'Heavy Duty Tow',
      rating: 4.6,
      phone: '+1-555-1004',
      licensePlate: 'TOW-004'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Unassigned': return 'destructive';
      case 'Assigned': return 'secondary';
      case 'En Route': return 'default';
      case 'On Scene': return 'default';
      case 'Complete': return 'default';
      case 'Available': return 'default';
      case 'On Job': return 'secondary';
      case 'Offline': return 'destructive';
      default: return 'secondary';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Emergency': return 'destructive';
      case 'High': return 'secondary';
      case 'Medium': return 'default';
      case 'Low': return 'outline';
      default: return 'secondary';
    }
  };

  const assignDriver = (incidentId: string, driverId: string) => {
    setIncidents(prev => prev.map(incident => 
      incident.id === incidentId 
        ? { ...incident, status: 'Assigned' as const, assignedDriver: drivers.find(d => d.id === driverId)?.name, eta: '12 mins' }
        : incident
    ));
    setDrivers(prev => prev.map(driver =>
      driver.id === driverId
        ? { ...driver, status: 'On Job' as const, currentJobId: incidentId }
        : driver
    ));
    setIsAssignDriverOpen(false);
  };

  const reassignDriver = (incidentId: string) => {
    const incident = incidents.find(i => i.id === incidentId);
    if (incident?.assignedDriver) {
      // Find driver and set back to available
      const driver = drivers.find(d => d.name === incident.assignedDriver);
      if (driver) {
        setDrivers(prev => prev.map(d =>
          d.id === driver.id
            ? { ...d, status: 'Available' as const, currentJobId: undefined }
            : d
        ));
      }
      // Set incident back to unassigned
      setIncidents(prev => prev.map(i =>
        i.id === incidentId
          ? { ...i, status: 'Unassigned' as const, assignedDriver: undefined, eta: undefined }
          : i
      ));
    }
  };

  const availableDrivers = drivers.filter(driver => driver.status === 'Available');

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Dispatch Control Center</h1>
            <p className="text-muted-foreground">Real-time fleet management and incident response</p>
          </div>
          <div className="flex gap-2">
            <Dialog open={isNewIncidentOpen} onOpenChange={setIsNewIncidentOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  New Incident
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Create New Incident</DialogTitle>
                  <DialogDescription>
                    Manually create a new towing incident
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="customer-name">Customer Name</Label>
                    <Input id="customer-name" placeholder="Enter customer name" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="customer-phone">Phone Number</Label>
                    <Input id="customer-phone" placeholder="+1-555-0000" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" placeholder="Street address or coordinates" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="vehicle-type">Vehicle Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select vehicle type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sedan">Sedan</SelectItem>
                        <SelectItem value="suv">SUV</SelectItem>
                        <SelectItem value="truck">Truck</SelectItem>
                        <SelectItem value="motorcycle">Motorcycle</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="priority">Priority Level</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="emergency">Emergency</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">Issue Description</Label>
                    <Textarea id="description" placeholder="Describe the issue..." />
                  </div>
                  <Button onClick={() => setIsNewIncidentOpen(false)}>Create Incident</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full flex flex-col">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="incidents">Incidents</TabsTrigger>
            <TabsTrigger value="drivers">Drivers</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="flex-1 p-4">
            <div className="grid grid-cols-12 gap-4 h-full">
              {/* Map Placeholder */}
              <Card className="col-span-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Live Fleet Map
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-96 bg-muted rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="w-12 h-12 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-muted-foreground">Interactive map with live driver locations</p>
                      <p className="text-sm text-muted-foreground mt-1">Red markers: Incidents | Blue markers: Available drivers</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats & Actions */}
              <div className="col-span-4 space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Quick Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Active Incidents</span>
                      <Badge variant="destructive">{incidents.filter(i => i.status !== 'Complete').length}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Available Drivers</span>
                      <Badge variant="default">{drivers.filter(d => d.status === 'Available').length}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Drivers On Job</span>
                      <Badge variant="secondary">{drivers.filter(d => d.status === 'On Job').length}</Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Recent Incidents</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-48">
                      <div className="space-y-2">
                        {incidents.slice(0, 5).map((incident) => (
                          <div key={incident.id} className="p-2 border rounded-lg">
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="font-medium text-sm">{incident.id}</p>
                                <p className="text-xs text-muted-foreground">{incident.customerName}</p>
                              </div>
                              <Badge variant={getStatusColor(incident.status)} className="text-xs">
                                {incident.status}
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">{incident.location}</p>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="incidents" className="flex-1 p-4">
            <Card>
              <CardHeader>
                <CardTitle>Incident Management</CardTitle>
                <CardDescription>Monitor and assign incidents to available drivers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {incidents.map((incident) => (
                    <div key={incident.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant={incident.type === 'SOS' ? 'destructive' : 'default'}>
                              {incident.type}
                            </Badge>
                            <Badge variant={getPriorityColor(incident.priority)}>
                              {incident.priority}
                            </Badge>
                            <Badge variant={getStatusColor(incident.status)}>
                              {incident.status}
                            </Badge>
                          </div>
                          <h3 className="font-semibold">{incident.id}</h3>
                          <p className="text-sm text-muted-foreground">{incident.customerName} • {incident.customerPhone}</p>
                          <p className="text-sm mt-1">{incident.location}</p>
                          <p className="text-sm text-muted-foreground">{incident.issueDescription}</p>
                          <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {incident.createdTime}
                            </span>
                            {incident.assignedDriver && (
                              <span className="flex items-center gap-1">
                                <Truck className="w-3 h-3" />
                                {incident.assignedDriver} • ETA: {incident.eta}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          {incident.status === 'Unassigned' && (
                            <Dialog open={isAssignDriverOpen} onOpenChange={setIsAssignDriverOpen}>
                              <DialogTrigger asChild>
                                <Button size="sm" onClick={() => setSelectedIncident(incident)}>
                                  <UserCheck className="w-4 h-4 mr-1" />
                                  Assign
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Assign Driver</DialogTitle>
                                  <DialogDescription>
                                    Select a driver for incident {selectedIncident?.id}
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4">
                                  {availableDrivers.map((driver) => (
                                    <div key={driver.id} className="flex justify-between items-center p-3 border rounded-lg">
                                      <div>
                                        <p className="font-medium">{driver.name}</p>
                                        <p className="text-sm text-muted-foreground">{driver.vehicleType} • {driver.location}</p>
                                        <p className="text-sm text-muted-foreground">Rating: {driver.rating}/5</p>
                                      </div>
                                      <Button 
                                        size="sm" 
                                        onClick={() => selectedIncident && assignDriver(selectedIncident.id, driver.id)}
                                      >
                                        Assign
                                      </Button>
                                    </div>
                                  ))}
                                </div>
                              </DialogContent>
                            </Dialog>
                          )}
                          {incident.status === 'Assigned' && (
                            <Button size="sm" variant="outline" onClick={() => reassignDriver(incident.id)}>
                              <RotateCcw className="w-4 h-4 mr-1" />
                              Reassign
                            </Button>
                          )}
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4 mr-1" />
                            Details
                          </Button>
                          <Button size="sm" variant="outline">
                            <Phone className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <MessageSquare className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="drivers" className="flex-1 p-4">
            <Card>
              <CardHeader>
                <CardTitle>Fleet Management</CardTitle>
                <CardDescription>Monitor driver locations and assignments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {drivers.map((driver) => (
                    <div key={driver.id} className="flex justify-between items-center p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold">{driver.name}</h3>
                          <Badge variant={getStatusColor(driver.status)}>
                            {driver.status}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                          <div>
                            <p>Vehicle: {driver.vehicleType}</p>
                            <p>Plate: {driver.licensePlate}</p>
                          </div>
                          <div>
                            <p>Location: {driver.location}</p>
                            <p>Rating: {driver.rating}/5</p>
                          </div>
                        </div>
                        {driver.currentJobId && (
                          <p className="text-sm mt-2">
                            Current Job: <Badge variant="secondary">{driver.currentJobId}</Badge>
                          </p>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Navigation className="w-4 h-4 mr-1" />
                          Track
                        </Button>
                        <Button size="sm" variant="outline">
                          <Phone className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <MessageSquare className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="flex-1 p-4">
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Response Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Avg Response Time</span>
                      <span className="font-semibold">12 mins</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Incidents Today</span>
                      <span className="font-semibold">24</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Jobs Completed</span>
                      <span className="font-semibold">22</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Success Rate</span>
                      <span className="font-semibold">91.7%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Fleet Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Total Drivers</span>
                      <span className="font-semibold">{drivers.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Available</span>
                      <span className="font-semibold text-green-600">{drivers.filter(d => d.status === 'Available').length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>On Job</span>
                      <span className="font-semibold text-blue-600">{drivers.filter(d => d.status === 'On Job').length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Offline</span>
                      <span className="font-semibold text-gray-600">{drivers.filter(d => d.status === 'Offline').length}</span>
                    </div>
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

export default DispatcherDashboard;