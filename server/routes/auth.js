const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// @route   POST api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  try {
    // Check if any users exist, if not create defaults (for migration)
    const count = await User.countDocuments();
    if (count === 0) {
      const admin = new User({ username: "admin", password: "adminpassword", role: "ADMIN" });
      const manager = new User({ username: "manager", password: "managerpassword", role: "MANAGER" });
      await admin.save();
      await manager.save();
    }

    // Check for user in DB
    const user = await User.findOne({ username, password });

    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Return JWT
    const payload = {
      user: {
        id: user._id,
        role: user.role,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET || "secretKey",
      { expiresIn: "8h" },
      (err, token) => {
        if (err) throw err;
        res.json({
          token,
          userId: user._id,
          username: user.username,
          role: user.role,
          msg: "Login successful"
        });
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server Error" });
  }
});

module.exports = router;
