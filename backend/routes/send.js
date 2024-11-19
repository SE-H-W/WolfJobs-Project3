const express = require("express");
const {
  sendJobAcceptanceEmail,
  sendJobRejectionEmail,
  sendJobSelectionEmail,
  resetPassword,
  forgotPassword,
} = require("../controllers/email_controller");

const router = express.Router();

router.post("/send-job-acceptance-email", sendJobAcceptanceEmail);
router.post("/send-job-rejection-email", sendJobRejectionEmail);
router.post("/selection-email", sendJobSelectionEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

module.exports = router;
