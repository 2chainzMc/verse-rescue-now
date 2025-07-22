import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';
import { Car, Truck, Building2, Crown, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';

const Register = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('user');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const validateForm = (formData: any, userType: string) => {
    setError('');

    // Basic validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.password) {
      setError('Please fill in all required fields');
      return false;
    }

    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address');
      return false;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }

    if (formData.confirmPassword && formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }

    // Role-specific validation
    if (userType === 'driver') {
      if (!formData.licenseNumber || !formData.vehicleType || !formData.vehicleRegistration) {
        setError('Please fill in all driver-specific fields');
        return false;
      }
    }

    if (userType === 'operator') {
      if (!formData.companyName || !formData.companyRegistration) {
        setError('Please fill in all company details');
        return false;
      }
    }

    if (userType === 'admin') {
      if (!formData.adminCode || !formData.department) {
        setError('Please fill in all admin fields');
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (formData: any, userType: string) => {
    if (!validateForm(formData, userType)) {
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // API call structure ready for backend
      const registrationData = {
        userType,
        ...formData,
        timestamp: new Date().toISOString(),
        status: 'pending_verification'
      };
      
      console.log('Registration data for API:', registrationData);
      
      // Store user data for frontend simulation
      localStorage.setItem('towverse_user', JSON.stringify({
        email: formData.email,
        userType,
        firstName: formData.firstName,
        lastName: formData.lastName,
        registrationTime: new Date().toISOString()
      }));
      
      toast({
        title: "Registration Successful!",
        description: `Welcome to TowVerse! Your ${userType} account has been created.`,
      });
      
      // Navigate to appropriate dashboard after registration
      const routes = {
        user: '/user',
        driver: '/driver', 
        operator: '/operator',
        admin: '/admin'
      };
      
      navigate(routes[userType as keyof typeof routes]);
      
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
    
    setIsLoading(false);
  };

  const UserRegistration = () => {
    const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: ''
    });

    return (
      <form onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(formData, 'user');
      }}>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First Name</Label>
              <Input 
                id="firstName" 
                value={formData.firstName}
                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                required 
              />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input 
                id="lastName" 
                value={formData.lastName}
                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                required 
              />
            </div>
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required 
            />
          </div>
          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <Input 
              id="phone" 
              type="tel" 
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              required 
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input 
              id="password" 
              type="password" 
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required 
            />
          </div>
          <div>
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input 
              id="confirmPassword" 
              type="password" 
              value={formData.confirmPassword}
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              required 
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Creating Account...' : 'Register as User'}
          </Button>
        </div>
      </form>
    );
  };

  const DriverRegistration = () => {
    const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      licenseNumber: '',
      vehicleType: '',
      vehicleRegistration: '',
      vehicleCapacity: '',
      operatingRadius: '',
      bankAccount: '',
      idDocument: null as File | null
    });

    return (
      <form onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(formData, 'driver');
      }}>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="driverFirstName">First Name</Label>
              <Input 
                id="driverFirstName" 
                value={formData.firstName}
                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                required 
              />
            </div>
            <div>
              <Label htmlFor="driverLastName">Last Name</Label>
              <Input 
                id="driverLastName" 
                value={formData.lastName}
                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                required 
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="driverEmail">Email</Label>
              <Input 
                id="driverEmail" 
                type="email" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required 
              />
            </div>
            <div>
              <Label htmlFor="driverPhone">Phone Number</Label>
              <Input 
                id="driverPhone" 
                type="tel" 
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                required 
              />
            </div>
          </div>
          <div>
            <Label htmlFor="driverPassword">Password</Label>
            <Input 
              id="driverPassword" 
              type="password" 
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required 
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="licenseNumber">Driver's License Number</Label>
              <Input 
                id="licenseNumber" 
                value={formData.licenseNumber}
                onChange={(e) => setFormData({...formData, licenseNumber: e.target.value})}
                required 
              />
            </div>
            <div>
              <Label htmlFor="vehicleType">Vehicle Type</Label>
              <Select onValueChange={(value) => setFormData({...formData, vehicleType: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select vehicle type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="flatbed">Flatbed Truck</SelectItem>
                  <SelectItem value="wheel-lift">Wheel Lift Truck</SelectItem>
                  <SelectItem value="integrated">Integrated Truck</SelectItem>
                  <SelectItem value="heavy-duty">Heavy Duty Truck</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="vehicleRegistration">Vehicle Registration</Label>
              <Input 
                id="vehicleRegistration" 
                value={formData.vehicleRegistration}
                onChange={(e) => setFormData({...formData, vehicleRegistration: e.target.value})}
                required 
              />
            </div>
            <div>
              <Label htmlFor="vehicleCapacity">Vehicle Capacity (tons)</Label>
              <Input 
                id="vehicleCapacity" 
                type="number" 
                value={formData.vehicleCapacity}
                onChange={(e) => setFormData({...formData, vehicleCapacity: e.target.value})}
                required 
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="operatingRadius">Operating Radius (km)</Label>
              <Input 
                id="operatingRadius" 
                type="number" 
                value={formData.operatingRadius}
                onChange={(e) => setFormData({...formData, operatingRadius: e.target.value})}
                required 
              />
            </div>
            <div>
              <Label htmlFor="bankAccount">Bank Account Number</Label>
              <Input 
                id="bankAccount" 
                value={formData.bankAccount}
                onChange={(e) => setFormData({...formData, bankAccount: e.target.value})}
                required 
              />
            </div>
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Creating Account...' : 'Register as Driver'}
          </Button>
        </div>
      </form>
    );
  };

  const OperatorRegistration = () => {
    const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      companyName: '',
      companyRegistration: '',
      fleetSize: '',
      operatingArea: '',
      businessLicense: null as File | null
    });

    return (
      <form onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(formData, 'operator');
      }}>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="operatorFirstName">First Name</Label>
              <Input 
                id="operatorFirstName" 
                value={formData.firstName}
                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                required 
              />
            </div>
            <div>
              <Label htmlFor="operatorLastName">Last Name</Label>
              <Input 
                id="operatorLastName" 
                value={formData.lastName}
                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                required 
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="operatorEmail">Email</Label>
              <Input 
                id="operatorEmail" 
                type="email" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required 
              />
            </div>
            <div>
              <Label htmlFor="operatorPhone">Phone Number</Label>
              <Input 
                id="operatorPhone" 
                type="tel" 
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                required 
              />
            </div>
          </div>
          <div>
            <Label htmlFor="operatorPassword">Password</Label>
            <Input 
              id="operatorPassword" 
              type="password" 
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required 
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="companyName">Company Name</Label>
              <Input 
                id="companyName" 
                value={formData.companyName}
                onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                required 
              />
            </div>
            <div>
              <Label htmlFor="companyRegistration">Company Registration</Label>
              <Input 
                id="companyRegistration" 
                value={formData.companyRegistration}
                onChange={(e) => setFormData({...formData, companyRegistration: e.target.value})}
                required 
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="fleetSize">Fleet Size</Label>
              <Input 
                id="fleetSize" 
                type="number" 
                value={formData.fleetSize}
                onChange={(e) => setFormData({...formData, fleetSize: e.target.value})}
                required 
              />
            </div>
            <div>
              <Label htmlFor="operatingArea">Operating Area</Label>
              <Input 
                id="operatingArea" 
                value={formData.operatingArea}
                onChange={(e) => setFormData({...formData, operatingArea: e.target.value})}
                placeholder="e.g., Johannesburg, Cape Town"
                required 
              />
            </div>
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Creating Account...' : 'Register as Fleet Manager'}
          </Button>
        </div>
      </form>
    );
  };

  const AdminRegistration = () => {
    const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      adminCode: '',
      department: '',
      permissions: ''
    });

    return (
      <form onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(formData, 'admin');
      }}>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="adminFirstName">First Name</Label>
              <Input 
                id="adminFirstName" 
                value={formData.firstName}
                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                required 
              />
            </div>
            <div>
              <Label htmlFor="adminLastName">Last Name</Label>
              <Input 
                id="adminLastName" 
                value={formData.lastName}
                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                required 
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="adminEmail">Email</Label>
              <Input 
                id="adminEmail" 
                type="email" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required 
              />
            </div>
            <div>
              <Label htmlFor="adminPhone">Phone Number</Label>
              <Input 
                id="adminPhone" 
                type="tel" 
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                required 
              />
            </div>
          </div>
          <div>
            <Label htmlFor="adminPassword">Password</Label>
            <Input 
              id="adminPassword" 
              type="password" 
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required 
            />
          </div>
          <div>
            <Label htmlFor="adminCode">Admin Access Code</Label>
            <Input 
              id="adminCode" 
              value={formData.adminCode}
              onChange={(e) => setFormData({...formData, adminCode: e.target.value})}
              placeholder="Enter admin authorization code"
              required 
            />
          </div>
          <div>
            <Label htmlFor="department">Department</Label>
            <Select onValueChange={(value) => setFormData({...formData, department: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="operations">Operations</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
                <SelectItem value="customer-service">Customer Service</SelectItem>
                <SelectItem value="technical">Technical</SelectItem>
                <SelectItem value="executive">Executive</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Creating Account...' : 'Register as Admin'}
          </Button>
        </div>
      </form>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/10 p-4">
      <div className="container mx-auto max-w-4xl py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Join TowVerse</h1>
          <p className="text-muted-foreground">Register for your role in the emergency towing network</p>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Card className="w-full">
          <CardHeader>
            <CardTitle>Create Your Account</CardTitle>
            <CardDescription>Choose your role and complete the registration process</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="user" className="flex items-center gap-2">
                  <Car className="w-4 h-4" />
                  User
                </TabsTrigger>
                <TabsTrigger value="driver" className="flex items-center gap-2">
                  <Truck className="w-4 h-4" />
                  Driver
                </TabsTrigger>
                <TabsTrigger value="operator" className="flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  Fleet Manager
                </TabsTrigger>
                <TabsTrigger value="admin" className="flex items-center gap-2">
                  <Crown className="w-4 h-4" />
                  Admin
                </TabsTrigger>
              </TabsList>

              <TabsContent value="user" className="mt-6">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold">User Registration</h3>
                  <p className="text-sm text-muted-foreground">Register to request towing services when you need help</p>
                </div>
                <UserRegistration />
              </TabsContent>

              <TabsContent value="driver" className="mt-6">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold">Driver Registration</h3>
                  <p className="text-sm text-muted-foreground">Join our network of professional tow truck drivers</p>
                </div>
                <DriverRegistration />
              </TabsContent>

              <TabsContent value="operator" className="mt-6">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold">Fleet Manager Registration</h3>
                  <p className="text-sm text-muted-foreground">Manage your towing fleet and dispatch operations</p>
                </div>
                <OperatorRegistration />
              </TabsContent>

              <TabsContent value="admin" className="mt-6">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold">Admin Registration</h3>
                  <p className="text-sm text-muted-foreground">Platform administration and system management</p>
                </div>
                <AdminRegistration />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <p className="text-sm text-muted-foreground">
            Already have an account?{' '}
            <button 
              onClick={() => navigate('/login')}
              className="text-primary hover:underline"
            >
              Sign in here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;