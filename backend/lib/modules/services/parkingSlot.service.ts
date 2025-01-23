import ParkingSlotModel from '../schemas/parkingSlot.schema';
import { IParkingSlot } from '../models/parking.model';

export default class ParkingSlotService {
    public async getAll() {
        try {
            const data = await ParkingSlotModel.find({}, { __v: 0 }).exec();
            
            const sortedData = data
                .map((slot) => ({
                    ...slot.toObject(),
                    numericSlotId: parseInt(slot.slotId.substring(1), 10), 
                }))
                .sort((a, b) => a.numericSlotId - b.numericSlotId);
            
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

            for (let i = 1; i <= 25; i++) {
                const slotId = `P${i.toString().padStart(3, '0')}`; 
                const isOccupied = Math.random() < 0.5; 
                testData.push({
                    slotId,
                    isOccupied,
                    lastUpdated: new Date(),
                });
            }

            const result = await ParkingSlotModel.insertMany(testData);
            return result;
        } catch (error) {
            throw new Error('Failed to create test data.');
        }
    }

    public async getRemainingTime(slotId: string): Promise<number | null> {
        try {
            const slot = await ParkingSlotModel.findOne({ slotId }).exec();

            if (!slot || !slot.isOccupied || !slot.lastUpdated) {
                return null; 
            }

            const now = new Date();
            const timeElapsed = Math.floor((now.getTime() - slot.lastUpdated.getTime()) / (1000 * 60));
            const maxReservationTime = 60; 
            const remainingTime = maxReservationTime - timeElapsed;

            return remainingTime > 0 ? remainingTime : 0; 
        } catch (error) {
            throw new Error(`Error fetching remaining time for slot ${slotId}: ${error}`);
        }
    }
}
