const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  evaluationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Evaluation",
    required: true,
  },
  comment: { type: String, required: true },
});

module.exports = mongoose.model("Feedback", feedbackSchema);
