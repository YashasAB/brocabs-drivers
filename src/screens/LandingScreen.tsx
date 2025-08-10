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
                EV Network for Everyone • Bengaluru Click here
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
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 sm:p-8 lg:p-12 mb-6 sm:mb-8 mx-2 sm:mx-0 shadow-2xl border border-white/20">
            <div className="mb-8 sm:mb-10">
              <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 mx-auto bg-gradient-to-br from-blue-500 via-purple-600 to-violet-700 rounded-2xl flex items-center justify-center mb-6 sm:mb-8 shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <span className="text-2xl sm:text-3xl lg:text-4xl">🚗</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 bg-clip-text text-transparent mb-6 sm:mb-8 px-2 leading-tight">
                Welcome to BroCabs
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl text-slate-600 mb-8 sm:mb-10 max-w-4xl mx-auto leading-relaxed px-2 font-medium">
                An EV Network Designed to Maximize Driver Earnings and
                Convenience + Offer Lower Fare
              </p>
            </div>

            {/* Main Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto px-2">
              <button
                onClick={() => navigate("/driver-home")}
                className="group relative w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-2xl p-8 sm:p-10 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                <div className="relative flex flex-col items-center space-y-4 sm:space-y-5 h-full">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg">
                    <span className="text-3xl sm:text-4xl">🚕</span>
                  </div>
                  <div className="flex-1 flex flex-col justify-center text-center">
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 sm:mb-3">
                      Drive with us
                    </h3>
                    <p className="text-sm sm:text-base opacity-90 font-medium">
                      Reserve Car Now!
                    </p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => navigate("/book-ride")}
                className="group relative w-full bg-gradient-to-r from-emerald-600 to-green-700 hover:from-emerald-700 hover:to-green-800 text-white rounded-2xl p-8 sm:p-10 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                <div className="relative flex flex-col items-center space-y-4 sm:space-y-5 h-full">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg">
                    <span className="text-3xl sm:text-4xl">📱</span>
                  </div>
                  <div className="flex-1 flex flex-col justify-center text-center">
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 sm:mb-3">
                      Book a ride
                    </h3>
                    <p className="text-sm sm:text-base opacity-90 font-medium">Ride Now!</p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="relative overflow-hidden rounded-3xl mb-8 sm:mb-12 mx-2 sm:mx-0 shadow-2xl">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900"></div>
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10"></div>
          <div className="absolute inset-0 backdrop-blur-sm"></div>

          {/* Content */}
          <div className="relative z-10 p-8 sm:p-10 lg:p-16 text-center">
            <div className="mb-8 sm:mb-10 lg:mb-14">
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4 sm:mb-6 tracking-tight px-2">
                Why Choose BroCabs?
              </h3>
              <div className="w-20 sm:w-24 lg:w-32 h-1.5 bg-gradient-to-r from-blue-400 via-purple-400 to-violet-400 mx-auto rounded-full shadow-lg"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
              <div className="group bg-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/20 transform hover:scale-105 hover:bg-white/15 transition-all duration-500 shadow-xl hover:shadow-2xl">
                <div className="w-16 h-16 sm:w-18 sm:h-18 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl sm:text-3xl">
                    🕒📍🚗
                  </span>
                </div>
                <h4 className="text-lg sm:text-xl font-bold text-white mb-3 leading-tight px-1">
                  Choose When and Where to Start/End Your Shift
                </h4>
                <h4 className="text-lg sm:text-xl font-bold text-white mb-3 leading-tight px-1">
                  Select where to drop the Car
                </h4>
                <p className="text-white/80 text-sm font-medium">
                  We take care of the rest!
                </p>
              </div>

              <div className="group bg-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/20 transform hover:scale-105 hover:bg-white/15 transition-all duration-500 shadow-xl hover:shadow-2xl sm:col-span-2 lg:col-span-1">
                <div className="w-16 h-16 sm:w-18 sm:h-18 bg-gradient-to-br from-emerald-400 to-green-500 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl sm:text-3xl">💰</span>
                </div>
                <h4 className="text-xl sm:text-2xl font-black text-white leading-tight mb-3">
                  0% Commission!
                </h4>
                <h4 className="text-lg sm:text-xl font-bold text-white mb-4">
                  Keep 100% of Booking Fare!
                </h4>
                <div className="w-16 h-16 sm:w-18 sm:h-18 bg-gradient-to-br from-violet-400 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl sm:text-3xl">
                    🚗🍃⚡
                  </span>
                </div>
                <h4 className="text-xl sm:text-2xl font-black text-white">
                  100% Electric Fleet
                </h4>
              </div>

              <div className="group bg-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-8 border border-white/20 transform hover:scale-105 hover:bg-white/15 transition-all duration-500 shadow-xl hover:shadow-2xl">
                <div className="w-16 h-16 sm:w-18 sm:h-18 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl sm:text-3xl">🛠️</span>
                </div>
                <h4 className="text-xl sm:text-2xl font-black text-white leading-tight mb-3">
                  24/7 Support
                </h4>
                <p className="text-white/80 text-sm font-medium">
                  Always here when you need us
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 sm:mb-12 px-2 sm:px-0">
          <div className="group bg-white/95 backdrop-blur-xl rounded-2xl p-6 sm:p-8 text-center shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-white/20">
            <div className="w-16 h-16 sm:w-18 sm:h-18 mx-auto bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300">
              <span className="text-2xl sm:text-3xl">😊</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-3">
              Driver Convenience
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed font-medium">
              Don't have to own a car or decide what trips to accept. Work small
              profitable shifts. Just choose where you want to start, end, and
              how long you want to drive.
            </p>
          </div>

          <div className="group bg-white/95 backdrop-blur-xl rounded-2xl p-6 sm:p-8 text-center shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-white/20">
            <div className="w-16 h-16 sm:w-18 sm:h-18 mx-auto bg-gradient-to-br from-emerald-400 to-green-500 rounded-2xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300">
              <span className="text-2xl sm:text-3xl">💰</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-3">
              Maximize Earnings
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed font-medium">
              Smart algorithms to optimize your earnings with efficient routing
              and demand prediction
            </p>
          </div>

          <div className="group bg-white/95 backdrop-blur-xl rounded-2xl p-6 sm:p-8 text-center shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-white/20">
            <div className="w-16 h-16 sm:w-18 sm:h-18 mx-auto bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300">
              <span className="text-2xl sm:text-3xl">⚡</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-3">
              EV Network
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed font-medium">
              Complete electric vehicle infrastructure with smart charging and
              fleet management
            </p>
          </div>

          <div className="group bg-white/95 backdrop-blur-xl rounded-2xl p-6 sm:p-8 text-center shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-white/20">
            <div className="w-16 h-16 sm:w-18 sm:h-18 mx-auto bg-gradient-to-br from-violet-400 to-purple-500 rounded-2xl flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300">
              <span className="text-2xl sm:text-3xl">🎯</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-3">
              Lower Fares
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed font-medium">
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
