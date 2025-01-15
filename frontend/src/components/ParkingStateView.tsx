import React, { useEffect, useState } from "react";
import ParkingState from "./ParkingState";
import Loader from "./shared/Loader";
import { IParkingSlot } from "../models/parkingSlot.model";
import serverConfig from "../server-config";
import "./DeviceState.css";

function ParkingStateView(): JSX.Element {
  const [parkingSlots, setParkingSlots] = useState<IParkingSlot[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${serverConfig.serverUrl}data/`) 
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setParkingSlots(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching parking slots:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (!parkingSlots) {
    return (
      <div style={{ padding: "40px", textAlign: "center", color: "#333" }}>
        <h2>No parking data available.</h2>
      </div>
    );
  }

  return (
    <div style={{ padding: "40px", backgroundColor: "#f0f2f5", minHeight: "100vh" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Parking State</h1>
      <ParkingState data={parkingSlots} />
    </div>
  );
}

export default ParkingStateView;
