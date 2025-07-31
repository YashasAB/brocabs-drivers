import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import ErrorBoundary from './components/ErrorBoundary';
import './App.css';

// Authentication Screens
import LoginScreen from './screens/auth/LoginScreen';
import RegistrationScreen from './screens/auth/RegistrationScreen';
import ForgotPasswordScreen from './screens/auth/ForgotPasswordScreen';

// Dashboard Screens
import LandingScreen from './screens/LandingScreen';
import HomeScreen from './screens/dashboard/HomeScreen';
import ProfileScreen from './screens/dashboard/ProfileScreen';
import EarningsScreen from './screens/dashboard/EarningsScreen';

// Smart Lot Screens
import SmartLotMapScreen from './screens/smart-lot/SmartLotMapScreen';
import LotDetailsScreen from './screens/smart-lot/LotDetailsScreen';
import CarSelectionScreen from './screens/smart-lot/CarSelectionScreen';

// Scheduling Screens
import ScheduleShiftScreen from './screens/scheduling/ScheduleShiftScreen';
import ScheduleCarScreen from './screens/scheduling/ScheduleCarScreen';
import ShiftCalendarScreen from './screens/scheduling/ShiftCalendarScreen';
import DropAreaSelectionScreen from './screens/scheduling/DropAreaSelectionScreen';
import ShiftDetailsScreen from './screens/scheduling/ShiftDetailsScreen';

// Trip Management Screens
import TripAlertScreen from './screens/trips/TripAlertScreen';
import TripAcceptanceScreen from './screens/trips/TripAcceptanceScreen';
import ActiveTripScreen from './screens/trips/ActiveTripScreen';
import TripHistoryScreen from './screens/trips/TripHistoryScreen';

// Car Management Screens
import CarDropAlertScreen from './screens/car-management/CarDropAlertScreen';
import CarSwitchAlertScreen from './screens/car-management/CarSwitchAlertScreen';
import CarManagementScreen from './screens/car-management/CarManagementScreen';
import LotNavigationScreen from './screens/car-management/LotNavigationScreen';

// Navigation Screens
import NavigationScreen from './screens/navigation/NavigationScreen';
import MapViewScreen from './screens/navigation/MapViewScreen';

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <Router>
          <div className="App">
          <Routes>
            {/* Authentication Routes */}
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegistrationScreen />} />
            <Route path="/forgot-password" element={<ForgotPasswordScreen />} />

            {/* Dashboard Routes */}
            <Route path="/" element={<LandingScreen />} />
            <Route path="/driver-home" element={<HomeScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/earnings" element={<EarningsScreen />} />

            {/* Smart Lot Routes */}
            <Route path="/smart-lot-map" element={<SmartLotMapScreen />} />
            <Route path="/lot-details/:lotId" element={<LotDetailsScreen />} />
            <Route path="/car-selection/:lotId" element={<CarSelectionScreen />} />

            {/* Scheduling Routes */}
            <Route path="/schedule-shift" element={<ScheduleShiftScreen />} />
            <Route path="/schedule-car/:lotId" element={<ScheduleCarScreen />} />
            <Route path="/shift-calendar" element={<ShiftCalendarScreen />} />
            <Route path="/drop-area-selection" element={<DropAreaSelectionScreen />} />
            <Route path="/shift-details/:shiftId" element={<ShiftDetailsScreen />} />

            {/* Trip Management Routes */}
            <Route path="/trip-alert" element={<TripAlertScreen />} />
            <Route path="/trip-acceptance" element={<TripAcceptanceScreen />} />
            <Route path="/active-trip" element={<ActiveTripScreen />} />
            <Route path="/trip-history" element={<TripHistoryScreen />} />

            {/* Car Management Routes */}
            <Route path="/car-drop-alert" element={<CarDropAlertScreen />} />
            <Route path="/car-switch-alert" element={<CarSwitchAlertScreen />} />
            <Route path="/car-management" element={<CarManagementScreen />} />
            <Route path="/lot-navigation/:lotId" element={<LotNavigationScreen />} />

            {/* Navigation Routes */}
            <Route path="/navigation" element={<NavigationScreen />} />
            <Route path="/map-view" element={<MapViewScreen />} />
          </Routes>
          </div>
        </Router>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;