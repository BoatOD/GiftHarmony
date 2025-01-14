const express = require('express');
const router = express.Router();
const createRoomController = require('../controllers/createRoomController');

router.post('/', createRoomController.createRoom);

module.exports = router;