
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Mock data for smart lots with vehicles
const mockSmartLots = [
  {
    id: '1',
    name: 'JFK Lot',
    location: { latitude: 37.7749, longitude: -122.4194 },
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
    location: { latitude: 37.6213, longitude: -122.3790 },
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
    location: { latitude: 37.7849, longitude: -122.4094 },
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
  const [, setDriverLocation] = useState({ latitude: 37.7749, longitude: -122.4194 });
  const navigate = useNavigate();

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

  return (
    <div className="min-h-screen bg-pink-gradient">
      {/* Header */}
      <div className="bg-white shadow nav-violet">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <button
                onClick={() => navigate('/')}
                className="mr-3 sm:mr-4 w-10 h-10 bg-gradient-to-r from-violet via-purple-600 to-deep-violet hover:from-deep-violet hover:via-purple-700 hover:to-violet rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-deep-violet">🗺️ Find Car</h1>
                <p className="text-xs sm:text-sm text-violet">Choose from available lots</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="relative h-80 sm:h-96 bg-gradient-to-br from-blue-50 to-purple-50 mx-4 sm:mx-6 lg:mx-8 mt-6 rounded-2xl shadow-lg overflow-hidden">
        {/* Custom Map Image */}
        <div className="absolute inset-0 flex items-center justify-center">
          <img 
            src="map-image.png" 
            alt="Smart Lots Map" 
            className="w-3/5 h-3/5 object-cover opacity-80"
          />
        </div>

        {/* Smart Lot Markers */}
        {mockSmartLots.map((lot, index) => (
          <div
            key={lot.id}
            className="absolute"
            style={{
              top: `${25 + index * 20}%`,
              left: `${15 + index * 25}%`
            }}
          >
            <div className="flex flex-col items-center transform hover:scale-105 transition-all duration-300">
              <div className="card-violet p-3 sm:p-4 mb-2 min-w-0">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <span className="text-lg sm:text-xl mr-2">🏢</span>
                    <h3 className="text-sm sm:text-base font-bold text-deep-violet">{lot.name}</h3>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-center text-xs sm:text-sm text-violet">
                      <span className="mr-1">🚗</span>
                      <span>{lot.availableCars} cars available</span>
                    </div>
                    <div className="flex items-center justify-center text-xs text-violet">
                      {lot.isChargingStation ? (
                        <>
                          <span className="mr-1">⚡</span>
                          <span>Charging Station</span>
                        </>
                      ) : (
                        <>
                          <span className="mr-1">🅿️</span>
                          <span>Standard Lot</span>
                        </>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => navigate(`/schedule-car/${lot.id}`)}
                    className="mt-3 w-full px-3 sm:px-4 py-2 bg-gradient-to-r from-violet via-purple-600 to-deep-violet hover:from-deep-violet hover:via-purple-700 hover:to-violet text-white text-xs sm:text-sm font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                  >
                    Schedule a Car
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
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
                className="px-6 py-3 bg-gradient-to-r from-emerald-500 via-teal-600 to-cyan-600 hover:from-emerald-600 hover:via-teal-700 hover:to-cyan-700 text-white text-sm sm:text-base font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartLotMapScreen;
