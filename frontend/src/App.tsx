import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/shared/Navbar';
import Home from './components/Home';
import ParkingStateView from './components/ParkingStateView';
import Login from './components/Login';
import SignUpForm from './components/SignUpForm';
import Reservation from './components/Reservation';
import ParkingSlotManagement from './components/ParkingSlotManagement';

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar />
        <Routes>
          {/* Main Page */}
          <Route path="/" element={<Home />} />
          {/* Parking State View */}
          <Route path="/parking-state" element={<ParkingStateView />} />
          {/* Login Page */}
          <Route path="/login" element={<Login />} />
          {/* Sign Up Page */}
          <Route path="/sign-up" element={<SignUpForm />} />
          {/* Reservation Page */}
          <Route path="/reservation" element={<Reservation />} />
          {/* Admin Parking Slot Management */}
          <Route path="/manage-parking-slots" element={<ParkingSlotManagement />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
