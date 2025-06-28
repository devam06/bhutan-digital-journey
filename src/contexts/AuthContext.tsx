
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  email: string;
  name: string;
  id: string;
}

interface ApplicationData {
  fullName: string;
  dateOfBirth: string;
  phoneNumber: string;
  purposeOfApplication: string;
  idNumber: string;
  status: 'pending' | 'approved' | 'rejected';
}

interface BusinessData {
  fullName: string;
  companyId: string;
  companyInvestment: string;
  companyGoal: string;
  companyType: string;
  idNumber: string;
  approved: boolean;
}

interface AuthContextType {
  user: User | null;
  application: ApplicationData | null;
  business: BusinessData | null;
  login: (email: string, password: string) => Promise<boolean>;
  loginWithGmail: () => Promise<boolean>;
  logout: () => void;
  submitApplication: (data: Omit<ApplicationData, 'status'>) => void;
  submitBusiness: (data: Omit<BusinessData, 'approved'>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [application, setApplication] = useState<ApplicationData | null>(null);
  const [business, setBusiness] = useState<BusinessData | null>(null);

  useEffect(() => {
    // Load from localStorage on mount
    const savedUser = localStorage.getItem('bhutan_user');
    const savedApplication = localStorage.getItem('bhutan_application');
    const savedBusiness = localStorage.getItem('bhutan_business');
    
    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedApplication) setApplication(JSON.parse(savedApplication));
    if (savedBusiness) setBusiness(JSON.parse(savedBusiness));
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock validation
    if (email && password.length >= 6) {
      const mockUser = {
        email,
        name: email.split('@')[0].replace(/[^a-zA-Z\s]/g, '').replace(/\b\w/g, l => l.toUpperCase()),
        id: Math.random().toString(36).substr(2, 9)
      };
      setUser(mockUser);
      localStorage.setItem('bhutan_user', JSON.stringify(mockUser));
      return true;
    }
    return false;
  };

  const loginWithGmail = async (): Promise<boolean> => {
    // Mock Gmail login
    const mockUser = {
      email: 'user@gmail.com',
      name: 'Tenzin Norbu',
      id: 'gmail_' + Math.random().toString(36).substr(2, 9)
    };
    setUser(mockUser);
    localStorage.setItem('bhutan_user', JSON.stringify(mockUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    setApplication(null);
    setBusiness(null);
    localStorage.removeItem('bhutan_user');
    localStorage.removeItem('bhutan_application');
    localStorage.removeItem('bhutan_business');
  };

  const submitApplication = (data: Omit<ApplicationData, 'status'>) => {
    const applicationData = { ...data, status: 'approved' as const };
    setApplication(applicationData);
    localStorage.setItem('bhutan_application', JSON.stringify(applicationData));
  };

  const submitBusiness = (data: Omit<BusinessData, 'approved'>) => {
    const businessData = { ...data, approved: true };
    setBusiness(businessData);
    localStorage.setItem('bhutan_business', JSON.stringify(businessData));
  };

  return (
    <AuthContext.Provider value={{
      user,
      application,
      business,
      login,
      loginWithGmail,
      logout,
      submitApplication,
      submitBusiness
    }}>
      {children}
    </AuthContext.Provider>
  );
};
