const { executeQuery } = require("../middleware/db.js");

const jwt = require("jsonwebtoken");
require("dotenv").config();

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;

  try {
    const foundUser = await executeQuery(
      "SELECT * FROM Users WHERE RefreshToken = @RefreshToken",
      [refreshToken],
      ["RefreshToken"],
      false
    );

    // Check if user was found
    if (!foundUser || foundUser.recordset.length === 0) {
      return res.sendStatus(403); // Forbidden if no user is found with this refresh token
    }

    const userData = foundUser.recordset[0];

    // Verify the refresh token
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err || userData.Email !== decoded.Email) {
          console.error("JWT verification failed or email mismatch");
          return res.sendStatus(403); // Forbidden if verification fails
        }

        // Generate a new access token
        const accessToken = jwt.sign(
          { Email: decoded.Email },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "30s" } // Set access token expiration to 30 seconds
        );

        return res.json({ accessToken }); // Return the access token as a response
      }
    );
  } catch (error) {
    console.error("Error while handling refresh token:", error);
    return res.sendStatus(500); // Internal Server Error
  }
};

module.exports = { handleRefreshToken };
