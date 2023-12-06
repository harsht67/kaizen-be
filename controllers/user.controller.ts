import { NextFunction, Request, Response } from "express"
import userModel from "../models/user.model";
import jwt from "jsonwebtoken";
require("dotenv").config();

interface JwtPayload {
    name: string;
    email: string;
    password: string;
}

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, email, password } = req.body;

        const isEmailExist = await userModel.findOne({ email });
        if (isEmailExist) {
            return next(new ErrorHandler("Email already exist", 400))
        }

        const token = createJwtToken({name, email, password});

        res.status(201).json({
            success: true,
            token
        })
    }
    catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
    }
}

export const createJwtToken = async (user: JwtPayload) => {
    const jwtSecret = process.env.JWT_SECRET;
    if(!jwtSecret) {
        throw new Error("Jwt secret not found");
    }
    try {
        const token = jwt.sign(user, jwtSecret, { expiresIn: '30m' });
        return token;
    }
    catch (error) {
        throw new Error("Failed to create JWT token");
    }
}