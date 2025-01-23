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
import ManageUsers from './components/ManageUsers';

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
   
          <Route path="/" element={<Home />} />
        
          <Route path="/parking-state" element={<ParkingStateView />} />
      
          <Route path="/login" element={<Login />} />
        
          <Route path="/sign-up" element={<SignUpForm />} />
       
          <Route path="/reservation" element={<Reservation />} />
         
          <Route path="/manage-parking-slots" element={<ParkingSlotManagement />} />
          <Route path='/manage-users' element={<ManageUsers />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
