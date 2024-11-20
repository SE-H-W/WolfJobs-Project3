const express = require('express');
const keywordsController = require('../controllers/keywords_controller');
const router = express.Router();

// Route to suggest missing keywords
router.get('/suggestResumeKeywords/:userId/:jobId', keywordsController.suggestResumeKeywords);

module.exports = router;
