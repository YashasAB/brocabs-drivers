import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface TripRequest {
  id: string;
  passengerName: string;
  pickupLocation: string;
  dropoffLocation: string;
  estimatedFare: number;
  estimatedDuration: number;
  estimatedDistance: number;
  createdAt: Date;
}

const TripAlertScreen: React.FC = () => {
  const [tripRequests, setTripRequests] = useState<TripRequest[]>([]);
  const [isOnline, setIsOnline] = useState(true);
  const navigate = useNavigate();

  // Mock trip requests
  useEffect(() => {
    const mockRequests: TripRequest[] = [
      {
        id: '1',
        passengerName: 'Sarah Johnson',
        pickupLocation: '123 Main St, Downtown',
        dropoffLocation: '456 Oak Ave, Midtown',
        estimatedFare: 25.50,
        estimatedDuration: 15,
        estimatedDistance: 3.2,
        createdAt: new Date()
      },
      {
        id: '2',
        passengerName: 'Mike Chen',
        pickupLocation: '789 Pine St, Uptown',
        dropoffLocation: '321 Elm St, Downtown',
        estimatedFare: 18.75,
        estimatedDuration: 12,
        estimatedDistance: 2.8,
        createdAt: new Date()
      }
    ];
    setTripRequests(mockRequests);
  }, []);

  const handleAcceptTrip = (tripId: string) => {
    // TODO: Implement trip acceptance logic
    console.log('Accepting trip:', tripId);
    navigate(`/trip-acceptance/${tripId}`);
  };

  const handleDeclineTrip = (tripId: string) => {
    // TODO: Implement trip decline logic
    console.log('Declining trip:', tripId);
    setTripRequests(prev => prev.filter(trip => trip.id !== tripId));
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
              <h1 className="text-xl font-semibold text-gray-900">Trip Alerts</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full mr-2 ${isOnline ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                <span className="text-sm text-gray-600">
                  {isOnline ? 'Online' : 'Offline'}
                </span>
              </div>
              <button
                onClick={() => setIsOnline(!isOnline)}
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  isOnline 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {isOnline ? 'Go Offline' : 'Go Online'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Trip Requests */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {tripRequests.length === 0 ? (
          <div className="text-center py-12">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Trip Requests</h3>
            <p className="text-gray-500">You\'ll receive trip alerts here when you\'re online</p>
          </div>
        ) : (
          <div className="space-y-4">
            {tripRequests.map((trip) => (
              <div key={trip.id} className="bg-white rounded-lg shadow p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
                        <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{trip.passengerName}</h3>
                        <p className="text-sm text-gray-500">
                          {new Date(trip.createdAt).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                        <span className="text-sm text-gray-600">{trip.pickupLocation}</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                        <span className="text-sm text-gray-600">{trip.dropoffLocation}</span>
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-3 gap-4">
                      <div>
                        <p className="text-xs text-gray-500">Fare</p>
                        <p className="text-sm font-medium text-gray-900">${trip.estimatedFare}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Duration</p>
                        <p className="text-sm font-medium text-gray-900">{trip.estimatedDuration} min</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Distance</p>
                        <p className="text-sm font-medium text-gray-900">{trip.estimatedDistance} km</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-2 ml-4">
                    <button
                      onClick={() => handleAcceptTrip(trip.id)}
                      className="px-4 py-2 btn-violet text-sm font-medium"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleDeclineTrip(trip.id)}
                      className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md text-sm font-medium hover:bg-gray-300"
                    >
                      Decline
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-around py-2">
            <button
              onClick={() => navigate('/')}
              className="flex flex-col items-center p-2 text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span className="text-xs mt-1">Home</span>
            </button>
            <button
              onClick={() => navigate('/smart-lot-map')}
              className="flex flex-col items-center p-2 text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-xs mt-1">Map</span>
            </button>
            <button
              onClick={() => navigate('/earnings')}
              className="flex flex-col items-center p-2 text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
              <span className="text-xs mt-1">Earnings</span>
            </button>
            <button
              onClick={() => navigate('/profile')}
              className="flex flex-col items-center p-2 text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="text-xs mt-1">Profile</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripAlertScreen;
