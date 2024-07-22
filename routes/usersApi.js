const emailValidator = require('email-validator');
const UserModel = require('../Model/userSchema');
const express = require('express');
const router = express.Router();
// Email validation middleware
const validateEmailMiddleware = (req, res, next) => {
    const email = req.body.email;

    if (!email || !emailValidator.validate(email)) {
        // console.log("1dj")
        return res.status(400).json({ error: 'Invalid email address' });
    }
    next();
};

// Route to handle email submission
router.post('/api/submit-email', validateEmailMiddleware, async (req, res) => {
    const email = req.body.email;
    try {
        const newUser = new UserModel({ email });
        await newUser.save();
        res.status(200).json({ message: 'Email is valid and has been submitted' });
    } catch (error) {
        if (error.code === 11000) { // Duplicate email error
            res.status(400).json({ error: 'Email already exists' });
        } else {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
});
module.exports = router;