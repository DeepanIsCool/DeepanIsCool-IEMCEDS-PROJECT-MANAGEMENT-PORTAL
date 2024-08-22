const jwt = require("jsonwebtoken");
require("dotenv").config();

const Faculty = require("./facultyUserModel");

module.exports.facultyChecker = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
    if (err) {
      //console.log(err.message);
      return res.sendStatus(401);
    } else {
      const facultyId = decoded.user; // This should contain the faculty's ID
      try {
        const facultyAvailable = await Faculty.findOne({ _id: facultyId });
        if (facultyAvailable) {
          req.user = facultyAvailable; // Set the faculty object to `req.user`
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
