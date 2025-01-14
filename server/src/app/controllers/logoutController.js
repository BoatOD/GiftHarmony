const { executeQuery } = require("../middleware/db.js");
require("dotenv").config();

const handleLogout = async (req, res) => {
  // On client, also delete the accessToken

  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); //No content
  const refreshToken = cookies.jwt;

  // Is refreshToken in db?
  const foundUser = await executeQuery(
    "SELECT * FROM Users WHERE RefreshToken = @RefreshToken",
    [refreshToken],
    ["RefreshToken"],
    false
  );
  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: process.env.NODE_ENV === 'production' });
    return res.sendStatus(204);
  }

  const userData = foundUser.recordset[0];

  // Delete refreshToken in db
  try {
    await executeQuery(
      "UPDATE Users SET RefreshToken = @RefreshToken WHERE Email = @Email",
      ["", userData.Email],
      ["RefreshToken", "Email"],
      false
    );
  } catch (error) {
    console.error("Error clearing refresh token:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }

  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: process.env.NODE_ENV === 'production' });
  res.sendStatus(204);
};

module.exports = { handleLogout };
