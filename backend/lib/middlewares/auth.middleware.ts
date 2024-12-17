import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { config } from '../config';
import { IUser } from "../modules/models/user.model";

export interface auth extends Request {
    user?: IUser;
}

export const auth = (request: auth, response: Response, next: NextFunction) => {
    let token = request.headers['x-access-token'] || request.headers['authorization'];
    if (token && typeof token === 'string') {
        if (token.startsWith('Bearer ')) {
            token = token.slice(7, token.length);
        }
        try {
            const decoded = jwt.verify(token, config.JwtSecret) as JwtPayload & IUser;
            if (!decoded) return response.status(400).send('Invalid token.');
            
           
            request.user = decoded;
            next();
        } catch (error) {
            return response.status(401).send('Access denied. Invalid token.');
        }
    } else {
        return response.status(401).send('Access denied. No token provided.');
    }
};
