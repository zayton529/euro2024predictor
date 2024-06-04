const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Save Predictions
router.post('/save', async (req, res) => {
    if (!req.isAuthenticated()) {
        return res.status(401).send('You must be logged in to save predictions');
    }
    try {
        req.user.predictions = req.body.predictions;
        await req.user.save();
        res.send('Predictions saved');
    } catch (err) {
        res.status(500).send('Error saving predictions');
    }
});

// View Predictions
router.get('/', async (req, res) => {
    try {
        const users = await User.find({}, 'username predictions');
        res.json(users);
    } catch (err) {
        res.status(500).send('Error fetching predictions');
    }
});

module.exports = router;
