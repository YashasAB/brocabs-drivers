
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTheme } from "../../../context/ThemeContext";
import "../../../hordu-theme.css";

const HorduScheduleAutoScreen: React.FC = () => {
  const navigate = useNavigate();
  const { lotId } = useParams<{ lotId: string }>();
  const { isDarkMode, toggleTheme } = useTheme();
  
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");

  const lotNames: { [key: string]: string } = {
    "indiranagar": "Indiranagar Charging Hub",
    "brigade-road": "Brigade Road Auto Station", 
    "koramangala": "Koramangala EV Hub"
  };

  const handleSchedule = () => {
    if (startTime && endTime && dropoffLocation) {
      alert("Auto scheduled successfully! You'll receive a confirmation shortly.");
      navigate("/hordu/driver-home");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-purple-900/20 dark:via-pink-900/20 dark:to-blue-900/20">
      {/* Header */}
      <div className="hordu-header">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3 sm:py-4">
            <div className="flex items-center">
              <button
                onClick={() => navigate("/hordu/smart-lot-map")}
                className="hordu-btn-primary mr-4"
              >
                ←
              </button>
              <div>
                <h1 className="text-lg sm:text-xl lg:text-2xl font-bold hordu-gradient-text">
                  Schedule Auto
                </h1>
                <p className="hordu-text-muted">
                  {lotNames[lotId || ""] || "Unknown Location"}
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
        {/* Available Autos */}
        <div className="hordu-card p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
            Available Autos
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="border border-purple-200 dark:border-purple-700 rounded-lg p-4 bg-purple-50 dark:bg-purple-900/20">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <span className="text-2xl mr-3">🛺</span>
                  <div>
                    <h4 className="font-bold text-gray-800 dark:text-gray-200">
                      Hordu EV Auto
                    </h4>
                    <p className="hordu-text-muted text-sm">HDU-BLR-001</p>
                  </div>
                </div>
                <span className="hordu-status-good">Ready</span>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="hordu-text-muted">Battery</span>
                  <span className="text-green-600 font-semibold">95%</span>
                </div>
                <div className="flex justify-between">
                  <span className="hordu-text-muted">Range</span>
                  <span className="hordu-distance">142</span>
                </div>
                <div className="flex justify-between">
                  <span className="hordu-text-muted">Last Service</span>
                  <span>2 days ago</span>
                </div>
              </div>
            </div>

            <div className="border border-purple-200 dark:border-purple-700 rounded-lg p-4 bg-purple-50 dark:bg-purple-900/20">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <span className="text-2xl mr-3">🛺</span>
                  <div>
                    <h4 className="font-bold text-gray-800 dark:text-gray-200">
                      Hordu EV Auto
                    </h4>
                    <p className="hordu-text-muted text-sm">HDU-BLR-002</p>
                  </div>
                </div>
                <span className="hordu-status-good">Ready</span>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="hordu-text-muted">Battery</span>
                  <span className="text-green-600 font-semibold">87%</span>
                </div>
                <div className="flex justify-between">
                  <span className="hordu-text-muted">Range</span>
                  <span className="hordu-distance">130</span>
                </div>
                <div className="flex justify-between">
                  <span className="hordu-text-muted">Last Service</span>
                  <span>1 day ago</span>
                </div>
              </div>
            </div>

            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-yellow-50 dark:bg-yellow-900/20">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <span className="text-2xl mr-3">🛺</span>
                  <div>
                    <h4 className="font-bold text-gray-800 dark:text-gray-200">
                      Hordu EV Auto
                    </h4>
                    <p className="hordu-text-muted text-sm">HDU-BLR-003</p>
                  </div>
                </div>
                <span className="hordu-status-bad">Charging</span>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="hordu-text-muted">Battery</span>
                  <span className="text-yellow-600 font-semibold">45%</span>
                </div>
                <div className="flex justify-between">
                  <span className="hordu-text-muted">Range</span>
                  <span className="hordu-distance">67</span>
                </div>
                <div className="flex justify-between">
                  <span className="hordu-text-muted">Ready In</span>
                  <span>30 mins</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Schedule Form */}
        <div className="hordu-card p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-6">
            Schedule Your Shift
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Start Time */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Start Time
              </label>
              <select
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Select start time</option>
                <option value="06:00">06:00 AM</option>
                <option value="07:00">07:00 AM</option>
                <option value="08:00">08:00 AM</option>
                <option value="09:00">09:00 AM</option>
                <option value="10:00">10:00 AM</option>
                <option value="11:00">11:00 AM</option>
                <option value="12:00">12:00 PM</option>
                <option value="13:00">01:00 PM</option>
                <option value="14:00">02:00 PM</option>
                <option value="15:00">03:00 PM</option>
                <option value="16:00">04:00 PM</option>
                <option value="17:00">05:00 PM</option>
                <option value="18:00">06:00 PM</option>
              </select>
            </div>

            {/* End Time */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                End Time
              </label>
              <select
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Select end time</option>
                <option value="08:00">08:00 AM</option>
                <option value="09:00">09:00 AM</option>
                <option value="10:00">10:00 AM</option>
                <option value="11:00">11:00 AM</option>
                <option value="12:00">12:00 PM</option>
                <option value="13:00">01:00 PM</option>
                <option value="14:00">02:00 PM</option>
                <option value="15:00">03:00 PM</option>
                <option value="16:00">04:00 PM</option>
                <option value="17:00">05:00 PM</option>
                <option value="18:00">06:00 PM</option>
                <option value="19:00">07:00 PM</option>
                <option value="20:00">08:00 PM</option>
                <option value="21:00">09:00 PM</option>
                <option value="22:00">10:00 PM</option>
              </select>
            </div>

            {/* Dropoff Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Drop Auto At
              </label>
              <select
                value={dropoffLocation}
                onChange={(e) => setDropoffLocation(e.target.value)}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Choose dropoff location</option>
                <option value="any">Any Available Hub</option>
                <option value="indiranagar">Indiranagar Charging Hub</option>
                <option value="brigade-road">Brigade Road Auto Station</option>
                <option value="koramangala">Koramangala EV Hub</option>
              </select>
            </div>
          </div>
        </div>

        {/* Estimated Earnings */}
        <div className="hordu-card p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
            Estimated Earnings
          </h3>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold hordu-gradient-text">
                <span className="hordu-currency">850</span>
              </div>
              <p className="hordu-text-muted">Expected Earnings</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold hordu-gradient-text">12</div>
              <p className="hordu-text-muted">Estimated Trips</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold hordu-gradient-text">
                <span className="hordu-distance">75</span>
              </div>
              <p className="hordu-text-muted">Distance</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold hordu-gradient-text">8h</div>
              <p className="hordu-text-muted">Shift Duration</p>
            </div>
          </div>
        </div>

        {/* Schedule Button */}
        <button
          onClick={handleSchedule}
          disabled={!startTime || !endTime || !dropoffLocation}
          className="hordu-btn-primary w-full py-4 text-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="mr-2">🛺</span>
          Schedule Auto Shift
        </button>
      </div>
    </div>
  );
};

export default HorduScheduleAutoScreen;
