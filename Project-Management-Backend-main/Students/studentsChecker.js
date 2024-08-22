const jwt = require("jsonwebtoken");
require("dotenv").config();

const Student = require("./studentsUserModel");

module.exports.studentsChecker = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
    if (err) {
      console.log(err.message);
      return res.sendStatus(401);
    } else {
      const studentId = decoded.user; // This should contain the student's ID
      try {
        const studentAvailable = await Student.findOne({ _id: studentId });
        if (studentAvailable) {
          req.user = studentAvailable; // Set the student object to `req.user`
          next();
        } else {
          return res.status(403).json({ message: "Unauthorized" });
        }
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
      }
    }
  });
};
