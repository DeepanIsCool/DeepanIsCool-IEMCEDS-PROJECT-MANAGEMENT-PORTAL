//facultyController.js

const asyncHandler = require("express-async-handler");
const { sendOtp } = require("../OTPs/otpUtils");
const otpModel = require("../OTPs/otpModel")
const facultyUser = require("./facultyUserModel");
const constants = require("../constants");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const faculty = require("./facultyModel");

const Sign_in = asyncHandler(async (req, res) => {
  const { employee_id, password } = req.body;
  if (!employee_id || !password) {
    res.status(constants.VALIDATION_ERROR).json("all fields are required");
  }
  const userAvailable = await facultyUser.findOne({ employee_id: employee_id });

  if (
    userAvailable &&
    (await bcrypt.compare(password, userAvailable.password))
  ) {
    const accessToken = jwt.sign(
      {
        user: {
          _id: userAvailable._id,
      
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "90m" }
    );
    userAvailable.access_token = accessToken;
    await userAvailable.save();
    res.status(constants.OK).json({ accessToken });
    // console.log(userAvilable)
  } else {
    res
      .status(constants.UNAUTHORIZED)
      .json("employee id number or password is invalid");
    // throw new Error("email or password is not valid");
  }
});

const Sign_up = asyncHandler(async (req, res) => {
    const { name, email, password, phone, employee_id } = req.body;
    if (!name || !email || !password || !phone || !employee_id) {
      return res
        .status(constants.VALIDATION_ERROR)
        .json("all fields are required");
    }
    const userAvailable = await facultyUser.findOne({
      $or: [{ email: email }, { employee_id: employee_id }, { phone: phone }],
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
        employee_id: employee_id,
        ProfileImage: "https://cdn-icons-png.flaticon.com/512/9131/9131529.png",
      };
      const user = await facultyUser.create(New_user);
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
    const { employee_id } = req.body;
  console.log(employee_id)
    if (!employee_id) {
      res
        .status(constants.VALIDATION_ERROR)
        .json("please provide your employee id no");
    } else {
      const userAvailable1 = await faculty.findOne({
        employee_id: employee_id,
      });
      console.log(userAvailable1)
      if (userAvailable1) {
        res
          .status(constants.OK)
          .json({
            Name: userAvailable1.name,
            email: userAvailable1.email,
            phone_no: userAvailable1.phone,
          });
          console.log(userAvailable1);
        
      }
      else {
        res
         .status(constants.NOT_FOUND)
         .json({ message: "employee id is not registered" });
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

    const user2=await faculty.findOne({email:email})
 
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
              email: user2.email,
            });
            if (emailAvilable2) {
              emailAvilable2.Email_otp = otp1;
              await emailAvilable2.save();
            } else {
              await otpModel.create({
                email: user2.email,
                Email_otp: otp1,
              });
            }
            res.status(constants.OK).json("OTP SENT SUCCESSFULLY IN EMAIL");
          }
        };
        try {
          await sendResetPasswordEmail(user2.email);
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

const getAllFaculty=asyncHandler(async(req,res)=>{
  const facultydata=await facultyUser.find();
  res.json(facultydata);
})

const facultyProfile = asyncHandler(async (req, res) => {
  try {
    // Extract the ID from the authenticated user
    const id = req.user._id;

    // Fetch and return the specific student if id is provided
    if (id) {
      const user = await facultyUser.findById(id);
      if (user) {
        return res.status(constants.OK).json(user);
      } else {
        return res.status(constants.NOT_FOUND).json({ message: 'User not found' });
      }
    } else {
      // Fetch and return all students if no id is provided (optional, adjust as needed)
      const users = await facultyUser.find({});
      return res.status(constants.OK).json(users);
    }
  } catch (error) {
    console.error('Error fetching faculty details:', error);
    res.status(constants.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
  }
});

const editFacultyProfile = asyncHandler(async (req, res) => {
  try {
    // Destructure the fields from the request body
    const { phone, email, password, name, ProfileImage, Introduction, Skills, department, employee_id } = req.body;
    
    // Extract the faculty ID from the authenticated user
    const facultyId = req.user._id; // Assuming req.user contains authenticated user data

    // Fetch the faculty using the provided faculty ID
    const faculty = await facultyUser.findById(facultyId);

    // Check if the faculty exists
    if (!faculty) {
      return res.status(constants.NOT_FOUND).json({ message: "Faculty not found" });
    }

    // Update fields if they are provided in the request body
    if (phone) faculty.phone = phone;
    if (email) faculty.email = email;
    if (password) faculty.password = await bcrypt.hash(password, 10); // Hash the new password before saving
    if (name) faculty.name = name;
    if (ProfileImage) faculty.ProfileImage = ProfileImage;
    // if (Introduction) faculty.Introduction = Introduction;
    // if (Skills) faculty.Skills = Skills;
    // if (department) faculty.department = department;
    if (employee_id) faculty.employee_id = employee_id;

    // Save the updated faculty profile
    await faculty.save();

    // Return a success response
    res.status(constants.OK).json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(constants.INTERNAL_SERVER_ERROR).json({ message: "Internal server error" });
  }
});

module.exports = {Sign_in,Sign_up,Sign_upvalidation, SendOtpNumber,SendOtpEmail,ValidateEmailOTP,ValidatePhoneNumber,getAllFaculty,facultyProfile, editFacultyProfile};
