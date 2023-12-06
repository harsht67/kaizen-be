import { NextFunction, Request, Response } from "express";
import connectDB from "./utils/db";
const express = require("express");
require("dotenv").config();
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors({
    origin: process.env.ORIGIN
}))

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
    connectDB();
});

app.get("/test", (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
        success: true,
        message: "API is working"
    })
})

app.all("*", (req: Request, res: Response, next: NextFunction) => {
    const err = new Error(`Route ${req.url} not found!`) as any;
    err.statusCode = 404;
    next(err);
})