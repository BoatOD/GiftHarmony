const { executeQuery } = require("../middleware/db.js");

const getParticipants = async (req, res) => {
  const roomId = req.body.roomId;
  if (!roomId || roomId < 1)
    return res.status(400).json({ message: "Missing room id." });

  try {
    const foundParticipants = await executeQuery(
      `SELECT *
        FROM Participants
        WHERE RoomId = @RoomId AND isActive = 1`,
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

const deleteParticipant = async (req, res) => {
  const roomId = req.body.roomId;
  if (!roomId || roomId < 1)
    return res.status(400).json({ message: "Missing room id." });
  const participantId = req.body.participantId;
  if (!participantId || participantId < 1)
    return res.status(400).json({ message: "Missing participant id." });

  try {
    const foundParticipant = await executeQuery(
      `SELECT *
        FROM Participants
        WHERE RoomId = @RoomId AND ParticipantId = @ParticipantId AND isActive = 1`,
      [roomId, participantId],
      ["RoomId", "ParticipantId"],
      false
    );
    if (foundParticipant.recordset.length < 1) return res.status(400).json({ message: "Participant not found." });

    await executeQuery(
      "UPDATE Participants SET isActive = 0 WHERE ParticipantId = @ParticipantId",
      [participantId],
      ["ParticipantId"],
      false
    );

    return res.status(200).json({ message: "Delete participant succeed." });
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
};

module.exports = { getParticipants, deleteParticipant };
