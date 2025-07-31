
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const BookRideScreen: React.FC = () => {
  const navigate = useNavigate();
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const pickupMarkerRef = useRef<L.Marker | null>(null);
  const dropoffMarkerRef = useRef<L.Marker | null>(null);
  const boundaryRef = useRef<L.Polygon | null>(null);

  const [pickupLocation, setPickupLocation] = useState<{ lat: number; lng: number; address: string } | null>(null);
  const [dropoffLocation, setDropoffLocation] = useState<{ lat: number; lng: number; address: string } | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPrice, setShowPrice] = useState(false);
  const [mapMode, setMapMode] = useState<'pickup' | 'dropoff' | 'normal'>('normal');

  // NYC boundary coordinates (adjusted to start near EWR)
  const nycBoundary = [
    [40.477399, -74.170000], // Southwest (moved right to near EWR)
    [40.477399, -73.700009], // Southeast
    [40.917577, -73.700009], // Northeast
    [40.917577, -74.170000], // Northwest (moved right to near EWR)
    [40.477399, -74.170000]  // Close the polygon
  ];

  // Generate time options (20 minutes to 120 minutes in 20-minute intervals)
  const generateTimeOptions = () => {
    const options = [];
    const now = new Date();
    
    for (let i = 20; i <= 120; i += 20) {
      const time = new Date(now.getTime() + i * 60000);
      const timeString = time.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      });
      options.push({
        value: time.toISOString(),
        display: `${timeString} (${i} min from now)`
      });
    }
    
    return options;
  };

  // Initialize map
  useEffect(() => {
    if (mapRef.current && !mapInstanceRef.current) {
      console.log('Initializing customer booking map...');
      
      // Clear any existing content
      mapRef.current.innerHTML = '';
      
      const map = L.map(mapRef.current, {
        zoomControl: true,
        attributionControl: true
      }).setView([40.7128, -73.9352], 11);
      
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19
      }).addTo(map);

      // Add NYC boundary
      const boundary = L.polygon(nycBoundary, {
        color: '#8B5CF6',
        weight: 2,
        opacity: 0.8,
        fillColor: '#8B5CF6',
        fillOpacity: 0.1
      }).addTo(map);

      boundaryRef.current = boundary;
      mapInstanceRef.current = map;
      
      // Force map to resize after a short delay
      setTimeout(() => {
        if (mapInstanceRef.current) {
          mapInstanceRef.current.invalidateSize();
        }
      }, 100);

      console.log('Customer booking map initialized');
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
        pickupMarkerRef.current = null;
        dropoffMarkerRef.current = null;
        boundaryRef.current = null;
      }
    };
  }, []);

  // Handle map clicks
  useEffect(() => {
    if (mapInstanceRef.current && boundaryRef.current) {
      const map = mapInstanceRef.current;
      const boundary = boundaryRef.current;
      
      const handleMapClick = (e: L.LeafletMouseEvent) => {
        const { lat, lng } = e.latlng;
        
        // Check if click is within NYC boundary
        const point = L.latLng(lat, lng);
        const isInBounds = boundary.getBounds().contains(point);
        
        if (!isInBounds) {
          alert('Please select a location within the NYC area (highlighted in purple).');
          return;
        }

        if (!pickupLocation) {
          // Set pickup location first
          if (pickupMarkerRef.current) {
            map.removeLayer(pickupMarkerRef.current);
          }
          
          const pickupIcon = L.divIcon({
            className: 'custom-marker',
            html: '<div style="background-color: #10B981; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>',
            iconSize: [20, 20],
            iconAnchor: [10, 10]
          });
          
          const marker = L.marker([lat, lng], { icon: pickupIcon }).addTo(map);
          pickupMarkerRef.current = marker;
          
          setPickupLocation({
            lat,
            lng,
            address: `${lat.toFixed(4)}, ${lng.toFixed(4)}`
          });
          
        } else if (!dropoffLocation) {
          // Set dropoff location second
          if (dropoffMarkerRef.current) {
            map.removeLayer(dropoffMarkerRef.current);
          }
          
          const dropoffIcon = L.divIcon({
            className: 'custom-marker',
            html: '<div style="background-color: #EF4444; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>',
            iconSize: [20, 20],
            iconAnchor: [10, 10]
          });
          
          const marker = L.marker([lat, lng], { icon: dropoffIcon }).addTo(map);
          dropoffMarkerRef.current = marker;
          
          setDropoffLocation({
            lat,
            lng,
            address: `${lat.toFixed(4)}, ${lng.toFixed(4)}`
          });
        }
      };

      map.on('click', handleMapClick);

      return () => {
        map.off('click', handleMapClick);
      };
    }
  }, [pickupLocation, dropoffLocation]);

  const handleResetLocations = () => {
    // Reset pickup
    if (pickupMarkerRef.current && mapInstanceRef.current) {
      mapInstanceRef.current.removeLayer(pickupMarkerRef.current);
      pickupMarkerRef.current = null;
    }
    setPickupLocation(null);

    // Reset dropoff
    if (dropoffMarkerRef.current && mapInstanceRef.current) {
      mapInstanceRef.current.removeLayer(dropoffMarkerRef.current);
      dropoffMarkerRef.current = null;
    }
    setDropoffLocation(null);
    setMapMode('normal');
  };

  const handleBookRide = async () => {
    if (!pickupLocation || !dropoffLocation || !selectedTime) {
      alert('Please select pickup location, dropoff location, and pickup time.');
      return;
    }

    setIsLoading(true);
    
    // Mock loading delay
    setTimeout(() => {
      setIsLoading(false);
      setShowPrice(true);
    }, 2000);
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
              <h1 className="text-xl font-semibold text-gray-900">Book a Ride</h1>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-violet rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">D</span>
              </div>
              <span className="text-sm font-medium text-gray-700">Daivik</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Location Selection */}
        <div className="bg-white rounded-xl p-4 mb-6 shadow-lg">
          <h2 className="text-lg font-semibold text-deep-violet mb-4">Select Locations</h2>
          
          <div className="space-y-3">
            {/* Pickup Location */}
            <div className="flex items-center space-x-2 p-3 rounded-lg border-2 border-green-500 bg-green-50">
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium flex-1">
                {pickupLocation ? `Pickup: ${pickupLocation.address}` : 'Pickup Location'}
              </span>
            </div>

            {/* Dropoff Location */}
            <div className={`flex items-center space-x-2 p-3 rounded-lg border-2 transition-all ${
              dropoffLocation 
                ? 'border-red-500 bg-red-50' 
                : pickupLocation 
                ? 'border-red-300 bg-red-25' 
                : 'border-gray-200 bg-gray-50'
            }`}>
              <div className={`w-4 h-4 rounded-full ${
                dropoffLocation ? 'bg-red-500' : pickupLocation ? 'bg-red-300' : 'bg-gray-300'
              }`}></div>
              <span className="text-sm font-medium flex-1">
                {dropoffLocation ? `Dropoff: ${dropoffLocation.address}` : 'Dropoff Location'}
              </span>
            </div>
          </div>

          {/* Map Instructions */}
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              {!pickupLocation 
                ? '📍 Tap on the map to set your pickup location first' 
                : !dropoffLocation 
                ? '📍 Tap on the map again to set your dropoff location'
                : '✓ Both locations selected. Choose your pickup time below.'}
            </p>
          </div>
        </div>

        {/* Map */}
        <div className="bg-white rounded-xl p-4 mb-6 shadow-lg">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-deep-violet">Interactive Map</h3>
            {(pickupLocation || dropoffLocation) && (
              <button
                onClick={handleResetLocations}
                className="px-3 py-1 text-sm bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Reset
              </button>
            )}
          </div>
          <div 
            ref={mapRef} 
            className="w-full h-64 sm:h-80 rounded-lg border border-gray-200"
            style={{ 
              minHeight: '256px',
              zIndex: 1,
              position: 'relative'
            }}
          ></div>
          <p className="text-xs text-gray-500 mt-2">
            Purple highlighted area shows available service region (NYC area)
          </p>
        </div>

        {/* Time Selection */}
        <div className="bg-white rounded-xl p-4 mb-6 shadow-lg">
          <h3 className="text-lg font-semibold text-deep-violet mb-4">Select Pickup Time</h3>
          <div className="relative">
            <select
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="w-full p-4 pr-12 border-2 border-violet/30 rounded-xl focus:ring-3 focus:ring-violet/20 focus:border-violet text-deep-violet font-medium appearance-none bg-white cursor-pointer"
            >
              <option value="">Choose pickup time</option>
              {generateTimeOptions().map((option) => (
                <option key={option.value} value={option.value}>
                  {option.display}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
              <svg className="w-5 h-5 text-violet" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          {selectedTime && (
            <div className="mt-3 p-3 bg-violet/10 rounded-lg">
              <p className="text-sm text-deep-violet font-medium">
                Selected: {generateTimeOptions().find(opt => opt.value === selectedTime)?.display}
              </p>
            </div>
          )}
        </div>

        {/* Book Button and Price */}
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              {showPrice && (
                <div className="mb-4">
                  <span className="text-2xl font-bold text-green-600">$60</span>
                  <span className="text-sm text-gray-500 ml-2">Estimated fare</span>
                </div>
              )}
              
              <button
                onClick={handleBookRide}
                disabled={!pickupLocation || !dropoffLocation || !selectedTime || isLoading}
                className="w-full px-6 py-4 bg-violet text-white rounded-xl font-semibold text-lg hover:bg-deep-violet disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Calculating fare...
                  </>
                ) : (
                  '🚗 Book Now'
                )}
              </button>
            </div>
            
            {showPrice && (
              <div className="ml-4 text-right">
                <div className="text-2xl font-bold text-green-600">$60</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookRideScreen;
