const express = require("express");
const router = express.Router();
const { CreateProject, EditProject, getProjects, applyForProject, approveApplication,getAllApplications, deleteProject,getAllProjects, getProjectById } = require("../Projects/projectController");
const { facultyChecker } = require("../Faculty/facultyChecker");
const { studentsChecker } = require("../Students/studentsChecker");
//const { adminChecker } = require("../Admin/adminChecker");

router.route("/createProject").post(facultyChecker,CreateProject);
router.route("/editProject/:id").put(facultyChecker,EditProject);
router.route("/getProjects").get(facultyChecker,getProjects);
// router.route("/getProjects/:id").get(studentsChecker,getProjects);
router.route("/applyforProject").post(studentsChecker,applyForProject);
router.route("/approveforProject").post(facultyChecker,approveApplication);
router.route("/getallapplications").get(facultyChecker,getAllApplications);
router.route("/deleteProject").delete(facultyChecker,deleteProject);
router.route("/getAllProjects").get(studentsChecker,getAllProjects);
// router.route("/getProjectById").post(studentsChecker,getProjectById);
router.route("/getProjectById").post(facultyChecker,getProjectById);


module.exports = router;