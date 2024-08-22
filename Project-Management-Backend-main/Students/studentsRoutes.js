//studentRoutes.js
const express = require("express");
const router = express.Router();
const {
  Sign_in,
  Sign_up,
  Sign_upvalidation,
  SendOtpNumber,
  SendOtpEmail,
  ValidateEmailOTP,
  ValidatePhoneNumber,
  studentDetails,
  getAllStudents,
  addstudentresume,
  editStudentProfile,
  getCurrentProject,
  studentProfile

} = require("./studentsController");
const { studentsChecker } = require("./studentsChecker");
const { studentDashboard } = require("./studentsDashboard");
const { facultyChecker } = require("../Faculty/facultyChecker");
const upload = require("../middlewares/multer.middleware");

router.route("/signin").post(Sign_in);
router.route("/signup").post(Sign_up);
router.route("/signupvalidation").post(Sign_upvalidation);
router.route("/signupvalidation/validateEmailOTP").post(ValidateEmailOTP);
router.route("/signupvalidation/validatePhoneNumberOTP").post(ValidatePhoneNumber);
router.route("/signup/SendOtpEmail").post(SendOtpEmail);
router.route("/signup/SendOtpNumber").post(SendOtpNumber);
router.route("/studentDashboard").post(studentsChecker,studentDashboard);
router.route("/studentdetails").post(facultyChecker,studentDetails);
router.route("/addstudentresume").post(studentsChecker,upload.single("resume"),addstudentresume);
router.route("/editStudentProfile").put(studentsChecker,editStudentProfile);
router.route("/getCurrentProject").get(studentsChecker,getCurrentProject);
router.route("/studentProfile").get(studentsChecker,studentProfile);
router.route("/getAllStudents").get(studentsChecker,getAllStudents);

// router.route("/callback").get(pjwt_callback);

module.exports = router;
