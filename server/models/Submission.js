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
        enum: ['Employee', 'Project', 'OperationalReport', 'Export', 'RawMaterial', 'Workforce', 'Buyer', 'Financial', 'Media', 'Update', 'Company']
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
        enum: ['Pending', 'Approved', 'Rejected'],
        default: 'Pending'
    },
    submittedAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

const Submission = mongoose.models.Submission || mongoose.model("Submission", SubmissionSchema);
module.exports = Submission;
