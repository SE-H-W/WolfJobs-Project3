// const express = require("express");
// // const {
// //   parseCoverLetter,
// //   uploadCoverLetter,
// //   getCoverLetter,
// // } = require("../controllers/coverletter_controller"); // Adjust the controller file name if needed
// // const { upload } = require("../controllers/resume_controller"); // Reuse the `multer` upload middleware
// const {
//   parseCoverLetter,

// } = require("../controllers/coverletter_controller"); // Adjust the controller file name if needed
// // const { upload } = require("../controllers/resume_controller"); // Reuse the `multer` upload middleware

// const router = express.Router();

// // Route to parse a cover letter
// router.post("/parseCoverLetter", parseCoverLetter);

// // Route to upload a cover letter
// // router.post("/uploadcoverletter", upload.single("coverletter"), uploadCoverLetter);

// // // Route to get a cover letter
// // router.get("/getCoverLetter/:id", getCoverLetter);

// module.exports = router;


const express = require("express");
const coverLetterController = require("../controllers/coverletter_controller");

const router = express.Router();

// Import the upload middleware from the coverLetterController
const { upload } = coverLetterController;

// Route to upload a cover letter
router.post(
  "/uploadCoverLetter",
  upload.single("coverletter"),
  coverLetterController.uploadCoverLetter
);

// Route to parse a cover letter
router.post("/parseCoverLetter", coverLetterController.parseCoverLetter);

// Route to get a cover letter
router.get("/getCoverLetter/:id", coverLetterController.getCoverLetter);

module.exports = router;
