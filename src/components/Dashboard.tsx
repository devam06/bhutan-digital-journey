
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import DigitalID from './DigitalID';
import BusinessRegistration from './BusinessRegistration';

const Dashboard = () => {
  const { user, application, business, logout } = useAuth();
  const [showDigitalID, setShowDigitalID] = useState(false);
  const [showBusinessForm, setShowBusinessForm] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user || !application) {
    navigate('/');
    return null;
  }

  return (
    <div className="min-h-screen py-8 px-4 traditional-pattern">
      <div className="max-w-4xl mx-auto animate-fade-in">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-noto font-bold text-bhutan-wood mb-2">
              Welcome, {application.fullName}
            </h1>
            <p className="text-bhutan-wood/70">
              Your e-Residency Dashboard
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-bhutan-wood text-white px-4 py-2 rounded-lg hover:bg-bhutan-wood-dark transition-colors"
          >
            Logout
          </button>
        </div>

        {/* Application Status */}
        <div className="bhutan-card p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-noto font-semibold text-bhutan-wood mb-2">
                Application Status
              </h2>
              <div className="flex items-center space-x-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  ✅ Approved
                </span>
                <span className="text-bhutan-wood/70">
                  Application ID: {application.idNumber}
                </span>
              </div>
            </div>
            <button
              onClick={() => setShowDigitalID(true)}
              className="bhutan-button"
            >
              View Digital ID
            </button>
          </div>
        </div>

        {/* e-Business Registration Section */}
        <div className="bhutan-card p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-noto font-semibold text-bhutan-wood mb-2">
                e-Business Registration
              </h2>
              <p className="text-bhutan-wood/70">
                Register your business in Bhutan
              </p>
            </div>
            {business ? (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                ✅ Business Registered
              </span>
            ) : (
              <button
                onClick={() => setShowBusinessForm(true)}
                className="bhutan-button"
              >
                Register Business
              </button>
            )}
          </div>

          {business && (
            <div className="bg-bhutan-saffron-light/20 rounded-lg p-4">
              <h3 className="font-semibold text-bhutan-wood mb-2">Business Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Company ID:</span> {business.companyId}
                </div>
                <div>
                  <span className="font-medium">Type:</span> {business.companyType}
                </div>
                <div>
                  <span className="font-medium">Investment:</span> ₹{business.companyInvestment}
                </div>
                <div>
                  <span className="font-medium">Status:</span> 
                  <span className="ml-1 text-green-600">Active</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Digital ID Modal */}
        {showDigitalID && (
          <DigitalID
            application={application}
            business={business}
            onClose={() => setShowDigitalID(false)}
          />
        )}

        {/* Business Registration Modal */}
        {showBusinessForm && (
          <BusinessRegistration
            onClose={() => setShowBusinessForm(false)}
            idNumber={application.idNumber}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
