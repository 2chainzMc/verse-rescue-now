import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { 
  MapPin, 
  Navigation as NavigationIcon, 
  Phone, 
  MessageCircle, 
  CheckCircle,
  Clock,
  DollarSign,
  Star,
  User,
  AlertCircle,
  TrendingUp
} from 'lucide-react';

const DriverDashboard: React.FC = () => {
  const [isOnline, setIsOnline] = useState(false);
  const [activeJob, setActiveJob] = useState(null);
  const [pendingRequests, setPendingRequests] = useState([
    {
      id: 1,
      customerName: "Sarah Johnson",
      location: "M1 Highway, Johannesburg",
      destination: "Mike's Garage, Sandton", 
      distance: "3.2 km",
      payout: "R 340",
      urgency: "high",
      estimatedTime: "25 mins"
    },
    {
      id: 2,
      customerName: "David Chen",
      location: "R21 near OR Tambo",
      destination: "AutoZone, Kempton Park",
      distance: "8.1 km", 
      payout: "R 520",
      urgency: "medium",
      estimatedTime: "45 mins"
    }
  ]);

  const stats = {
    todayEarnings: "R 1,240",
    completedJobs: 6,
    rating: 4.8,
    responseTime: "4.2 mins"
  };

  const handleAcceptJob = (jobId: number) => {
    const job = pendingRequests.find(j => j.id === jobId);
    setActiveJob(job);
    setPendingRequests(prev => prev.filter(j => j.id !== jobId));
  };

  const handleCompleteJob = () => {
    setActiveJob(null);
    // Simulate earnings update
  };

  if (activeJob) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation title="Active Job" showBack />
        
        <div className="max-w-4xl mx-auto p-4 space-y-6">
          {/* Job Status */}
          <Card className="border-primary shadow-medium">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>Job in Progress</CardTitle>
                <Badge className="bg-success text-success-foreground">
                  En Route
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Customer</p>
                  <p className="font-semibold">{activeJob.customerName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Payout</p>
                  <p className="font-semibold text-primary">{activeJob.payout}</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Pickup: {activeJob.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <NavigationIcon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Drop-off: {activeJob.destination}</span>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button className="flex-1 gap-2">
                  <Phone className="h-4 w-4" />
                  Call Customer
                </Button>
                <Button variant="outline" className="flex-1 gap-2">
                  <MessageCircle className="h-4 w-4" />
                  Message
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <Card>
            <CardContent className="p-6">
              <div className="bg-muted rounded-lg h-64 flex items-center justify-center">
                <div className="text-center">
                  <NavigationIcon className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-muted-foreground">GPS Navigation</p>
                  <p className="text-sm text-muted-foreground mt-1">Turn-by-turn directions to customer</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Job Actions */}
          <div className="grid grid-cols-2 gap-4">
            <Button variant="warning" className="h-12">
              Mark as Arrived
            </Button>
            <Button variant="success" className="h-12" onClick={handleCompleteJob}>
              <CheckCircle className="h-4 w-4 mr-2" />
              Complete Job
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation 
        title="Driver Dashboard" 
        showBack
        actions={
          <div className="flex items-center space-x-3">
            <span className="text-sm text-muted-foreground">Online</span>
            <Switch checked={isOnline} onCheckedChange={setIsOnline} />
          </div>
        }
      />
      
      <div className="max-w-4xl mx-auto p-4 space-y-6">
        {/* Online Status */}
        <Card className={isOnline ? "border-success shadow-soft" : "border-muted"}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${isOnline ? 'bg-success animate-pulse' : 'bg-muted-foreground'}`} />
                <div>
                  <h3 className="font-semibold">
                    {isOnline ? 'You are online and available' : 'You are offline'}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {isOnline ? 'Ready to receive job requests' : 'Toggle to start receiving jobs'}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Today's Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <DollarSign className="h-6 w-6 text-success mx-auto mb-2" />
              <p className="text-2xl font-bold text-success">{stats.todayEarnings}</p>
              <p className="text-xs text-muted-foreground">Today's Earnings</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <CheckCircle className="h-6 w-6 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold">{stats.completedJobs}</p>
              <p className="text-xs text-muted-foreground">Jobs Completed</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Star className="h-6 w-6 text-warning mx-auto mb-2" />
              <p className="text-2xl font-bold">{stats.rating}</p>
              <p className="text-xs text-muted-foreground">Rating</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Clock className="h-6 w-6 text-muted-foreground mx-auto mb-2" />
              <p className="text-2xl font-bold">{stats.responseTime}</p>
              <p className="text-xs text-muted-foreground">Avg Response</p>
            </CardContent>
          </Card>
        </div>

        {/* Pending Job Requests */}
        {isOnline && pendingRequests.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Incoming Job Requests</h3>
            {pendingRequests.map((request) => (
              <Card 
                key={request.id} 
                className={`cursor-pointer hover:shadow-medium transition-shadow ${
                  request.urgency === 'high' ? 'border-emergency' : 'border-border'
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="bg-primary/10 rounded-full p-3">
                        <User className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold">{request.customerName}</h4>
                          {request.urgency === 'high' && (
                            <Badge variant="destructive" className="text-xs">
                              <AlertCircle className="h-3 w-3 mr-1" />
                              Urgent
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{request.location}</p>
                        <p className="text-xs text-muted-foreground">
                          Destination: {request.destination}
                        </p>
                      </div>
                    </div>
                    
                    <div className="text-right space-y-1">
                      <p className="font-semibold text-primary">{request.payout}</p>
                      <p className="text-sm text-muted-foreground">{request.distance}</p>
                      <p className="text-xs text-muted-foreground">~{request.estimatedTime}</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex gap-2">
                    <Button 
                      className="flex-1"
                      onClick={() => handleAcceptJob(request.id)}
                    >
                      Accept Job
                    </Button>
                    <Button variant="outline" className="flex-1">
                      Decline
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* No jobs message */}
        {isOnline && pendingRequests.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Waiting for Jobs</h3>
              <p className="text-muted-foreground">
                You're online and ready to receive job requests. Stay nearby for the best response times!
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default DriverDashboard;