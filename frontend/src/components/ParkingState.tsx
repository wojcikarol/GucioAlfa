import React from 'react';
import { IParkingSlot } from "../models/parkingSlot.model";
import './DeviceState.css'; // Upewnij się, że masz odpowiednie style w tym pliku

interface ParkingStateProps {
  data: IParkingSlot[];
}

function ParkingState({ data }: ParkingStateProps) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
      {data && data.map((slot) => {
        // Określamy, czy miejsce jest zajęte
        const isOccupied = slot.isOccupied;
        
        return (
          <div
            key={slot.slotId}
            className="tile-device"
          >
            <div
              className={`tile-device-inside ${isOccupied ? 'occupied' : 'available'}`}
            >
              <div>{slot.slotId}</div>
              <div>{isOccupied ? 'Occupied' : 'Available'}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ParkingState;
