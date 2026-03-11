const mongoose = require("mongoose");

const SubmissionSchema = new mongoose.Schema({
    managerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    entityType: {
        type: String,
        required: true,
        enum: ['Employee', 'Project', 'OperationalReport', 'Export', 'RawMaterial', 'Buyer', 'Financial', 'Media', 'Update', 'Company', 'Product']
    },
    entityId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'entityType'
    },
    dataSnapshot: {
        type: Object,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected', 'Revoked', 'Finalized'],
        default: 'Pending'
    },
    approvalDeadline: {
        type: Date
    },
    revokedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    revokedAt: {
        type: Date
    },
    revokeReason: {
        type: String
    },
    previousData: {
        type: Object
    },
    submittedAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

// Performance Indexes for Analytics
SubmissionSchema.index({ status: 1, entityType: 1 });
SubmissionSchema.index({ createdAt: 1 });

const Submission = mongoose.models.Submission || mongoose.model("Submission", SubmissionSchema);
module.exports = Submission;
