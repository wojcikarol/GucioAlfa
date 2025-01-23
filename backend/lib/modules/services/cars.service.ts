import { ICars } from '../models/cars.model';
import CarModel from '../schemas/cars.schema';
import ParkingSlotModel from '../schemas/parkingSlot.schema'; 

class CarsService {
    public getAllCars = async (): Promise<ICars[]> => {
        try {
            return await CarModel.find({});
        } catch (error) {
            throw new Error('Błąd podczas pobierania samochodów: ' + error.message);
        }
    };

    public createTestData = async (): Promise<ICars[]> => {
        const testCars: ICars[] = [
            { carId: '1', type: 'SUV', model: 'Model X', registration: 'ABC123' },
            { carId: '2', type: 'Sedan', model: 'Model S', registration: 'XYZ456' },
            { carId: '3', type: 'Hatchback', model: 'Model Y', registration: 'LMN789' },
            { carId: '4', type: 'Convertible', model: 'Model Z', registration: 'DEF012' },
            { carId: '5', type: 'Coupe', model: 'Model A', registration: 'GHI345' },
            { carId: '6', type: 'Truck', model: 'Model B', registration: 'JKL678' },
        ];

        try {
            await CarModel.insertMany(testCars);
            return testCars;
        } catch (error) {
            throw new Error('Błąd podczas tworzenia danych testowych: ' + error.message);
        }
    };

    public createCar = async (carData: Omit<ICars, 'carId'>): Promise<ICars> => {
        try {
            const lastCar = await CarModel.findOne({}, {}, { sort: { carId: -1 } });
            const nextCarId = lastCar ? (parseInt(lastCar.carId, 10) + 1).toString() : '1';

            const newCarData = { ...carData, carId: nextCarId };

            return await CarModel.create(newCarData);
        } catch (error) {
            throw new Error('Błąd podczas zapisywania samochodu: ' + error.message);
        }
    };

    public reserveParkingSlot = async (slotId: string): Promise<boolean> => {
        try {
            const updatedSlot = await ParkingSlotModel.findOneAndUpdate(
                { slotId, isOccupied: false },
                { isOccupied: true, lastUpdated: new Date() },
                { new: true }
            );
            return !!updatedSlot;
        } catch (error) {
            throw new Error(`Błąd podczas rezerwacji miejsca parkingowego: ${error.message}`);
        }
    };
}

export default CarsService;
