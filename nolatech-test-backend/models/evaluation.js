const mongoose = require("mongoose");

const evaluationSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  score: { type: Number, required: true },
  feedback: { type: String },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Evaluation", evaluationSchema);
