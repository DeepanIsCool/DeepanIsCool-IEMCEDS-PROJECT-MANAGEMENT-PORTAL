
const { SNSClient, PublishCommand } = require("@aws-sdk/client-sns")
const { fromEnv } = require("@aws-sdk/credential-provider-env")
const constants = require("../constants")
const snsClient = new SNSClient({
  region: process.env.AWS_REGION,
  credentials: fromEnv(),
})

const otpRequests = {}

// Get OTP on Mobile number
exports.sendOtp = async (req , res, mobileNumber, otpCode) => {
  try {
    const currentTime = Date.now()
    if (
      otpRequests[mobileNumber] &&
      currentTime - otpRequests[mobileNumber] < 30000
    ) {
      throw new Error(
        "OTP request throttled. Please wait before requesting again."
      )
    }

    const params = {
      Message: `Your OTP is ${otpCode}`,
      PhoneNumber: mobileNumber,
    }

    otpRequests[mobileNumber] = currentTime
    const otpstatus=await snsClient.send(new PublishCommand(params))
    return true;
  } catch (err) {
    // console.error("Error sending OTP via SMS:", err.message)
    // if(err.includes("Please wait before requesting again")) {
        console.log(err.message)
        res.status(constants.REQUEST_TIMEOUT).json("Please wait before requesting again")
    // }
  
    // res.json(err)
    // throw new Error(err)
    
  }
}