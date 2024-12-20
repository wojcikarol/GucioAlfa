import './DeviceState.css';
import Tile from "./shared/Tile"; // Zakładam, że Tile można ponownie użyć
import { useParams } from 'react-router-dom';
import { IParkingSlot } from "../models/parkingSlot.model";

interface ParkingStateProps {
    data: IParkingSlot[]; // Zmieniamy na dane parkingowe
}

function ParkingState({ data }: ParkingStateProps) {
    let { id } = useParams(); // Pobieramy ID miejsca parkingowego z parametrów URL

    return (
        <>
            {data && (
                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                    {data.map((slot) => {
                        const isActive = id !== undefined && slot.slotId === id; // Sprawdzamy, czy miejsce jest aktywne
                        const isOccupied = slot.isOccupied; // Sprawdzamy stan "zajęte" lub "dostępne"
                        return (
                            <div key={slot.slotId} className="tile-device">
                                <Tile
                                    id={slot.slotId}
                                    active={isActive}
                                    hasData={slot.lastUpdated !== undefined} // Zakładamy, że `lastUpdated` wskazuje na dane
                                    occupied={isOccupied} // Przekazujemy stan "zajętości"
                                    data={slot} // Przekazujemy dane do Tile
                                />
                            </div>
                        );
                    })}
                </div>
            )}
        </>
    );
}

export default ParkingState;
