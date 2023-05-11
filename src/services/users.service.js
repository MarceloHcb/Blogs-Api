const { User } = require('../models');
const { validationUserFields } = require('./validations/validationUserFilds');

const getUsers = () => User.findAll();
const getUserByEmail = async (email) => {
const userEmail = await User.findOne({ where: { email } });   
return userEmail;
};
const createUser = async (newUserbody) => {    
    const error = validationUserFields(newUserbody);
    const existingUser = await User.findOne({ where: { email: newUserbody.email } });    
    if (existingUser) {
        return { type: 'DUPLICATE_USER', message: 'User already registered' };
    }
    if (error.type) return error;
    const newUser = await User.create(newUserbody);     
    return { type: null, message: newUser };
};
module.exports = {
    getUsers,
    getUserByEmail,
    createUser,
};
