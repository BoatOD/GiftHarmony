const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyJWT = (req, res, next) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.status(401).json({ message: "Authorization token is required" });
  const token = cookies.jwt;

  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      console.error("JWT verification failed", err);
      return res.status(403).json({ message: "Invalid or expired token" });
    }

    // Store the decoded email in the request object for use in the route
    req.email = decoded.Email;
    req.userId = decoded.UserId;

    // Proceed to the next middleware or route handler
    next();
  });
};

module.exports = verifyJWT;
