const express = require('express');
const { userController } = require('../controller');
const { validateJWT } = require('../middleware/validateJWT');

const router = express.Router();
router.get('/', validateJWT, userController.getUsers);
router.get('/:id', validateJWT, userController.getUserById);
router.post('/', userController.createUser);
router.delete('/:me', validateJWT, userController.deletedUser);

module.exports = router;