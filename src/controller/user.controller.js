const { createToken } = require('../auth/authFunctions');
const { userService } = require('../services');
const errorMap = require('../utils/errorMap');

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
    createUser,
};