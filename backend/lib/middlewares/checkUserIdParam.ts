import { RequestHandler, Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';

export const checkUserIdParam: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ error: "Invalid or missing userId parameter" });
    }

    next();
};
