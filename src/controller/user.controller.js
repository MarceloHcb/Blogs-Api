const { createToken } = require('../auth/authFunctions');
const { userService } = require('../services');
const errorMap = require('../utils/errorMap');

const getUsers = async (req, res) => {
    try {
    const users = await userService.getUsers();       
    const results = users.map((result) => {
    const { password, ...userWithoutPassword } = result.dataValues;
    return userWithoutPassword;
});
    return res.status(200).json(results);
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
    const { password: _password, ...userWithoutPassord } = user.dataValues;
    return res.status(200).json(userWithoutPassord);
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

module.exports = {
    getUsers,
    getUserById,
    createUser,
};