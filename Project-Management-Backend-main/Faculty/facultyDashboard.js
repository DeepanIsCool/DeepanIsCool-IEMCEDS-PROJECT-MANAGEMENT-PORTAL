const { response } = require("express");
const asyncHandler = require("express-async-handler");

const facultyDashboard = asyncHandler(async (req, res) => {res.json({ message: "Faculty Dashboard" })});
module.exports = { facultyDashboard };