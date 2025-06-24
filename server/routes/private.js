import express from 'express';
import { verifyToken } from '../middleware/authMiddleware.js';
import User from "../models/User.js";

const router = express.Router();

router.get('/dashboard', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        res.json({ user });
    } catch (err) {
        res.status(500).json({ error: 'Failed to load dashboard', details: err.message });
    }
});

export default router;
