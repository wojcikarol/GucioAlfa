import './App.css';
import Navbar from "./components/shared/Navbar";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./components/Home";
import ParkingStateView from './components/ParkingStateView';
import Login from './components/Login';
import SignUpForm from './components/SignUpForm';

const darkTheme = createTheme({ 
    palette: {
        mode: 'dark',
    },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline /> {/* Resets the baseline styles */}
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/parking-state" element={<ParkingStateView />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUpForm />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
