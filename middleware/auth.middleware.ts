import { Request, Response, NextFunction } from "express"
import jwt, { JwtPayload } from "jsonwebtoken";
require("dotenv").config();

import ErrorHandler from "../utils/ErrorHandler";

declare global {
    namespace Express {
        interface Request {
            user?: JwtPayloadWithRole;
        }
    }
}

interface JwtPayloadWithRole extends JwtPayload {
    role: string;
}

export const authenticateAndAuthorize = (requiredRole: string) => {
    return (req: Request, res: Response, next: NextFunction) => {

        const token = req.header('Authorization')?.replace('Bearer ', '');
        if(!token) {
            return next(new ErrorHandler('Unauthorized', 401));
        }

        try {
            const secret = process.env.JWT_SECRET || '';
            if(!secret) {
                return next(new ErrorHandler("JWT Secret not found!", 400));
            }
            const decoded = jwt.verify(token, secret) as JwtPayloadWithRole;

            if(decoded.role !== requiredRole) {
                return next(new ErrorHandler("Unauthorized", 403));
            }
            req.user = decoded;
            next();
        }
        catch(error) {
            return next(new ErrorHandler("Unauthorized", 401));
        }
    }
}