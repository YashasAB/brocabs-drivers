import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface ShiftBooking {
  startTime: string;
  endTime: string;
  dropArea: {
    latitude: number;
    longitude: number;
    address: string;
  } | null;
}

const ScheduleShiftScreen: React.FC = () => {
  const [booking, setBooking] = useState<ShiftBooking>({
    startTime: '',
    endTime: '',
    dropArea: null
  });
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const handleTimeChange = (field: 'startTime' | 'endTime', value: string) => {
    setBooking(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleDropAreaSelect = () => {
    // TODO: Open map for drop area selection
    setBooking(prev => ({
      ...prev,
      dropArea: {
        latitude: 37.7749,
        longitude: -122.4194,
        address: '123 Main St, Downtown'
      }
    }));
    setStep(3);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement shift booking logic
    console.log('Booking shift:', booking);
    navigate('/shift-calendar');
  };

  const timeSlots = [
    '06:00', '07:00', '08:00', '09:00', '10:00', '11:00',
    '12:00', '13:00', '14:00', '15:00', '16:00', '17:00',
    '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'
  ];

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
              <h1 className="text-xl font-semibold text-gray-900">Schedule Shift</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            <div className={`flex items-center ${step >= 1 ? 'text-indigo-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                step >= 1 ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-gray-300'
              }`}>
                1
              </div>
              <span className="ml-2 text-sm font-medium">Time</span>
            </div>
            <div className={`w-8 h-1 ${step >= 2 ? 'bg-indigo-600' : 'bg-gray-300'}`}></div>
            <div className={`flex items-center ${step >= 2 ? 'text-indigo-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                step >= 2 ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-gray-300'
              }`}>
                2
              </div>
              <span className="ml-2 text-sm font-medium">Drop Area</span>
            </div>
            <div className={`w-8 h-1 ${step >= 3 ? 'bg-indigo-600' : 'bg-gray-300'}`}></div>
            <div className={`flex items-center ${step >= 3 ? 'text-indigo-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                step >= 3 ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-gray-300'
              }`}>
                3
              </div>
              <span className="ml-2 text-sm font-medium">Confirm</span>
            </div>
          </div>
        </div>

        {/* Step 1: Time Selection */}
        {step === 1 && (
          <div className="max-w-md mx-auto">
            <h2 className="text-lg font-medium text-gray-900 mb-6">Select Shift Times</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Time
                </label>
                <select
                  value={booking.startTime}
                  onChange={(e) => handleTimeChange('startTime', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Select start time</option>
                  {timeSlots.map((time) => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  End Time
                </label>
                <select
                  value={booking.endTime}
                  onChange={(e) => handleTimeChange('endTime', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Select end time</option>
                  {timeSlots.map((time) => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>

              <button
                onClick={() => setStep(2)}
                disabled={!booking.startTime || !booking.endTime}
                className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Drop Area Selection */}
        {step === 2 && (
          <div className="max-w-md mx-auto">
            <h2 className="text-lg font-medium text-gray-900 mb-6">Select Drop Area</h2>
            
            <div className="space-y-6">
              <div className="bg-gray-100 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-4">
                  Choose your preferred drop-off area for the end of your shift. 
                  This helps optimize car distribution across smart lots.
                </p>
                <button
                  onClick={handleDropAreaSelect}
                  className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md font-medium"
                >
                  Select on Map
                </button>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md font-medium"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-md font-medium"
                >
                  Skip for Now
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Confirmation */}
        {step === 3 && (
          <div className="max-w-md mx-auto">
            <h2 className="text-lg font-medium text-gray-900 mb-6">Confirm Shift Details</h2>
            
            <div className="bg-white rounded-lg shadow p-6 space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Shift Times</h3>
                <p className="text-lg font-medium text-gray-900">
                  {booking.startTime} - {booking.endTime}
                </p>
              </div>

              {booking.dropArea && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Drop Area</h3>
                  <p className="text-lg font-medium text-gray-900">
                    {booking.dropArea.address}
                  </p>
                </div>
              )}

              <div className="border-t pt-4">
                <h3 className="text-sm font-medium text-gray-500">Estimated Earnings</h3>
                <p className="text-2xl font-bold text-green-600">$85 - $120</p>
                <p className="text-sm text-gray-500">Based on current demand</p>
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setStep(2)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md font-medium"
              >
                Back
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-md font-medium"
              >
                Confirm Shift
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScheduleShiftScreen;
