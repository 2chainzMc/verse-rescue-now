import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Car, Truck, Users, Crown, MapPin, Phone, MessageCircle } from 'lucide-react';

const roles = [
  {
    id: 'user',
    title: 'I Need a Tow',
    subtitle: 'Emergency roadside assistance',
    icon: Car,
    description: 'Get immediate help from nearby tow trucks',
    color: 'emergency',
    route: '/user'
  },
  {
    id: 'driver',
    title: "I'm a Tow Truck Driver",
    subtitle: 'Accept towing jobs',
    icon: Truck,
    description: 'Receive job requests and earn money',
    color: 'primary',
    route: '/driver'
  },
  {
    id: 'operator',
    title: 'I Manage a Fleet',
    subtitle: 'Fleet operations',
    icon: Users,
    description: 'Manage drivers and dispatch jobs',
    color: 'warning',
    route: '/operator'
  },
  {
    id: 'admin',
    title: "I'm the CEO/Admin",
    subtitle: 'Platform oversight',
    icon: Crown,
    description: 'Monitor operations and analytics',
    color: 'success',
    route: '/admin'
  }
];

const RoleSelector: React.FC = () => {
  const navigate = useNavigate();

  const handleRoleSelect = (route: string) => {
    navigate(route);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-primary/5 flex flex-col items-center justify-center p-4">
      {/* Header */}
      <div className="text-center mb-8 animate-slide-up">
        <div className="flex items-center justify-center mb-4">
          <div className="bg-gradient-primary rounded-full p-3 shadow-medium">
            <Truck className="h-8 w-8 text-primary-foreground" />
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
          TowVerse
        </h1>
        <p className="text-lg text-muted-foreground max-w-md mx-auto">
          Emergency towing and logistics platform for South Africa
        </p>
      </div>

      {/* Role Selection Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        {roles.map((role, index) => {
          const Icon = role.icon;
          return (
            <Card
              key={role.id}
              className="group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-medium border-2 hover:border-primary animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => handleRoleSelect(role.route)}
            >
              <CardContent className="p-6 text-center space-y-4">
                <div className="flex justify-center">
                  <div className={`p-4 rounded-full bg-${role.color}/10 group-hover:bg-gradient-primary transition-all duration-300`}>
                    <Icon className={`h-8 w-8 text-${role.color} group-hover:text-primary-foreground transition-colors duration-300`} />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                    {role.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {role.subtitle}
                  </p>
                </div>
                <p className="text-sm text-muted-foreground">
                  {role.description}
                </p>
                <Button 
                  variant="outline" 
                  className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-300"
                >
                  Get Started
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Emergency Contact Bar */}
      <div className="mt-12 flex flex-col sm:flex-row gap-4 items-center">
        <p className="text-sm text-muted-foreground">Emergency?</p>
        <div className="flex gap-2">
          <Button variant="emergency" size="sm" className="gap-2">
            <Phone className="h-4 w-4" />
            Call 10111
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <MessageCircle className="h-4 w-4" />
            Live Chat
          </Button>
        </div>
      </div>

      {/* Authentication Buttons */}
      <div className="mt-8 flex flex-col sm:flex-row gap-4 items-center">
        <Button 
          onClick={() => navigate('/login')}
          variant="default"
          size="lg"
          className="min-w-[120px]"
        >
          Login
        </Button>
        <Button 
          onClick={() => navigate('/register')}
          variant="outline"
          size="lg"
          className="min-w-[120px]"
        >
          Register
        </Button>
      </div>

      {/* Footer */}
      <div className="mt-6 text-center">
        <p className="text-xs text-muted-foreground">
          Serving South Africa with trusted, 24/7 emergency towing
        </p>
      </div>
    </div>
  );
};

export default RoleSelector;