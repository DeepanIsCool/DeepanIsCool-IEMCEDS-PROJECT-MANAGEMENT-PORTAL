//studentmodelschema
const mongoose = require("mongoose");
const { Stream } = require("nodemailer/lib/xoauth2");

const studentSchema = new mongoose.Schema(
{
    Enrollment_No : {
        type: Number,
        required: true,
    },
    Subject :{
        type: String,
        required: true,
    },
    Degree : {
        type: String,
        required: true,
    },
    Roll_No:{
        type: Number,
        required: true,
    },
    Name:{
        type: String,
        required: true,
    },
    Sex:{
        type: String,
        required: true,
        enum: ['M','F']
    },
    Mobile_Number:{
        type: Number,
        required: true,
    },
    Guardian_Mobile_Number:{
        type: Number,
    },
    Father_Name:{
        type: String,
        required: true,
    },
    Email:{
        type: String,
        required: true,
    },

}
  );
  
  module.exports =  mongoose.model("Students", studentSchema);;