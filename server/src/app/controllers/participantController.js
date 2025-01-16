const { executeQuery } = require("../middleware/db.js");

const getParticipants = async (req, res) => {
  const roomId = req.body.roomId;
  if (!roomId || roomId < 1)
    return res.status(400).json({ message: "Missing room id." });

  try {
    const foundParticipants = await executeQuery(
      `SELECT *
        FROM Participants
        WHERE RoomId = @RoomId`,
      [roomId],
      ["RoomId"],
      false
    );
    return res.status(200).json(foundParticipants.recordset);
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
};

module.exports = { getParticipants };
