const express = require('express');
const router = express.Router();
const participantController = require('../../controllers/participantController');

router.post('/', participantController.deleteParticipant);

module.exports = router;