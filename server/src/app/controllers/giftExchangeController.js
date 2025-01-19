const { executeQuery } = require("../middleware/db.js");

const getGiftExchangeByRoomId = async (req, res) => {
  const roomId = req.body.roomId;
  if (!roomId || roomId < 1)
    return res.status(400).json({ message: "Missing room id." });

  try {
    const foundExchange = await executeQuery(
      `SELECT * 
      FROM GiftExchanges
      WHERE RoomId = @RoomId`,
      [roomId],
      ["RoomId"],
      false
    );

    return res.status(200).json(foundExchange.recordset);
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
};

const exchangeGift = async (req, res) => {
  const roomId = req.body.roomId;
  if (!roomId || roomId < 1)
    return res.status(400).json({ message: "Missing room id." });

  const senderId = req.body.senderId;
  if (!senderId || senderId < 1)
    return res.status(400).json({ message: "Missing sender id." });

  const receiverId = req.body.receiverId;
  if (!receiverId || receiverId < 1)
    return res.status(400).json({ message: "Missing receiver id." });

  try {
    const foundRoom = await executeQuery(
      `SELECT *
      FROM Rooms
      WHERE RoomId = @RoomId AND isActive = 1`,
      [roomId],
      ["RoomId"],
      false
    );
    if (foundRoom.recordset.length < 1)
      return res.status(400).json({ message: "This room does not exist." });

    await executeQuery(
      `INSERT INTO GiftExchanges 
      (RoomId, SenderId, ReceiverId, DateCreated) 
      VALUES (@RoomId, @SenderId, @ReceiverId, @DateCreated)`,
      [roomId, senderId, receiverId, new Date().toISOString()],
      ["RoomId", "SenderId", "ReceiverId", "DateCreated"],
      false
    );
    return res.status(200).json({ message: "Exchange succeed." });
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
};

module.exports = { getGiftExchangeByRoomId, exchangeGift };
