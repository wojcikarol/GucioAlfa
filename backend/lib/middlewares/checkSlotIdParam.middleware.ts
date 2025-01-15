// middlewares/checkSlotIdParam.middleware.ts
import { RequestHandler } from 'express';

export const checkSlotIdParam: RequestHandler = (request, response, next) => {
    const { id } = request.params;

    // Wyrażenie regularne sprawdza, czy ID jest w formacie "P" + 3 cyfry (np. "P001")
    const slotIdPattern = /^P\d{3}$/;
    if (!slotIdPattern.test(id)) {
        return response.status(400).send('Brak lub niepoprawny parametr ID miejsca parkingowego!');
    }

    next();
};
