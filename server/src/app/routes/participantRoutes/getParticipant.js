const express = require('express');
const router = express.Router();
const participantController = require('../../controllers/participantController');

router.get('/', participantController.getParticipants);

module.exports = router;