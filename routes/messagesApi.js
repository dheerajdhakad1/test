const express = require("express");
const router = express.Router();
const session = require('express-session');
const MsgModel = require("../Model/messagesSchema");
const ConversationModel = require("../Model/conversationSchema");
const bodyParser = require('body-parser');
router.use(bodyParser.json({ limit: '10mb' }));

router.use(session({
    secret: 'your_secret_key', // Replace with a strong secret key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set secure to true in production when using HTTPS
}));

async function addMessageToConversation(userId, sender, messageText) {
    try {
        // Find the conversation by user ID
        let conversation = await ConversationModel.findOne({ userId: userId });
        if (!conversation) {
            // If conversation not found, create a new one
            conversation = new ConversationModel({
                userId: userId,
                headMessage: null
            });
        }

        // Create a new message object
        const newMessage = new MsgModel({
            sender: sender,
            userId: userId,
            message: messageText,
            timestamp: new Date(),
            nextMessage: conversation.headMessage // Link to the previous head message
        });

        // Save the new message
        await newMessage.save();

        // Update the conversation's headMessage to the new message
        conversation.headMessage = newMessage._id;

        // Save the updated conversation
        await conversation.save();

        console.log('Message added successfully');
    } catch (error) {
        console.error('Error adding message:', error.message);
    }
}

router.post("/messages", function(req, res) {
    try {
        const userId = req.session.userId;
        addMessageToConversation(userId, req.body.from, req.body.text)
            .then(() => res.status(200).send('Message added successfully'))
            .catch(error => res.status(500).send('Error adding message'));
    } catch (error) {
        console.log(error);
        res.status(500).send('Error processing request');
    }
});

module.exports = router;
