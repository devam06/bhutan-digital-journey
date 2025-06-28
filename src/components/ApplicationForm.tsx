
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

const ApplicationForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    dateOfBirth: undefined as Date | undefined,
    phoneNumber: '',
    purposeOfApplication: '',
    idNumber: ''
  });
  const [loading, setLoading] = useState(false);
  const { submitApplication, user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.fullName.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter your full name",
        variant: "destructive"
      });
      return;
    }

    if (!formData.dateOfBirth) {
      toast({
        title: "Validation Error",
        description: "Please select your date of birth",
        variant: "destructive"
      });
      return;
    }

    if (!/^\d{10}$/.test(formData.phoneNumber)) {
      toast({
        title: "Validation Error",
        description: "Please enter a valid 10-digit phone number",
        variant: "destructive"
      });
      return;
    }

    if (!formData.purposeOfApplication.trim()) {
      toast({
        title: "Validation Error",
        description: "Please specify the purpose of your application",
        variant: "destructive"
      });
      return;
    }

    if (!formData.idNumber.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter your ID number",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      submitApplication({
        fullName: formData.fullName,
        dateOfBirth: format(formData.dateOfBirth!, 'yyyy-MM-dd'),
        phoneNumber: formData.phoneNumber,
        purposeOfApplication: formData.purposeOfApplication,
        idNumber: formData.idNumber
      });

      toast({
        title: "Application Submitted Successfully!",
        description: "Your e-Residency application has been approved."
      });

      navigate('/dashboard');
      setLoading(false);
    }, 2000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen py-8 px-4 traditional-pattern">
      <div className="max-w-2xl mx-auto animate-fade-in">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-noto font-bold text-bhutan-wood mb-2">
            e-Residency Application
          </h1>
          <p className="text-bhutan-wood/70">
            Welcome {user?.name}, please complete your application form
          </p>
        </div>

        <div className="bhutan-card p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-bhutan-wood mb-2">
                Full Name *
              </label>
              <input
                id="fullName"
                type="text"
                value={formData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                className="bhutan-input w-full"
                placeholder="Enter your full name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-bhutan-wood mb-2">
                Date of Birth *
              </label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal bhutan-input",
                      !formData.dateOfBirth && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.dateOfBirth ? format(formData.dateOfBirth, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.dateOfBirth}
                    onSelect={(date) => setFormData(prev => ({ ...prev, dateOfBirth: date }))}
                    disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-bhutan-wood mb-2">
                Phone Number *
              </label>
              <input
                id="phoneNumber"
                type="tel"
                value={formData.phoneNumber}
                onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                className="bhutan-input w-full"
                placeholder="Enter 10-digit phone number"
                pattern="[0-9]{10}"
                required
              />
            </div>

            <div>
              <label htmlFor="purposeOfApplication" className="block text-sm font-medium text-bhutan-wood mb-2">
                Purpose of Application *
              </label>
              <select
                id="purposeOfApplication"
                value={formData.purposeOfApplication}
                onChange={(e) => handleInputChange('purposeOfApplication', e.target.value)}
                className="bhutan-input w-full"
                required
              >
                <option value="">Select purpose</option>
                <option value="business">Business Development</option>
                <option value="investment">Investment Opportunities</option>
                <option value="education">Educational Purpose</option>
                <option value="research">Research & Development</option>
                <option value="tourism">Tourism & Travel</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="idNumber" className="block text-sm font-medium text-bhutan-wood mb-2">
                ID Number *
              </label>
              <input
                id="idNumber"
                type="text"
                value={formData.idNumber}
                onChange={(e) => handleInputChange('idNumber', e.target.value)}
                className="bhutan-input w-full"
                placeholder="Enter your ID number"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bhutan-button w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Processing Application...' : 'Submit Application'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ApplicationForm;
