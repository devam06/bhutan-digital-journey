
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

interface BusinessRegistrationProps {
  onClose: () => void;
  idNumber: string;
}

const BusinessRegistration: React.FC<BusinessRegistrationProps> = ({ onClose, idNumber }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    companyId: '',
    companyInvestment: '',
    companyGoal: '',
    companyType: '',
    idNumber: idNumber
  });
  const [loading, setLoading] = useState(false);
  const { submitBusiness } = useAuth();

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

    if (!formData.companyId.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter company ID",
        variant: "destructive"
      });
      return;
    }

    if (!formData.companyInvestment || parseFloat(formData.companyInvestment) <= 0) {
      toast({
        title: "Validation Error",
        description: "Please enter a valid investment amount",
        variant: "destructive"
      });
      return;
    }

    if (!formData.companyGoal.trim()) {
      toast({
        title: "Validation Error",
        description: "Please describe your company goals",
        variant: "destructive"
      });
      return;
    }

    if (!formData.companyType) {
      toast({
        title: "Validation Error",
        description: "Please select company type",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      submitBusiness(formData);
      toast({
        title: "Business Registered Successfully!",
        description: "Your business has been approved and registered."
      });
      onClose();
      setLoading(false);
    }, 2000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-fade-in">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-noto font-bold text-bhutan-wood">
              e-Business Registration
            </h2>
            <button
              onClick={onClose}
              className="text-bhutan-wood/60 hover:text-bhutan-wood text-2xl"
            >
              ×
            </button>
          </div>

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
              <label htmlFor="companyId" className="block text-sm font-medium text-bhutan-wood mb-2">
                Company ID *
              </label>
              <input
                id="companyId"
                type="text"
                value={formData.companyId}
                onChange={(e) => handleInputChange('companyId', e.target.value)}
                className="bhutan-input w-full"
                placeholder="Enter company ID (alphanumeric)"
                required
              />
            </div>

            <div>
              <label htmlFor="companyInvestment" className="block text-sm font-medium text-bhutan-wood mb-2">
                Company Investment (₹) *
              </label>
              <input
                id="companyInvestment"
                type="number"
                value={formData.companyInvestment}
                onChange={(e) => handleInputChange('companyInvestment', e.target.value)}
                className="bhutan-input w-full"
                placeholder="Enter investment amount"
                min="1"
                required
              />
            </div>

            <div>
              <label htmlFor="companyGoal" className="block text-sm font-medium text-bhutan-wood mb-2">
                Company Goal *
              </label>
              <textarea
                id="companyGoal"
                value={formData.companyGoal}
                onChange={(e) => handleInputChange('companyGoal', e.target.value)}
                className="bhutan-input w-full h-24 resize-none"
                placeholder="Describe your company's goals and objectives"
                required
              />
            </div>

            <div>
              <label htmlFor="companyType" className="block text-sm font-medium text-bhutan-wood mb-2">
                Company Type *
              </label>
              <select
                id="companyType"
                value={formData.companyType}
                onChange={(e) => handleInputChange('companyType', e.target.value)}
                className="bhutan-input w-full"
                required
              >
                <option value="">Select company type</option>
                <option value="Private Limited">Private Limited</option>
                <option value="Partnership">Partnership</option>
                <option value="NGO">NGO</option>
                <option value="Cooperative">Cooperative</option>
                <option value="Sole Proprietor">Sole Proprietor</option>
              </select>
            </div>

            <div>
              <label htmlFor="idNumber" className="block text-sm font-medium text-bhutan-wood mb-2">
                ID Number
              </label>
              <input
                id="idNumber"
                type="text"
                value={formData.idNumber}
                className="bhutan-input w-full bg-gray-50"
                readOnly
              />
            </div>

            <div className="flex space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 bg-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-xl transition-colors hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bhutan-button disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Registering...' : 'Register Business'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BusinessRegistration;
