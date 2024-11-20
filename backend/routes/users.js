const express = require("express");

const router = express.Router();

const passport = require("passport");

const usersController = require("../controllers/users_controller");

// import the resume controller
const resumeController = require("../controllers/resume_controller");
const coverLetterController=require("../controllers/coverletter_controller")
router.get("/profile", passport.checkAuthentication, usersController.profile);

router.get("/sign-up", usersController.signUp);

router.get("/sign-in", usersController.signIn);

router.post("/create", usersController.create);

//Use passport as a middleware to authenticate
router.post(
  "/create-session",
  passport.authenticate("local", { failureRedirect: "/users/sign-in" }),
  usersController.createSession
);

// Add the resume upload route
router.post(
  "/uploadResume",
  resumeController.upload.single("resume"), 
  resumeController.uploadResume // The controller function to handle the resume upload
);

// router.post(
//   "/uploadcoverletter",
//   resumeController.upload.single("coverletter"), 
//   coverLetterController.uploadCoverLetter
// );

router.post(
  "/uploadCoverLetter",
  coverLetterController.upload.single("coverletter"), 
  coverLetterController.uploadCoverLetter
);


// router.post("/forgotPassword", usersController.forgotPassword);
router.get("/applicantresume/:id", resumeController.getResume);

router.get("/sign-out", usersController.destroySession);

router.get("/ping", resumeController.ping);

module.exports = router;
