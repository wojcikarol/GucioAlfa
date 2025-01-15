import React from 'react';
import '../styles/Dashboard.css';


const Dashboard = () => {
  return (
    <div className="dashboard">
      <h1>Smart Parking Dashboard</h1>
      <div className="dashboard-content">
        <div className="tile login-section">
          <img src="/assets/car-image.png" alt="Car" />
          <button className="btn login-btn">Login</button>
          <button className="btn signup-btn">Sign Up</button>
        </div>
        <div className="tile chart-section">
          <h2>Parking Status</h2>
          <img src="/assets/parking-image.jpg" alt="Chart Placeholder" />
        </div>
        <div className="tile map-section">
          <iframe
            src="https://www.google.com/maps/embed?pb=..."
            width="400"
            height="300"
            style={{ border: 0 }}
           
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
