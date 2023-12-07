import { Request, Response, NextFunction } from "express";
import ProductModel from "../models/product.model";


export const getProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const products = await ProductModel.find({});

        res.json({
            success: true,
            data: products
        })
    }
    catch (error) {
        next(error);
    }
}

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, price, description, stock, image } = req.body;
        
        const newProduct = await ProductModel.create({name, price, description, stock, image});
        res.status(201).json({
            success: true,
            product: newProduct
        })
    }
    catch(error) {
        next(error);
    }
}

// update stock only