require("dotenv").config();
const mongoose = require("mongoose");

const url: string = process.env.DB_URL || "";

const connectDB = async () => {
    try {
        await mongoose.connect(url).then((data: any) => console.log(`Database connected with ${data.connection.host}`))
    }
    catch(error) {
        console.log(error);
        setTimeout(connectDB, 5000);
    }
}

export default connectDB;