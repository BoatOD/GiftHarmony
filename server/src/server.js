const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const compression = require("compression");
require("dotenv").config();
const corsOptions = require("./configuration/corsOptions");
const { connect } = require("./app/middleware/db.js");
const { logger } = require("./app/middleware/logEvents");
const errorHandler = require("./app/middleware/errorHandler");
const verifyJWT = require("./app/middleware/verifyJWT");
const cookieParser = require('cookie-parser');
const credentials = require('./app/middleware/credentials');
const PORT = process.env.PORT || 3500;
const morgan = require("morgan");
const responseTime = require("response-time");
const redis = require("redis");
const NodeCache = require("node-cache");

// Setup Redis Client
const redisClient = redis.createClient();
redisClient.on('error', (err) => console.error('Redis Error:', err));

// Setup In-Memory Cache
const memoryCache = new NodeCache({ stdTTL: 60 }); // Cache 60s

// Middleware: Logging & Profiling
app.use(morgan("dev"));
app.use(responseTime());

// Enable Compression (Gzip & Brotli)
app.use(compression());

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

// Middleware: Cache Middleware (Redis)
const cacheMiddleware = (req, res, next) => {
  const key = req.originalUrl;
  redisClient.get(key, (err, data) => {
    if (err) throw err;
    if (data) {
      res.send(JSON.parse(data));
    } else {
      next();
    }
  });
};

// Serve Static Files with Local CDN & Enhanced Caching
app.use("/", express.static(path.join(__dirname, "/public"), {
  maxAge: '7d', // Cache for 7 days
  etag: true, // Enable ETag
  lastModified: true, // Enable Last-Modified
  setHeaders: (res, path) => {
    if (path.endsWith('.html')) {
      res.setHeader('Cache-Control', 'no-cache');
    } else {
      res.setHeader('Cache-Control', 'public, max-age=604800');
    }
  }
}));


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
app.use("/getJoinedRoom", require("./app/routes/roomRoutes/getJoinedRoom.js"));
app.use("/joinWithUserId", require("./app/routes/roomRoutes/joinRoom.js"));
app.use("/getParticipant", require("./app/routes/participantRoutes/getParticipant.js"));
app.use("/deleteParticipant", require("./app/routes/participantRoutes/deleteParticipant.js"));
app.use("/exitRoom", require("./app/routes/roomRoutes/exitRoom.js"));
app.use("/getGiftExchangeByRoomId", require("./app/routes/giftExchangeRoutes/getGiftExchangeRoutes.js"));
app.use("/exchangeGift", require("./app/routes/giftExchangeRoutes/exchangeGift.js"));
app.use("/getAllRoom", require("./app/routes/roomRoutes/getAllRoom.js"));
app.use("/test", require("./app/routes/test.js"));

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

app.listen(PORT, () => console.log(`Server running on port ${PORT} with Local CDN, Compression, and Optimized Caching!`));