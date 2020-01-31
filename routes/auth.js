const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('config');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const UserInfo = require('../models/UserInfo');

// GET api/auth
// Private access
router.get('/', auth, async (req, res) => {
    try {
        const user = await UserInfo.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
}); 

// POST api/auth
// Public access
router.post('/', [
    check('username', 'Username is required').exists(),
    check('password', 'Password is required').exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    } 

    const { username, password } = req.body;

    try {
        // Finds user by username
        let user = await UserInfo.findOne({ username });

        if (!user) {
            return res.status(400).json({ msg: 'No user exists with the entered username.'});
        }

        correctPassword = await bcrypt.compare(password, user.password);
        if (!correctPassword) {
            return res.status(400).json({ msg: 'That password is incorrect. Please try again.'});
        }

        // Identifies by unique ID
        const identifier = {
            user: {
                id: user.id
            }
        };

        jwt.sign(identifier, config.get('jwtSecret'), {
            expiresIn: 36000
        }, (err, token) => {
            if (err) throw err;
            res.json({token});
        })

    } catch (err) {
        console.error(err.message);
        res.status(500).send('There is an error with the server. Please try again.');
    }
});

module.exports = router;