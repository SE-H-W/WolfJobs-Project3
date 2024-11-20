// routes/job.js

const express = require('express');
const jobController = require('../controllers/job_controller');

const router = express.Router();

// Route to get keywords from job description
router.get('/getJobKeywords/:jobId', jobController.getJobKeywords);

module.exports = router;
