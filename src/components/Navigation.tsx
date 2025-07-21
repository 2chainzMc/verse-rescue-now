import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Truck, ArrowLeft, Home } from 'lucide-react';

interface NavigationProps {
  title?: string;
  showBack?: boolean;
  actions?: React.ReactNode;
}

const Navigation: React.FC<NavigationProps> = ({ 
  title = "TowVerse", 
  showBack = false, 
  actions 
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  const handleHome = () => {
    navigate('/');
  };

  return (
    <nav className="bg-background border-b border-border shadow-soft sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left section */}
          <div className="flex items-center space-x-4">
            {showBack && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBack}
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
            )}
            
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-primary rounded-lg p-2">
                <Truck className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-foreground">
                  {title}
                </h1>
                {location.pathname !== '/' && (
                  <p className="text-xs text-muted-foreground">
                    Emergency Towing Platform
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Right section */}
          <div className="flex items-center space-x-2">
            {actions}
            {location.pathname !== '/' && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleHome}
                className="gap-2"
              >
                <Home className="h-4 w-4" />
                Home
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;