const { UserLogin } = require('./login');
const userController = require('./user.controller');
const categoryController = require('./category.controller');

module.exports = {
    UserLogin,
    userController,
    categoryController,
};