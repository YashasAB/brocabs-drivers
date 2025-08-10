
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
      <div className="hordu-header">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3 sm:py-4">
            <div>
              <h1 className="text-lg sm:text-xl lg:text-2xl font-bold hordu-gradient-text">
                Hordu Driver
              </h1>
              <p className="hordu-text-muted">
                Welcome back to your auto dashboard
              </p>
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
              <p className="hordu-text-muted">
                Current status: <span className={isOnline ? "hordu-status-good" : "hordu-status-bad"}>
                  {isOnline ? "Online" : "Offline"}
                </span>
              </p>
            </div>
            <button
              onClick={toggleOnlineStatus}
              className={`hordu-btn-primary mt-4 sm:mt-0 ${
                isOnline 
                  ? "bg-red-600 hover:bg-red-700" 
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              <span className="text-lg">{isOnline ? "🔴" : "🟢"}</span>
              {isOnline ? "Go Offline" : "Go Online"}
            </button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold hordu-gradient-text">
                <span className="hordu-currency">850</span>
              </div>
              <p className="hordu-text-muted">Today's Earnings</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold hordu-gradient-text">12</div>
              <p className="hordu-text-muted">Trips Completed</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold hordu-gradient-text">
                <span className="hordu-distance">45</span>
              </div>
              <p className="hordu-text-muted">Distance Covered</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold hordu-gradient-text">4.8</div>
              <p className="hordu-text-muted">Rating</p>
            </div>
          </div>
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
                className="w-full bg-purple-500 hover:bg-purple-600 text-white rounded-lg p-8 border-2 border-purple-300 hordu-card"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1 text-left">
                    <h4 className="text-xl font-bold mb-2">Schedule an Auto</h4>
                    <p className="text-purple-100 text-sm">
                      Find and reserve an auto rickshaw near you
                    </p>
                  </div>
                  <span className="text-3xl">🛺</span>
                </div>
              </button>
            )}
            
            <button
              onClick={() => navigate("/earnings")}
              className="w-full bg-green-500 hover:bg-green-600 text-white rounded-lg p-8 border-2 border-green-300 hordu-card"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1 text-left">
                  <h4 className="text-xl font-bold mb-2">View Earnings</h4>
                  <p className="text-green-100 text-sm">
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
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-blue-800 dark:text-blue-200">
                    Trip to Koramangala
                  </span>
                  <span className="hordu-status-good">Active</span>
                </div>
                <p className="hordu-text-muted mb-2">
                  Pickup: Brigade Road → Drop: Koramangala 5th Block
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Estimated fare: <span className="hordu-currency">120</span> • Distance: <span className="hordu-distance">3.2</span>
                </p>
              </div>
              <button className="hordu-btn-primary w-full">
                Navigate to Pickup
              </button>
            </div>

            {/* Trip Requests */}
            <div className="hordu-card p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                Trip Requests
              </h3>
              <div className="space-y-4">
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">Indiranagar to MG Road</span>
                    <span className="text-green-600 font-bold">
                      <span className="hordu-currency">95</span>
                    </span>
                  </div>
                  <p className="hordu-text-muted mb-3">
                    Distance: <span className="hordu-distance">2.8</span> • ETA: 12 mins
                  </p>
                  <div className="flex gap-2">
                    <button className="hordu-btn-primary bg-green-600">Accept</button>
                    <button className="hordu-btn-primary bg-red-600">Decline</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Auto Status */}
            <div className="hordu-card p-6">
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                Auto Status
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-green-800 dark:text-green-200">
                      Battery Level
                    </span>
                    <span className="text-2xl">🔋</span>
                  </div>
                  <p className="text-2xl font-bold text-green-600">85%</p>
                  <p className="hordu-text-muted">
                    Range remaining: <span className="hordu-distance">42</span>
                  </p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-blue-800 dark:text-blue-200">
                      Auto Model
                    </span>
                    <span className="text-2xl">🛺</span>
                  </div>
                  <p className="text-lg font-bold text-blue-600">Hordu EV Auto</p>
                  <p className="hordu-text-muted">ID: HDU-BLR-001</p>
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
