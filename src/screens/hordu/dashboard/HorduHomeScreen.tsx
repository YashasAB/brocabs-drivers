import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../../context/ThemeContext";
import "../../../hordu-theme.css";

const HorduHomeScreen: React.FC = () => {
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useTheme();
  const [isOnline, setIsOnline] = useState(false);

  const toggleOnlineStatus = () => {
    setIsOnline(!isOnline);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-purple-900/20 dark:via-pink-900/20 dark:to-blue-900/20">
      {/* Header */}
      <div className="backdrop-blur bg-white/70 dark:bg-gray-900/70 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3 sm:py-4">
            <div className="flex items-center">
              <button
                onClick={() => navigate("/hordu")}
                className="hordu-btn-primary mr-4"
              >
                ←
              </button>
              <div>
                <h1 className="text-lg sm:text-xl lg:text-2xl font-bold hordu-gradient-text">
                  Hordu Driver
                </h1>
                <p className="text-sm text-purple-600 dark:text-purple-400 font-medium">
                  Welcome back to your auto dashboard
                </p>
              </div>
            </div>
            <button
              onClick={toggleTheme}
              className="hordu-btn-primary w-10 h-10 flex items-center justify-center"
            >
              <span className="text-lg">{isDarkMode ? "🌞" : "🌙"}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6">
        {/* Driver Status */}
        <div className="hordu-card p-6 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                Driver Status
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                Current status:{" "}
                <span
                  className={
                    isOnline ? "hordu-status-good" : "hordu-status-bad"
                  }
                >
                  {isOnline ? "Online" : "Offline"}
                </span>
              </p>
            </div>
            <button
              onClick={toggleOnlineStatus}
              className={`hordu-btn-primary mt-4 sm:mt-0 ${
                isOnline
                  ? "!bg-red-600 hover:!bg-red-700"
                  : "!bg-green-600 hover:!bg-green-700"
              }`}
            >
              <span className="text-lg">{isOnline ? "🔴" : "🟢"}</span>
              {isOnline ? "Go Offline" : "Go Online"}
            </button>
          </div>

          {/* Stats Grid - Only show when online */}
          {isOnline && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl">
                <div className="text-2xl font-bold hordu-gradient-text">
                  <span className="hordu-currency">850</span>
                </div>
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                  Today's Earnings
                </p>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-pink-50 to-blue-50 dark:from-pink-900/30 dark:to-blue-900/30 rounded-xl">
                <div className="text-2xl font-bold hordu-gradient-text">12</div>
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                  Trips Completed
                </p>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 rounded-xl">
                <div className="text-2xl font-bold hordu-gradient-text">
                  <span className="hordu-distance">45</span>
                </div>
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                  Distance Covered
                </p>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl">
                <div className="text-2xl font-bold hordu-gradient-text">
                  4.8
                </div>
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                  Rating
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="hordu-card p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">
              Quick Actions
            </h3>
          </div>
          <div className="space-y-6 flex-1 flex flex-col justify-center">
            {!isOnline && (
              <button
                onClick={() => navigate("/hordu/smart-lot-map")}
                className="group relative w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                <div className="relative flex items-center justify-between">
                  <div className="flex-1 text-left">
                    <h4 className="text-xl font-bold mb-2">Schedule an Auto</h4>
                    <p className="text-purple-100 text-sm font-medium">
                      Find and reserve an auto rickshaw near you
                    </p>
                  </div>
                  <span className="text-3xl">🛺</span>
                </div>
              </button>
            )}

            <button
              onClick={() => navigate("/earnings")}
              className="group relative w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              <div className="relative flex items-center justify-between">
                <div className="flex-1 text-left">
                  <h4 className="text-xl font-bold mb-2">View Earnings</h4>
                  <p className="text-blue-100 text-sm font-medium">
                    Check your daily and weekly earnings
                  </p>
                </div>
                <span className="text-3xl">💰</span>
              </div>
            </button>
          </div>
        </div>

        {/* Current Trip Section - Only visible when online */}
        {isOnline && (
          <>
            <div className="hordu-card p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                Current Trip
              </h3>
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-6 mb-4 border border-blue-200 dark:border-blue-700">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-bold text-blue-800 dark:text-blue-200 text-lg">
                    Trip to Koramangala
                  </span>
                  <span className="hordu-status-good">Active</span>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-3 font-medium">
                  Pickup: Brigade Road → Drop: Koramangala 5th Block
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                  Estimated fare:{" "}
                  <span className="hordu-currency font-bold text-green-600">
                    120
                  </span>{" "}
                  • Distance:{" "}
                  <span className="hordu-distance font-bold">3.2</span>
                </p>
              </div>
              <button className="hordu-btn-primary w-full py-3 text-lg font-semibold">
                Navigate to Pickup
              </button>
            </div>

            {/* Trip Requests */}
            <div className="hordu-card p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                Trip Requests
              </h3>
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-700 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-bold text-gray-800 dark:text-gray-200 text-lg">
                      Indiranagar to MG Road
                    </span>
                    <span className="text-green-600 font-bold text-xl">
                      <span className="hordu-currency">95</span>
                    </span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-4 font-medium">
                    Distance:{" "}
                    <span className="hordu-distance font-bold">2.8</span> • ETA:
                    12 mins
                  </p>
                  <div className="flex gap-3">
                    <button className="hordu-btn-primary !bg-green-600 hover:!bg-green-700 flex-1 py-2 font-semibold">
                      Accept
                    </button>
                    <button className="hordu-btn-primary !bg-red-600 hover:!bg-red-700 flex-1 py-2 font-semibold">
                      Decline
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Auto Status */}
            <div className="hordu-card p-6">
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-6">
                Auto Status
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-6 border border-green-200 dark:border-green-700">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-bold text-green-800 dark:text-green-200 text-lg">
                      Battery Level
                    </span>
                    <span className="text-3xl">🔋</span>
                  </div>
                  <p className="text-3xl font-bold text-green-600 mb-2">85%</p>
                  <p className="text-gray-700 dark:text-gray-300 font-medium">
                    Range remaining:{" "}
                    <span className="hordu-distance font-bold">42</span>
                  </p>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-700">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-bold text-blue-800 dark:text-blue-200 text-lg">
                      Auto Model
                    </span>
                    <span className="text-3xl">🛺</span>
                  </div>
                  <p className="text-2xl font-bold text-blue-600 mb-2">
                    Hordu EV Auto
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 font-medium">
                    ID: HDU-BLR-001
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default HorduHomeScreen;
