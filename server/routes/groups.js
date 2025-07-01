// Join group via invite

import express from 'express';
import Group from "../models/Group.js";
import {verifyToken} from "../middleware/authMiddleware.js";
import {generateInviteCode} from "../utils/generateInviteCode.js";

const router = express.Router();

router.post('/create', verifyToken, async (req, res) => {
    const { name, description } = req.body;

    try {
        const inviteCode = generateInviteCode();

        const newGroup = new Group({
            name,
            description,
            creator: [req.user.userId],
            members: [req.user.userId],
            inviteCode,
        });

        await newGroup.save();

        res.status(201).json({ group: newGroup });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create group' });
    }
});

router.get('/my-groups', verifyToken, async (req, res) => {
    try {
        const groups = await Group.find({ creator: req.user.userId }).populate('members', 'name email');
        res.json({groups});
    } catch (err) {
        res.status(500).json({ error: 'Failed to load groups', details: err.message });
    }
});

export default router;