const express = require('express');
const { blogPostController } = require('../controller');
const { validateJWT } = require('../middleware/validateJWT');

const router = express.Router();

router.post('/', validateJWT, blogPostController.createBlogPost);

module.exports = router;