const express = require('express');
const router = express.Router();
const roomController = require('../../controllers/roomController');

router.post('/', roomController.joinRoom);

module.exports = router;