const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const questionsSchema = new Schema({
  question: { type: String },
  answer: [{ type: String }],
  correctAnswerIndex: [{ type: Number }],
  explanation: { type: String },
});

module.exports = mongoose.model("Question", questionsSchema);
