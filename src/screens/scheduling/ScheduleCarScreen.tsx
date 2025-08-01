
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

  // Generate time options starting from car availability time with 30-minute intervals for 2 hours
  const generateStartTimeOptions = () => {
    if (!selectedVehicle) return [];
    
    const availableTime = selectedVehicle.availableTime;
    const [time, period] = availableTime.split(' ');
    const [hours, minutes = 0] = time.split(':').map(Number);
    
    let startHour = hours;
    if (period === 'PM' && hours !== 12) startHour += 12;
    if (period === 'AM' && hours === 12) startHour = 0;
    
    const options = [];
    // Generate 30-minute intervals starting from availability time for 2 hours
    for (let i = 0; i <= 4; i++) { // 0, 0.5, 1, 1.5, 2 hours (5 options total)
      const totalMinutes = minutes + (i * 30);
      const hour = startHour + Math.floor(totalMinutes / 60);
      const minute = totalMinutes % 60;
      
      if (hour <= 23) { // Max 11 PM
        const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
        const period = hour >= 12 ? 'PM' : 'AM';
        const value = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        const display = `${displayHour}:${minute.toString().padStart(2, '0')} ${period}`;
        options.push({ value, display });
      }
    }
    return options;
  };

  // Generate end time options (minimum 4 hours after start time) with 30-minute intervals
  const generateEndTimeOptions = () => {
    if (!startTime) return [];
    
    const [startHour, startMinute] = startTime.split(':').map(Number);
    const startTotalMinutes = startHour * 60 + startMinute;
    const options = [];
    
    // Generate options from 4 to 8 hours after start time in 30-minute intervals
    for (let i = 8; i <= 16; i++) { // 8 half-hours (4 hours) to 16 half-hours (8 hours)
      const endTotalMinutes = startTotalMinutes + (i * 30);
      const hour = Math.floor(endTotalMinutes / 60);
      const minute = endTotalMinutes % 60;
      
      if (hour <= 22) { // Max 10 PM
        const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
        const period = hour >= 12 ? 'PM' : 'AM';
        const value = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        const display = `${displayHour}:${minute.toString().padStart(2, '0')} ${period}`;
        options.push({ value, display });
      }
    }
    return options;
  };

  if (!lotId || !selectedLot) {
    return (
      <div className="min-h-screen bg-pink-gradient flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-lg sm:text-xl font-semibold text-deep-violet mb-4">
            {!lotId ? 'No lot selected' : 'Lot not found'}
          </h1>
          <button
            onClick={() => navigate('/smart-lot-map')}
            className="px-4 py-2 sm:px-6 sm:py-3 bg-violet hover:bg-deep-violet text-white rounded-lg font-medium text-sm sm:text-base"
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
      <div className="bg-white shadow nav-violet rounded-2xl mx-2 my-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <button
                onClick={() => navigate('/smart-lot-map')}
                className="mr-3 sm:mr-4 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-violet to-deep-violet hover:from-deep-violet hover:to-violet rounded-lg flex items-center justify-center text-white text-sm sm:text-lg"
              >
                <span>←</span>
              </button>
              <div>
                <h1 className="text-base sm:text-lg lg:text-xl font-bold text-deep-violet">Schedule a Car</h1>
                <p className="text-xs sm:text-sm text-violet">{selectedLot.name}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Lot Info */}
        <div className="card-violet my-12 p-4 sm:p-6">
          <h2 className="text-base sm:text-lg font-semibold text-deep-violet mb-2">{selectedLot.name}</h2>
          <p className="text-xs sm:text-sm text-violet">{selectedLot.vehicles.length} vehicles available</p>
        </div>

        {/* Vehicle Carousel */}
        <div className="card-violet my-12 p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h3 className="text-base sm:text-lg font-semibold text-deep-violet">Available Vehicles</h3>
            <div className="flex space-x-1 sm:space-x-2">
              {selectedLot.vehicles.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${
                    index === currentCarIndex ? "bg-violet" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
          
          <div className="space-y-4">
            {/* Current Car Display */}
            <div className="bg-white p-4 sm:p-6 rounded-xl border-2 border-violet shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 bg-gradient-to-r from-violet to-deep-violet p-2 sm:p-3 rounded-xl">
                    <span className="text-lg sm:text-2xl">🚗</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-sm sm:text-base lg:text-lg font-semibold text-deep-violet truncate">{currentCar.model}</h4>
                    <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-2 sm:gap-3 mt-2">
                      <div className="flex items-center space-x-1">
                        <span className="text-xs sm:text-sm text-violet">Available:</span>
                        <span className="text-xs sm:text-sm font-medium text-deep-violet">{currentCar.availableTime}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span className={`text-base sm:text-lg ${getChargeColor(currentCar.chargeLevel)}`}>
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
                  className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-violet to-deep-violet hover:from-deep-violet hover:to-violet rounded-lg flex items-center justify-center text-white text-sm sm:text-lg"
                >
                  <span>←</span>
                </button>
                
                <button
                  onClick={selectCurrentCar}
                  className={`px-4 py-2 sm:px-6 sm:py-3 rounded-lg font-medium text-white text-sm sm:text-base ${
                    selectedVehicles.includes(currentCar.id)
                      ? 'bg-green-500 hover:bg-green-600'
                      : 'bg-violet hover:bg-deep-violet'
                  }`}
                >
                  {selectedVehicles.includes(currentCar.id) ? '✅ Selected' : 'Select Car'}
                </button>
                
                <button
                  onClick={nextCar}
                  className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-violet to-deep-violet hover:from-deep-violet hover:to-violet rounded-lg flex items-center justify-center text-white text-sm sm:text-lg"
                >
                  <span>→</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Book Car Section */}
        <div className="card-violet my-12 p-4 sm:p-6">
          <div className="flex items-center mb-8">
            <div className="flex-shrink-0 bg-gradient-to-r from-violet to-deep-violet p-3 rounded-xl mr-3">
              <span className="text-2xl">📅</span>
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-deep-violet">Book Car</h3>
          </div>
          
          <div className="space-y-10">
            {/* Start Time */}
            <div className="space-y-3">
              <div className="flex items-center">
                <span className="text-xl mr-3">🕐</span>
                <label className="text-sm sm:text-base font-bold text-deep-violet">Start Time</label>
              </div>
              <div className="relative">
                <select
                  id="start-time-select"
                  value={startTime}
                  onChange={(e) => {
                    setStartTime(e.target.value);
                    setEndTime(''); // Reset end time when start time changes
                  }}
                  disabled={!selectedVehicle}
                  className={`w-full p-5 sm:p-6 pr-14 text-base sm:text-lg border-2 rounded-2xl focus:ring-4 focus:ring-violet/30 focus:border-violet text-deep-violet font-semibold appearance-none shadow-xl transition-all duration-300 cursor-pointer ${
                    !selectedVehicle 
                      ? 'opacity-50 cursor-not-allowed bg-white border-gray-200' 
                      : 'bg-white border-violet/40 hover:border-violet hover:shadow-2xl'
                  }`}
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%238b5cf6' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                    backgroundPosition: 'right 16px center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '20px'
                  }}
                >
                  <option value="" style={{ backgroundColor: 'white', color: '#6b7280', fontSize: '14px' }}>
                    {selectedVehicle ? 'Choose your start time' : 'Select a vehicle first'}
                  </option>
                  {generateStartTimeOptions().map((option) => (
                    <option 
                      key={option.value} 
                      value={option.value} 
                      style={{ backgroundColor: 'white', color: '#4c1d95', fontSize: '14px', fontWeight: '500' }}
                    >
                      {option.display}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* End Time */}
            <div className="space-y-3">
              <div className="flex items-center">
                <span className="text-xl mr-3">🕕</span>
                <label className="text-sm sm:text-base font-bold text-deep-violet">End Time</label>
              </div>
              <div className="relative">
                <select
                  id="end-time-select"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  disabled={!startTime}
                  className={`w-full p-5 sm:p-6 pr-14 text-base sm:text-lg border-2 rounded-2xl focus:ring-4 focus:ring-violet/30 focus:border-violet text-deep-violet font-semibold appearance-none shadow-xl transition-all duration-300 cursor-pointer ${
                    !startTime 
                      ? 'opacity-50 cursor-not-allowed bg-white border-gray-200' 
                      : 'bg-white border-violet/40 hover:border-violet hover:shadow-2xl'
                  }`}
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%238b5cf6' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                    backgroundPosition: 'right 16px center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '20px'
                  }}
                >
                  <option value="" style={{ backgroundColor: 'white', color: '#6b7280', fontSize: '14px' }}>
                    {startTime ? 'Choose your end time' : 'Select start time first'}
                  </option>
                  {generateEndTimeOptions().map((option) => (
                    <option 
                      key={option.value} 
                      value={option.value} 
                      style={{ backgroundColor: 'white', color: '#4c1d95', fontSize: '14px', fontWeight: '500' }}
                    >
                      {option.display}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Dropoff Lot */}
            <div className="space-y-3">
              <div className="flex items-center">
                <span className="text-xl mr-3">📍</span>
                <label className="text-sm sm:text-base font-bold text-deep-violet">Preferred Dropoff Lot</label>
              </div>
              <div className="relative">
                <select
                  id="dropoff-lot-select"
                  value={dropoffLot}
                  onChange={(e) => setDropoffLot(e.target.value)}
                  className="w-full p-5 sm:p-6 pr-14 text-base sm:text-lg bg-white border-2 border-violet/40 rounded-2xl focus:ring-4 focus:ring-violet/30 focus:border-violet text-deep-violet font-semibold appearance-none shadow-xl transition-all duration-300 hover:border-violet hover:shadow-2xl cursor-pointer"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%238b5cf6' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                    backgroundPosition: 'right 16px center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '20px'
                  }}
                >
                  <option value="" style={{ backgroundColor: 'white', color: '#6b7280', fontSize: '14px' }}>
                    Choose your dropoff location
                  </option>
                  <option value="jfk" style={{ backgroundColor: 'white', color: '#4c1d95', fontSize: '14px', fontWeight: '500' }}>
                    JFK Airport Lot
                  </option>
                  <option value="flushing" style={{ backgroundColor: 'white', color: '#4c1d95', fontSize: '14px', fontWeight: '500' }}>
                    Flushing Community Lot
                  </option>
                  <option value="midtown" style={{ backgroundColor: 'white', color: '#4c1d95', fontSize: '14px', fontWeight: '500' }}>
                    Midtown Business Lot
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Schedule Button */}
        <div className="flex justify-center my-12">
          <button
            onClick={handleSchedule}
            disabled={selectedVehicles.length === 0 || !startTime || !endTime || !dropoffLot}
            className="w-full px-6 py-3 sm:px-8 sm:py-4 bg-violet text-white rounded-xl font-semibold text-base sm:text-lg hover:bg-deep-violet disabled:opacity-50 disabled:cursor-not-allowed"
          >
            🚗 Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScheduleCarScreen;
