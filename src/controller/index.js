const { UserLogin } = require('./login');
const userController = require('./user.controller');
const categoryController = require('./category.controller');
const blogPostController = require('./blogPost.controller');

module.exports = {
    UserLogin,
    userController,
    categoryController,
    blogPostController,
};