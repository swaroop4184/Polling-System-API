const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the schema for individual options
const OptionSchema = new Schema({
  text: String,
  votes: { type: Number, default: 0 },
  link_to_vote: String
});

// Define the schema for the poll which includes an array of options
const PollSchema = new Schema({
  title: String,
  options: [OptionSchema]
});

// Create and export the Poll model based on the PollSchema
exports.Poll = mongoose.model('Poll', PollSchema);
