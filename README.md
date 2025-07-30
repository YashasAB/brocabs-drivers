# BroCabs Drivers App

A comprehensive cab booking application for drivers with smart lot management, trip scheduling, and real-time alerts.

## Features

### 🚗 Smart Lot Management
- Interactive map showing nearby smart lots
- Real-time car availability at each lot
- Car selection and unlocking interface
- Charging station integration

### 📅 Shift Scheduling
- Book start and end times for shifts
- Select preferred drop areas on map
- Shift calendar and management
- Earnings estimation per shift

### 🚕 Trip Management
- Real-time trip alerts and notifications
- Accept/decline trip requests
- Trip details with pickup/dropoff locations
- Active trip navigation
- Trip history and earnings tracking

### 🔋 Car Management
- Car drop alerts at specific times
- Car switch notifications for charged vehicles
- Battery level monitoring
- Navigation to smart lots for car switches

### 🗺️ Navigation & Maps
- Turn-by-turn directions
- Real-time location tracking
- Smart lot navigation
- Route optimization

## Project Structure

```
src/
├── screens/
│   ├── auth/                 # Authentication screens
│   │   ├── LoginScreen.tsx
│   │   ├── RegistrationScreen.tsx
│   │   └── ForgotPasswordScreen.tsx
│   ├── dashboard/            # Main dashboard screens
│   │   ├── HomeScreen.tsx
│   │   ├── ProfileScreen.tsx
│   │   └── EarningsScreen.tsx
│   ├── smart-lot/           # Smart lot management
│   │   ├── SmartLotMapScreen.tsx
│   │   ├── LotDetailsScreen.tsx
│   │   └── CarSelectionScreen.tsx
│   ├── scheduling/          # Shift scheduling
│   │   ├── ScheduleShiftScreen.tsx
│   │   ├── ShiftCalendarScreen.tsx
│   │   ├── DropAreaSelectionScreen.tsx
│   │   └── ShiftDetailsScreen.tsx
│   ├── trips/              # Trip management
│   │   ├── TripAlertScreen.tsx
│   │   ├── TripAcceptanceScreen.tsx
│   │   ├── ActiveTripScreen.tsx
│   │   └── TripHistoryScreen.tsx
│   ├── car-management/     # Car alerts and management
│   │   ├── CarManagementScreen.tsx
│   │   ├── CarDropAlertScreen.tsx
│   │   ├── CarSwitchAlertScreen.tsx
│   │   └── LotNavigationScreen.tsx
│   └── navigation/         # Navigation screens
│       ├── NavigationScreen.tsx
│       └── MapViewScreen.tsx
├── components/             # Reusable components
├── types/                 # TypeScript type definitions
├── utils/                 # Utility functions
├── hooks/                 # Custom React hooks
├── context/               # React context providers
└── services/              # API services
```

## Key Screens Implemented

### ✅ Completed Screens
- **LoginScreen**: Driver authentication
- **RegistrationScreen**: New driver registration
- **ForgotPasswordScreen**: Password recovery
- **HomeScreen**: Main dashboard with stats and quick actions
- **SmartLotMapScreen**: Interactive map with smart lots
- **TripAlertScreen**: Trip request alerts and acceptance
- **ScheduleShiftScreen**: Shift booking with time and drop area selection
- **CarManagementScreen**: Car alerts and management interface

### 🚧 In Development
- All other screens have placeholder implementations
- Map integration with Leaflet
- Real-time notifications
- API integration

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser to `http://localhost:5173`

## Technology Stack

- **React 18** with TypeScript
- **Vite** for fast development
- **React Router** for navigation
- **Leaflet** for maps (planned)
- **Tailwind CSS** for styling

## Next Steps

1. Integrate real map functionality with Leaflet
2. Implement real-time notifications
3. Add API integration for backend services
4. Implement car unlocking functionality
5. Add real-time location tracking
6. Integrate with payment systems
7. Add offline support
8. Implement push notifications

## Mobile App Conversion

This web app is designed to be easily converted to React Native for iOS/Android deployment with minimal changes to the business logic and component structure.
