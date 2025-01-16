const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
require("dotenv").config();
const corsOptions = require("./configuration/corsOptions");
const { connect } = require("./app/middleware/db.js");
const { logger } = require("./app/middleware/logEvents");
const errorHandler = require("./app/middleware/errorHandler");
const verifyJWT = require("./app/middleware/verifyJWT");
const cookieParser = require('cookie-parser');
const credentials = require('./app/middleware/credentials');
const PORT = process.env.PORT || 3500;

// Custom middleware logger
app.use(logger);

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

connect()
  .then((connection) => {
    console.log("Connected to the database.");
  })
  .catch((error) => {
    console.error('Database connection error:', error);
  });

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

//serve static files
app.use("/", express.static(path.join(__dirname, "/public")));

// Routes
app.use("/", require("./app/routes/root"));
app.use("/register", require("./app/routes/register"));
app.use("/auth", require("./app/routes/auth"));
app.use('/refresh', require('./app/routes/refresh'));
app.use('/logout', require('./app/routes/logout'));
app.use("/joinWithoutUserId", require("./app/routes/roomRoutes/joinRoom.js"));

//Private routes
app.use(verifyJWT);
app.use("/createRoom", require("./app/routes/roomRoutes/createRoom.js"));
app.use("/getRoom", require("./app/routes/roomRoutes/getRoom.js"));
app.use("/joinWithUserId", require("./app/routes/roomRoutes/joinRoom.js"));
app.use("/getParticipant", require("./app/routes/participantRoutes/getParticipant.js"));
app.use("/test", require("./app/routes/test.js").router);

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
