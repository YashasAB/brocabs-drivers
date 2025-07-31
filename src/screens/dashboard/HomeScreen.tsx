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
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/profile')}
                className="w-12 h-12 bg-gradient-to-r from-pink-400 to-rose-500 hover:from-pink-500 hover:to-rose-600 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-0.5 flex items-center justify-center"
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>
              <button
                onClick={() => setIsOnline(!isOnline)}
                className={`px-6 py-3 rounded-full text-sm font-bold tracking-wide shadow-lg transition-all duration-300 transform hover:scale-105 ${
                  isOnline 
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-green-200 hover:shadow-green-300 hover:from-green-600 hover:to-emerald-700' 
                    : 'bg-gradient-to-r from-gray-500 to-slate-600 text-white shadow-gray-200 hover:shadow-gray-300 hover:from-gray-600 hover:to-slate-700'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-white' : 'bg-gray-300'}`}></div>
                  <span>{isOnline ? 'Online' : 'Offline'}</span>
                </div>
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
                className="w-full group relative overflow-hidden rounded-2xl bg-gradient-to-r from-violet via-purple-600 to-deep-violet hover:from-deep-violet hover:via-purple-700 hover:to-violet shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] hover:-translate-y-1"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative flex items-center justify-between p-8">
                  <div className="flex items-center space-x-6">
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.22.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
                      </svg>
                    </div>
                    <span className="text-2xl font-bold text-white tracking-wide">Schedule Car</span>
                  </div>
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:bg-white/30 transition-colors duration-300">
                    <svg className="w-6 h-6 text-white transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </button>
              <button
                onClick={() => navigate('/earnings')}
                className="w-full group relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-600 to-cyan-600 hover:from-emerald-600 hover:via-teal-700 hover:to-cyan-700 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] hover:-translate-y-1"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative flex items-center justify-between p-8">
                  <div className="flex items-center space-x-6">
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 2.83-3.12 3.16z"/>
                      </svg>
                    </div>
                    <span className="text-2xl font-bold text-white tracking-wide">View Earnings</span>
                  </div>
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:bg-white/30 transition-colors duration-300">
                    <svg className="w-6 h-6 text-white transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
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
              <div className="flex-shrink-0 bg-gradient-to-r from-violet to-deep-violet p-4 rounded-2xl shadow-lg">
                {currentAlert.icon}
              </div>
              <div className="ml-6 flex-1">
                <p className="text-lg font-semibold text-violet mb-2">{currentAlert.title}</p>
                <p className="text-base text-deep-violet">{currentAlert.message}</p>
              </div>
            </div>
            <div className="flex flex-col items-center space-y-4 ml-6">
              <button
                onClick={prevAlert}
                className="w-10 h-10 bg-gradient-to-r from-violet to-purple-600 hover:from-purple-600 hover:to-violet rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-0.5 flex items-center justify-center"
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div className="flex space-x-2">
                {alertCarousel.map((_, index) => (
                  <div
                    key={index}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentAlertIndex 
                        ? 'bg-gradient-to-r from-violet to-purple-600 scale-125 shadow-lg' 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={nextAlert}
                className="w-10 h-10 bg-gradient-to-r from-violet to-purple-600 hover:from-purple-600 hover:to-violet rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-0.5 flex items-center justify-center"
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                  <button className="bg-gradient-to-r from-violet to-purple-600 hover:from-purple-600 hover:to-violet text-white text-sm font-bold px-8 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-0.5 ml-6">
                    <div className="flex items-center space-x-2">
                      <span>View</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </div>
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
