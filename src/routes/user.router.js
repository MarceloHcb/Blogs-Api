const express = require('express');
const { userController } = require('../controller');
const { validateJWT } = require('../middleware/validateJWT');

const router = express.Router();
router.get('/', validateJWT, userController.getUsers);
router.post('/', userController.createUser);

module.exports = router;