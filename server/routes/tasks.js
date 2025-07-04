import express from 'express';
import {verifyToken} from '../middleware/authMiddleware.js';
import Task from '../models/Task.js';
import User from '../models/User.js';

const router = express.Router();

// Create task
router.post('/:groupId', verifyToken, async (req, res) => {
    try {
        const {title, description, status, dueDate, assignedTo} = req.body;
        const task = new Task({
            title,
            description,
            status,
            dueDate,
            groupId: req.params.groupId,
            assignedTo: assignedTo || null,
        })
        await task.save();
        res.status(201).json({task})
    } catch (err) {
        res.status(500).json({error: 'Failed to create task'});
    }
})

// Get tasks
router.get('/:groupId', verifyToken, async (req, res) => {
    try {
        const tasks = await Task.find({groupId: req.params.groupId})
        res.json({tasks})
    } catch (err) {
        res.status(500).json({error: 'Failed to fetch tasks'});
    }
})

// Update task
router.put('/:taskId', verifyToken, async (req, res) => {
    try{
        const updated = await Task.findByIdAndUpdate(req.params.taskId, req.body, {new: true});
        res.json({task: updated})
    }catch (err){
        res.status(500).json({error: 'Failed to fetch tasks'});
    }
})

// Delete task
router.delete('/:taskId', verifyToken, async (req, res)=>{
    try{
        await Task.findByIdAndDelete(req.params.taskId)
        res.json({ message: 'Task deleted' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete task' });
    }
})

// Get all tasks
router.get('/my-tasks', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        if (!user || !user.groups || user.groups.length === 0) {
            return res.json({ tasks: [] });
        }

        const tasks = await Task.find({ groupId: { $in: user.groups } });
        res.json({ tasks });
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch tasks' });
    }
});

export default router;
