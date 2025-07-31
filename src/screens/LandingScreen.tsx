
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const LandingScreen: React.FC = () => {
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-pink-gradient">
      {/* Header */}
      <div className="bg-white shadow nav-violet rounded-2xl my-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-deep-violet">
                BroCabs
              </h1>
              <p className="text-xs sm:text-sm text-violet">
                EV Network for Everyone
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="theme-toggle w-12 h-12 flex items-center justify-center"
                title={
                  isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"
                }
              >
                <span className="text-xl">{isDarkMode ? "🌞" : "🌙"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <div className="card-violet p-12 mb-8">
            <div className="mb-8">
              <div className="w-24 h-24 mx-auto bg-gradient-to-r from-violet to-deep-violet rounded-full flex items-center justify-center mb-6">
                <span className="text-4xl">🚗</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-deep-violet mb-6">
                Welcome to BroCabs
              </h1>
              <p className="text-lg sm:text-xl text-violet mb-8 max-w-4xl mx-auto leading-relaxed">
                An EV Network Designed to Maximize Driver Earnings and Convenience + Offer Lower Fare
              </p>
            </div>
            
            {/* Main Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <button
                onClick={() => navigate('/driver-home')}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-xl p-8 border-2 border-gray-300 transition-all duration-300 hover:shadow-xl transform hover:scale-105"
              >
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <span className="text-4xl">🚕</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Drive with us</h3>
                    <p className="text-sm opacity-90">Start earning as a BroCabs driver</p>
                  </div>
                </div>
              </button>
              
              <button
                onClick={() => {
                  // This would typically navigate to a customer booking app
                  alert('Customer booking app coming soon!');
                }}
                className="w-full bg-green-500 hover:bg-green-600 text-white rounded-xl p-8 border-2 border-gray-300 transition-all duration-300 hover:shadow-xl transform hover:scale-105"
              >
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <span className="text-4xl">📱</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Book a ride</h3>
                    <p className="text-sm opacity-90">Get a ride at lower fares</p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="card-violet p-6 text-center">
            <div className="w-16 h-16 mx-auto bg-gradient-to-r from-violet to-deep-violet rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">💰</span>
            </div>
            <h3 className="text-lg font-semibold text-deep-violet mb-2">
              Maximize Earnings
            </h3>
            <p className="text-sm text-violet">
              Smart algorithms to optimize your earnings with efficient routing and demand prediction
            </p>
          </div>

          <div className="card-violet p-6 text-center">
            <div className="w-16 h-16 mx-auto bg-gradient-to-r from-violet to-deep-violet rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">⚡</span>
            </div>
            <h3 className="text-lg font-semibold text-deep-violet mb-2">
              EV Network
            </h3>
            <p className="text-sm text-violet">
              Complete electric vehicle infrastructure with smart charging and fleet management
            </p>
          </div>

          <div className="card-violet p-6 text-center">
            <div className="w-16 h-16 mx-auto bg-gradient-to-r from-violet to-deep-violet rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">🎯</span>
            </div>
            <h3 className="text-lg font-semibold text-deep-violet mb-2">
              Lower Fares
            </h3>
            <p className="text-sm text-violet">
              Competitive pricing that benefits both drivers and passengers through efficiency
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="card-violet p-8 text-center">
          <h3 className="text-2xl font-bold text-deep-violet mb-8">Why Choose BroCabs?</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div>
              <div className="text-3xl font-bold text-deep-violet mb-2">100%</div>
              <div className="text-sm text-violet">Electric Fleet</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-deep-violet mb-2">24/7</div>
              <div className="text-sm text-violet">Support</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-deep-violet mb-2">0%</div>
              <div className="text-sm text-violet">Commission on Tips</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingScreen;
