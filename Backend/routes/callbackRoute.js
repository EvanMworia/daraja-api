const express = require('express');
const { callbackHandler } = require('../controllers/callbackController');
const router = express.Router();

router.post('/callback', callbackHandler);

module.exports = router;
