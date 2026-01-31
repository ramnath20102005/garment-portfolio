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
  role: {
    type: String,
    enum: ['ADMIN', 'MANAGER'],
    default: 'MANAGER'
  },
  name: {
    type: String
  },
  joinedDate: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model("User", UserSchema);
module.exports = User;
