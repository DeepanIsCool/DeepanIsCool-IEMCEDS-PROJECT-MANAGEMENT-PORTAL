//otpModelSchema
const mongoose = require("mongoose");

const ContestSchema = new mongoose.Schema({
  number: {
    type: String,
    
  },
  email:{
    type: String,
    
  },
  Number_otp: {
    type: String,
    
  },
  Email_otp: {
    type: String,
    
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 30 // Automatically delete documents after 10 seconds
  }
});

module.exports = mongoose.model("OTP", ContestSchema);
