const express = require("express");
const router = express.Router();
const Client = require("../Model/clients");
const bcrypt = require("bcrypt");


router.post("/signup", async (req, res) => {
  try {
    const { email, password, clientName } = req.body;

    // Check if user already exists
    const user = await Client.findOne({ email });
    if (user) {
      return res.status(400).json({ error: "Email already in use" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = { email, password: hashedPassword, clientName };
    const client = await Client.create(newUser);

    if (client) {
      return res.status(201).json({ message: "User created", client_id: client._id });
    } else {
      return res.status(500).json({ error: "Failed to create user" });
    }
  } catch (error) {
    console.error("Error during signup:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
