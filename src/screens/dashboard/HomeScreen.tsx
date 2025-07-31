import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HomeScreen: React.FC = () => {
  const [isOnline, setIsOnline] = useState(false);
  const [currentAlertIndex, setCurrentAlertIndex] = useState(0);
  const navigate = useNavigate();

  // Mock data
  const driverStats = {
    todayEarnings: 125.50,
    totalTrips: 8,
    rating: 4.8,
    currentShift: {
      startTime: '09:00 AM',
      endTime: '05:00 PM',
      status: 'active'
    }
  };

  const recentAlerts = [
    { id: 2, type: 'car', message: 'Drop current car to charge and pick up fresh car at Midtown Lot after dropping AB', time: '15 min ago' }
  ];

  const alertCarousel = [
    {
      id: 1,
      type: 'booking',
      title: 'New Booking',
      message: '370 Park Avenue to Williamsburg',
      icon: (
        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.22.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
        </svg>
      ),
      color: 'text-blue-600'
    },
    {
      id: 2,
      type: 'car_drop',
      title: 'Car Drop Alert',
      message: 'Drop car at Williamsburg lot in 45 minutes',
      icon: (
        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
        </svg>
      ),
      color: 'text-orange-600'
    }
  ];

  const nextAlert = () => {
    setCurrentAlertIndex((prev) => (prev + 1) % alertCarousel.length);
  };

  const prevAlert = () => {
    setCurrentAlertIndex((prev) => (prev - 1 + alertCarousel.length) % alertCarousel.length);
  };

  const currentAlert = alertCarousel[currentAlertIndex];

  return (
    <div className="min-h-screen bg-pink-gradient">
      {/* Header */}
      <div className="bg-white shadow nav-violet">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-deep-violet">BroCabs Driver</h1>
              <p className="text-sm text-violet">Welcome back, John</p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => navigate('/profile')}
                className="w-10 h-10 bg-gradient-to-r from-pink-400 to-rose-500 hover:from-pink-500 hover:to-rose-600 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
              >
                <span className="text-sm">👤</span>
              </button>
              <button
                onClick={() => setIsOnline(!isOnline)}
                className={`px-4 py-2 rounded-full text-sm font-medium shadow-md transition-all duration-300 transform hover:scale-105 ${
                  isOnline 
                    ? 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700' 
                    : 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-white' : 'bg-white'}`}></div>
                  <span>{isOnline ? 'Go Offline' : 'Go Online'}</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="card-violet p-8">
            <h3 className="text-xl font-semibold text-deep-violet mb-6">Quick Actions</h3>
            <div className="space-y-4">
              <button
                onClick={() => navigate('/smart-lot-map')}
                className="w-full rounded-xl bg-gradient-to-r from-violet via-purple-600 to-deep-violet hover:from-deep-violet hover:via-purple-700 hover:to-violet shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
              >
                <div className="flex items-center justify-between p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                      <span className="text-2xl">🚗</span>
                    </div>
                    <span className="text-lg font-semibold text-white">Get a Car</span>
                  </div>
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">→</span>
                  </div>
                </div>
              </button>
              <button
                onClick={() => navigate('/earnings')}
                className="w-full rounded-xl bg-gradient-to-r from-emerald-500 via-teal-600 to-cyan-600 hover:from-emerald-600 hover:via-teal-700 hover:to-cyan-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
              >
                <div className="flex items-center justify-between p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                      <span className="text-2xl">💰</span>
                    </div>
                    <span className="text-lg font-semibold text-white">My Earnings</span>
                  </div>
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">→</span>
                  </div>
                </div>
              </button>
            </div>
          </div>

          <div className="card-violet p-6">
            <h3 className="text-lg font-semibold text-deep-violet mb-4">Today's Shift</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-violet">Status</span>
                <span className="text-sm font-medium text-green-600 bg-green-100 px-3 py-1 rounded-full">✅ Active</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-violet">Started</span>
                <span className="text-sm font-medium text-deep-violet">{driverStats.currentShift.startTime}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-violet">Ends</span>
                <span className="text-sm font-medium text-deep-violet">{driverStats.currentShift.endTime}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Current Trip Status */}
        <div className="card-violet mb-8 p-6">
          <h3 className="text-lg font-semibold text-deep-violet mb-4">Current Trip</h3>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-base font-medium text-deep-violet">🚶 Drop off AB</p>
              <p className="text-sm text-violet">270 Park Avenue</p>
            </div>
            <div className="text-right space-y-1">
              <span className="text-sm font-medium text-green-600 bg-green-100 px-3 py-1 rounded-full">🚗 On the way</span>
              <p className="text-xs text-violet">8 min away</p>
            </div>
          </div>
        </div>

        {/* Alert Carousel Card */}
        <div className="card-violet mb-8 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center flex-1">
              <div className="flex-shrink-0 bg-gradient-to-r from-violet to-deep-violet p-3 rounded-xl">
                <span className="text-xl">
                  {currentAlert.id === 1 ? '🚗' : '⏰'}
                </span>
              </div>
              <div className="ml-4 flex-1">
                <p className="text-base font-medium text-violet mb-1">{currentAlert.title}</p>
                <p className="text-sm text-deep-violet">{currentAlert.message}</p>
              </div>
            </div>
            <div className="flex flex-col items-center space-y-3 ml-4">
              <button
                onClick={prevAlert}
                className="w-8 h-8 bg-gradient-to-r from-violet to-purple-600 hover:from-purple-600 hover:to-violet rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
              >
                <span className="text-white text-sm">←</span>
              </button>
              <div className="flex space-x-1">
                {alertCarousel.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentAlertIndex 
                        ? 'bg-gradient-to-r from-violet to-purple-600' 
                        : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={nextAlert}
                className="w-8 h-8 bg-gradient-to-r from-violet to-purple-600 hover:from-purple-600 hover:to-violet rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
              >
                <span className="text-white text-sm">→</span>
              </button>
            </div>
          </div>
        </div>

        

        {/* Stats Cards at Bottom */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="card-violet p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-gradient-to-r from-violet to-deep-violet p-4 rounded-xl">
                <span className="text-2xl">🗺️</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-violet mb-1">Today's Trips</p>
                <p className="text-2xl font-bold text-deep-violet">{driverStats.totalTrips}</p>
              </div>
            </div>
          </div>

          <div className="card-violet p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-gradient-to-r from-violet to-deep-violet p-4 rounded-xl">
                <span className="text-2xl">⭐</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-violet mb-1">Your Rating</p>
                <p className="text-2xl font-bold text-deep-violet">{driverStats.rating}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
