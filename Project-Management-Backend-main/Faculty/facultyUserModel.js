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

    password: {
      type: String,
      required: [false, "please add the password"],
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
    ProfileImage: {
      type: String,
      default: "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png",
    },
    access_token: {
      type: String,
      default:null,
    
    },
    Introduction: {
      type: String,
      default: '', // Default value if not provided
    },
    Skills: {
      type: [String], // Array of strings
      default: [], // Default value if not provided
    },
    department: {
      type: String,
      default: '', // Default value if not provided
    },
  },
  { timestamps: true }
);

const facultyUser = mongoose.model("facultyuser", facultySchema);
module.exports = facultyUser;
