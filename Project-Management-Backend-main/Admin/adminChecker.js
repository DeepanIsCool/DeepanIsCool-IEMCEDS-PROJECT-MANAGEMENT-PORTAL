const jwt = require("jsonwebtoken");
require("dotenv").config();

const Admin = require("../Admin/adminModel");

module.exports.adminChecker = async (req, res, next) => {

  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
    if (err) {
      console.log(err.message);
      return res.sendStatus(401);
    } else {
      const adminId = decoded.user; // Assuming `user` contains the admin ID
      // console.log(adminId)
      try {
        const adminAvailable = await Admin.findOne({ _id: adminId });
        // console.log(adminAvailable)
        if (adminAvailable) {
          req.user = adminAvailable; // Set the admin object to `req.user`
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
