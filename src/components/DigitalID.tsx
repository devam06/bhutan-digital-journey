
import React from 'react';

interface DigitalIDProps {
  application: {
    fullName: string;
    dateOfBirth: string;
    idNumber: string;
  };
  business: {
    approved: boolean;
  } | null;
  onClose: () => void;
}

const DigitalID: React.FC<DigitalIDProps> = ({ application, business, onClose }) => {
  const validityDate = new Date();
  validityDate.setFullYear(validityDate.getFullYear() + 5);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-md w-full animate-fade-in">
        {/* Digital ID Card */}
        <div className="relative overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-bhutan-saffron to-bhutan-forest p-6 text-white">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-lg font-noto font-bold">Kingdom of Bhutan</h2>
                <p className="text-sm opacity-90">e-Residency Digital ID</p>
              </div>
              <button
                onClick={onClose}
                className="text-white/80 hover:text-white text-xl"
              >
                ×
              </button>
            </div>
          </div>

          {/* ID Content */}
          <div className="p-6 bg-gradient-to-br from-white to-bhutan-cream-dark">
            {/* Traditional Pattern Border */}
            <div className="border-2 border-bhutan-saffron/30 rounded-lg p-4 mb-4 traditional-pattern">
              <div className="bg-white/90 rounded-lg p-4">
                <div className="text-center mb-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-bhutan-saffron to-bhutan-forest rounded-full mx-auto mb-2 flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">
                      {application.fullName.charAt(0)}
                    </span>
                  </div>
                  <h3 className="text-xl font-noto font-bold text-bhutan-wood">
                    {application.fullName}
                  </h3>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium text-bhutan-wood/70">ID Number:</span>
                    <span className="font-mono text-bhutan-wood">{application.idNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-bhutan-wood/70">Date of Birth:</span>
                    <span className="text-bhutan-wood">{new Date(application.dateOfBirth).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-bhutan-wood/70">Valid Until:</span>
                    <span className="text-bhutan-wood">{validityDate.getFullYear()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-bhutan-wood/70">Business Status:</span>
                    <span className="text-lg">
                      {business?.approved ? '✅' : '❌'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center text-xs text-bhutan-wood/60">
              <p>This is an official digital identification</p>
              <p>issued by the Kingdom of Bhutan</p>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-20 right-4 w-16 h-16 bg-bhutan-saffron/10 rounded-full animate-glow"></div>
          <div className="absolute bottom-20 left-4 w-12 h-12 bg-bhutan-forest/10 rounded-full animate-glow"></div>
        </div>

        {/* Close Button */}
        <div className="p-4 text-center">
          <button
            onClick={onClose}
            className="bhutan-button px-8"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default DigitalID;
