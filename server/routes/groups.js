import express from 'express';
import Group from "../models/Group.js";
import User from "../models/User.js";
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

router.post('/join/:inviteCode', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        if(user.groupId){
            return res.status(401).json({error: 'You are already in the group.'});
        }

        const group = await Group.findOne({inviteCode: req.params.inviteCode})
        if(!group){
            return res.status(401).json({error: 'Invalid invite code.'});
        }

        user.groupId = group._id;
        await user.save();

        group.members.push(user._id);
        await group.save()

        res.json({message: 'Group joined successfully', group});
    }catch (error) {
        res.status(500).json({ error: 'Failed to join the group' });
    }
})

export default router;