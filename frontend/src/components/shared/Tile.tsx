import { IParkingSlot } from "../../models/parkingSlot.model";

interface TileProps {
    id: string;
    active: boolean;
    hasData: boolean;
    occupied: boolean;
    data: IParkingSlot;
}

function Tile({ id, active, hasData, occupied, data }: TileProps) {
    return (
        <div
            className={`tile ${active ? 'tile-active' : ''} ${occupied ? 'tile-occupied' : 'tile-available'}`}
            title={`Slot ID: ${id}`}
        >
            <p>{`Slot ${id}`}</p>
            <p>{occupied ? 'Occupied' : 'Available'}</p>
            {hasData && (
                <small>
                    Last Updated: {data.lastUpdated ? new Date(data.lastUpdated).toLocaleString() : "No data available"}
                </small>
            )}
            {/* Informacja o rezerwacji pod kafelkiem */}
            <div className="reservation-info">
                {occupied ? 'This spot is reserved' : 'Reserve this spot'}
            </div>
        </div>
    );
}

export default Tile;
