const express = require("express");
const questionsController = require("../controllers/questions");
const router = express.Router();

router.get("/questions", questionsController.getTestQuestions);

process.env.DATABASE_URL;

module.exports = router;
