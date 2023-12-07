import { Request, Response, NextFunction } from "express";

export const adminPanel = (req: Request, res: Response, next: NextFunction) => {
    res.json({message: "Admin only resources"});
}