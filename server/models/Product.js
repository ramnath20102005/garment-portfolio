const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  category: String,
  description: String
});

module.exports = mongoose.model("Product", productSchema);