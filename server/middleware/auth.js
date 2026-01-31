const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

module.exports = function (req, res, next) {
  // Get token from header
  const tokenHeader = req.header("Authorization");

  // Check if not token
  if (!tokenHeader) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    // Remove "Bearer " if present
    const token = tokenHeader.startsWith("Bearer ")
      ? tokenHeader.slice(7, tokenHeader.length)
      : tokenHeader;

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secretKey");

    // Safety check: Ensure the ID in the token is a valid MongoDB ObjectId
    // This handles stale tokens from the previous mock-id system
    if (!mongoose.Types.ObjectId.isValid(decoded.user.id)) {
      return res.status(401).json({ msg: "Invalid session structure. Please sign out and log back in." });
    }

    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
