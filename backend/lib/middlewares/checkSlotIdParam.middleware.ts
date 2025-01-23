
import { RequestHandler } from 'express';

export const checkSlotIdParam: RequestHandler = (request, response, next) => {
    const { id } = request.params;

 
    const slotIdPattern = /^P\d{3}$/;
    if (!slotIdPattern.test(id)) {
        return response.status(400).send('Brak lub niepoprawny parametr ID miejsca parkingowego!');
    }

    next();
};
