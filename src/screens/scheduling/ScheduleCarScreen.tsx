
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
  const [currentCarIndex, setCurrentCarIndex] = useState(0);
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

  const selectCurrentCar = () => {
    if (selectedLot && selectedLot.vehicles[currentCarIndex]) {
      setSelectedVehicles([selectedLot.vehicles[currentCarIndex].id]);
    }
  };

  const nextCar = () => {
    if (selectedLot) {
      setCurrentCarIndex((prev) => (prev + 1) % selectedLot.vehicles.length);
    }
  };

  const prevCar = () => {
    if (selectedLot) {
      setCurrentCarIndex((prev) => (prev - 1 + selectedLot.vehicles.length) % selectedLot.vehicles.length);
    }
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
          <h1 className="text-xl font-semibold text-deep-violet mb-4">Lot not found</h1>
          <button
            onClick={() => navigate('/smart-lot-map')}
            className="px-6 py-3 bg-violet hover:bg-deep-violet text-white rounded-lg font-medium border-2 border-gray-300"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const currentCar = selectedLot.vehicles[currentCarIndex];

  return (
    <div className="min-h-screen bg-pink-gradient">
      {/* Header */}
      <div className="bg-white shadow nav-violet rounded-2xl my-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <button
                onClick={() => navigate('/smart-lot-map')}
                className="mr-4 w-10 h-10 bg-purple-500 hover:bg-purple-600 rounded-lg border-2 border-gray-300 flex items-center justify-center text-white"
              >
                <span className="text-lg">←</span>
              </button>
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-deep-violet">Schedule a Car</h1>
                <p className="text-xs sm:text-sm text-violet">{selectedLot.name}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Lot Info */}
        <div className="card-violet my-12 p-6">
          <h2 className="text-base sm:text-lg font-semibold text-deep-violet mb-2">{selectedLot.name}</h2>
          <p className="text-xs sm:text-sm text-violet">{selectedLot.vehicles.length} vehicles available</p>
        </div>

        {/* Vehicle Carousel */}
        <div className="card-violet my-12 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base sm:text-lg font-semibold text-deep-violet">Available Vehicles</h3>
            <div className="flex space-x-2">
              {selectedLot.vehicles.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full ${
                    index === currentCarIndex ? "bg-violet" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
          
          <div className="space-y-4">
            {/* Current Car Display */}
            <div className="card-violet p-4 border-2 border-violet">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <span className="text-purple-600 text-2xl">🚗</span>
                  <div>
                    <h4 className="text-base sm:text-lg font-semibold text-deep-violet">{currentCar.model}</h4>
                    <div className="flex flex-wrap items-center gap-3 mt-2">
                      <div className="flex items-center space-x-1">
                        <span className="text-xs sm:text-sm text-violet">Available:</span>
                        <span className="text-xs sm:text-sm font-medium text-deep-violet">{currentCar.availableTime}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span className={`text-lg ${getChargeColor(currentCar.chargeLevel)}`}>
                          {getChargeIcon(currentCar.chargeLevel)}
                        </span>
                        <span className={`text-xs sm:text-sm font-medium ${getChargeColor(currentCar.chargeLevel)}`}>
                          {currentCar.chargeLevel}%
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span className="text-xs sm:text-sm text-violet">Range:</span>
                        <span className="text-xs sm:text-sm font-medium text-deep-violet">{currentCar.range} mi</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Carousel Controls */}
              <div className="flex items-center justify-between">
                <button
                  onClick={prevCar}
                  className="w-12 h-12 bg-purple-500 hover:bg-purple-600 rounded-lg border-2 border-gray-300 flex items-center justify-center text-white"
                >
                  <span className="text-lg">←</span>
                </button>
                
                <button
                  onClick={selectCurrentCar}
                  className={`px-6 py-3 rounded-lg font-medium text-white border-2 border-gray-300 ${
                    selectedVehicles.includes(currentCar.id)
                      ? 'bg-green-500 hover:bg-green-600'
                      : 'bg-violet hover:bg-deep-violet'
                  }`}
                >
                  {selectedVehicles.includes(currentCar.id) ? '✅ Selected' : 'Select Car'}
                </button>
                
                <button
                  onClick={nextCar}
                  className="w-12 h-12 bg-purple-500 hover:bg-purple-600 rounded-lg border-2 border-gray-300 flex items-center justify-center text-white"
                >
                  <span className="text-lg">→</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Time Selection */}
        <div className="card-violet my-12 p-6">
          <h3 className="text-base sm:text-lg font-semibold text-deep-violet mb-6">Schedule Time</h3>
          <div className="space-y-6">
            {/* Start Time */}
            <div>
              <label className="block text-sm font-medium text-deep-violet mb-3">Start Time</label>
              <div className="relative">
                <select
                  value={startTime}
                  onChange={(e) => {
                    setStartTime(e.target.value);
                    setEndTime(''); // Reset end time when start time changes
                  }}
                  disabled={!selectedVehicle}
                  className={`w-full p-4 text-base bg-white border-2 border-violet rounded-xl focus:ring-2 focus:ring-violet focus:border-transparent text-deep-violet font-medium ${
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
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <span className="text-xl text-violet">⏰</span>
                </div>
              </div>
            </div>

            {/* End Time */}
            <div>
              <label className="block text-sm font-medium text-deep-violet mb-3">End Time</label>
              <div className="relative">
                <select
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  disabled={!startTime}
                  className={`w-full p-4 text-base bg-white border-2 border-violet rounded-xl focus:ring-2 focus:ring-violet focus:border-transparent text-deep-violet font-medium ${
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
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <span className="text-xl text-violet">⏰</span>
                </div>
              </div>
            </div>

            {/* Dropoff Lot */}
            <div>
              <label className="block text-sm font-medium text-deep-violet mb-3">Preferred Dropoff Lot</label>
              <div className="relative">
                <select
                  value={dropoffLot}
                  onChange={(e) => setDropoffLot(e.target.value)}
                  className="w-full p-4 text-base bg-white border-2 border-violet rounded-xl focus:ring-2 focus:ring-violet focus:border-transparent text-deep-violet font-medium"
                >
                  <option value="">Select dropoff lot</option>
                  <option value="jfk">JFK Lot</option>
                  <option value="flushing">Flushing Lot</option>
                  <option value="midtown">Midtown Lot</option>
                </select>
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <span className="text-xl text-violet">📍</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Schedule Button */}
        <div className="flex justify-center my-12">
          <button
            onClick={handleSchedule}
            disabled={selectedVehicles.length === 0 || !startTime || !endTime || !dropoffLot}
            className="w-full px-8 py-4 bg-violet text-white rounded-xl font-semibold text-lg hover:bg-deep-violet disabled:opacity-50 disabled:cursor-not-allowed border-2 border-gray-300"
          >
            🚗 Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScheduleCarScreen;
