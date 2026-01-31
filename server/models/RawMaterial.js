const mongoose = require("mongoose");

const rawMaterialSchema = new mongoose.Schema({
    materialType: { type: String, required: true },
    source: { type: String, required: true },
    supplier: { type: String, required: true },
    quantity: { type: Number, required: true },
    unit: { type: String, default: 'kg' },
    costRange: { type: String, required: true },
    year: { type: Number, required: true },
    managerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
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

const RawMaterial = mongoose.models.RawMaterial || mongoose.model("RawMaterial", rawMaterialSchema);
module.exports = RawMaterial;
