const express = require('express');
const { categoryController } = require('../controller');
const { validateJWT } = require('../middleware/validateJWT');

const router = express.Router();

router.post('/', validateJWT, categoryController.createCategory);

module.exports = router;