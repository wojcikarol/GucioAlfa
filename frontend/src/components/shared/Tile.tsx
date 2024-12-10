import { IParkingSlot } from "../../models/parkingSlot.model";

interface TileProps {
    id: string;
    active: boolean;
    hasData: boolean;
    data: IParkingSlot;
}

function Tile({ id, active, hasData, data }: TileProps) {
    return (
        <div style={{ border: active ? "2px solid green" : "1px solid gray", padding: "10px", margin: "5px" }}>
            <h3>{`Slot: ${id}`}</h3>
            <p>{`Occupied: ${hasData ? "Yes" : "No"}`}</p>
            <p>{`Last Updated: ${data.lastUpdated ? new Date(data.lastUpdated).toLocaleString() : "N/A"}`}</p>
        </div>
    );
}

export default Tile;
