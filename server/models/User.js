const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    sparse: true
  },
  role: {
    type: String,
    enum: ['ADMIN', 'MANAGER'],
    default: 'MANAGER'
  },
  name: {
    type: String
  },
  status: {
    type: String,
    enum: ['VERIFIED', 'PENDING', 'REJECTED'],
    default: 'VERIFIED'
  },
  joinedDate: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model("User", UserSchema);
module.exports = User;
