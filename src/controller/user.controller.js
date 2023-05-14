const { createToken } = require('../auth/authFunctions');
const { userService } = require('../services');
const errorMap = require('../utils/errorMap');

const getUsers = async (_req, res) => {
    try {
    const users = await userService.getUsers();
    return res.status(200).json(users);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'internal error' });
    }
};
const getUserById = async (req, res) => {
try {
    const { id } = req.params;
    const user = await userService.getUserById(id);    
    if (!user) return res.status(404).json({ message: 'User does not exist' });    
    return res.status(200).json(user);
} catch (error) {
    console.error(error);
} return res.status(500).json({ message: 'internal error' });
};
const createUser = async (req, res) => {
    try {
        const { body } = req;
        const { type, message } = await userService.createUser(body);        
        if (type) return res.status(errorMap.mapError(type)).json({ message });        
        const { password: _password, ...userWithoutPassord } = message.dataValues;              
        const validToken = createToken(userWithoutPassord);
        return res.status(201).json({ token: validToken });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'internal error' });
    }
};

const deletedUser = async (req, res) => {
    try {
        const { id } = req.payload.data;        
        const { type, message } = await userService.deleteUser(id);
        if (type) return res.status(errorMap.mapError(type)).json({ message });        
        return res.status(204).end();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'internal error' });
    }
};

module.exports = {
    getUsers,
    getUserById,
    createUser,
    deletedUser,
};