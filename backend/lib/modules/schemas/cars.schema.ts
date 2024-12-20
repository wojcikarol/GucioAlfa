import { Schema, model } from 'mongoose';
import {ICar} from "../models/cars.model";

const CarSchema = new Schema<ICar>({
    type: { type: String, required: true },  
    registration: { type: String, required: true },
    
 
   
});

export default model<ICar>('Car', CarSchema , 'cars')
