import { Schema, model } from 'mongoose';
import { ICars } from '../models/cars.model';

const CarSchema = new Schema<ICars>({
    carId: { type: String, required: true},
    type: { type: String, required: true },
    model: { type: String, required: true },
    registration: { type: String, required: true}
});

export default model<ICars>('Cars', CarSchema, 'cars');
