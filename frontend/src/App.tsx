import './App.css'
import Navbar from "./components/shared/Navbar";
import {ThemeProvider, createTheme} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from "./components/Home";
import ParkingState from './components/ParkingState';
import ParkingStateView from './components/ParkingStateView';

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    },
});

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/parking-state" element={<ParkingStateView />} />
      </Routes>
    </Router>
  );
}

export default App;
