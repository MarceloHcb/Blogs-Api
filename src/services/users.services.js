const { User } = require('../models');

const getUsers = () => User.findAll();
const getUserByEmail = async (email) => {
   const userEmail = await User.findOne({ where: { email } });   
   return userEmail;
};
module.exports = {
    getUsers,
    getUserByEmail,
};
