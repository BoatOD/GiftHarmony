const express = require("express");
const router = express.Router();
const { executeQuery } = require("../middleware/db.js");

router.get("/", async (req, res) => {
  const userId = req.userId;
  if (!userId || userId < 1) return res.status(400).json({message: "Missing user id."});
  try {
    const foundRooms = await executeQuery(
      "SELECT * FROM Rooms WHERE HostId = @UserId",
      [userId],
      ["UserId"],
      false
    );
    return res.status(200).json(foundRooms.recordset);
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
});

module.exports = router;
