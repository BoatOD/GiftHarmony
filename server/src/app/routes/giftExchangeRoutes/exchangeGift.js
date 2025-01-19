const express = require('express');
const router = express.Router();
const giftExchangeController = require('../../controllers/giftExchangeController');

router.post('/', giftExchangeController.exchangeGift);

module.exports = router;