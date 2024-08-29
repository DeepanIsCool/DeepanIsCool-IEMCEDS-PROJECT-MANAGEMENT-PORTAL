//authController.js
const asyncHandler = require("express-async-handler");
const { sendOtp } = require("../OTPs/otpUtils");
const otpModel = require("../OTPs/otpModel")
const Student  = require("./studentsModel")
const StudentUser = require("./studentsUserModel");
const Project = require("../Projects/projectModel");
const constants = require("../constants");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Stream } = require("nodemailer/lib/xoauth2");

const Sign_in = asyncHandler(async (req, res) => {
  const { enrollment_no, password } = req.body;
  if (!enrollment_no || !password) {
    return res.status(constants.VALIDATION_ERROR).json({ message: "All fields are required" });
  }
  
  const userAvailable = await StudentUser.findOne({ enrollment_no });

  if (userAvailable && await bcrypt.compare(password, userAvailable.password)) {
    const accessToken = jwt.sign(
      { user: { _id: userAvailable._id } },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "90m" }
    );
    
    userAvailable.access_token = accessToken;
    await userAvailable.save();
    return res.status(constants.OK).json({ accessToken });
  } else {
    return res.status(constants.UNAUTHORIZED).json({ message: "Enrollment number or password is invalid" });
  }
});

const Sign_up = asyncHandler(async (req, res) => {
    const { name, email, password, phone, enrollment_no } = req.body;
    if (!name || !email || !password || !phone || !enrollment_no) {
      return res
        .status(constants.VALIDATION_ERROR)
        .json("all fields are required");
    }
    const userAvailable = await StudentUser.findOne({
      $or: [{ email: email }, { enrollment_no: enrollment_no }, { phone: phone }],
    });
    if (userAvailable) {
      return res.status(constants.CONFLICT).json("user already registered");
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const New_user = {
        name: name,
        email: email,
        password: hashedPassword,
        phone: phone,
        enrollment_no: enrollment_no,
        Stream: StudentUser.Stream,
        ProfileImage: "https://cdn-icons-png.flaticon.com/512/9131/9131529.png",
      };
      const user = await StudentUser.create(New_user);
      const accessToken = jwt.sign(
        {
          user: {
            _id: user._id,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "90m" }
      );
      user.access_token = accessToken;
      await user.save();
  
      user
        ? res.json({accessToken: accessToken})
        : (e) => {
            res.json(e);
          };
    }
  });

const Sign_upvalidation = asyncHandler(async (req, res) => {
    const { EnrollmentNo } = req.body;
  console.log(EnrollmentNo)
    if (!EnrollmentNo) {
      res
        .status(constants.VALIDATION_ERROR)
        .json("please provide your enrollment no");
    } else {
      const userAvailable1 = await Student.findOne({
        Enrollment_No: EnrollmentNo,
      });
      console.log(userAvailable1)
      if (userAvailable1) {
        res
          .status(constants.OK)
          .json({
            Name: userAvailable1.Name,
            email: userAvailable1.Email,
            phone_no: userAvailable1.Mobile_Number,
          });
        
      }
      else {
        res
         .status(constants.NOT_FOUND)
         .json({ message: "Enrollment No is not registered" });
      }
    }
  });

const SendOtpNumber = asyncHandler(async (req, res) => {
  const { number } = req.body;
  // console.log(req.body);
  if (!number) {
    return res
      .status(constants.VALIDATION_ERROR)
      .json("all fields are required");
  }
  const otp = Math.floor(1000 + Math.random() * 9000);
  // console.log(otp);
  const otpStatus = await sendOtp(req, res, "+91" + number, otp);
  console.log(otpStatus);

  if (otpStatus === true) {
    const numberAvilable = await otpModel.findOne({ number });
    if (numberAvilable) {
      numberAvilable.Number_otp = otp;
      numberAvilable.number = number;
      await numberAvilable.save();
    } else {
      await otpModel.create({ number: number, Number_otp: otp });
    }
    res.json({ message: "OTP sent successfully" });
  }
});

const SendOtpEmail=asyncHandler(async(req,res)=>{
  const{email}=req.body;
  if(!email)
    {
      return res.status(constants.VALIDATION_ERROR).json("email is required");
    }
   
    const user2=await Student.findOne({Email:email})
    if(user2)
      {
        let otp1 = 0;
        console.log(otp1);
  
        const sendResetPasswordEmail = async (eMail) => {
          const transporter = nodemailer.createTransport({
            
              host: "smtp.gmail.com",
              port: 587,
              tls: {
                  rejectUnauthorized: false,
                  minVersion: "TLSv1.2"
              },
            auth: {
              user: "sadhukhandeepan@gmail.com",
              pass: "opie ojxq xdrv ndkz",
            },
          });
          otp1 = Math.floor(1000 + Math.random() * 9000);
          const mailOptions = {
            from: "sadhukhandeepan@gmail.com",
            to: eMail,
            subject: "Your OTP for email is :",
            text: `Your OTP IS ${otp1}`,
          };
          console.log(otp1);
  
          const sendOTP1 = await transporter.sendMail(mailOptions);
          if (sendOTP1) {
            const emailAvilable2 = await otpModel.findOne({
              email: user2.Email,
            });
            if (emailAvilable2) {
              emailAvilable2.Email_otp = otp1;
              await emailAvilable2.save();
            } else {
              await otpModel.create({
                email: user2.Email,
                Email_otp: otp1,
              });
            }
            res.status(constants.OK).json("OTP SENT SUCCESSFULLY IN EMAIL");
          }
        };
        try {
          await sendResetPasswordEmail(user2.Email);
        } catch (err) {
          console.log(err.message);
        }
      }
      else
      {
        res.json({message:"user is not present"});
      }
  })

  
const ValidateEmailOTP=asyncHandler(async(req,res)=>{
    const {Email,otp}=req.body;
    
    if(!Email ||!otp){
        return res.status(constants.VALIDATION_ERROR).json("all fields are required");
    }
    const verifyOtp1 = await otpModel.findOne({email:Email});
    console.log(verifyOtp1)
    if(verifyOtp1)
      {
        if (verifyOtp1.Email_otp === otp) {
          res
           .status(constants.ACCEPTED)
           .json({ message: "OTP verified successfully" });
        } else {
          res
           .status(constants.UNAUTHORIZED)
           .json({ message: "OTP is not verified" });
        }
      }
      else {
        res.status(constants.REQUEST_TIMEOUT).json({ message: "OTP is expired" });
      }
    })
  
  
const ValidatePhoneNumber=asyncHandler(async(req,res)=>{
      const {Number,otp}=req.body;
      if (!Number || !otp) {
        return res
          .status(constants.VALIDATION_ERROR)
          .json("all fields are required");
      }
     const verifyOTP2=await otpModel.findOne({number: Number});
     {
      if(verifyOTP2) {
      if(verifyOTP2.Number_otp===otp)
        {
          res
           .status(constants.ACCEPTED)
           .json({ message: "OTP1 verified successfully" });
        }
        else{
          res
          .status(constants.UNAUTHORIZED)
          .json({ message: "OTP is not verified" });
    
        }
     }
     else{
      res.status(constants.REQUEST_TIMEOUT).json({ message: "OTP is expired" });
     }
    }
    
    })

const studentDetails = asyncHandler(async (req, res) => {
      try {
        const { id } = req.body; 
    
        if (id) {
          // Fetch and return the specific student if id is provided
          const user = await StudentUser.findById(id);
          if (user) {
            return res.status(constants.OK).json(user);
          } else {
            return res.status(constants.NOT_FOUND).json({ message: 'User not found' });
          }
        } else {
          // Fetch and return all students if no id is provided
          const users = await StudentUser.find({});
          return res.status(constants.OK).json(users);
        }
      } catch (error) {
        console.error('Error fetching student details:', error);
        res.status(constants.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
      }
    });

    const studentProfile = asyncHandler(async (req, res) => {
      try {
        // Extract the ID from the authenticated user
        const id = req.user._id;
    
        // Fetch and return the specific student if id is provided
        if (id) {
          const user = await StudentUser.findById(id);
          if (user) {
            return res.status(constants.OK).json(user);
          } else {
            return res.status(constants.NOT_FOUND).json({ message: 'User not found' });
          }
        } else {
          // Fetch and return all students if no id is provided (optional, adjust as needed)
          const users = await StudentUser.find({});
          return res.status(constants.OK).json(users);
        }
      } catch (error) {
        console.error('Error fetching student details:', error);
        res.status(constants.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
      }
    });

const getAllStudents = asyncHandler(async (req, res) => {
  try {
    const students = await StudentUser.find({});
    if (students.length === 0) {
      return res.status(constants.NOT_FOUND).json({ message: 'No students found' });
    }
    return res.status(constants.OK).json(students);
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(constants.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
  }
})

const addstudentresume = asyncHandler(async (req, res) => {
  try{
    const resume = req.file?.path;
    const student = await StudentUser.findById(req.user._id);
    if(!student){
      return res.status(constants.NOT_FOUND).json({ message: 'Student not found' });
    }
    student.resume = resume;
    await student.save();
    res.status(constants.OK).json({ message: 'Resume added successfully' });


  }catch(error){
    console.error('Error adding student resume:', error);
    res.status(constants.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
}})

const editStudentProfile = asyncHandler(async (req, res) => {
  try {
    const { phone, email, password, name, ProfileImage, Introduction, Skills, Sec, roll_number, resume,stream,year,semester } = req.body;
    const studentId = req.user._id; // Assuming req.user contains authenticated user data
    console.log(studentId);

    // Fetch the student using the provided student ID
    const student = await StudentUser.findById(studentId);

    // Check if the student exists
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Update fields if they are provided in the request body
    if (phone) student.phone = phone;
    if (email) student.email = email;
    if (password) student.password = await bcrypt.hash(password, 10); // Hash the new password before saving
    if (name) student.name = name;
    // if (ProfileImage) student.ProfileImage = ProfileImage;/
    if (Introduction) student.Introduction = Introduction;
    if (Skills) student.Skills = Skills;
    if (Sec) student.Sec = Sec;
    if (roll_number) student.roll_number = roll_number;
    if (stream) student.stream = stream;
    if (year) student.year = year;
    if (semester) student.semester = semester
    if (resume) student.resume = resume;

    // Save the updated student profile
    await student.save();

    // Return a success response
    res.status(200).json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

const getCurrentProject = asyncHandler(async (req, res) => {
  try {
    const studentId = req.user._id; // Extracted from the auth token

    // Find projects where the studentId is part of the studentTeam
    const projects = await Project.find({ studentTeam: studentId });

    // If no projects are found
    if (projects.length === 0) {
      return res.status(constants.NOT_FOUND).json({ message: "No projects found for this student" });
    }

    // Return the found projects
    res.status(constants.OK).json(projects);
  } catch (error) {
    console.error("Error fetching current projects:", error);
    res.status(constants.INTERNAL_SERVER_ERROR).json({ message: "Internal server error" });
  }
});



module.exports = {Sign_in,Sign_up,Sign_upvalidation, SendOtpNumber,SendOtpEmail,ValidateEmailOTP,ValidatePhoneNumber,studentDetails,getAllStudents,addstudentresume, editStudentProfile, getCurrentProject,studentProfile};