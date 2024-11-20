// controllers/job_controller.js

const { extractKeywords } = require('../utils/keyword_extraction');
const Job = require('../models/job');

// Function to get keywords from a job's description
exports.getJobKeywords = async (req, res) => {
  try {
    const jobId = req.params.jobId;

    // Fetch the job from the database
    const job = await Job.findById(jobId);
    console.log('Received request to get keywords for jobId:', jobId);
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    // const jobDescription = job.description;

    // // Extract keywords from job description
    // const jobKeywords = extractKeywords(jobDescription);
    const jobDescription = job.description;
    console.log('Job description:', jobDescription);

    // Extract keywords from job description
    const jobKeywords = extractKeywords(jobDescription);
    console.log('Extracted keywords:', jobKeywords);

    res.status(200).json({
      success: true,
      keywords: jobKeywords,
    });
  } catch (error) {
    console.error('Error extracting job keywords:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while extracting job keywords.',
      details: error.message,
    });
  }
};
