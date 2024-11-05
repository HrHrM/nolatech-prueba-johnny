const express = require("express");
const router = express.Router();
const reportController = require("../controllers/reportControllers");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/employee/:id", authMiddleware, reportController.getEmployeeReport);

module.exports = router;
