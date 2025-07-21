import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Truck, 
  Phone, 
  MessageCircle, 
  Star, 
  Clock, 
  DollarSign,
  AlertTriangle,
  Navigation as NavigationIcon,
  User
} from 'lucide-react';

const UserDashboard: React.FC = () => {
  const [isRequestingTow, setIsRequestingTow] = useState(false);
  const [activeRequest, setActiveRequest] = useState(false);

  const handleEmergencyRequest = () => {
    setIsRequestingTow(true);
    // Simulate location and truck finding process
    setTimeout(() => {
      setIsRequestingTow(false);
      setActiveRequest(true);
    }, 3000);
  };

  const nearbyTrucks = [
    {
      id: 1,
      driverName: "Sipho Mthembu",
      eta: "8 mins",
      distance: "2.1 km",
      price: "R 450",
      rating: 4.8,
      truckType: "Standard Tow",
      reviews: 127
    },
    {
      id: 2,
      driverName: "Maria Santos",
      eta: "12 mins", 
      distance: "3.8 km",
      price: "R 380",
      rating: 4.9,
      truckType: "Flatbed",
      reviews: 89
    },
    {
      id: 3,
      driverName: "John van der Merwe",
      eta: "15 mins",
      distance: "5.2 km", 
      price: "R 520",
      rating: 4.7,
      truckType: "Heavy Duty",
      reviews: 203
    }
  ];

  if (activeRequest) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation title="Live Tracking" showBack />
        
        <div className="max-w-4xl mx-auto p-4 space-y-6">
          {/* Driver Info Card */}
          <Card className="border-primary shadow-medium">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Your Driver is Coming</CardTitle>
                <Badge variant="secondary" className="bg-success text-success-foreground">
                  En Route
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="bg-primary/10 rounded-full p-3">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">Sipho Mthembu</h3>
                  <p className="text-sm text-muted-foreground">Standard Tow Truck</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="h-4 w-4 fill-warning text-warning" />
                    <span className="text-sm">4.8 (127 reviews)</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-primary">5 mins</p>
                  <p className="text-sm text-muted-foreground">ETA</p>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button className="flex-1 gap-2">
                  <Phone className="h-4 w-4" />
                  Call Driver
                </Button>
                <Button variant="outline" className="flex-1 gap-2">
                  <MessageCircle className="h-4 w-4" />
                  Message
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Live Map Placeholder */}
          <Card>
            <CardContent className="p-6">
              <div className="bg-muted rounded-lg h-64 flex items-center justify-center">
                <div className="text-center">
                  <NavigationIcon className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">Live GPS tracking map</p>
                  <p className="text-sm text-muted-foreground mt-1">Driver location updates every 30 seconds</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Job Details */}
          <Card>
            <CardHeader>
              <CardTitle>Job Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Pickup Location:</span>
                <span className="font-medium">N1 Highway, Johannesburg</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Destination:</span>
                <span className="font-medium">Joe's Auto Repair, Sandton</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Estimated Cost:</span>
                <span className="font-semibold text-primary">R 450</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Job ID:</span>
                <span className="font-mono text-sm">#TOW-2024-001</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation title="Need Emergency Towing?" showBack />
      
      <div className="max-w-4xl mx-auto p-4 space-y-6">
        {/* Emergency Button */}
        <Card className="border-emergency shadow-emergency">
          <CardContent className="p-6 text-center">
            <div className="space-y-4">
              <div className="bg-emergency/10 rounded-full p-4 w-fit mx-auto">
                <AlertTriangle className="h-8 w-8 text-emergency" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Vehicle Breakdown?
                </h2>
                <p className="text-muted-foreground">
                  Get immediate help from certified tow truck drivers near you
                </p>
              </div>
              
              {isRequestingTow ? (
                <div className="space-y-3">
                  <div className="animate-pulse">
                    <div className="bg-muted rounded-lg h-4 w-3/4 mx-auto mb-2"></div>
                    <div className="bg-muted rounded-lg h-4 w-1/2 mx-auto"></div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Finding nearby trucks...
                  </p>
                </div>
              ) : (
                <Button 
                  variant="emergency" 
                  size="xl" 
                  className="gap-3 font-semibold"
                  onClick={handleEmergencyRequest}
                >
                  <Truck className="h-5 w-5" />
                  I'm Stuck - Get Help Now
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Available Trucks */}
        {!isRequestingTow && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Available Tow Trucks Near You</h3>
            <div className="grid gap-4">
              {nearbyTrucks.map((truck) => (
                <Card key={truck.id} className="cursor-pointer hover:shadow-medium transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="bg-primary/10 rounded-full p-3">
                          <Truck className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold">{truck.driverName}</h4>
                          <p className="text-sm text-muted-foreground">{truck.truckType}</p>
                          <div className="flex items-center gap-1 mt-1">
                            <Star className="h-4 w-4 fill-warning text-warning" />
                            <span className="text-sm">{truck.rating} ({truck.reviews})</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right space-y-1">
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="font-semibold text-primary">{truck.eta}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>{truck.distance}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <DollarSign className="h-4 w-4 text-muted-foreground" />
                          <span className="font-semibold">{truck.price}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex gap-2">
                      <Button className="flex-1">Select This Driver</Button>
                      <Button variant="outline" size="icon">
                        <Phone className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;