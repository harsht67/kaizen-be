import { Model, Schema, model } from "mongoose";

interface IProduct {
    name: string;
    price: number;
    description: string;
    image: string;
    category: string;
    stock: number;
}

const productSchema: Schema<IProduct> = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true
    }
})

const ProductModel: Model<IProduct> = model("Product", productSchema);

export default ProductModel;

// later
// images -> string[] for multiple images
// review, rating 