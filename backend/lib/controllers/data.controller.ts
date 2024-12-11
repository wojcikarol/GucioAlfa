// controllers/parkingSlot.controller.ts
import Controller from '../interfaces/controller.interface';
import { Request, Response, NextFunction, Router } from 'express';
import { checkSlotIdParam } from '../middlewares/checkSlotIdParam.middleware';
import ParkingSlotService from '../modules/services/parkingSlot.service';

class ParkingSlotController implements Controller {
    public path = '/api/data';
    public router = Router();
    private parkingSlotService = new ParkingSlotService();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}/:id`, checkSlotIdParam, this.getParkingSlot);
        this.router.get(`${this.path}`, this.getAllParkingSlots);  // Nowy endpoint do pobrania wszystkich miejsc
        this.router.post(`${this.path}/test-data`, this.createTestData);  // Endpoint do generowania danych testowych
    }

    // Pobieranie pojedynczego miejsca parkingowego na podstawie slotId
    private getParkingSlot = async (request: Request, response: Response, next: NextFunction) => {
    const { id } = request.params;
    console.log('Zapytanie o slotId:', id);

    try {
        const data = await this.parkingSlotService.get(id);
        console.log('Dane pobrane z bazy:', data);

        if (data) {
            response.status(200).json(data);
        } else {
            response.status(404).json({ message: `Miejsce parkingowe o ID ${id} nie zostało znalezione.` });
        }
    } catch (error) {
        console.error(`Błąd podczas pobierania danych o miejscu parkingowym: ${error.message}`);
        response.status(500).json({ error: 'Wystąpił błąd podczas pobierania danych.' });
    }
};


    // Pobieranie wszystkich miejsc parkingowych
    private getAllParkingSlots = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const data = await this.parkingSlotService.getAll();  // Wywołanie metody getAll
            response.status(200).json(data);  // Zwracamy wszystkie miejsca parkingowe
        } catch (error) {
            console.error('Błąd podczas pobierania wszystkich miejsc parkingowych:', error);
            response.status(500).json({ error: 'Wystąpił błąd podczas pobierania danych.' });
        }
    };

    // Tworzenie danych testowych
    private createTestData = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const testData = await this.parkingSlotService.createTestData();  // Wywołanie metody createTestData
            response.status(201).json({ message: 'Dane testowe zostały dodane.', data: testData });
        } catch (error) {
            console.error('Błąd podczas tworzenia danych testowych:', error);
            response.status(500).json({ error: 'Wystąpił błąd podczas tworzenia danych testowych.' });
        }
    };
}

export default ParkingSlotController;
