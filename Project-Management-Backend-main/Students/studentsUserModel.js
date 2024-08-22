const mongoose = require("mongoose");

const studentUserSchema = new mongoose.Schema(
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

    password: {
      type: String,
      required: [false, "please add the password"],
    },

    name: {
      type: String,
      required: true,
    },

    enrollment_no: {
      type: String,
      required: true,
      unique: true,
    },
    ProfileImage: {
      type: String,
      required: true,
    },
    resume: {
      type: String,
      // required: true,
    },

    Introduction: {
      type: String,
      default: '', // Default value if not provided
    },

    Skills: {
      type: [String], // Array of strings
      default: [], // Default value if not provided
    },

    Sec: {
      type: String, // Character type, use string with validation
      maxlength: 1, // Ensure only a single character is allowed
      default: '', // Default value if not provided
    },

    roll_number: {
      type: Number,
      default: 0, // Default value if not provided
    
    },
    stream:{
      type: String,
      default: '', // Default value if not provided
    },
    semester:{
      type: String,
      default: '', // Default value if not provided
    },
    year:{
      type: String,
      default: '', // Default value if not provided
    },
    access_token: {
      type: String,
    },
  },
  { timestamps: true }
);

const studentUser = mongoose.model("studentsUsers", studentUserSchema);
module.exports = studentUser;
