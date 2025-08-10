
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTheme } from "../../../context/ThemeContext";
import "../../../hordu-theme.css";

const HorduScheduleAutoScreen: React.FC = () => {
  const navigate = useNavigate();
  const { lotId } = useParams<{ lotId: string }>();
  const { isDarkMode, toggleTheme } = useTheme();
  
  const [selectedAuto, setSelectedAuto] = useState<string>("");
  const [currentAutoIndex, setCurrentAutoIndex] = useState(0);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [showEarnings, setShowEarnings] = useState(false);
  const [isLoadingEarnings, setIsLoadingEarnings] = useState(false);

  const lotNames: { [key: string]: string } = {
    "indiranagar": "Indiranagar Charging Hub",
    "brigade-road": "Brigade Road Auto Station", 
    "koramangala": "Koramangala EV Hub"
  };

  const availableAutos = [
    {
      id: "HDU-BLR-001",
      name: "Hordu EV Auto",
      battery: 95,
      range: 142,
      status: "Ready",
      availableTime: "9:00 AM"
    },
    {
      id: "HDU-BLR-002", 
      name: "Hordu EV Auto",
      battery: 87,
      range: 130,
      status: "Ready",
      availableTime: "8:30 AM"
    },
    {
      id: "HDU-BLR-003",
      name: "Hordu EV Auto", 
      battery: 45,
      range: 67,
      status: "Charging",
      availableTime: "10:30 AM"
    }
  ];

  const currentAuto = availableAutos[currentAutoIndex];
  const selectedAutoData = availableAutos.find(auto => auto.id === selectedAuto);

  // Effect to handle loading and showing earnings when dropoff location is selected
  useEffect(() => {
    if (dropoffLocation && selectedAuto && startTime && endTime) {
      setIsLoadingEarnings(true);
      setShowEarnings(false);
      
      // Simulate loading for 2 seconds
      const timer = setTimeout(() => {
        setIsLoadingEarnings(false);
        setShowEarnings(true);
      }, 2000);
      
      return () => clearTimeout(timer);
    } else {
      setShowEarnings(false);
      setIsLoadingEarnings(false);
    }
  }, [dropoffLocation, selectedAuto, startTime, endTime]);

  const handleSchedule = () => {
    if (selectedAuto && startTime && endTime && dropoffLocation) {
      alert("Auto scheduled successfully! You'll receive a confirmation shortly.");
      navigate("/hordu/driver-home");
    }
  };

  const selectCurrentAuto = () => {
    setSelectedAuto(currentAuto.id);
  };

  const nextAuto = () => {
    setCurrentAutoIndex((prev) => (prev + 1) % availableAutos.length);
  };

  const prevAuto = () => {
    setCurrentAutoIndex((prev) => (prev - 1 + availableAutos.length) % availableAutos.length);
  };

  // Generate time options starting from auto availability time with 30-minute intervals
  const generateStartTimeOptions = () => {
    if (!selectedAutoData) return [];
    
    const availableTime = selectedAutoData.availableTime;
    const [time, period] = availableTime.split(' ');
    const [hours, minutes = 0] = time.split(':').map(Number);
    
    let startHour = hours;
    if (period === 'PM' && hours !== 12) startHour += 12;
    if (period === 'AM' && hours === 12) startHour = 0;
    
    const options = [];
    // Generate 30-minute intervals starting from availability time for 2 hours
    for (let i = 0; i <= 4; i++) {
      const totalMinutes = minutes + (i * 30);
      const hour = startHour + Math.floor(totalMinutes / 60);
      const minute = totalMinutes % 60;
      
      if (hour <= 23) {
        const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
        const period = hour >= 12 ? 'PM' : 'AM';
        const value = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        const display = `${displayHour}:${minute.toString().padStart(2, '0')} ${period}`;
        options.push({ value, display });
      }
    }
    return options;
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
                className="mr-4 p-2 text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
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
        {/* Auto Selection Carousel */}
        <div className="hordu-card p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-6">
            Select Your Auto
          </h3>
          
          <div className="relative">
            {/* Auto Display */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-2xl p-6 border-2 border-purple-200 dark:border-purple-700 mb-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <span className="text-3xl mr-4">🛺</span>
                  <div>
                    <h4 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                      {currentAuto.name}
                    </h4>
                    <p className="hordu-text-muted text-lg">{currentAuto.id}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  currentAuto.status === "Ready" 
                    ? "hordu-status-good" 
                    : "hordu-status-bad"
                }`}>
                  {currentAuto.status}
                </span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{currentAuto.battery}%</div>
                  <p className="text-sm hordu-text-muted">Battery</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold hordu-gradient-text">
                    <span className="hordu-distance">{currentAuto.range}</span>
                  </div>
                  <p className="text-sm hordu-text-muted">Range</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold hordu-gradient-text">{currentAuto.availableTime}</div>
                  <p className="text-sm hordu-text-muted">Available From</p>
                </div>
              </div>

              {/* Navigation Controls */}
              <div className="flex justify-between items-center">
                <button
                  onClick={prevAuto}
                  className="hordu-btn-primary"
                  disabled={availableAutos.length <= 1}
                >
                  ← Previous
                </button>
                
                <button
                  onClick={selectCurrentAuto}
                  disabled={currentAuto.status !== "Ready"}
                  className="hordu-btn-primary px-8 py-3 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {selectedAuto === currentAuto.id ? "✓ Selected" : "Select Auto"}
                </button>
                
                <button
                  onClick={nextAuto}
                  className="hordu-btn-primary"
                  disabled={availableAutos.length <= 1}
                >
                  Next →
                </button>
              </div>
            </div>

            {/* Auto Counter */}
            <div className="text-center text-sm hordu-text-muted">
              Auto {currentAutoIndex + 1} of {availableAutos.length}
            </div>
          </div>
        </div>

        {/* Schedule Form - Only show if auto is selected */}
        {selectedAuto && (
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
                  {generateStartTimeOptions().map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.display}
                    </option>
                  ))}
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
                  disabled={!startTime}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
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
        )}

        {/* Loading Bar for Earnings Calculation */}
        {isLoadingEarnings && (
          <div className="hordu-card p-6 mb-6">
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
              Calculating Earnings...
            </h3>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-4">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full animate-pulse" style={{width: '100%'}}></div>
            </div>
            <p className="text-center hordu-text-muted">Analyzing route and demand patterns...</p>
          </div>
        )}

        {/* Estimated Earnings - Only show after loading is complete */}
        {showEarnings && (
          <div className="hordu-card p-6 mb-6">
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
              Estimated Earnings
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
            </div>
          </div>
        )}

        {/* Schedule Button */}
        <button
          onClick={handleSchedule}
          disabled={!selectedAuto || !startTime || !endTime || !dropoffLocation}
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
