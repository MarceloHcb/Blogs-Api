const express = require('express');
const { blogPostController } = require('../controller');
const { validateJWT } = require('../middleware/validateJWT');
const { userAutorization } = require('../middleware/userAutorization');

const router = express.Router();

router.get('/', validateJWT, blogPostController.getBlogPosts);
router.get('/:id', validateJWT, blogPostController.getPostById);
router.post('/', validateJWT, blogPostController.createBlogPost);
router.put('/:id', validateJWT, userAutorization, blogPostController.updateBlogPost);
router.delete('/:id', validateJWT, userAutorization, blogPostController.deleteBlogPost);

module.exports = router;