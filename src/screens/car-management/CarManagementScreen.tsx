import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface CarAlert {
  id: string;
  type: 'drop' | 'switch';
  message: string;
  targetLocation: string;
  targetTime: string;
  isUrgent: boolean;
  createdAt: Date;
}

const CarManagementScreen: React.FC = () => {
  const [currentCar] = useState({
    id: 'car-123',
    model: 'Tesla Model 3',
    licensePlate: 'ABC-123',
    batteryLevel: 65,
    location: 'Downtown Area'
  });

  const [carAlerts, setCarAlerts] = useState<CarAlert[]>([
    {
      id: '1',
      type: 'drop',
      message: 'Drop car at Central Lot by 5:00 PM',
      targetLocation: 'Central Downtown Lot',
      targetTime: '5:00 PM',
      isUrgent: true,
      createdAt: new Date()
    },
    {
      id: '2',
      type: 'switch',
      message: 'Switch to charged car at Airport Lot',
      targetLocation: 'Airport Terminal Lot',
      targetTime: '3:30 PM',
      isUrgent: false,
      createdAt: new Date()
    }
  ]);

  const navigate = useNavigate();

  const handleCarDrop = (alertId: string) => {
    // TODO: Implement car drop logic
    console.log('Dropping car for alert:', alertId);
    setCarAlerts(prev => prev.filter(alert => alert.id !== alertId));
  };

  const handleCarSwitch = (alertId: string) => {
    // TODO: Implement car switch logic
    console.log('Switching car for alert:', alertId);
    navigate(`/car-switch-alert`);
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
              <h1 className="text-xl font-semibold text-gray-900">Car Management</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Current Car Status */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Current Car</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Model</p>
              <p className="text-lg font-medium text-gray-900">{currentCar.model}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">License Plate</p>
              <p className="text-lg font-medium text-gray-900">{currentCar.licensePlate}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Battery Level</p>
              <div className="flex items-center">
                <div className="flex-1 bg-gray-200 rounded-full h-2 mr-2">
                  <div 
                    className={`h-2 rounded-full ${
                      currentCar.batteryLevel > 50 ? 'bg-green-500' : 
                      currentCar.batteryLevel > 20 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${currentCar.batteryLevel}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-900">{currentCar.batteryLevel}%</span>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-500">Location</p>
              <p className="text-lg font-medium text-gray-900">{currentCar.location}</p>
            </div>
          </div>
        </div>

        {/* Car Alerts */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Car Alerts</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {carAlerts.length === 0 ? (
              <div className="px-6 py-8 text-center">
                <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-gray-500">No car alerts at the moment</p>
              </div>
            ) : (
              carAlerts.map((alert) => (
                <div key={alert.id} className="px-6 py-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <div className={`w-3 h-3 rounded-full mr-2 ${
                          alert.type === 'drop' ? 'bg-red-500' : 'bg-blue-500'
                        }`}></div>
                        <span className={`text-sm font-medium ${
                          alert.type === 'drop' ? 'text-red-600' : 'text-blue-600'
                        }`}>
                          {alert.type === 'drop' ? 'Car Drop' : 'Car Switch'}
                        </span>
                        {alert.isUrgent && (
                          <span className="ml-2 px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                            Urgent
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-900 mb-2">{alert.message}</p>
                      <div className="flex items-center text-sm text-gray-500">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {alert.targetLocation}
                      </div>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {alert.targetTime}
                      </div>
                    </div>
                    <div className="flex flex-col space-y-2 ml-4">
                      {alert.type === 'drop' ? (
                        <button
                          onClick={() => handleCarDrop(alert.id)}
                          className="px-4 py-2 btn-violet text-sm font-medium"
                        >
                          Drop Car
                        </button>
                      ) : (
                        <button
                          onClick={() => handleCarSwitch(alert.id)}
                          className="px-4 py-2 btn-violet text-sm font-medium"
                        >
                          Switch Car
                        </button>
                      )}
                      <button
                        onClick={() => navigate(`/lot-navigation/${alert.id}`)}
                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md text-sm font-medium hover:bg-gray-300"
                      >
                        Navigate
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarManagementScreen;
