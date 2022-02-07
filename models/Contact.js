const mongoose = require("mongoose");

const Contact = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  favoriteFoods: {
    type: [String],
    required: true,
  },
});

module.exports = mongoose.model("Contact", Contact);
