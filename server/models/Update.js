const mongoose = require("mongoose");

const UpdateSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['Milestone', 'Collection', 'Market', 'Facility'],
        default: 'Milestone'
    },
    date: {
        type: Date,
        default: Date.now
    },
    managerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    submissionStatus: {
        type: String,
        enum: ['Draft', 'PendingApproval', 'Approved', 'Rejected'],
        default: 'Draft'
    },
    verificationMetadata: {
        verifiedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        verifiedAt: { type: Date },
        rejectionReason: { type: String }
    }
}, { timestamps: true });

const Update = mongoose.models.Update || mongoose.model("Update", UpdateSchema);
module.exports = Update;
