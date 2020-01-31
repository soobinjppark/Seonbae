const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('config');
const { check, validationResult } = require('express-validator');

const UserInfo = require('../models/UserInfo');


// POST api/users
// Registration
// Public access

router.post('/', [
    check('username', 'Username is required').not().isEmpty(),
    check('email', 'A valid email is required').isEmail(),
    check('password').isLength({ min: 8})
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { name, username, email, school, password } = req.body;

    try {
        let user = await UserInfo.findOne({ username });
        if (user) {
            return res.status(400).json({ msg: 'User already exists'});
        }
        let userEmail = await UserInfo.findOne({ email });
        if (userEmail) {
            return res.status(400).json({ msg: 'Email already exists'});
        }

        user = new UserInfo ({
            name,
            username,
            email,
            school,
            password
        });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();
        const identifier = {
            user: {
                id: user.id
            }
        }

        jwt.sign(identifier, config.get('jwtSecret'), {
            expiresIn: 36000
        }, (err, token) => {
            if (err) throw err;
            res.json({token})
        })
        
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;