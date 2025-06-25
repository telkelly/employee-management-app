import mongoose from 'mongoose';
import crypto from 'crypto';

const groupSchema = new mongoose.Schema({
    name: {type: String, required: true},
    members: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    description: String,
    inviteCode: {type: String, unique: true},
})

// Generate random invite code before saving
groupSchema.pre('save', function (next) {
    if (!this.inviteCode) {
        this.inviteCode = crypto.randomBytes(8).toString('hex');
    }
    next();
});

export default mongoose.model('Group', groupSchema);