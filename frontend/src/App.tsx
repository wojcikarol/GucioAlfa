import './App.css'; 
import Navbar from "./components/shared/Navbar";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from "./components/Home";
import ParkingStateView from './components/ParkingStateView';
import Login from './components/Login';
import SignUpForm from './components/SignUpForm';
import CarReservation from './components/CarReservation';
import ManageUsers from './components/ManageUsers';
import ManageParkingSlots from './components/ManageParkingSlots';
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';

const darkTheme = createTheme({ 
    palette: {
        mode: 'dark',
    },
});

interface UserToken {
  isAdmin: boolean;
}

function App() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode<UserToken>(token);
        setIsAdmin(decoded.isAdmin);
      } catch (error) {
        console.error('Invalid token:', error);
        setIsAdmin(false);
      }
    }
  }, []);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline /> {/* Resets the baseline styles */}
      <Router>
        <Navbar />
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/parking-state" element={<ParkingStateView />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUpForm />} />
          <Route path="/reservation" element={<CarReservation />} />
          
          {/* Admin-protected routes */}
          <Route 
            path="/manage-parking-slots" 
            element={isAdmin ? <ManageParkingSlots /> : <Navigate to="/" replace />} 
          />
          <Route 
            path="/manage-users" 
            element={isAdmin ? <ManageUsers /> : <Navigate to="/" replace />} 
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
