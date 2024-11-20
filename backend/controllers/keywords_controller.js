// controllers/keywords_controller.js

const { extractKeywords } = require('../utils/keyword_extraction');
// const { extractTextFromResume } = require('../utils/resume_parser');
const { extractTextFromResumeBuffer } = require('../utils/resume_parser');

const Job = require('../models/job');
const User = require('../models/user');
const Resume = require('../models/resume');

exports.suggestResumeKeywords = async (req, res) => {
    try {
      const { userId, jobId } = req.params;
      console.log('Received request for suggestResumeKeywords');
      console.log('userId:', userId);
      console.log('jobId:', jobId);
  
      // Fetch job and extract keywords
      const job = await Job.findById(jobId);
      if (!job) {
        console.log('Job not found for jobId:', jobId);
        return res.status(404).json({ error: 'Job not found' });
      }
      console.log('Job description:', job.description);
  
      const jobKeywords = extractKeywords(job.description);
      console.log('Extracted job keywords:', jobKeywords);
  
      // Fetch user
      const user = await User.findById(userId);
      if (!user) {
        console.log('User not found for userId:', userId);
        return res.status(404).json({ error: 'User not found' });
      }
      if (!user.resumeId) {
        console.log('Resume not found for userId:', userId);
        return res.status(400).json({ error: 'Resume not uploaded' });
      }
      console.log('User resumeId:', user.resumeId);
  
      // Fetch the resume from the database
      const resume = await Resume.findById(user.resumeId);
      if (!resume) {
        console.log('Resume not found in database for resumeId:', user.resumeId);
        return res.status(404).json({ error: 'Resume not found in database' });
      }
  
      // Extract text from the resume's fileData
      const resumeText = await extractTextFromResumeBuffer(resume.fileData);
      console.log('Extracted resume text:', resumeText);
  
      const resumeKeywords = extractKeywords(resumeText);
      console.log('Extracted resume keywords:', resumeKeywords);
  
      // Identify missing keywords
      const missingKeywords = jobKeywords.filter(
        (keyword) => !resumeKeywords.includes(keyword)
      );
      console.log('Missing keywords:', missingKeywords);
  
      res.status(200).json({
        success: true,
        missingKeywords,
      });
    } catch (error) {
      console.error('Error suggesting resume keywords:', error);
      res.status(500).json({
        success: false,
        message: 'An error occurred while suggesting resume keywords.',
        details: error.message,
      });
    }
  };
