const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;
const JWT_CONFIG = { 
    algorithm: 'HS256',
    expiresIn: '1h', 
};
const verifyToken = (token) => jwt.verify(token, JWT_SECRET);
const createToken = (payload) => jwt.sign({ data: payload }, JWT_SECRET, JWT_CONFIG);

module.exports = {
    createToken,
    verifyToken,
};