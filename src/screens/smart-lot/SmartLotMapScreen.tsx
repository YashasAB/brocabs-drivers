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
  const [selectedLot, setSelectedLot] = useState<any>(null);
  const [driverLocation, setDriverLocation] = useState({ latitude: 37.7749, longitude: -122.4194 });
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

  const handleLotSelect = (lot: any) => {
    setSelectedLot(lot);
    navigate(`/lot-details/${lot.id}`);
  };

  return (
    <div className="min-h-screen bg-pink-gradient">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <button
                onClick={() => navigate('/')}
                className="mr-4 p-2 text-gray-400 hover:text-gray-500"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h1 className="text-xl font-semibold text-gray-900">Find Car</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="relative h-96 bg-gray-200">
        {/* Custom Map Image */}
        <div className="absolute inset-0 flex items-center justify-center">
          <img 
            src="/map-image.png" 
            alt="Smart Lots Map" 
            className="w-3/5 h-3/5 object-cover"
          />
        </div>

        {/* Smart Lot Markers */}
        {mockSmartLots.map((lot, index) => (
          <div
            key={lot.id}
            className="absolute"
            style={{
              top: `${30 + index * 20}%`,
              left: `${20 + index * 25}%`
            }}
          >
            <div className="flex flex-col items-center">
              <div className="text-xs text-blue-800 font-medium mt-2 mb-1 px-2 py-1 bg-purple-200 rounded">{lot.name}</div>
              <button
                onClick={() => navigate(`/schedule-car/${lot.id}`)}
                className="px-3 py-1 bg-violet text-white text-xs rounded-full hover:bg-deep-violet transition-colors"
              >
                Schedule a Car
              </button>
            </div>
          </div>
        ))}
      </div>



      {/* Selected Lot Details */}
      {selectedLot && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-900">{selectedLot.name}</h3>
                <p className="text-sm text-gray-500">
                  {selectedLot.availableCars} cars available
                </p>
              </div>
              <button
                onClick={() => navigate(`/lot-details/${selectedLot.id}`)}
                className="px-4 py-2 btn-violet text-sm font-medium"
              >
                View Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SmartLotMapScreen;
