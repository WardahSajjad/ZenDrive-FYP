const jwt = require('jsonwebtoken');
const secretKey = require('../config.js')


const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Bearer Token

    if (!token) {
        return res.status(403).send({ msg: 'No token provided.' });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).send({ msg: 'Unauthorized!' });
        }

        req.userId = decoded.id; // Add the user ID to the request
        next();
    });
};

module.exports = verifyToken;
