import mongoose from 'mongoose';
import dotenv from "dotenv";
dotenv.config();

const uri = process.env.MONGO_URI;

async function connectToMongoDB() {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true
        })
        console.log("Connected successfully to MongoDB with Mongoose");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

export default connectToMongoDB;