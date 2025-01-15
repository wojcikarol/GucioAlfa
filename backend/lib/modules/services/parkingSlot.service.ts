import ParkingSlotModel from '../schemas/parkingSlot.schema';
import { IParkingSlot } from '../models/parking.model';

export default class ParkingSlotService {
    public async getAll() {
        try {
            const data = await ParkingSlotModel.find({}, { __v: 0 }).exec();
            
            // Sort by slotId after removing the first two characters (P)
            const sortedData = data
                .map((slot) => ({
                    ...slot.toObject(),
                    numericSlotId: parseInt(slot.slotId.substring(1), 10), // Remove 'P' and convert to number
                }))
                .sort((a, b) => a.numericSlotId - b.numericSlotId) // Sort numerically
            
            return sortedData;
        } catch (error) {
            throw new Error(`Error fetching parking slots: ${error}`);
        }
    }

    public async get(slotId: string) {
        try {
            const data = await ParkingSlotModel.findOne({ slotId }).exec();
            return data;
        } catch (error) {
            throw new Error(`Error fetching slot: ${error}`);
        }
    }

    public async updateStatus(slotId: string, isOccupied: boolean) {
        try {
            const updatedSlot = await ParkingSlotModel.findOneAndUpdate(
                { slotId },
                { isOccupied, lastUpdated: new Date() },
                { new: true }
            ).exec();
            return updatedSlot;
        } catch (error) {
            throw new Error(`Error updating slot status: ${error}`);
        }
    }

    public async createTestData() {
        try {
            const testData: IParkingSlot[] = [];

            // Generate parking slots with IDs P001 to P025
            for (let i = 1; i <= 25; i++) {
                const slotId = `P${i.toString().padStart(3, '0')}`; // P001, P002, ..., P025
                const isOccupied = Math.random() < 0.5; // Randomly occupied (50% chance)
                testData.push({
                    slotId,
                    isOccupied,
                    lastUpdated: new Date(),
                });
            }

            // Insert the generated data into the database
            const result = await ParkingSlotModel.insertMany(testData);
            return result;
        } catch (error) {
            throw new Error('Failed to create test data.');
        }
    }
}
