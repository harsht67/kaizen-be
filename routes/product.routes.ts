import express from "express";
import { authenticateAndAuthorize } from "../middleware/auth.middleware";

const productRoute = express.Router();

// productRoute.post('/products', authenticateAndAuthorize('admin'), createProduct);

// productRoute.get('/products', getProduct);

export default productRoute;