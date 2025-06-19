import express from 'express';
import dotenv from 'dotenv';
import connectToMongoDB from "./config/db.js";

dotenv.config();

const app = express();


const PORT = process.env.PORT || 5000;

connectToMongoDB().then(app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
}));