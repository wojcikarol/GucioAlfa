// modules/services/parkingSlot.service.ts
import ParkingSlotModel from '../schemas/parkingSlot.schema';
import { IParkingSlot } from 'modules/models/parking.model';

export default class ParkingSlotService {
    // Metoda do tworzenia nowego wpisu miejsca parkingowego
    public async createData(dataParams: IParkingSlot) {
        try {
            const result = await ParkingSlotModel.create(dataParams);
            console.log('Saved data:', result); // Logowanie zapisu danych
            return result;
        } catch (error) {
            console.error('Wystąpił błąd podczas tworzenia danych:', error);
            throw new Error('Wystąpił błąd podczas tworzenia danych');
        }
    }

    // Metoda do pobrania wszystkich miejsc parkingowych
    public async getAll() {
        try {
            const data = await ParkingSlotModel.find({}, { __v: 0 }).exec();
            console.log('Pobrane dane z bazy:', data);  // Logowanie danych
            return data;
        } catch (error) {
            console.error('Błąd podczas pobierania wszystkich miejsc parkingowych:', error);
            throw new Error(`Error fetching parking slots: ${error}`);
        }
    }

    // Metoda do zapytania o miejsce parkingowe na podstawie slotID
    public async query(slotID: string) {
        try {
            const data = await ParkingSlotModel.findOne({ slotId: slotID }, { __v: 0 }).exec();
            console.log('Query result:', data);  // Logowanie wyniku zapytania
            return data;
        } catch (error) {
            console.error('Query failed:', error);
            throw new Error(`Query failed: ${error}`);
        }
    }

    // Metoda do pobierania pojedynczego miejsca parkingowego na podstawie slotId
    public async get(slotId: string) {
        try {
            const data = await ParkingSlotModel.findOne({ slotId: slotId }).exec();
            console.log('Fetched data for slotId:', slotId, data);  // Logowanie pobranych danych
            return data;
        } catch (error) {
            console.error('Error fetching slot:', error);
            throw new Error(`Error fetching slot: ${error}`);
        }
    }

    // Metoda do tworzenia przykładowych danych
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
            console.log('Dane testowe zostały dodane:', result); // Dodano bardziej szczegółowe logowanie
            return result;
        } catch (error) {
            console.error('Błąd podczas tworzenia danych testowych:', error);
            throw new Error('Nie udało się utworzyć danych testowych.');
        }
    }
    
}
