
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../../context/ThemeContext";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "../../../hordu-theme.css";

// Fix for default markers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const HorduSmartLotMapScreen: React.FC = () => {
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useTheme();
  const [selectedLot, setSelectedLot] = useState<string | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

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
    },
    {
      id: "whitefield",
      name: "Whitefield Tech Hub",
      location: "Whitefield Main Road",
      available: 6,
      total: 8,
      distance: "8.5",
      coordinates: { lat: 12.9698, lng: 77.7500 }
    },
    {
      id: "jayanagar",
      name: "Jayanagar Auto Stand",
      location: "Jayanagar 4th Block",
      available: 3,
      total: 6,
      distance: "4.2",
      coordinates: { lat: 12.9279, lng: 77.5938 }
    }
  ];

  const handleLotSelect = (lotId: string) => {
    setSelectedLot(lotId);
    navigate(`/hordu/schedule-car/${lotId}`);
  };

  // Initialize map
  useEffect(() => {
    if (mapRef.current && !mapInstanceRef.current) {
      console.log("Initializing Bengaluru auto charging map...");

      // Clear any existing content
      mapRef.current.innerHTML = "";

      // Create map centered on Bengaluru
      const map = L.map(mapRef.current, {
        zoomControl: true,
        attributionControl: true,
      }).setView([12.9716, 77.5946], 12); // Bengaluru center coordinates

      // Add OpenStreetMap tiles
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
        maxZoom: 19,
      }).addTo(map);

      // Add markers for each charging hub
      lots.forEach((lot) => {
        const marker = L.marker([lot.coordinates.lat, lot.coordinates.lng])
          .addTo(map);

        // Create custom popup content
        const popupContent = `
          <div style="min-width: 250px; font-family: system-ui;">
            <h3 style="margin: 0 0 12px 0; color: #7c3aed; font-weight: bold; font-size: 16px;">${lot.name}</h3>
            <p style="margin: 6px 0; color: #374151; font-size: 14px;">📍 ${lot.location}</p>
            <p style="margin: 6px 0; color: #374151; font-size: 14px;">🛺 ${lot.available}/${lot.total} autos available</p>
            <p style="margin: 6px 0; color: #374151; font-size: 14px;">📏 ${lot.distance} km away</p>
            <div style="margin-top: 12px;">
              <button 
                onclick="window.location.href='/hordu/schedule-car/${lot.id}'" 
                style="background: linear-gradient(135deg, #7c3aed, #ec4899); color: white; border: none; padding: 10px 16px; border-radius: 8px; cursor: pointer; width: 100%; font-weight: 600; font-size: 14px;"
                onmouseover="this.style.opacity='0.9'"
                onmouseout="this.style.opacity='1'"
              >
                🛺 Reserve Auto
              </button>
            </div>
          </div>
        `;

        marker.bindPopup(popupContent);

        // Open Indiranagar popup by default (closest/most popular)
        if (lot.id === "indiranagar") {
          marker.openPopup();
        }
      });

      mapInstanceRef.current = map;
      console.log(`Bengaluru map setup complete with ${lots.length} charging hubs`);
    }

    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [lots]); // Re-run if lots data changes

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
        {/* Interactive Map Section */}
        <div className="hordu-card p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
            Bengaluru Auto Charging Map
          </h3>
          <div className="rounded-lg overflow-hidden border-2 border-gray-200 dark:border-gray-600 shadow-lg">
            <div
              ref={mapRef}
              className="w-full h-80 sm:h-96"
              style={{
                minHeight: "320px",
                zIndex: 1,
                position: "relative",
              }}
            />
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-3 font-medium">
            📍 Interactive map showing EV auto charging hubs across Bengaluru. Click markers for details.
          </p>
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
            Bengaluru Network Overview
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold hordu-gradient-text">{lots.reduce((sum, lot) => sum + lot.total, 0)}</div>
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">Total Autos</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold hordu-gradient-text">{lots.length}</div>
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">Charging Hubs</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold hordu-gradient-text">94%</div>
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">Uptime</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold hordu-gradient-text">
                <span className="hordu-distance">165</span>
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
