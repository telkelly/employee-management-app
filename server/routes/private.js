import express from 'express';
import { verifyToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/dashboard', verifyToken, (req, res) => {
    res.json({
        message: `Welcome, user ${req.user.userId}`,
        role: req.user.role
    });
});

export default router;
