const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;
const JWT_CONFIG = { 
    algorithm: 'HS256',
    expiresIn: '1h', 
};
const createToken = (email) => jwt.sign({ username: email }, JWT_SECRET, JWT_CONFIG);
const verifyToken = (token) => jwt.verify(token, JWT_SECRET);

module.exports = {
    createToken,
    verifyToken,
};