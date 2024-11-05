const express = require("express");
const router = express.Router();
const feedbackController = require("../controllers/feedbackControllers");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, feedbackController.createFeedback);

module.exports = router;
