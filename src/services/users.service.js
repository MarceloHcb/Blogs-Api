const { User } = require('../models');
const { validateUserFields } = require('./validations/validateFilds');

const getUsers = () => User.findAll({
    attributes: { exclude: ['password'] },
});
const getUserByEmail = async (email) => {
    const userEmail = await User.findOne({
    where: { email },
    attributes: { exclude: ['password'] },
    });
    return userEmail;
};
const getUserById = (id) => User.findByPk(id, {
    attributes: { exclude: ['password'] },
});
const createUser = async (newUserbody) => {    
    const error = validateUserFields(newUserbody);
    const existingUser = await User.findOne({ where: { email: newUserbody.email } });    
    if (existingUser) {
        return { type: 'DUPLICATE_USER', message: 'User already registered' };
    }
    if (error.type) return error;
    const newUser = await User.create(newUserbody);    
    return { type: null, message: newUser };
};
const deleteUser = async (id) => {
    const deletedUser = await User.destroy({ where: { id } });
    return { type: null, message: deletedUser };
};
module.exports = {
    getUsers,
    getUserByEmail,
    getUserById,
    createUser,
    deleteUser, 
};
