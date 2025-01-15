import ParkingSlotModel from '../schemas/parkingSlot.schema';
import { IParkingSlot } from 'modules/models/parking.model';

export default class ParkingSlotService {
    public async getAll() {
        try {
            const data = await ParkingSlotModel.find({}, { __v: 0 }).exec();
            return data;
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
            const testData: IParkingSlot[] = [
                { slotId: 'P001', isOccupied: true, lastUpdated: new Date() },
                { slotId: 'P002', isOccupied: false, lastUpdated: new Date() },
                { slotId: 'P003', isOccupied: true, lastUpdated: new Date() },
                { slotId: 'P004', isOccupied: false, lastUpdated: new Date() },
                { slotId: 'P005', isOccupied: false, lastUpdated: new Date() },
                { slotId: 'P006', isOccupied: false, lastUpdated: new Date() }
            ];
            const result = await ParkingSlotModel.insertMany(testData);
            return result;
        } catch (error) {
            throw new Error('Failed to create test data.');
        }
    }
}
