import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// Mock data for smart lots with vehicles
const mockSmartLots = [
  {
    id: '1',
    name: 'JFK Lot',
    vehicles: [
      { id: 'v1', model: 'Hyundai Kona Electric', availableTime: '09:00 AM', chargeLevel: 85, range: 219 },
      { id: 'v2', model: 'Hyundai Kona Electric', availableTime: '10:30 AM', chargeLevel: 72, range: 186 },
      { id: 'v3', model: 'Hyundai Kona Electric', availableTime: '11:15 AM', chargeLevel: 90, range: 232 }
    ]
  },
  {
    id: '2',
    name: 'Flushing Lot',
    vehicles: [
      { id: 'v6', model: 'Hyundai Kona Electric', availableTime: '08:45 AM', chargeLevel: 78, range: 201 },
      { id: 'v7', model: 'Hyundai Kona Electric', availableTime: '09:20 AM', chargeLevel: 65, range: 168 },
      { id: 'v8', model: 'Hyundai Kona Electric', availableTime: '10:00 AM', chargeLevel: 88, range: 227 }
    ]
  },
  {
    id: '3',
    name: 'Midtown Lot',
    vehicles: [
      { id: 'v9', model: 'Hyundai Kona Electric', availableTime: '09:30 AM', chargeLevel: 55, range: 142 },
      { id: 'v10', model: 'Hyundai Kona Electric', availableTime: '10:15 AM', chargeLevel: 82, range: 211 },
      { id: 'v11', model: 'Hyundai Kona Electric', availableTime: '11:00 AM', chargeLevel: 91, range: 235 }
    ]
  }
];

const ScheduleCarScreen: React.FC = () => {
  const { lotId } = useParams();
  const navigate = useNavigate();
  const [selectedVehicles, setSelectedVehicles] = useState<string[]>([]);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [dropoffLot, setDropoffLot] = useState('');

  const selectedLot = mockSmartLots.find(lot => lot.id === lotId);

  // Get selected vehicle details
  const selectedVehicle = selectedVehicles.length > 0 
    ? selectedLot?.vehicles.find(v => v.id === selectedVehicles[0])
    : null;

  const handleSchedule = () => {
    if (selectedVehicles.length > 0 && startTime && endTime && dropoffLot) {
      // Handle scheduling logic here
      console.log('Scheduling:', { selectedVehicles, startTime, endTime, dropoffLot });
      navigate('/');
    }
  };

  const toggleVehicleSelection = (vehicleId: string) => {
    setSelectedVehicles([vehicleId]); // Only allow one selection
  };

  const getChargeColor = (level: number) => {
    if (level >= 80) return 'text-green-600';
    if (level >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getChargeIcon = (level: number) => {
    if (level >= 80) return '🔋';
    if (level >= 60) return '⚡';
    return '⚠️';
  };

  // Generate time options within 3 hours of available time
  const generateStartTimeOptions = () => {
    if (!selectedVehicle) return [];
    
    const availableTime = selectedVehicle.availableTime;
    const [time, period] = availableTime.split(' ');
    const [hours] = time.split(':').map(Number);
    
    let startHour = hours;
    if (period === 'PM' && hours !== 12) startHour += 12;
    if (period === 'AM' && hours === 12) startHour = 0;
    
    const options = [];
    for (let i = 0; i <= 3; i++) {
      const hour = startHour + i;
      if (hour <= 18) { // Max 6 PM
        const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
        const period = hour >= 12 ? 'PM' : 'AM';
        const value = `${hour.toString().padStart(2, '0')}:00`;
        const display = `${displayHour}:00 ${period}`;
        options.push({ value, display });
      }
    }
    return options;
  };

  // Generate end time options (minimum 4 hours after start time)
  const generateEndTimeOptions = () => {
    if (!startTime) return [];
    
    const startHour = parseInt(startTime.split(':')[0]);
    const options = [];
    
    for (let i = 4; i <= 8; i++) { // 4-8 hours after start
      const hour = startHour + i;
      if (hour <= 22) { // Max 10 PM
        const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
        const period = hour >= 12 ? 'PM' : 'AM';
        const value = `${hour.toString().padStart(2, '0')}:00`;
        const display = `${displayHour}:00 ${period}`;
        options.push({ value, display });
      }
    }
    return options;
  };

  if (!selectedLot) {
    return (
      <div className="min-h-screen bg-pink-gradient flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl font-semibold text-gray-900 mb-4">Lot not found</h1>
          <button
            onClick={() => navigate('/smart-lot-map')}
            className="px-4 py-2 btn-violet"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-pink-gradient">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <button
                onClick={() => navigate('/smart-lot-map')}
                className="mr-4 p-2 text-gray-400 hover:text-gray-500"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h1 className="text-xl font-semibold text-gray-900">Schedule a Car</h1>
            </div>
          </div>
        </div>
      </div>



      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="card-violet mb-6">
          <div className="px-6 py-4 border-b border-violet">
            <h2 className="text-lg font-medium text-deep-violet">{selectedLot.name}</h2>
            <p className="text-sm text-violet">{selectedLot.vehicles.length} vehicles available</p>
          </div>
        </div>

        {/* Vehicle Carousel */}
        <div className="card-violet mb-6">
          <div className="px-6 py-4 border-b border-violet">
            <h3 className="text-lg font-medium text-deep-violet">Available Vehicles</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {selectedLot.vehicles.map((vehicle) => (
                <div
                  key={vehicle.id}
                  className={`card-violet transition-all ${
                    selectedVehicles.includes(vehicle.id) ? 'ring-2 ring-violet' : ''
                  }`}
                >
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                                              <div className="flex items-center space-x-3">
                          <input
                            type="radio"
                            name="vehicleSelection"
                            checked={selectedVehicles.includes(vehicle.id)}
                            onChange={() => toggleVehicleSelection(vehicle.id)}
                            className="w-5 h-5 text-violet border-violet focus:ring-violet"
                          />
                          <span className="text-purple-600" style={{ fontSize: '20px', lineHeight: '20px' }}>🚗</span>
                          <div className="flex-1">
                          <h4 className="text-lg font-medium text-deep-violet">{vehicle.model}</h4>
                          <div className="flex items-center space-x-4 mt-2">
                            <div className="flex items-center space-x-1">
                              <span className="text-sm text-violet">Available:</span>
                              <span className="text-sm font-medium text-deep-violet">{vehicle.availableTime}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <span className={`text-lg ${getChargeColor(vehicle.chargeLevel)}`}>
                                {getChargeIcon(vehicle.chargeLevel)}
                              </span>
                              <span className={`text-sm font-medium ${getChargeColor(vehicle.chargeLevel)}`}>
                                {vehicle.chargeLevel}%
                              </span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <span className="text-sm text-violet">Range:</span>
                              <span className="text-sm font-medium text-deep-violet">{vehicle.range} mi</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Time Selection */}
        <div className="card-violet mb-6">
          <div className="px-6 py-4 border-b border-violet">
            <h3 className="text-lg font-medium text-deep-violet">Schedule Time</h3>
          </div>
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-deep-violet mb-2">Start Time</label>
                <select
                  value={startTime}
                  onChange={(e) => {
                    setStartTime(e.target.value);
                    setEndTime(''); // Reset end time when start time changes
                  }}
                  disabled={!selectedVehicle}
                  className={`w-full p-3 border border-violet rounded-lg focus:ring-2 focus:ring-violet focus:border-transparent ${
                    !selectedVehicle ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  <option value="">{selectedVehicle ? 'Select start time' : 'Select a vehicle first'}</option>
                  {generateStartTimeOptions().map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.display}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-deep-violet mb-2">End Time</label>
                <select
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  disabled={!startTime}
                  className={`w-full p-3 border border-violet rounded-lg focus:ring-2 focus:ring-violet focus:border-transparent ${
                    !startTime ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  <option value="">{startTime ? 'Select end time' : 'Select start time first'}</option>
                  {generateEndTimeOptions().map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.display}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-deep-violet mb-2">Preferred Dropoff Lot</label>
                <select
                  value={dropoffLot}
                  onChange={(e) => setDropoffLot(e.target.value)}
                  className="w-full p-3 border border-violet rounded-lg focus:ring-2 focus:ring-violet focus:border-transparent"
                >
                  <option value="">Select dropoff lot</option>
                  <option value="jfk">JFK Lot</option>
                  <option value="flushing">Flushing Lot</option>
                  <option value="midtown">Midtown Lot</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Schedule Button */}
        <div className="flex justify-center">
          <button
            onClick={handleSchedule}
            disabled={selectedVehicles.length === 0 || !startTime || !endTime || !dropoffLot}
            className="px-8 py-3 bg-violet text-white rounded-lg font-medium hover:bg-deep-violet disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScheduleCarScreen; 