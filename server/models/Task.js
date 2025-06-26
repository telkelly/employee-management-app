import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    dueDate: Date,
    status: { type: String, enum: ['pending', 'in progress', 'done'], default: 'pending' },
    groupId: { type: mongoose.Schema.Types.ObjectId, ref: 'Group', required: true },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
}, { timestamps: true });

export default mongoose.model('Task', taskSchema);