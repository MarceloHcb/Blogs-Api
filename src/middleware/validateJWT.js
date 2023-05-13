const { JsonWebTokenError } = require('jsonwebtoken');
const { verifyToken } = require('../auth/authFunctions');

const validateJWT = (req, res, next) => {
    try {
const { authorization: token } = req.headers;
if (!token) return res.status(401).json({ message: 'Token not found' });
const payload = verifyToken(token);
req.payload = payload;
console.log('payload', payload);
next();
    } catch (error) {
        if (error instanceof JsonWebTokenError) {
    return res.status(401).json({ message: 'Expired or invalid token' });
}
        console.log(error);
        return res.status(500).json({ message: 'Erro interno' });
    }
};

module.exports = {
    validateJWT,
};