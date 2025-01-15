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
        this.router.get(`${this.path}`, this.getAllParkingSlots);
        this.router.post(`${this.path}/test-data`, this.createTestData);
        this.router.put(`${this.path}/:id`, this.updateParkingSlotStatus);
    }

    private getParkingSlot = async (request: Request, response: Response, next: NextFunction) => {
        const { id } = request.params;
        try {
            const data = await this.parkingSlotService.get(id);
            if (data) {
                response.status(200).json(data);
            } else {
                response.status(404).json({ message: `Parking slot ${id} not found.` });
            }
        } catch (error) {
            response.status(500).json({ error: 'Error fetching parking slot.' });
        }
    };

    private getAllParkingSlots = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const data = await this.parkingSlotService.getAll();
            response.status(200).json(data);
        } catch (error) {
            response.status(500).json({ error: 'Error fetching parking slots.' });
        }
    };

    private createTestData = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const testData = await this.parkingSlotService.createTestData();
            response.status(201).json({ message: 'Test data created.', data: testData });
        } catch (error) {
            response.status(500).json({ error: 'Error creating test data.' });
        }
    };

    private updateParkingSlotStatus = async (request: Request, response: Response, next: NextFunction) => {
        const { id } = request.params;
        const { isOccupied } = request.body;
        try {
            const updatedSlot = await this.parkingSlotService.updateStatus(id, isOccupied);
            if (updatedSlot) {
                response.status(200).json({ message: `Parking slot ${id} updated.`, updatedSlot });
            } else {
                response.status(404).json({ message: `Parking slot ${id} not found.` });
            }
        } catch (error) {
            response.status(500).json({ error: 'Error updating parking slot.' });
        }
    };
}

export default ParkingSlotController;
