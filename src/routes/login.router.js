const express = require('express');
const { UserLogin } = require('../controller');

const router = express.Router();

router.post('/', UserLogin);

module.exports = router;