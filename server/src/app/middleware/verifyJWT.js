const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyJWT = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token)
    return res.status(401).json({ message: "Authorization token is required" }); // Corrected here

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
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
