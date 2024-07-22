const express = require("express");
const router = express.Router();
const Parameters = require("../Model/chatBotConfigSchema");

// Route to update the chatbot configuration
router.post("/ChatbotConfig", async (req, res) => {
  try {
    const { apikey, maxTokens, temperature, topP, selectedModel } = req.body;
    // Update the document with the specified max_tokens and temperature from req.body
    const updatedParams = await Parameters.findOneAndUpdate(
      {},
      { model: selectedModel, API_key: apikey, max_tokens: maxTokens, temperature: temperature, top_p: topP },
      { new: true, upsert: true } // Create a new document if none exists
    );

    return res
      .status(200)
      .json({ message: "Parameters updated successfully", updatedParams });
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
});

// Route to fetch the last saved chatbot configuration
router.get("/ChatbotConfig", async (req, res) => {
  try {
    const lastSavedConfig = await Parameters.findOne({}).sort({ _id: -1 });

    if (!lastSavedConfig) {
      return res.status(404).json({ error: "No configuration found" });
    }

    return res.status(200).json({ lastSavedConfig });
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
