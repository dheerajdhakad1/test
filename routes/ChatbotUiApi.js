const express = require('express');
const router = express.Router();
const paramsModel = require('../Model/ChatbotUiSchema');


// GET route to fetch the configuration
router.get('/fetch/ChatbotUi', async (req, res) => {
    try {
        let config = await paramsModel.findOne();
        if (!config) {
            config = await paramsModel.create();
        } else {
            res.json(config);   
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// POST route to update the configuration
router.post('/update/ChatbotUi', async (req, res) => {
    try {
        let config = await paramsModel.findOne();
        if (!config) {
            config = new paramsModel(req.body);
        } else {
            Object.assign(config, req.body);
        }
        const updatedConfig = await config.save();
        res.json(updatedConfig);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
