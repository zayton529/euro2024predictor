const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/User');

// Register
router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = new User({ username, password });
        await user.save();
        res.redirect('/login');
    } catch (err) {
        res.send('Error registering user');
    }
});

// Login
router.post('/login', passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login'
}));

// Logout
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;
