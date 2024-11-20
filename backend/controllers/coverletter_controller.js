const CoverLetter = require("../models/coverletter");
const User = require("../models/user");
const pdfParse = require("pdf-parse");
const multer = require("multer");

// Configure multer for file uploads
const upload = multer({
  limits: { fileSize: 15 * 1024 * 1024 }, // 15MB limit
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(pdf)$/)) {
      return cb(new Error("Please upload a PDF file"));
    }
    cb(undefined, true);
  },
});

// Export the upload middleware
exports.upload = upload;

// Parse Cover Letter
exports.parseCoverLetter = async (req, res) => {
  try {
    const { userId } = req.body;

    // Find the user in the database
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User does not exist.",
      });
    }

    const coverLetterId = user.coverLetterId;

    // Fetch the cover letter from the database using the coverLetterId
    const coverLetter = await CoverLetter.findById(coverLetterId);

    if (!coverLetter) {
      return res.status(404).json({
        success: false,
        message: "Cover letter not found.",
      });
    }

    // Parse the PDF buffer data to extract text
    try {
      const data = await pdfParse(coverLetter.fileData);
      const text = data.text;

      // Return the extracted text as a response
      res.status(200).json({
        success: true,
        coverLetterText: text,
      });
    } catch (error) {
      console.error("Error parsing cover letter:", error);
      res.status(500).json({
        success: false,
        message: "An error occurred while processing the cover letter.",
        details: error.message,
      });
    }
  } catch (error) {
    console.error("Error parsing cover letter:", error);
    res.status(500).json({
      success: false,
      message: "Failed to parse cover letter.",
      details: error.message,
    });
  }
};

// Upload Cover Letter
exports.uploadCoverLetter = async (req, res) => {
  try {
    const userId = req.body.id || req.body.userId; // Handle both 'id' and 'userId'

    // Find the user in the database
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    // Check if a cover letter already exists for this user
    const existingCoverLetter = await CoverLetter.findOne({
      applicantId: user._id,
    });

    if (existingCoverLetter) {
      // Delete the existing cover letter
      await existingCoverLetter.remove();
    }

    // Save the new cover letter
    const coverLetter = new CoverLetter({
      applicantId: user._id,
      fileName: req.file.originalname,
      fileData: req.file.buffer,
      contentType: "application/pdf",
    });
    await coverLetter.save();

    // Update the user's coverLetterId and coverLetter filename
    user.coverLetterId = coverLetter._id;
    user.coverLetter = coverLetter.fileName;
    await user.save();

    res.status(201).send({ message: "Cover Letter uploaded successfully" });
  } catch (error) {
    console.error("Error uploading cover letter:", error);
    res.status(400).send({ error: error.message });
  }
};

// Get Cover Letter
exports.getCoverLetter = async (req, res) => {
  try {
    const coverLetter = await CoverLetter.findOne({ applicantId: req.params.id });
    if (!coverLetter) {
      return res.status(404).send({ error: "Cover Letter not found" });
    }
    res.set("Content-Type", "application/pdf");
    // Send file with the correct filename
    res.set("Content-Disposition", `inline; filename=${coverLetter.fileName}`);
    res.send(coverLetter.fileData);
  } catch (error) {
    console.error("Error retrieving cover letter:", error);
    res.status(400).send({ error: error.message });
  }
};
