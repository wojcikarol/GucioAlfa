import Controller from '../interfaces/controller.interface';
import { Request, Response, NextFunction, Router } from 'express';
import CarsService from '../modules/services/cars.service';
import { ICars } from 'modules/models/cars.model';
import ParkingSlotService from '../modules/services/parkingSlot.service'; 

class CarsController implements Controller {
    public path = '/api/cars';
    public router = Router();
    private carsService = new CarsService();
    private parkingSlotService = new ParkingSlotService(); 

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, this.getAllCars);
        this.router.post(`${this.path}/test-data`, this.createTestData);
        this.router.post(`${this.path}`, this.createCar);
    }

    private getAllCars = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const cars = await this.carsService.getAllCars();
            res.status(200).json(cars);
        } catch (error) {
            console.error('Błąd podczas pobierania danych samochodów:', error);
            res.status(500).json({ error: 'Wystąpił błąd podczas pobierania samochodów.' });
        }
    };

    private createTestData = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const testData = await this.carsService.createTestData();
            res.status(201).json({ message: 'Dane testowe samochodów zostały dodane.', data: testData });
        } catch (error) {
            console.error('Błąd podczas tworzenia danych testowych samochodów:', error);
            res.status(500).json({ error: 'Wystąpił błąd podczas tworzenia danych testowych.' });
        }
    };

    private createCar = async (req: Request, res: Response, next: NextFunction) => {
        console.log('Wywołano createCar z danymi:', req.body);

        const { type, model, registration, parkingSlot } = req.body;


        if (!type || !model || !registration || !parkingSlot) {
            console.warn('Niekompletne dane:', req.body);
            return res.status(400).json({ error: 'Wszystkie pola (type, model, registration, parkingSlot) są wymagane.' });
        }

        try {
     
            const carData: Omit<ICars, 'carId'> = { type, model, registration };

          
            const car = await this.carsService.createCar(carData);

          
            const updatedSlot = await this.parkingSlotService.updateStatus(parkingSlot, true);
            if (!updatedSlot) {
                return res.status(404).json({ error: 'Miejsce parkingowe nie istnieje lub jest już zajęte.' });
            }

            console.log('Samochód zapisany i miejsce parkingowe zarezerwowane:', car);

            res.status(201).json({ message: 'Samochód został zapisany i miejsce parkingowe zarezerwowane.', data: car });
        } catch (error) {
            console.error('Błąd podczas zapisu samochodu lub rezerwacji miejsca parkingowego:', error);
            const status = error.message.includes('już istnieje') ? 400 : 500;
            res.status(status).json({ error: error.message });
        }
    };
}

export default CarsController;
