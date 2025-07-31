
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';

const ProfileScreen: React.FC = () => {
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useTheme();

  // Mock driver profile data
  const driverProfile = {
    name: "AB Kumar",
    bloodGroup: "A+",
    rating: 4.8,
    totalEarnings: 45672.50,
    totalTrips: 1247,
    yearsExperience: 3,
    phoneNumber: "+1 (555) 123-4567",
    email: "ab.kumar@brocabs.com",
    licenseNumber: "DL123456789",
    carType: "Honda Civic",
    joinDate: "March 2021",
    completionRate: 98.5,
    onTimeRate: 96.2
  };

  return (
    <div className="min-h-screen bg-pink-gradient">
      {/* Header */}
      <div className="bg-white shadow nav-violet rounded-2xl my-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <button
                onClick={() => navigate('/')}
                className="mr-4 p-2 text-violet hover:text-deep-violet"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h1 className="text-xl sm:text-2xl font-bold text-deep-violet">
                Driver Profile
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="theme-toggle w-12 h-12 flex items-center justify-center"
                title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              >
                <span className="text-xl">{isDarkMode ? "🌞" : "🌙"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 ml-8">
        
        {/* Profile Header Card */}
        <div className="card-violet mb-8 p-8">
          <div className="flex flex-col sm:flex-row items-center space-y-6 sm:space-y-0 sm:space-x-8">
            {/* Profile Picture */}
            <div className="flex-shrink-0">
              <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-r from-violet to-deep-violet rounded-full flex items-center justify-center border-4 border-lighter-violet">
                <span className="text-4xl sm:text-5xl text-white">👤</span>
              </div>
            </div>
            
            {/* Basic Info */}
            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-2xl sm:text-3xl font-bold text-deep-violet mb-2">
                {driverProfile.name}
              </h2>
              <div className="space-y-1">
                <p className="text-lg text-violet">Blood Group: <span className="font-semibold text-deep-violet">{driverProfile.bloodGroup}</span></p>
                <p className="text-lg text-violet">License: <span className="font-semibold text-deep-violet">{driverProfile.licenseNumber}</span></p>
                <p className="text-lg text-violet">Joined: <span className="font-semibold text-deep-violet">{driverProfile.joinDate}</span></p>
              </div>
            </div>
            
            {/* Rating Badge */}
            <div className="flex-shrink-0">
              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl p-4 text-center border-2 border-gray-300">
                <div className="text-3xl font-bold text-white">⭐</div>
                <div className="text-xl font-bold text-white">{driverProfile.rating}</div>
                <div className="text-sm text-white opacity-90">Rating</div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card-violet p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-gradient-to-r from-green-500 to-green-600 p-4 rounded-xl">
                <span className="text-2xl">💰</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-violet mb-1">Total Earnings</p>
                <p className="text-xl font-bold text-deep-violet">${driverProfile.totalEarnings.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="card-violet p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-gradient-to-r from-blue-500 to-blue-600 p-4 rounded-xl">
                <span className="text-2xl">🚗</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-violet mb-1">Total Trips</p>
                <p className="text-xl font-bold text-deep-violet">{driverProfile.totalTrips.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="card-violet p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-gradient-to-r from-purple-500 to-purple-600 p-4 rounded-xl">
                <span className="text-2xl">📅</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-violet mb-1">Experience</p>
                <p className="text-xl font-bold text-deep-violet">{driverProfile.yearsExperience} Years</p>
              </div>
            </div>
          </div>

          <div className="card-violet p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-gradient-to-r from-orange-500 to-orange-600 p-4 rounded-xl">
                <span className="text-2xl">✅</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-violet mb-1">Completion Rate</p>
                <p className="text-xl font-bold text-deep-violet">{driverProfile.completionRate}%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="card-violet mb-8 p-6">
          <h3 className="text-lg font-semibold text-deep-violet mb-6">Contact Information</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-violet to-deep-violet rounded-lg flex items-center justify-center">
                  <span className="text-xl text-white">📱</span>
                </div>
                <div>
                  <p className="text-sm text-violet">Phone Number</p>
                  <p className="text-base font-semibold text-deep-violet">{driverProfile.phoneNumber}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-violet to-deep-violet rounded-lg flex items-center justify-center">
                  <span className="text-xl text-white">📧</span>
                </div>
                <div>
                  <p className="text-sm text-violet">Email Address</p>
                  <p className="text-base font-semibold text-deep-violet">{driverProfile.email}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-violet to-deep-violet rounded-lg flex items-center justify-center">
                  <span className="text-xl text-white">🚙</span>
                </div>
                <div>
                  <p className="text-sm text-violet">Vehicle Type</p>
                  <p className="text-base font-semibold text-deep-violet">{driverProfile.carType}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-violet to-deep-violet rounded-lg flex items-center justify-center">
                  <span className="text-xl text-white">⏰</span>
                </div>
                <div>
                  <p className="text-sm text-violet">On-Time Rate</p>
                  <p className="text-base font-semibold text-deep-violet">{driverProfile.onTimeRate}%</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-lg p-6 border-2 border-gray-300 transition-all duration-300 hover:shadow-xl">
            <div className="flex items-center justify-center space-x-4">
              <span className="text-3xl">✏️</span>
              <span className="text-xl font-semibold">Edit Profile</span>
            </div>
          </button>
          
          <button className="w-full bg-green-500 hover:bg-green-600 text-white rounded-lg p-6 border-2 border-gray-300 transition-all duration-300 hover:shadow-xl">
            <div className="flex items-center justify-center space-x-4">
              <span className="text-3xl">📊</span>
              <span className="text-xl font-semibold">View Analytics</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
