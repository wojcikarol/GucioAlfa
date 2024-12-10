import { IParkingSlot } from "../models/parkingSlot.model";

export function sortElemsBySlotId(data: IParkingSlot[]) {
    return data.sort((a, b) => {
        return a.slotId.localeCompare(b.slotId);
    });
}
