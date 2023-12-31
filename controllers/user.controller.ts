import { NextFunction, Request, Response } from "express"
import userModel from "../models/user.model";
import jwt from "jsonwebtoken";
import ErrorHandler from "../utils/ErrorHandler";
import { sendToken } from "../utils/jwt";
require("dotenv").config();

interface JwtPayload {
    name: string;
    email: string;
    role: string;
}

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, email, password } = req.body;

        const isEmailExist = await userModel.findOne({ email });
        if (isEmailExist) {
            return next(new ErrorHandler("Email already exist", 400))
        }

        await userModel.create({ name, email, password, role: 'user' });

        const token = createJwtToken({ name, email, role: 'user' });

        res.status(201).json({
            success: true,
            token
        })
    }
    catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
    }
}

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return next(new ErrorHandler("Please enter your email and password", 400));
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            return next(new ErrorHandler("User not found!", 400));
        }

        const isPasswordMatch = await user.comparePassword(password);
        if (!isPasswordMatch) {
            return next(new ErrorHandler("Incorrect password!", 400));
        }

        sendToken(user, 200, res);
    }
    catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
    }
}

export const logoutUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.cookie("access_token", "", { maxAge: 1 });
        res.cookie("refresh_token", "", { maxAge: 1 });

        res.status(200).json({
            success: true,
            message: "Logged out successfully"
        })
    }
    catch (error) {
        return next(error);
    }
}

export const createJwtToken = (user: JwtPayload) => {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
        throw new Error("Jwt secret not found");
    }
    try {
        const token = jwt.sign(user, jwtSecret, { expiresIn: '30m' });
        console.log(token);
        return token;
    }
    catch (error) {
        throw new Error("Failed to create JWT token");
    }
}