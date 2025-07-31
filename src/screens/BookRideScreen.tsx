
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

interface Location {
  latitude: number;
  longitude: number;
  address: string;
}

const BookRideScreen: React.FC = () => {
  const navigate = useNavigate();
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const pickupMarkerRef = useRef<any>(null);
  const dropoffMarkerRef = useRef<any>(null);

  const [pickupLocation, setPickupLocation] = useState<Location | null>(null);
  const [dropoffLocation, setDropoffLocation] = useState<Location | null>(null);
  const [pickupTime, setPickupTime] = useState('');
  const [isSelectingPickup, setIsSelectingPickup] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showPrice, setShowPrice] = useState(false);

  // Generate time options (20min to 120min from now in 20min intervals)
  const generateTimeOptions = () => {
    const options = [];
    const now = new Date();
    
    for (let i = 20; i <= 120; i += 20) {
      const futureTime = new Date(now.getTime() + i * 60000);
      const timeString = futureTime.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
      options.push({
        value: futureTime.toISOString(),
        label: `${timeString} (${i} min from now)`
      });
    }
    
    return options;
  };

  const timeOptions = generateTimeOptions();

  useEffect(() => {
    if (mapRef.current && !mapInstanceRef.current) {
      console.log('Initializing customer booking map...');
      
      // Initialize map centered on NYC
      const map = (window as any).L.map(mapRef.current).setView([40.7589, -73.9851], 12);
      
      (window as any).L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);

      mapInstanceRef.current = map;

      // Add click handler for map
      map.on('click', (e: any) => {
        const lat = e.latlng.lat;
        const lng = e.latlng.lng;
        
        if (isSelectingPickup) {
          // Remove existing pickup marker
          if (pickupMarkerRef.current) {
            map.removeLayer(pickupMarkerRef.current);
          }
          
          // Add new pickup marker (green)
          pickupMarkerRef.current = (window as any).L.marker([lat, lng], {
            icon: (window as any).L.divIcon({
              className: 'custom-marker',
              html: '<div style="background-color: #10B981; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);">P</div>',
              iconSize: [30, 30],
              iconAnchor: [15, 15]
            })
          }).addTo(map);
          
          setPickupLocation({
            latitude: lat,
            longitude: lng,
            address: `${lat.toFixed(4)}, ${lng.toFixed(4)}`
          });
        } else {
          // Remove existing dropoff marker
          if (dropoffMarkerRef.current) {
            map.removeLayer(dropoffMarkerRef.current);
          }
          
          // Add new dropoff marker (red)
          dropoffMarkerRef.current = (window as any).L.marker([lat, lng], {
            icon: (window as any).L.divIcon({
              className: 'custom-marker',
              html: '<div style="background-color: #EF4444; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);">D</div>',
              iconSize: [30, 30],
              iconAnchor: [15, 15]
            })
          }).addTo(map);
          
          setDropoffLocation({
            latitude: lat,
            longitude: lng,
            address: `${lat.toFixed(4)}, ${lng.toFixed(4)}`
          });
        }
      });

      console.log('Customer booking map initialized');
    }
  }, [isSelectingPickup]);

  const handleBookRide = async () => {
    if (!pickupLocation || !dropoffLocation || !pickupTime) return;
    
    setIsLoading(true);
    
    // Mock loading delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsLoading(false);
    setShowPrice(true);
  };

  const confirmBooking = () => {
    // Mock booking confirmation
    alert('Ride booked successfully! A driver will be assigned shortly.');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-pink-gradient">
      {/* Header */}
      <div className="bg-white shadow nav-violet rounded-2xl mx-2 my-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <button
                onClick={() => navigate('/')}
                className="mr-3 sm:mr-4 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-violet to-deep-violet hover:from-deep-violet hover:to-violet rounded-lg flex items-center justify-center text-white text-sm sm:text-lg"
              >
                <span>←</span>
              </button>
              <div>
                <h1 className="text-base sm:text-lg lg:text-xl font-bold text-deep-violet">Book a Ride</h1>
                <p className="text-xs sm:text-sm text-violet">Hello, Daivik! 👋</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Location Selection */}
        <div className="card-violet p-6 mb-6">
          <h2 className="text-lg font-semibold text-deep-violet mb-4">Select Locations</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <button
              onClick={() => setIsSelectingPickup(true)}
              className={`p-4 rounded-lg border-2 transition-all ${
                isSelectingPickup 
                  ? 'border-green-500 bg-green-50' 
                  : 'border-gray-300 bg-white'
              }`}
            >
              <div className="flex items-center">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold mr-3">
                  P
                </div>
                <div className="text-left">
                  <div className="font-medium text-deep-violet">Pickup Location</div>
                  <div className="text-sm text-violet">
                    {pickupLocation ? pickupLocation.address : 'Tap map to select'}
                  </div>
                </div>
              </div>
            </button>

            <button
              onClick={() => setIsSelectingPickup(false)}
              className={`p-4 rounded-lg border-2 transition-all ${
                !isSelectingPickup 
                  ? 'border-red-500 bg-red-50' 
                  : 'border-gray-300 bg-white'
              }`}
            >
              <div className="flex items-center">
                <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold mr-3">
                  D
                </div>
                <div className="text-left">
                  <div className="font-medium text-deep-violet">Dropoff Location</div>
                  <div className="text-sm text-violet">
                    {dropoffLocation ? dropoffLocation.address : 'Tap map to select'}
                  </div>
                </div>
              </div>
            </button>
          </div>

          <div className="text-sm text-violet mb-4">
            Currently selecting: <span className="font-medium">
              {isSelectingPickup ? 'Pickup Location (Green)' : 'Dropoff Location (Red)'}
            </span>
          </div>
        </div>

        {/* Interactive Map */}
        <div className="card-violet p-4 mb-6">
          <h3 className="text-lg font-semibold text-deep-violet mb-4">Tap on the map to set locations</h3>
          <div 
            ref={mapRef} 
            className="w-full h-80 rounded-lg border-2 border-gray-300"
            style={{ minHeight: '320px' }}
          />
        </div>

        {/* Pickup Time Selection */}
        <div className="card-violet p-6 mb-6">
          <h3 className="text-lg font-semibold text-deep-violet mb-4">Select Pickup Time</h3>
          <select
            value={pickupTime}
            onChange={(e) => setPickupTime(e.target.value)}
            className="w-full p-4 border-2 border-gray-300 rounded-lg focus:ring-3 focus:ring-violet/20 focus:border-violet text-deep-violet font-medium"
          >
            <option value="">Choose pickup time</option>
            {timeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Book Ride Button */}
        <div className="card-violet p-6">
          <div className="flex items-center justify-between">
            <div>
              {showPrice && (
                <div className="text-right">
                  <div className="text-sm text-violet">Estimated Fare</div>
                  <div className="text-2xl font-bold text-deep-violet">$60.00</div>
                </div>
              )}
            </div>
            
            <div className="flex space-x-4">
              {showPrice ? (
                <button
                  onClick={confirmBooking}
                  className="px-8 py-4 bg-green-500 hover:bg-green-600 text-white rounded-xl font-semibold text-lg"
                >
                  🚗 Confirm Booking
                </button>
              ) : (
                <button
                  onClick={handleBookRide}
                  disabled={!pickupLocation || !dropoffLocation || !pickupTime || isLoading}
                  className="px-8 py-4 bg-violet hover:bg-deep-violet text-white rounded-xl font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Calculating...</span>
                    </>
                  ) : (
                    <>
                      <span>📍</span>
                      <span>Get Price</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookRideScreen;
