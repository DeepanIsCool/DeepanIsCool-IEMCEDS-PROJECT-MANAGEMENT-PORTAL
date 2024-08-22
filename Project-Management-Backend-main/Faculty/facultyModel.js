const mongoose = require("mongoose");

const facultySchema = new mongoose.Schema(
  {
    phone: {
      type: String,
      required: true,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    name: {
      type: String,
      required: true,
    },

    employee_id: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const faculty = mongoose.model("faculty", facultySchema);
module.exports = faculty;
