const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
    const token = req.header('x-auth-token');
    if (!token) {
        // Accept token
        return res.status(401).json({ msg: 'Authorization denied: Missing token'});
    }
    try {
        // Verify token
        const decodedToken = jwt.verify(token, config.get('jwtSecret'));

        req.user = decodedToken.user;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Invalid token' })
    }
}