const { createToken } = require('../auth/authFunctions');
const { userService } = require('../services');

const UserLogin = async (req, res) => {
    try {
        const { email, password } = req.body;           
        if (!(email && password)) {
            return res
            .status(400)
            .json({ message: 'Some required fields are missing' });
        }
        const user = await userService.getUserByEmail(email);
        if (!user) return res.status(400).json({ message: 'Invalid fields' });
        const { password: _password, ...userWithoutPassord } = user.dataValues;
        const token = createToken(userWithoutPassord);      
        return res.status(200).json({ token });
    } catch (error) {
        console.error(error);
    }
};

module.exports = {
    UserLogin,
};