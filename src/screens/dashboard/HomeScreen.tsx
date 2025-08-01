import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

const HomeScreen: React.FC = () => {
  const [isOnline, setIsOnline] = useState(false);
  const [currentAlertIndex, setCurrentAlertIndex] = useState(0);
  const navigate = useNavigate();
  const { isDarkMode, toggleTheme } = useTheme();

  const handleOnlineToggle = () => {
    setIsOnline(!isOnline);
  };

  // Mock driver profile data
  const driverProfile = {
    name: "AB Kumar",
    bloodGroup: "A+",
    rating: 4.8,
    totalEarnings: 45672.5,
    totalTrips: 1247,
    yearsExperience: 3,
    phoneNumber: "+1 (555) 123-4567",
    email: "ab.kumar@brocabs.com",
    licenseNumber: "DL123456789",
    carType: "Honda Civic",
    joinDate: "March 2021",
    completionRate: 98.5,
    onTimeRate: 96.2,
  };

  // Mock data
  const driverStats = {
    todayEarnings: 125.5,
    totalTrips: 8,
    rating: driverProfile.rating,
    currentShift: {
      startTime: "09:00 AM",
      endTime: "05:00 PM",
      status: "active",
    },
  };

  const alertCarousel = [
    {
      id: 1,
      type: "booking",
      title: "New Booking",
      message: "370 Park Avenue to Williamsburg",
      icon: (
        <svg
          className="w-8 h-8 text-white"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.22.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z" />
        </svg>
      ),
      color: "text-blue-600",
    },
    {
      id: 2,
      type: "car_drop",
      title: "Car Drop Alert",
      message: "Drop car at Williamsburg lot in 70 minutes",
      icon: (
        <svg
          className="w-8 h-8 text-white"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
        </svg>
      ),
      color: "text-orange-600",
    },
  ];

  const nextAlert = () => {
    setCurrentAlertIndex((prev) => (prev + 1) % alertCarousel.length);
  };

  const prevAlert = () => {
    setCurrentAlertIndex(
      (prev) => (prev - 1 + alertCarousel.length) % alertCarousel.length,
    );
  };

  const currentAlert = alertCarousel[currentAlertIndex];

  return (
    <div className="min-h-screen bg-pink-gradient">
      {/* Header */}
      <div className="bg-white shadow nav-violet rounded-2xl my-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-deep-violet">
                BroCabs Driver
              </h1>
              <p className="text-xs sm:text-sm text-violet">
                Welcome back, {driverProfile.name}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="theme-toggle w-12 h-12 flex items-center justify-center"
                title={
                  isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"
                }
              >
                <span className="text-xl">{isDarkMode ? "🌞" : "🌙"}</span>
              </button>
              <button
                onClick={() => navigate("/")}
                className="mr-4 w-12 h-12 bg-gray-500 hover:bg-gray-600 rounded-lg border-2 border-gray-300 flex items-center justify-center text-white"
              >
                <span className="text-xl">🏠</span>
              </button>
              <button
                onClick={() => navigate("/profile")}
                className="w-12 h-12 bg-blue-500 hover:bg-blue-600 rounded-lg flex items-center justify-center text-white border-2 border-gray-300"
              >
                <span className="text-xl">👤</span>
              </button>
              <button
                onClick={handleOnlineToggle}
                className={`px-4 py-2 rounded-lg text-sm font-medium border-2 border-gray-300 ${
                  !isOnline
                    ? "bg-green-500 hover:bg-green-600 text-white"
                    : "bg-red-500 hover:bg-red-600 text-white"
                }`}
              >
                <div className="flex items-center space-x-2">
                  <span className="text-lg">{isOnline ? "🔴" : "🟢"}</span>
                  <span className="text-sm">
                    {isOnline ? "Go Offline" : "Go Online"}
                  </span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 ml-8">
        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="card-violet p-8 min-h-[30vh] flex flex-col justify-center">
            <h3 className="text-lg sm:text-xl font-semibold text-deep-violet mb-6 sm:mb-8">
              Quick Actions
            </h3>
            <div className="space-y-6 flex-1 flex flex-col justify-center">
              {!isOnline && (
                <button
                  onClick={() => navigate("/smart-lot-map")}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-lg p-8 border-2 border-gray-300"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <span className="text-4xl">🚗</span>
                      <span className="text-xl font-semibold">
                        Schedule Car
                      </span>
                    </div>
                    <span className="text-3xl">→</span>
                  </div>
                </button>
              )}
              <button
                onClick={() => navigate("/earnings")}
                className="w-full bg-green-500 hover:bg-green-600 text-white rounded-lg p-8 border-2 border-gray-300"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <span className="text-4xl">💰</span>
                    <span className="text-xl font-semibold">Earnings</span>
                  </div>
                  <span className="text-3xl">→</span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Current Trip Status - Only show when online */}
        {isOnline && (
          <>
            {/* Alert Carousel Card */}
            <div className="card-violet mb-8 p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center flex-1">
                  <div className="flex-shrink-0 bg-gradient-to-r from-violet to-deep-violet p-3 rounded-xl">
                    <span className="text-xl">
                      {currentAlert.id === 1 ? "🚗" : "⏰"}
                    </span>
                  </div>
                  <div className="ml-3 sm:ml-4 flex-1">
                    <p className="text-sm sm:text-base font-medium text-violet mb-1">
                      {currentAlert.title}
                    </p>
                    <p className="text-xs sm:text-sm text-deep-violet">
                      {currentAlert.message}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-center space-y-4 ml-4">
                  <button
                    onClick={prevAlert}
                    className="w-10 h-10 bg-purple-500 hover:bg-purple-600 rounded-lg border-2 border-gray-300 flex items-center justify-center text-white"
                  >
                    <span className="text-lg">←</span>
                  </button>
                  <div className="flex space-x-2 my-3">
                    {alertCarousel.map((_, index) => (
                      <div
                        key={index}
                        className={`w-3 h-3 rounded-full ${
                          index === currentAlertIndex
                            ? "bg-purple-500"
                            : "bg-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <button
                    onClick={nextAlert}
                    className="w-10 h-10 bg-purple-500 hover:bg-purple-600 rounded-lg border-2 border-gray-300 flex items-center justify-center text-white"
                  >
                    <span className="text-lg">→</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="card-violet mb-8 p-2">
              <h3 className="text-base sm:text-lg font-semibold text-deep-violet mb-3 sm:mb-4">
                Current Trip
              </h3>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm sm:text-base font-medium text-deep-violet">
                    🚶 Drop off Daivik
                  </p>
                  <p className="text-xs sm:text-sm text-violet">
                    270 Park Avenue
                  </p>
                </div>
                <div className="text-right space-y-1">
                  <span className="text-xs sm:text-sm font-medium text-green-600 bg-green-100 px-2 sm:px-3 py-1 rounded-full">
                    🚗 On the way
                  </span>
                  <p className="text-xs text-violet">8 min away</p>
                </div>
              </div>
            </div>

            {/* Today's Shift */}
            <div className="card-violet p-6 rounded-2xl mb-8">
              <h3 className="text-base sm:text-lg font-semibold text-deep-violet mb-3 sm:mb-4">
                Today's Shift
              </h3>
              <div className="space-y-6">
                <div className="flex justify-between items-center py-3">
                  <span className="text-xs sm:text-sm text-violet">Status</span>
                  <span className="text-xs sm:text-sm font-medium text-green-600 bg-green-100 px-2 sm:px-3 py-1 rounded-full">
                    ✅ Active
                  </span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-xs sm:text-sm text-violet">
                    Started
                  </span>
                  <span className="text-xs sm:text-sm font-medium text-deep-violet">
                    {driverStats.currentShift.startTime}
                  </span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-xs sm:text-sm text-violet">Ends</span>
                  <span className="text-xs sm:text-sm font-medium text-deep-violet">
                    {driverStats.currentShift.endTime}
                  </span>
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
                  <div className="ml-3 sm:ml-4">
                    <p className="text-xs sm:text-sm font-medium text-violet mb-1">
                      Today's Trips
                    </p>
                    <p className="text-xl sm:text-2xl font-bold text-deep-violet">
                      {driverStats.totalTrips}
                    </p>
                  </div>
                </div>
              </div>

              <div className="card-violet p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-gradient-to-r from-violet to-deep-violet p-4 rounded-xl">
                    <span className="text-2xl">⭐</span>
                  </div>
                  <div className="ml-3 sm:ml-4">
                    <p className="text-xs sm:text-sm font-medium text-violet mb-1">
                      Your Rating
                    </p>
                    <p className="text-xl sm:text-2xl font-bold text-deep-violet">
                      {driverStats.rating}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default HomeScreen;
