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
      icon: '🚗',
      color: 'text-blue-600'
    },
    {
      id: 2,
      type: 'car_drop',
      title: 'Car Drop Alert',
      message: 'Drop car at Williamsburg lot in 45 minutes',
      icon: '⏰',
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
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/profile')}
                className="p-2 text-violet hover:text-deep-violet"
                style={{ backgroundColor: 'pink', borderRadius: '50%' }}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>
              <button
                onClick={() => setIsOnline(!isOnline)}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  isOnline 
                    ? 'status-online' 
                    : 'status-offline'
                }`}
              >
                {isOnline ? 'Online' : 'Offline'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="card-violet p-8">
            <h3 className="text-xl font-semibold text-deep-violet mb-6">Quick Actions</h3>
            <div className="space-y-6">
              <button
                onClick={() => navigate('/smart-lot-map')}
                className="w-full flex items-center justify-between p-8 border-2 border-violet rounded-xl bg-gradient-to-r from-violet to-deep-violet hover:from-deep-violet hover:to-violet text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <div className="flex items-center space-x-4">
                  <span className="text-3xl">🚗</span>
                  <span className="text-xl font-semibold">Schedule Car</span>
                </div>
                <span className="text-2xl">→</span>
              </button>
              <button
                onClick={() => navigate('/earnings')}
                className="w-full flex items-center justify-between p-8 border-2 border-violet rounded-xl bg-gradient-to-r from-violet to-deep-violet hover:from-deep-violet hover:to-violet text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <div className="flex items-center space-x-4">
                  <span className="text-3xl">💰</span>
                  <span className="text-xl font-semibold">View Earnings</span>
                </div>
                <span className="text-2xl">→</span>
              </button>
            </div>
          </div>

          <div className="card-violet p-8">
            <h3 className="text-xl font-semibold text-deep-violet mb-6">Current Shift</h3>
            <div className="space-y-6">
              <div className="flex justify-between items-center py-3 border-b border-violet border-opacity-30">
                <span className="text-base text-violet font-medium">Status</span>
                <span className="text-base font-semibold text-green-600 bg-green-100 px-3 py-1 rounded-full">Active</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-violet border-opacity-30">
                <span className="text-base text-violet font-medium">Start Time</span>
                <span className="text-base font-semibold text-deep-violet">{driverStats.currentShift.startTime}</span>
              </div>
              <div className="flex justify-between items-center py-3">
                <span className="text-base text-violet font-medium">End Time</span>
                <span className="text-base font-semibold text-deep-violet">{driverStats.currentShift.endTime}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Current Trip Status */}
        <div className="card-violet mb-12">
          <div className="px-8 py-6 border-b border-violet border-opacity-30">
            <h3 className="text-xl font-semibold text-deep-violet">Current Trip</h3>
          </div>
          <div className="px-8 py-8">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-lg font-semibold text-deep-violet">Drop off AB</p>
                <p className="text-base text-violet">270 Park Avenue</p>
              </div>
              <div className="text-right space-y-2">
                <span className="text-base font-semibold text-green-600 bg-green-100 px-4 py-2 rounded-full">In Progress</span>
                <p className="text-sm text-violet">ETA: 8 min</p>
              </div>
            </div>
          </div>
        </div>

        {/* Alert Carousel Card */}
        <div className="card-violet mb-12 p-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center flex-1">
              <div className="flex-shrink-0 bg-gradient-to-r from-violet to-deep-violet p-4 rounded-full">
                <span className="text-3xl">{currentAlert.icon}</span>
              </div>
              <div className="ml-6 flex-1">
                <p className="text-lg font-semibold text-violet mb-2">{currentAlert.title}</p>
                <p className="text-base text-deep-violet">{currentAlert.message}</p>
              </div>
            </div>
            <div className="flex flex-col items-center space-y-3 ml-6">
              <button
                onClick={prevAlert}
                className="p-3 hover:bg-pink-300 transition-colors"
                style={{ backgroundColor: 'pink', borderRadius: '50%' }}
              >
                <svg className="w-5 h-5" fill="none" stroke="black" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div className="flex space-x-2">
                {alertCarousel.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentAlertIndex ? 'bg-violet' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={nextAlert}
                className="p-3 hover:bg-pink-300 transition-colors"
                style={{ backgroundColor: 'pink', borderRadius: '50%' }}
              >
                <svg className="w-5 h-5" fill="none" stroke="black" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Recent Alerts */}
        <div className="card-violet mb-12">
          <div className="px-8 py-6 border-b border-violet border-opacity-30">
            <h3 className="text-xl font-semibold text-deep-violet">Recent Alerts</h3>
          </div>
          <div className="divide-y divide-violet divide-opacity-30">
            {recentAlerts.map((alert) => (
              <div key={alert.id} className="px-8 py-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1 space-y-2">
                    <p className="text-base font-semibold text-deep-violet leading-relaxed">{alert.message}</p>
                    <p className="text-sm text-violet">{alert.time}</p>
                  </div>
                  <button className="text-violet hover:text-deep-violet text-sm font-semibold px-6 py-3 bg-pink-200 rounded-xl hover:bg-pink-300 transition-colors ml-6">
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Cards at Bottom */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="card-violet p-8">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-gradient-to-r from-violet to-deep-violet p-6 rounded-2xl">
                <svg className="text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ width: '60px', height: '60px' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>
              <div className="ml-6">
                <p className="text-lg font-semibold text-violet mb-2">Total Trips</p>
                <p className="text-4xl font-bold text-deep-violet">{driverStats.totalTrips}</p>
              </div>
            </div>
          </div>

          <div className="card-violet p-8">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-gradient-to-r from-violet to-deep-violet p-6 rounded-2xl">
                <svg className="text-white" fill="currentColor" viewBox="0 0 24 24" style={{ width: '60px', height: '60px' }}>
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
              <div className="ml-6">
                <p className="text-lg font-semibold text-violet mb-2">Rating</p>
                <p className="text-4xl font-bold text-deep-violet">{driverStats.rating}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
