const asyncHandler = require("express-async-handler");
const constants = require("../constants");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const admin = require("./adminModel");



const Sign_in = asyncHandler(async (req, res) => {
    const { admin_id, password } = req.body;
    if (!admin_id || !password) {
      res.status(constants.VALIDATION_ERROR).json("all fields are required");
    }
    const userAvailable = await client.findOne({ admin_id: admin_id });
  
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
        .json("admin id number or password is invalid");
      // throw new Error("email or password is not valid");
    }
  });

  module.exports = {Sign_in};
