
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import "../../hordu-theme.css";

const HorduBookRideScreen: React.FC = () => {
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useTheme();
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [rideType, setRideType] = useState("standard");

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-purple-900/20 dark:via-pink-900/20 dark:to-blue-900/20">
      {/* Header */}
      <div className="hordu-header">
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
                  Book Auto Ride
                </h1>
                <p className="hordu-text-muted">Bengaluru EV Auto Service</p>
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
        {/* Map Section */}
        <div className="hordu-card p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
            Bengaluru Map
          </h3>
          <div className="bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg h-64 flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600">
            <div className="text-center">
              <span className="text-4xl mb-2 block">🗺️</span>
              <p className="hordu-text-muted">
                Interactive Bengaluru Map
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Showing Indiranagar, Brigade Road, Koramangala areas
              </p>
            </div>
          </div>
        </div>

        {/* Booking Form */}
        <div className="hordu-card p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-6">
            Trip Details
          </h3>
          
          <div className="space-y-4">
            {/* Pickup Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Pickup Location
              </label>
              <select
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Select pickup location</option>
                <option value="indiranagar">Indiranagar Metro Station</option>
                <option value="brigade-road">Brigade Road</option>
                <option value="koramangala">Koramangala 5th Block</option>
                <option value="mg-road">MG Road Metro</option>
                <option value="commercial-street">Commercial Street</option>
                <option value="ulsoor">Ulsoor Lake</option>
              </select>
            </div>

            {/* Dropoff Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Dropoff Location
              </label>
              <select
                value={dropoff}
                onChange={(e) => setDropoff(e.target.value)}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Select dropoff location</option>
                <option value="indiranagar">Indiranagar Metro Station</option>
                <option value="brigade-road">Brigade Road</option>
                <option value="koramangala">Koramangala 5th Block</option>
                <option value="mg-road">MG Road Metro</option>
                <option value="commercial-street">Commercial Street</option>
                <option value="ulsoor">Ulsoor Lake</option>
                <option value="whitefield">Whitefield</option>
                <option value="electronic-city">Electronic City</option>
              </select>
            </div>
          </div>
        </div>

        {/* Auto Selection */}
        <div className="hordu-card p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-6">
            Select Auto Type
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div
              onClick={() => setRideType("standard")}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                rideType === "standard"
                  ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20"
                  : "border-gray-300 dark:border-gray-600"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <span className="text-2xl mr-3">🛺</span>
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200">
                      Hordu Standard
                    </h4>
                    <p className="hordu-text-muted">Comfortable EV Auto</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-purple-600">
                    <span className="hordu-currency">85</span>
                  </p>
                  <p className="hordu-text-muted">Estimated</p>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="hordu-status-good">3 min away</span>
                <span className="hordu-text-muted">
                  <span className="hordu-distance">2.5</span> • 12 mins
                </span>
              </div>
            </div>

            <div
              onClick={() => setRideType("premium")}
              className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                rideType === "premium"
                  ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20"
                  : "border-gray-300 dark:border-gray-600"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <span className="text-2xl mr-3">✨🛺</span>
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200">
                      Hordu Premium
                    </h4>
                    <p className="hordu-text-muted">AC EV Auto</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-purple-600">
                    <span className="hordu-currency">120</span>
                  </p>
                  <p className="hordu-text-muted">Estimated</p>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="hordu-status-good">5 min away</span>
                <span className="hordu-text-muted">
                  <span className="hordu-distance">2.5</span> • 12 mins
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Summary */}
        <div className="hordu-card p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
            Trip Summary
          </h3>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="hordu-text-muted">Base Fare</span>
              <span className="hordu-currency">65</span>
            </div>
            <div className="flex justify-between">
              <span className="hordu-text-muted">Distance Charge</span>
              <span className="hordu-currency">20</span>
            </div>
            <div className="flex justify-between">
              <span className="hordu-text-muted">Service Fee</span>
              <span className="hordu-currency">0</span>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
              <div className="flex justify-between items-center">
                <span className="font-bold text-gray-800 dark:text-gray-200">Total</span>
                <span className="font-bold text-purple-600 text-xl">
                  <span className="hordu-currency">85</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Book Button */}
        <button
          disabled={!pickup || !dropoff}
          className="hordu-btn-primary w-full py-4 text-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="mr-2">🛺</span>
          Book Hordu Auto
        </button>
      </div>
    </div>
  );
};

export default HorduBookRideScreen;
