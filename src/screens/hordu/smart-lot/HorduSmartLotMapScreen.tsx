
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../../context/ThemeContext";
import "../../../hordu-theme.css";

const HorduSmartLotMapScreen: React.FC = () => {
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useTheme();
  const [selectedLot, setSelectedLot] = useState<string | null>(null);

  const lots = [
    {
      id: "indiranagar",
      name: "Indiranagar Charging Hub",
      location: "Indiranagar Metro Station",
      available: 8,
      total: 12,
      distance: "0.5",
      coordinates: { lat: 12.9719, lng: 77.6412 }
    },
    {
      id: "brigade-road",
      name: "Brigade Road Auto Station",
      location: "Brigade Road Junction",
      available: 5,
      total: 10,
      distance: "1.2",
      coordinates: { lat: 12.9716, lng: 77.6099 }
    },
    {
      id: "koramangala",
      name: "Koramangala EV Hub",
      location: "Koramangala 5th Block",
      available: 12,
      total: 15,
      distance: "2.8",
      coordinates: { lat: 12.9352, lng: 77.6245 }
    }
  ];

  const handleLotSelect = (lotId: string) => {
    setSelectedLot(lotId);
    navigate(`/hordu/schedule-car/${lotId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-purple-900/20 dark:via-pink-900/20 dark:to-blue-900/20">
      {/* Header */}
      <div className="hordu-header">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3 sm:py-4">
            <div className="flex items-center">
              <button
                onClick={() => navigate("/hordu/driver-home")}
                className="hordu-btn-primary mr-4"
              >
                ←
              </button>
              <div>
                <h1 className="text-lg sm:text-xl lg:text-2xl font-bold hordu-gradient-text">
                  Auto Charging Hubs
                </h1>
                <p className="text-sm text-purple-600 dark:text-purple-400 font-medium">Find available EV autos in Bengaluru</p>
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
            Bengaluru Auto Charging Map
          </h3>
          <div className="bg-gradient-to-br from-green-100 to-blue-100 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg h-64 flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600 relative">
            <div className="text-center">
              <span className="text-4xl mb-2 block">🗺️</span>
              <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">Interactive Bengaluru Map</p>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 font-medium">
                Auto charging hubs across the city
              </p>
            </div>
            
            {/* Mock map markers */}
            <div className="absolute top-6 left-12 bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold">
              8
            </div>
            <div className="absolute top-12 right-16 bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold">
              5
            </div>
            <div className="absolute bottom-8 left-20 bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold">
              12
            </div>
          </div>
        </div>

        {/* Available Lots */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">
            Available Charging Hubs
          </h3>
          
          {lots.map((lot) => (
            <div key={lot.id} className="hordu-card p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-2">
                    {lot.name}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2 font-medium">{lot.location}</p>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-700 dark:text-gray-200 font-medium">
                      📍 <span className="hordu-distance font-semibold text-purple-600 dark:text-purple-400">{lot.distance}</span> away
                    </span>
                    <span
                      className={
                        lot.available > 5 ? "hordu-status-good" : lot.available > 0 ? "hordu-status-bad" : "hordu-status-bad"
                      }
                    >
                      {lot.available} / {lot.total} available
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 mt-4 sm:mt-0">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">
                      {lot.available}
                    </div>
                    <p className="text-xs font-semibold text-gray-700 dark:text-gray-200">Autos Ready</p>
                  </div>
                  <button
                    onClick={() => handleLotSelect(lot.id)}
                    disabled={lot.available === 0}
                    className="hordu-btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="mr-2">🛺</span>
                    Select Auto
                  </button>
                </div>
              </div>
              
              {/* Lot Features */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="text-center">
                  <span className="text-lg">⚡</span>
                  <p className="text-xs font-semibold text-gray-700 dark:text-gray-200">Fast Charging</p>
                </div>
                <div className="text-center">
                  <span className="text-lg">🛠️</span>
                  <p className="text-xs font-semibold text-gray-700 dark:text-gray-200">Maintenance</p>
                </div>
                <div className="text-center">
                  <span className="text-lg">📱</span>
                  <p className="text-xs font-semibold text-gray-700 dark:text-gray-200">App Unlock</p>
                </div>
                <div className="text-center">
                  <span className="text-lg">🎯</span>
                  <p className="text-xs font-semibold text-gray-700 dark:text-gray-200">GPS Tracking</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="hordu-card p-6 mt-6">
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
            Network Overview
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold hordu-gradient-text">25</div>
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">Total Autos</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold hordu-gradient-text">3</div>
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">Charging Hubs</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold hordu-gradient-text">92%</div>
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">Uptime</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold hordu-gradient-text">
                <span className="hordu-distance">150</span>
              </div>
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">Avg Range</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HorduSmartLotMapScreen;
