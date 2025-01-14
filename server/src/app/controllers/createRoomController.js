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
      if (!foundRoom) isFound = false;
    }

    await executeQuery(
      "INSERT INTO Rooms (HostId, Name, Code, DateCreated, isActive) VALUES (@HostId, @Name, @Code, @Date, @IsActive)",
      [userId, roomName, code, new Date().toISOString(), 1],
      ["HostId", "Name", "Code", "Date", "IsActive"],
      false
    );
    res.status(201);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

module.exports = { createRoom };
