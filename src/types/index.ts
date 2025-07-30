// Driver Types
export interface Driver {
  id: string;
  name: string;
  email: string;
  phone: string;
  licenseNumber: string;
  rating: number;
  isOnline: boolean;
  currentLocation: Location;
  currentCar?: Car;
}

// Location Types
export interface Location {
  latitude: number;
  longitude: number;
  address?: string;
}

// Smart Lot Types
export interface SmartLot {
  id: string;
  name: string;
  location: Location;
  availableCars: Car[];
  totalSpaces: number;
  occupiedSpaces: number;
  isChargingStation: boolean;
}

// Car Types
export interface Car {
  id: string;
  model: string;
  licensePlate: string;
  batteryLevel: number;
  isAvailable: boolean;
  isCharging: boolean;
  location: Location;
  smartLotId?: string;
  lastMaintenance?: Date;
}

// Trip Types
export interface Trip {
  id: string;
  driverId: string;
  carId: string;
  pickupLocation: Location;
  dropoffLocation: Location;
  passengerName: string;
  passengerPhone: string;
  status: TripStatus;
  estimatedDuration: number;
  estimatedDistance: number;
  fare: number;
  createdAt: Date;
  startedAt?: Date;
  completedAt?: Date;
}

export type TripStatus = 'pending' | 'accepted' | 'in-progress' | 'completed' | 'cancelled';

// Shift Types
export interface Shift {
  id: string;
  driverId: string;
  startTime: Date;
  endTime: Date;
  dropArea: Location;
  status: ShiftStatus;
  earnings: number;
  trips: Trip[];
}

export type ShiftStatus = 'scheduled' | 'active' | 'completed' | 'cancelled';

// Alert Types
export interface TripAlert {
  id: string;
  tripId: string;
  type: 'trip_request';
  message: string;
  isRead: boolean;
  createdAt: Date;
}

export interface CarAlert {
  id: string;
  type: 'car_drop' | 'car_switch';
  message: string;
  targetLocation: Location;
  targetTime: Date;
  isRead: boolean;
  createdAt: Date;
}

// Notification Types
export interface Notification {
  id: string;
  type: 'trip_alert' | 'car_alert' | 'system';
  title: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
  actionUrl?: string;
}
