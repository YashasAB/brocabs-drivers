import React from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const LandingScreen: React.FC = () => {
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-pink-gradient">
      {/* Header */}
      <div className="bg-white shadow nav-violet rounded-2xl mx-2 my-2">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3 sm:py-4">
            <div>
              <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-deep-violet">
                BroCabs
              </h1>
              <p className="text-xs sm:text-sm text-violet">
                EV Network for Everyone
              </p>
            </div>
            <div className="flex items-center">
              <button
                onClick={toggleTheme}
                className="theme-toggle w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center"
                title={
                  isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"
                }
              >
                <span className="text-lg sm:text-xl">
                  {isDarkMode ? "🌞" : "🌙"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6">
        {/* Welcome Section */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="card-violet p-6 sm:p-8 lg:p-12 mb-6 sm:mb-8 mx-2 sm:mx-0">
            <div className="mb-6 sm:mb-8">
              <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mx-auto bg-gradient-to-r from-violet to-deep-violet rounded-full flex items-center justify-center mb-4 sm:mb-6">
                <span className="text-2xl sm:text-3xl lg:text-4xl">🚗</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-deep-violet mb-4 sm:mb-6 px-2">
                Welcome to BroCabs
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-violet mb-6 sm:mb-8 max-w-4xl mx-auto leading-relaxed px-2">
                An EV Network Designed to Maximize Driver Earnings and
                Convenience + Offer Lower Fare
              </p>
            </div>

            {/* Main Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 max-w-4xl mx-auto px-2">
              <button
                onClick={() => navigate("/driver-home")}
                className="w-full bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white rounded-xl p-6 sm:p-8 border-2 border-gray-300 transition-all duration-300 hover:shadow-xl transform hover:scale-105 active:scale-95"
              >
                <div className="flex flex-col items-center space-y-3 sm:space-y-4 h-full">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <span className="text-2xl sm:text-3xl lg:text-4xl">🚕</span>
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-1 sm:mb-2">
                      Drive with us
                    </h3>
                    <p className="text-xs sm:text-sm opacity-90">
                      Reserve Car Now!
                    </p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => navigate("/book-ride")}
                className="w-full bg-green-500 hover:bg-green-600 active:bg-green-700 text-white rounded-xl p-6 sm:p-8 border-2 border-gray-300 transition-all duration-300 hover:shadow-xl transform hover:scale-105 active:scale-95"
              >
                <div className="flex flex-col items-center space-y-3 sm:space-y-4 h-full">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <span className="text-2xl sm:text-3xl lg:text-4xl">📱</span>
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-1 sm:mb-2">
                      Book a ride
                    </h3>
                    <p className="text-xs sm:text-sm opacity-90">Ride Now!</p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl mb-8 sm:mb-12 mx-2 sm:mx-0">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-violet to-deep-violet opacity-90"></div>
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/20"></div>

          {/* Content */}
          <div className="relative z-10 p-6 sm:p-8 lg:p-12 text-center">
            <div className="mb-6 sm:mb-8 lg:mb-12">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-3 sm:mb-4 tracking-tight px-2">
                Why Choose BroCabs?
              </h3>
              <div className="w-16 sm:w-20 lg:w-24 h-1 bg-white/60 mx-auto rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto">
              <div className="bg-white/15 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 border border-white/20 transform hover:scale-105 transition-all duration-300">
                <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <span className="text-xl sm:text-2xl lg:text-3xl">
                    🕒📍🚗
                  </span>
                </div>
                <h4 className="text-base sm:text-lg lg:text-xl font-bold text-white mb-2 sm:mb-3 leading-tight px-1">
                  Choose When and Where to Start/End Your Shift
                </h4>
                <h4 className="text-base sm:text-lg lg:text-xl font-bold text-white mb-2 sm:mb-3 leading-tight px-1">
                  Select where to drop the Car
                </h4>
                <p className="text-white/90 text-xs sm:text-sm mb-3 sm:mb-4">
                  We take care of the rest!
                </p>
              </div>

              <div className="bg-white/15 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 border border-white/20 transform hover:scale-105 transition-all duration-300 sm:col-span-2 lg:col-span-1">
                <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <span className="text-xl sm:text-2xl lg:text-3xl">💰</span>
                </div>
                <h4 className="text-lg sm:text-xl lg:text-2xl font-extrabold text-white leading-tight mb-2 sm:mb-3">
                  0% Commission!
                </h4>
                <h4 className="text-base sm:text-lg lg:text-xl font-bold text-white">
                  Keep 100% of Booking Fare!
                </h4>
                <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <span className="text-xl sm:text-2xl lg:text-3xl">
                    🚗🍃⚡
                  </span>
                </div>
                <h4 className="text-lg sm:text-xl lg:text-2xl font-extrabold text-white">
                  100% Electric Fleet
                </h4>
              </div>

              <div className="bg-white/15 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 border border-white/20 transform hover:scale-105 transition-all duration-300">
                <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <span className="text-xl sm:text-2xl lg:text-3xl">🛠️</span>
                </div>
                <h4 className="text-lg sm:text-xl lg:text-2xl font-extrabold text-white leading-tight">
                  24/7 Support
                </h4>
                <p className="text-white/90 text-xs sm:text-sm mt-2 sm:mt-3">
                  Always here when you need us
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12 px-2 sm:px-0">
          <div className="card-violet p-4 sm:p-6 text-center">
            <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 mx-auto bg-gradient-to-r from-violet to-deep-violet rounded-full flex items-center justify-center mb-3 sm:mb-4">
              <span className="text-lg sm:text-xl lg:text-2xl">😊</span>
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-deep-violet mb-2">
              Driver Convenience
            </h3>
            <p className="text-xs sm:text-sm text-violet leading-relaxed">
              Don't have to own a car or decide what trips to accept. Work small
              profitable shifts. Just choose where you want to start, end, and
              how long you want to drive.
            </p>
          </div>

          <div className="card-violet p-4 sm:p-6 text-center">
            <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 mx-auto bg-gradient-to-r from-violet to-deep-violet rounded-full flex items-center justify-center mb-3 sm:mb-4">
              <span className="text-lg sm:text-xl lg:text-2xl">💰</span>
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-deep-violet mb-2">
              Maximize Earnings
            </h3>
            <p className="text-xs sm:text-sm text-violet leading-relaxed">
              Smart algorithms to optimize your earnings with efficient routing
              and demand prediction
            </p>
          </div>

          <div className="card-violet p-4 sm:p-6 text-center">
            <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 mx-auto bg-gradient-to-r from-violet to-deep-violet rounded-full flex items-center justify-center mb-3 sm:mb-4">
              <span className="text-lg sm:text-xl lg:text-2xl">⚡</span>
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-deep-violet mb-2">
              EV Network
            </h3>
            <p className="text-xs sm:text-sm text-violet leading-relaxed">
              Complete electric vehicle infrastructure with smart charging and
              fleet management
            </p>
          </div>

          <div className="card-violet p-4 sm:p-6 text-center">
            <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 mx-auto bg-gradient-to-r from-violet to-deep-violet rounded-full flex items-center justify-center mb-3 sm:mb-4">
              <span className="text-lg sm:text-xl lg:text-2xl">🎯</span>
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-deep-violet mb-2">
              Lower Fares
            </h3>
            <p className="text-xs sm:text-sm text-violet leading-relaxed">
              Competitive pricing that benefits both drivers and passengers
              through efficiency
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingScreen;
