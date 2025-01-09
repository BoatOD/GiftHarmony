const usersDB = {
  users: require("../models/users.json"),
  setUsers: function (data) {
    this.users = data;
  },
};
const bcrypt = require("bcrypt");

const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client();

const jwt = require("jsonwebtoken");
require("dotenv").config();
const fsPromises = require("fs").promises;
const path = require("path");

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
    // create JWTs
    const accessToken = jwt.sign(
      {
        FirstName: foundUser.recordset.FirstName,
        LastName: foundUser.recordset.LastName,
        Email: foundUser.recordset.Email,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "600s" }
    );
    const refreshToken = jwt.sign(
      {
        FirstName: foundUser.recordset.FirstName,
        LastName: foundUser.recordset.LastName,
        Email: foundUser.recordset.Email,
      },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );
    // Saving refreshToken with current user
    const otherUsers = await executeQuery(
      "SELECT * FROM Users WHERE Email NOT LIKE @Email",
      [payload.email],
      ["Email"],
      false
    );
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.json({ accessToken });
  } catch (error) {
    console.error(error);
    res.status(401).send(error);
  }
};

module.exports = { handleLogin };
