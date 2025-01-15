const express = require('express');
const router = express.Router();
const createRoomController = require('../../controllers/roomController');

router.post('/', createRoomController.getRoom);

module.exports = router;