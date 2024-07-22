const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const parametersSchema = new mongoose.Schema({
  clientId: {
    type: Schema.ObjectId,
    ref: "ClientModel",
    required: [false, "Client ID is required"],
  },
  model: {
    type: String,
    default: "gpt-3.5-turbo",
  },
  max_tokens: {
    type: Number,
    default: 150,
  },
  temperature: {
    type: Number,
    default: 0.7,
  },
  top_p: {
    type: Number,
    default: 1.0,
  },
  API_key: {
    type: String,
    required: [true, "API key is required"],
  },
});
module.exports = mongoose.model("Parameter", parametersSchema);
