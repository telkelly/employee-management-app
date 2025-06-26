import express from 'express';
import dotenv from 'dotenv';
import connectToMongoDB from "./config/db.js";
import cors from "cors";
const corsOptions = {
    origin: ['http://localhost:5173'],
    credentials: true
}

import authRoutes from './routes/auth.js';
import privateRoutes from "./routes/private.js";
import groupRoutes from "./routes/groups.js";
import taskRoutes from "./routes/tasks.js"

dotenv.config();

const app = express();

app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/private', privateRoutes);
app.use('/api/group', groupRoutes);
app.use('api/tasks', taskRoutes)


const PORT = process.env.PORT || 5000;

connectToMongoDB().then(app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
}));