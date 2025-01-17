const express = require('express');
const router = express.Router();
const roomController = require('../../controllers/roomController');

router.get('/', roomController.getJoinedRoom);

module.exports = router;