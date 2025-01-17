const { executeQuery } = require("../middleware/db.js");

const generateRandomCode = () => {
  const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"; // Digits + Uppercase English letters
  let randomCode = "";

  for (let i = 0; i < 4; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length); // Get a random index
    randomCode += chars[randomIndex]; // Add the random character to the code
  }

  return randomCode;
};

const createRoom = async (req, res) => {
  const userEmail = req.email;
  if (!userEmail || userEmail === "")
    return res.status(400).json({ message: "Missing user's email." });

  const userId = req.userId;
  if (!userId || userId < 1)
    return res.status(400).json({ message: "Missing userId." });

  const roomName = req.body.name;
  if (!roomName || roomName === "")
    return res.status(400).json({ message: "Missing room's name." });

  let code = "";
  let foundRoom = "";
  let isFound = true;
  try {
    while (isFound) {
      code = generateRandomCode();
      foundRoom = await executeQuery(
        "SELECT * FROM Rooms WHERE Code = @Code",
        [code],
        ["Code"],
        false
      );
      if (foundRoom.recordset.length < 1) isFound = false;
    }

    await executeQuery(
      "INSERT INTO Rooms (HostId, Name, Code, DateCreated, isActive) VALUES (@HostId, @Name, @Code, @Date, @IsActive)",
      [userId, roomName, code, new Date().toISOString(), 1],
      ["HostId", "Name", "Code", "Date", "IsActive"],
      false
    );

    return res.status(201).json({ message: "Create room succeeded." });
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
};

const joinRoom = async (req, res) => {
  const userId = req.userId || null;

  const roomCode = req.body.code;
  if (!roomCode || roomCode === "")
    return res.status(400).json({ message: "Room's code is missing." });

  const name = req.body.name || "";
  const giftDescription = req.body.giftDescription || "";
  const message = req.body.message || "";

  try {
    const foundRoom = await executeQuery(
      "SELECT * FROM Rooms WHERE Code = @Code",
      [roomCode],
      ["Code"],
      false
    );
    if (foundRoom.recordset.length < 1)
      return res.status(400).json({ message: "Room not found." });

    const roomData = foundRoom.recordset[0];

    const foundUser = await executeQuery(
      "SELECT * FROM Participants WHERE UserId = @UserId AND RoomId = @RoomId",
      [userId, roomData.RoomId],
      ["UserId", "RoomId"],
      false
    );
    if (foundUser.recordset.length > 0)
      return res
        .status(400)
        .json({ message: "User has already joined this room." });

    await executeQuery(
      `INSERT INTO Participants 
      (RoomId, UserId, Name, PictureUrl, GiftDescription, Message, DateJoined, isActive) 
      VALUES (@RoomId, @UserId, @Name, @PictureUrl, @GiftDescription, @Message, @DateJoined, @isActive)`,
      [
        roomData.RoomId,
        userId,
        name,
        "",
        giftDescription,
        message,
        new Date().toISOString(),
        1,
      ],
      [
        "RoomId",
        "UserId",
        "Name",
        "PictureUrl",
        "GiftDescription",
        "Message",
        "DateJoined",
        "isActive",
      ],
      false
    );

    return res.status(200).json({ message: "Join succeed." });
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
};

const getRoom = async (req, res) => {
  const userId = req.userId;
  if (!userId || userId < 1)
    return res.status(400).json({ message: "Missing user id." });
  try {
    const foundRooms = await executeQuery(
      `SELECT *
      FROM Rooms
      WHERE HostId = @UserId`,
      [userId],
      ["UserId"],
      false
    );
    return res.status(200).json(foundRooms.recordset);
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
};

const getJoinedRoom = async (req, res) => {
  const userId = req.userId;
  if (!userId || userId < 1)
    return res.status(400).json({ message: "Missing user id." });
  try {
    const foundRooms = await executeQuery(
      `SELECT r.RoomId, HostId, r.Name as RoomName, Code, DateCreated, r.isActive as isRoomActive, 
              ParticipantId, p.Name as ParticipantName, PictureUrl, GiftDescription, Message, DateJoined
      FROM Rooms as r
      JOIN Participants as p ON p.UserId = @UserId
      WHERE p.RoomId = r.RoomId`,
      [userId],
      ["UserId"],
      false
    );

    const rooms = foundRooms.recordset.map((record) => {
      const participantData = {
        ParticipantId: record.ParticipantId,
        Name: record.ParticipantName,
        PictureUrl: record.PictureUrl,
        GiftDescription: record.GiftDescription,
        Message: record.Message,
        DateJoined: record.DateJoined,
      };
      const {
        ParticipantId,
        ParticipantName,
        PictureUrl,
        GiftDescription,
        Message,
        DateJoined,
        ...roomData
      } = record;
      return { ...roomData, participantData };
    });

    return res.status(200).json(rooms);
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
};

module.exports = { createRoom, joinRoom, getRoom, getJoinedRoom };
