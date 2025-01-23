import React, { useState, useEffect } from "react";
import "./DeviceState.css";
import Tile from "./shared/Tile";
import { useParams } from "react-router-dom";
import { IParkingSlot } from "../models/parkingSlot.model";

interface ParkingStateProps {
  data: IParkingSlot[];
}

const ParkingState: React.FC<ParkingStateProps> = ({ data }) => {
  let { id } = useParams();

  const [remainingTime, setRemainingTime] = useState<Record<string, number>>({});

  // Fetch remaining time for a parking slot
  const fetchReservationTime = async (slotId: string) => {
    try {
      const response = await fetch(`/api/parking/${slotId}/remaining-time`);
      if (!response.ok) {
        throw new Error("Failed to fetch remaining time");
      }
      const result: { remainingTime: number } = await response.json();
      setRemainingTime((prev) => ({
        ...prev,
        [slotId]: result.remainingTime, // Remaining time in minutes
      }));
    } catch (error) {
      console.error(`Error fetching remaining time for slot ${slotId}:`, error);
    }
  };

  useEffect(() => {
    // Fetch remaining time for all occupied slots
    data.forEach((slot) => {
      if (slot.isOccupied) {
        fetchReservationTime(slot.slotId);
      }
    });
  }, [data]);

  return (
    <>
      {data && (
        <div className="tile-container">
          {data.map((slot) => {
            const isActive = id !== undefined && slot.slotId === id;
            const isOccupied = slot.isOccupied;
            const timeLeft = remainingTime[slot.slotId]; // Remaining time in minutes

            return (
              <div
                key={slot.slotId}
                className={`tile ${isOccupied ? "tile-occupied" : "tile-available"} ${
                  isActive ? "tile-active" : ""
                }`}
              >
                <Tile
                  id={slot.slotId}
                  active={isActive}
                  hasData={slot.lastUpdated !== undefined}
                  occupied={isOccupied}
                  data={slot}
                />
                {/* Display remaining time if slot is occupied */}
                {isOccupied && timeLeft !== undefined && (
                  <div className="reservation-info">
                    Occupied for {timeLeft} minutes
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default ParkingState;
