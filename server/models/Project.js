const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
    projectId: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date
    },
    status: {
        type: String,
        enum: ['Proposed', 'In Progress', 'Completed', 'On Hold'],
        default: 'Proposed'
    },
    assignedEmployees: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee'
    }],
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

const Project = mongoose.models.Project || mongoose.model("Project", ProjectSchema);
module.exports = Project;
