// modules/schemas/parkingSlot.schema.ts
import { Schema, model } from 'mongoose';
import { IParkingSlot } from '../models/parking.model';

const ParkingSlotSchema = new Schema<IParkingSlot>({
    slotId: { type: String, required: true },  // Usunięto unikalność
    isOccupied: { type: Boolean, required: true },
    lastUpdated: { type: Date, default: Date.now }
});


export default model<IParkingSlot>('ParkingSlot', ParkingSlotSchema, 'parkingSlots');
