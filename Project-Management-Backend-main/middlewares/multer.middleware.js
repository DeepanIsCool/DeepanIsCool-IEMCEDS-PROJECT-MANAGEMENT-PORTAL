const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "Resumes/"); // Upload files to the 'uploads' directory
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original filename for uploaded files
  },
});

const upload = multer({  limits: { fileSize: 100 * 1024 * 1024 }, storage: storage });

module.exports = upload;