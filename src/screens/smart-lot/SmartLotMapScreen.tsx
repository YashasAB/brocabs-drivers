import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import L from 'leaflet';

// Mock data for smart lots with vehicles (NYC locations)
const mockSmartLots = [
  {
    id: '1',
    name: 'JFK Lot',
    location: { latitude: 40.6413, longitude: -73.7781 }, // JFK Airport area
    availableCars: 3,
    totalSpaces: 20,
    isChargingStation: true,
    vehicles: [
      { id: 'v1', model: 'Hyundai Kona Electric', availableTime: '09:00 AM', chargeLevel: 85, range: 219 },
      { id: 'v2', model: 'Hyundai Kona Electric', availableTime: '10:30 AM', chargeLevel: 72, range: 186 },
      { id: 'v3', model: 'Hyundai Kona Electric', availableTime: '11:15 AM', chargeLevel: 90, range: 232 }
    ]
  },
  {
    id: '2',
    name: 'Flushing Lot',
    location: { latitude: 40.7675, longitude: -73.8333 }, // Flushing, Queens
    availableCars: 3,
    totalSpaces: 15,
    isChargingStation: true,
    vehicles: [
      { id: 'v6', model: 'Hyundai Kona Electric', availableTime: '08:45 AM', chargeLevel: 78, range: 201 },
      { id: 'v7', model: 'Hyundai Kona Electric', availableTime: '09:20 AM', chargeLevel: 65, range: 168 },
      { id: 'v8', model: 'Hyundai Kona Electric', availableTime: '10:00 AM', chargeLevel: 88, range: 227 }
    ]
  },
  {
    id: '3',
    name: 'Midtown Lot',
    location: { latitude: 40.7589, longitude: -73.9851 }, // Midtown Manhattan
    availableCars: 3,
    totalSpaces: 25,
    isChargingStation: false,
    vehicles: [
      { id: 'v9', model: 'Hyundai Kona Electric', availableTime: '09:30 AM', chargeLevel: 55, range: 142 },
      { id: 'v10', model: 'Hyundai Kona Electric', availableTime: '10:15 AM', chargeLevel: 82, range: 211 },
      { id: 'v11', model: 'Hyundai Kona Electric', availableTime: '11:00 AM', chargeLevel: 91, range: 235 }
    ]
  }
];

const SmartLotMapScreen: React.FC = () => {
  const [, setDriverLocation] = useState({ latitude: 40.7589, longitude: -73.9851 }); // NYC coordinates
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useTheme();
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    // Get driver's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setDriverLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  }, []);

  useEffect(() => {
    if (mapRef.current && !mapInstanceRef.current) {
      console.log('Initializing map...');
      
      // Initialize the map
      const map = L.map(mapRef.current).setView([40.7589, -73.9851], 10); // NYC center - zoomed out 10%

      // Add tile layer (simplified grayscale style)
      L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png', {
        attribution: '© Stadia Maps © OpenMapTiles © OpenStreetMap contributors',
        maxZoom: 20
      }).addTo(map);
      
      console.log('Map initialized, adding markers...');

      // Custom icon for lots
      const lotIcon = L.divIcon({
        html: `<div style="background: #7c3aed; color: white; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);">🏢</div>`,
        className: 'custom-div-icon',
        iconSize: [40, 40],
        iconAnchor: [20, 20]
      });

      // Add markers for each smart lot
      mockSmartLots.forEach((lot) => {
        console.log(`Adding marker for ${lot.name} at [${lot.location.latitude}, ${lot.location.longitude}]`);
        const marker = L.marker([lot.location.latitude, lot.location.longitude], { icon: lotIcon })
          .addTo(map);
        
        const popupContent = `
          <div style="min-width: 200px;">
            <h3 style="margin: 0 0 8px 0; color: #7c3aed; font-weight: bold;">${lot.name}</h3>
            <p style="margin: 4px 0; color: #666;">🚗 ${lot.availableCars} cars available</p>
            <p style="margin: 4px 0; color: #666;">${lot.isChargingStation ? '⚡ Charging Station' : '🅿️ Standard Lot'}</p>
            <button 
              onclick="window.open('/schedule-car/${lot.id}', '_self')" 
              style="background: #7c3aed; color: white; border: none; padding: 8px 16px; border-radius: 6px; cursor: pointer; margin-top: 8px; width: 100%;"
            >
              🚗 Schedule Car
            </button>
          </div>
        `;
        
        marker.bindPopup(popupContent);
      });

      mapInstanceRef.current = map;
      console.log(`Map setup complete with ${mockSmartLots.length} markers`);
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [navigate]);

  return (
    <div className="min-h-screen bg-pink-gradient">
      {/* Header */}
      <div className="bg-white shadow nav-violet">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <button
                onClick={() => navigate('/')}
                className="mr-4 w-12 h-12 bg-blue-500 hover:bg-blue-600 rounded-lg border-2 border-gray-300 flex items-center justify-center text-white"
              >
                <span className="text-xl">←</span>
              </button>
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-deep-violet">🗺️ Find Car</h1>
                <p className="text-xs sm:text-sm text-violet">Tap on available lots in the map to select your car</p>
              </div>
            </div>
            <button
              onClick={toggleTheme}
              className="theme-toggle w-12 h-12 flex items-center justify-center"
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              <span className="text-xl">{isDarkMode ? '🌞' : '🌙'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Map Container */}
      <div className="mx-4 sm:mx-6 lg:mx-8 mt-6 rounded-2xl shadow-lg overflow-hidden bg-white">
        <div 
          ref={mapRef}
          className="h-80 sm:h-96 w-full rounded-2xl"
          style={{ zIndex: 1, minHeight: '400px' }}
        />
      </div>

      {/* Quick Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="card-violet p-4 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-gradient-to-r from-violet to-deep-violet p-3 sm:p-4 rounded-xl">
                <span className="text-lg sm:text-2xl">🏢</span>
              </div>
              <div className="ml-3 sm:ml-4">
                <p className="text-xs sm:text-sm font-medium text-violet mb-1">Available Lots</p>
                <p className="text-lg sm:text-2xl font-bold text-deep-violet">{mockSmartLots.length}</p>
              </div>
            </div>
          </div>

          <div className="card-violet p-4 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-gradient-to-r from-emerald-500 to-teal-600 p-3 sm:p-4 rounded-xl">
                <span className="text-lg sm:text-2xl">🚗</span>
              </div>
              <div className="ml-3 sm:ml-4">
                <p className="text-xs sm:text-sm font-medium text-violet mb-1">Total Cars</p>
                <p className="text-lg sm:text-2xl font-bold text-deep-violet">
                  {mockSmartLots.reduce((sum, lot) => sum + lot.availableCars, 0)}
                </p>
              </div>
            </div>
          </div>

          <div className="card-violet p-4 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-gradient-to-r from-orange-500 to-red-500 p-3 sm:p-4 rounded-xl">
                <span className="text-lg sm:text-2xl">⚡</span>
              </div>
              <div className="ml-3 sm:ml-4">
                <p className="text-xs sm:text-sm font-medium text-violet mb-1">Charging Lots</p>
                <p className="text-lg sm:text-2xl font-bold text-deep-violet">
                  {mockSmartLots.filter(lot => lot.isChargingStation).length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Action */}
        <div className="mt-6">
          <div className="card-violet p-6">
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-violet to-deep-violet rounded-2xl flex items-center justify-center">
                  <span className="text-3xl">🎯</span>
                </div>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-deep-violet mb-2">Ready to Drive?</h3>
              <p className="text-sm sm:text-base text-violet mb-4">Choose a lot above and schedule your next car</p>
              <button
                onClick={() => navigate('/')}
                className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg border-2 border-gray-300"
              >
                🏠 Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartLotMapScreen;