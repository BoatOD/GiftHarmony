const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client();

const jwt = require("jsonwebtoken");
require("dotenv").config();

const { executeQuery } = require("../middleware/db.js");

const handleLogin = async (req, res) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token || token == "")
    return res.status(400).json({ message: "Missing Token." });
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_SECRET.toString(),
  });
  const payload = ticket.getPayload();

  try {
    let foundUser = await executeQuery(
      "SELECT * FROM Users WHERE Email = @Email",
      [payload.email],
      ["Email"],
      false
    );
    if (foundUser.recordset.length < 1) {
      await executeQuery(
        "INSERT INTO Users (FirstName, LastName, Email, DateCreated, isActive) VALUES (@FirstName, @LastName, @Email, @Date, @IsActive)",
        [
          payload.given_name,
          payload.family_name,
          payload.email,
          new Date().toISOString(),
          1,
        ],
        ["FirstName", "LastName", "Email", "Date", "IsActive"],
        false
      );

      foundUser = await executeQuery(
        "SELECT * FROM Users WHERE Email = @Email",
        [payload.email],
        ["Email"],
        false
      );
    }

    const userData = foundUser.recordset[0];

    // create JWTs
    const accessToken = jwt.sign(
      {
        FirstName: userData.FirstName,
        LastName: userData.LastName,
        Email: userData.Email,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "600s" } // 10 minutes
    );
    const refreshToken = jwt.sign(
      {
        FirstName: userData.FirstName,
        LastName: userData.LastName,
        Email: userData.Email,
      },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" } // 1 day
    );

    // Store the refresh token in the database
    await executeQuery(
      "UPDATE Users SET RefreshToken = @RefreshToken WHERE Email = @Email",
      [refreshToken, userData.Email],
      ["RefreshToken", "Email"],
      false
    );

    // Send refresh token as a secure cookie
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: "Strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    // Send the access token in the response
    res.json({ accessToken });
  } catch (error) {
    console.error(error);
    res.status(401).send(error);
  }
};

module.exports = { handleLogin };
