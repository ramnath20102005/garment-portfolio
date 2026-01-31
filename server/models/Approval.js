const mongoose = require("mongoose");

const ApprovalSchema = new mongoose.Schema({
    submissionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Submission',
        required: true
    },
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    action: {
        type: String,
        enum: ['Approved', 'Rejected'],
        required: true
    },
    comments: {
        type: String
    },
    actionAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

const Approval = mongoose.models.Approval || mongoose.model("Approval", ApprovalSchema);
module.exports = Approval;
