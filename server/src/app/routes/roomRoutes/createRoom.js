const express = require('express');
const router = express.Router();
const createRoomController = require('../../controllers/roomController');

router.post('/', createRoomController.createRoom);

module.exports = router;