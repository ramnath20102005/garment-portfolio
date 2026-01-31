module.exports = function (allowedRoles) {
  return (req, res, next) => {
    // Check if user exists and has a role
    if (!req.user || !req.user.role) {
      return res.status(403).json({ msg: "Access denied: No role found" });
    }

    // Check if the user's role is in the allowedRoles array
    // allowedRoles can be a single string or an array of strings
    const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ msg: "Access denied: Insufficient permissions" });
    }

    next();
  };
};
