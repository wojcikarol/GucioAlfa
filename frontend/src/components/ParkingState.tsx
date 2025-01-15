import React, { useState } from "react";
import "./DeviceState.css";
import Tile from "./shared/Tile";
import { useParams } from "react-router-dom";
import { IParkingSlot } from "../models/parkingSlot.model";

interface ParkingStateProps {
    data: IParkingSlot[];
}

const ParkingState: React.FC<ParkingStateProps> = ({ data }) => {
    let { id } = useParams(); // Pobieramy ID miejsca parkingowego z parametrów URL

    // Dodajemy stan dla rezerwacji
    const [reservations, setReservations] = useState<{ [key: string]: string }>({});

    // Obsługa dodawania rezerwacji
    const handleReservation = (slotId: string, duration: string) => {
        setReservations((prev) => ({
            ...prev,
            [slotId]: duration, // Dodajemy rezerwację dla danego slotu
        }));
    };

    return (
        <>
            <h1 className="parking-state-header">Parking State</h1>
            {data && (
                <div className="tile-container">
                    {data.map((slot) => {
                        const isActive = id !== undefined && slot.slotId === id; // Sprawdzamy, czy miejsce jest aktywne
                        const isOccupied = slot.isOccupied; // Sprawdzamy stan "zajęte" lub "dostępne"
                        const reservationDuration = reservations[slot.slotId]; // Pobieramy czas rezerwacji dla slotu

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
                                {/* Wyświetlenie informacji o rezerwacji */}
                                {reservationDuration && (
                                    <div className="reservation-info">
                                        Reserved for {reservationDuration} minutes
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
