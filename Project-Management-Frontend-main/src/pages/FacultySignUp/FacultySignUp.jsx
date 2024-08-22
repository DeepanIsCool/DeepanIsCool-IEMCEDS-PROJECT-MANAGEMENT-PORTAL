import { useState, useEffect } from "react";
import "./FacultyLogin.css";
// import gsap from "gsap";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Importing icons

// // import Alert from "../AlertBox/Alert";
// import SuccessLottie from "../../Lottie/success.json";
// import ErrorLottie from "../../Lottie/Error.json";
// import greentick from "../../Lottie/Greentick.json";
// import loading from "../../Lottie/loading.json";
// import Lottie from "react-lottie";

const FacultySignUp = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const togglePasswordVisibility = () => {
      setIsPasswordVisible(prevState => !prevState);
    };
  const navigate = useNavigate();

  const [employee_id, setEnroll] = useState("");
  const [IsOtpLoading, setIsOtpLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [enrollError, setEnrollError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [, setnameError] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [, setPopupMessage] = useState("");
  const [, setalertButtonText] = useState("");
  const [IsformFilled, setIsformFilled] = useState(false);
  const [, setVerified] = useState(true);
  const [showOTPInput, setShowOTPInput] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(300); // 5 minutes in seconds
  const [otpValue, setOTPValue] = useState("");
  const [otpValueEmail, setOTPValueEmail] = useState("");
  const [verifyOtp, setverifyOtp] = useState(false);
  const [timerActive, setTimerActive] = useState(false);
  const [verifyOtpEmail, setVerifyOtpEmail] = useState(false);
  const [timerActiveEmail, setTimerActiveEmail] = useState(false);
  const [showOTPInputEmail, setShowOTPInputEmail] = useState(false);
  const [, setOtpError] = useState(false);
  // const [emailOtpValue, setEmailOtpValue] = useState("");
  // const [emailOtpError, setEmailOtpError] = useState(false);
  const [isEmailOtpLoading, setIsEmailOtpLoading] = useState(false);
  // const [emailVerified, setEmailVerified] = useState(false);
  const [timerSecondsEmail, settimerSecondsEmail] = useState(300);

  const [passwordError, setPasswordError] = useState({
    lengthError: false,
    uppercaseError: false,
    specialCharError: false,
    numberError: false,
    lowercaseError: false,
  });

  // const [userData, setUserData] = useState({
  //   name: "",
  //   email: "",
  //   phone_no: "",
  // });

  // const defaultOptions = {
  //   loop: true,
  //   autoplay: true,
  //   animationData: loading,
  //   rendererSettings: {
  //     preserveAspectRatio: "xMidYMid slice",
  //   },
  // };
  // const defaultOptionsforGreentick = {
  //   loop: true,
  //   autoplay: true,
  //   animationData: greentick,
  //   rendererSettings: {
  //     preserveAspectRatio: "xMidYMid slice",
  //   },
  // };
  // const defaultOptionsforotpLoading = {
  //   loop: true,
  //   autoplay: true,
  //   animationData: OtpLottie,
  //   rendererSettings: {
  //     preserveAspectRatio: "xMidYMid slice",
  //   },
  // };

  const handleRedirects = (RedirectLinK) => {
    navigate(RedirectLinK);
  };

  const handleOTPChange = async (event) => {
    const { value } = event.target;

    // Update OTP value
    setOTPValue(value);

    // Check if OTP input length is 4
    if (value.length === 4) {
      try {
        const phoneNumber = phone.toString();
        // console.log(
        //   JSON.stringify({
        //     number: phoneNumber, // Send phone number
        //     Number_otp: value, // Send OTP
        //   })
        // );
        // Make API call to verify OTP or perform desired action
        const response = await fetch(
          "http://localhost:3000/facultyRoutes/signupvalidation/validatePhoneNumberOTP",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              Number: phoneNumber, // Send phone number
              otp: value, // Send OTP
            }), // Send OTP value in the request body
          }
        );

        if (response.ok) {
          // Handle successful response
          console.log("OTP verified successfully");
          setVerified(true);
          setverifyOtp(true);
          setTimerActive(false); // Stop the resend timer
          setShowOTPInput(false); // Hide the OTP input field
          // Perform further actions based on the API response
        } else {
          // Handle API error response
          console.error("Failed to verify OTP:", response.statusText);
          alert("Failed to verify OTP. Please try again.");
        }
      } catch (error) {
        console.error("Error verifying OTP:", error);
        alert("Error verifying OTP. Please try again.");
      }
      setOTPValue("");
    }
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();

    try {
      if (phone !== "") {
        // console.log(JSON.stringify({ number: userData.phone_no }));
        const phoneNumber = phone.toString();
        setIsOtpLoading(true);
        const response = await fetch(
          "http://localhost:3000/facultyRoutes/signup/SendOtpNumber",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ number: phoneNumber }),
          }
        );

        if (response.ok) {
          setIsOtpLoading(false);
          setShowOTPInput(true);
          setTimerActive(true);
        } else {
          setPopupMessage("error sending otp");
          setalertButtonText("Try again");
          setIsOtpLoading(false);
          // setalertLottie(ErrorLottie);
          setOtpError(true);
          // OTP sending failed, handle error
          console.error("Failed to send OTP:", response.statusText);
          // alert("Failed to send OTP. Please try again.");
        }
      } else {
        // setPopupMessage("Please enter a valid 10-digit phone number.");
        // setalertButtonText("Try again");
        setIsOtpLoading(false);
        // setalertLottie(ErrorLottie);
        setOtpError(true);
        // Invalid phone number, show error
        // alert("Please enter a valid 10-digit phone number.");
      }
    } catch (error) {
      setOtpError(true);
      setPopupMessage(error);
      setIsOtpLoading(false);
      // setalertLottie(ErrorLottie);
      console.error("Error sending OTP:", error);
      alert("Error sending OTP. Please try again.");
    }
  };

  const handleOTPChangeForEmail = async (event) => {
    const { value } = event.target;

    // Update OTP value
    setOTPValueEmail(value);

    // Check if OTP input length is 4
    if (value.length === 4) {
      try {
        const EmailSignup = email.toString();
        // console.log(
        //   JSON.stringify({
        //     Email: EmailSignup, // Send phone number
        //     otp: value, // Send OTP
        //   })
        // );
        // Make API call to verify OTP or perform desired action
        const response = await fetch(
          "http://localhost:3000/facultyRoutes/signupvalidation/validateEmailOTP",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              Email: EmailSignup,
              otp: value,
            }), // Send OTP value in the request body
          }
        );

        if (response.ok) {
          // Handle successful response
          // const resData = await response.json();
          console.log("OTP verified successfully");
          // console.log(resData);

          setVerifyOtpEmail(true);
          setTimerActiveEmail(false); // Stop the resend timer
          setShowOTPInputEmail(false);
          // Hide the OTP input field
          // Perform further actions based on the API response
        } else {
          // Handle API error response
          console.error("Failed to verify OTP:", response.statusText);
          // alert("Failed to verify OTP. Please try again.");
        }
      } catch (error) {
        console.error("Error verifying OTP:", error);
        alert("Error verifying OTP. Please try again.");
      }
      setOTPValueEmail("");
    }
  };

  // console.log(setEmailVerified)

  const handleSendOTPForEmail = async (e) => {
    e.preventDefault();

    try {
      if (email !== "") {
        // const email = email.toString();
        setIsEmailOtpLoading(true);
        const response = await fetch(
          "http://localhost:3000/facultyRoutes/signup/SendOtpEmail",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
          }
        );

        if (response.ok) {
          setIsEmailOtpLoading(false);
          setShowOTPInputEmail(true);
          setTimerActiveEmail(true);
        } else {
          console.error("Failed to send OTP:", response.statusText);
          // Handle error condition
        }
      } else {
        // Handle error condition for missing email
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      // Handle error condition
    }
  };

  useEffect(() => {
    setverifyOtp(false);
    setVerifyOtpEmail(false);
  }, [email, phone, employee_id, name]);
  // console.log(userData);

  useEffect(() => {
    let interval;
    if (timerActive) {
      interval = setInterval(() => {
        setTimerSeconds((prevSeconds) => {
          if (prevSeconds > 0) {
            return prevSeconds - 1;
          } else {
            setTimerActive(false); // Timer finished
            return 0;
          }
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerActive]);

  useEffect(() => {
    let interval;
    if (timerActiveEmail) {
      interval = setInterval(() => {
        settimerSecondsEmail((prevSeconds) => {
          if (prevSeconds > 0) {
            return prevSeconds - 1;
          } else {
            setTimerActiveEmail(false); // Timer finished
            return 0;
          }
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerActiveEmail]);

  const handleNameChange = (event) => {
    setnameError(!/^[a-zA-Z\s]+$/.test(event.target.value));
    setName(event.target.value);
    setIsformFilled(
      employee_id !== "" &&
        password !== "" &&
        // phone !== "" &&
        // name !== "" &&
        // email !== "" &&
        verifyOtp !== "" &&
        verifyOtpEmail !== ""
    );
  };

  const handleEnrollChange = async (event) => {
    const { value } = event.target;
    if (value.length <= 6) {
      setEnroll(value);
    }
    setEnrollError(!/^\d{6}$/.test(value));
    setIsformFilled(
      value !== "" &&
        password !== "" &&
        // phone !== "" &&
        // name !== "" &&
        // email !== "" &&
        verifyOtp !== "" &&
        verifyOtpEmail !== ""
    );

    // Check if Employee ID input length is 6
    if (value.length === 6) {
   
      try {
        const employee_id = Number(value);
     
        // Make API call to verify Employee Id or perform desired action
        const response = await fetch(
          "http://localhost:3000/facultyRoutes/signupvalidation",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              employee_id: employee_id, // Use value directly here
            }),
          }
        );

        // console.log(
        //   JSON.stringify({
        //     employee_id: employee_id, // Use value directly here
        //   })
        // );

        if (response.ok) {
          // Handle successful response
          const data = await response.json();
          setEmail(data.email);
          setPhone(data.phone_no);
          setName(data.Name);
          console.log(data, "Employee ID verified successfully");
          console.log(data)
          // Perform further actions based on the API response
        }
        // else {
        //   // Handle API error response
        //   console.error(
        //     "Failed to verify Employee ID:",
        //     response.statusText
        //   );
        //   alert("Failed to verify Employee ID. Please try again.");
        // }
      } catch (error) {
        // setPopupMessage(error.message);
        // setalertLottie(ErrorLottie);
        console.error("Error verifying Employee ID:", error);
       
      }
      
      // setEnroll("");
    }
  };

  const handlePhoneChange = (event) => {
    if (verifyOtp === true) {
      setverifyOtp(false);
    }
    setPhone(event.target.value);
    setPhoneError(!/^\d{10}$/.test(event.target.value));
    setIsformFilled(
      employee_id !== "" &&
        password !== "" &&
        phone !== "" &&
        name !== "" &&
        email !== "" &&
        verifyOtp !== ""
    );
  };

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    setPasswordError({
      lengthError: newPassword.length < 8,
      uppercaseError: !/(?=.*[A-Z])/.test(newPassword),
      specialCharError: !/(?=.*[@$!%*?&])/.test(newPassword),
      numberError: !/(?=.*\d)/.test(newPassword),
      lowercaseError: !/(?=.*[a-z])/.test(newPassword),
    });
    setIsformFilled(
      employee_id !== "" &&
        password !== "" &&
        phone !== "" &&
        name !== "" &&
        email !== "" &&
        verifyOtp !== ""
    );
  };

  // const handleEmailChange = (event) => {
  //   if (verifyOtpEmail === true) {
  //     setVerifyOtpEmail(false);
  //   }
  //   setPhone(event.target.value);
  //   set(!/^\d{10}$/.test(event.target.value));
  //   setIsformFilled(
  //     employee_id !== "" &&
  //       password !== "" &&
  //       phone !== "" &&
  //       name !== "" &&
  //       email !== "" &&
  //       verifyOtp !== ""
  //   );
  //   // setEmail(event.target.value);
  // };

  const handleEmailChange = (event) => {
    if (verifyOtpEmail === true) {
      setVerifyOtpEmail(false);
    }
    setEmail(event.target.value);
    setEmailError(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(event.target.value));
    setIsformFilled(
      employee_id !== "" &&
        password !== "" &&
        phone !== "" &&
        name !== "" &&
        email !== "" &&
        verifyOtp !== "" &&
        verifyOtpEmail !== ""
    );
  };
  const url = "http://localhost:3000/facultyRoutes/signup";

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Hello")
    if (enrollError) {
      alert("Please enter a 6-digit Employee ID");
      return;
    }
    if (phoneError) {
      alert("Please enter 10-digit phone number");
      return;
    }
    if (emailError) {
      alert("Please enter a valid email");
      return;
    }

    if (
      passwordError.lengthError ||
      passwordError.uppercaseError ||
      passwordError.specialCharError ||
      passwordError.numberError ||
      passwordError.lowercaseError
    ) {
      alert(
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character."
      );
      alert("Registration successful")
      return;
    }

    const requestBody = JSON.stringify({
      phone: phone,
      email: email,
      password: password,
      name: name,
      employee_id: employee_id,
    });
    console.log(requestBody);
    console.log("HElloooeoeoeo");

    try {
      setisLoading(true);

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: requestBody,
      });

      if (response.ok) {
        setisLoading(false);
        // setalertLottie(SuccessLottie);
        setPopupMessage("successful");
        console.log("Hello")
        const responseData = await response.json();
        setalertButtonText("proceed to dashboard");
        sessionStorage.setItem("accessToken", responseData.accessToken);
        navigate("/facultyLogin")
      } else if (response.status === 409) {
        setisLoading(false);
        // setalertLottie(ErrorLottie);
        setPopupMessage("User already exists");
        setalertButtonText("Try again");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // useEffect(() => {
  //   gsap.from(".circle1", { height: 0, width: 0 });
  //   gsap.to(".circle1", { height: "20vw", width: "20vw" });
  
  //   gsap.from(".curve1", { left: 200 });
  //   gsap.to(".curve1", { left: 0 });
  //   gsap.from(".gp", { y: "-50px", stagger: 0.4, opacity: 0 });
  //   gsap.to(".gp", { y: "0px", stagger: 0.4, opacity: 1 });
  //   gsap.from(".Right", { x: 20, opacity: 0 });
  //   gsap.to(".Right", { x: 0, opacity: 1 });
  //   gsap.to(".Left-Logo", { opacity: 1, delay: 0.5, top: "0px" });
  //   // const accessToken = sessionStorage.getItem("accessToken");
  //   // if (accessToken) {
  //   //   // console.log("Access token found:", accessToken);
  //   //   navigate("/home");
  //   // } else {
  //   //   console.log("Access token not found");
  //   // }
  // }, [navigate]);

  return (
    <div className="Container overflow-hidden">
      <div className="Left relative z-[1] overflow-hidden">
        <div className="curve1 absolute -z-10 right-0">
          {/* <svg
            width="974"
            height="773"
            viewBox="0 0 974 773"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          > */}
            {/* <path
              d="M317.683 146.956C171.066 160.737 31.5364 55.9833 0 3.81436e-06L974 0V773H869.66C546.583 732.089 600.97 568.984 668.548 492.545C708.013 438.895 779.375 309.631 749.101 221.78C711.257 111.967 500.954 129.73 317.683 146.956Z"
              fill="#264ECA"
            />
          </svg> */}
        </div>
        <div className="circle  absolute bottom-[-100px] left-[-100px]">
          <div className="circle1 bg-[#274FC7] h-[20vw] w-[20vw] rounded-[100%]"></div>
          <div className="circle2 absolute top-[-20%] bg-[#0545C0] h-[25vw] w-[25vw] rounded-[100%] -z-10 left-[-3%]"></div>
          <div className="circle2 absolute top-[-40%] bg-[#264ECA] h-[30vw] w-[30vw] rounded-[100%] left-[-8%] -z-20"></div>
        </div>
      </div>
      <div className="Right pt-5">
        <form className="Form pt-5">
          <div className="Heading">Faculty Signup</div>
          <div
            className={`Label w-full text-left ${enrollError ? "error" : ""}`}
          >
            Employee ID:
          </div>
          <input
            className={`Input ${enrollError ? "border-2 border-red-500" : ""}`}
            type="number"
            placeholder="100001"
            value={employee_id}
            maxLength={6}
            pattern="[0-9]"
            onChange={handleEnrollChange}
          />
          {enrollError && (
            <span className="Error text-gray-600">
              * Please enter a 6-digit Employee ID.
            </span>
          )}
          <div
            className={`Label w-[50%] text-left ${phoneError ? "error" : ""}`}
          >
            Phone:
          </div>

          <div className="relative">
            <input
              className={`Input ${phoneError ? "border-2 border-red-500" : ""}`}
              type="tel"
              placeholder="0123456789"
              value={phone}
              onChange={handlePhoneChange}
              maxLength={10}
              readOnly
            />
            {verifyOtp ? (
              <div className=" p-0 absolute right-0 top-0 mt-4 mr-4">
                {/* <Lottie
                  options={defaultOptionsforGreentick}
                  height={24}
                  width={24}
                  style={{ marginTop: 8, marginLeft: 4 }} // Example: Apply margin
                /> */}
              </div>
            ) : (
              <button
                className={`bg-white ${
                  !IsOtpLoading ? "hover:bg-black hover:text-white" : ""
                } text-black font-bold py-2 px-4 rounded-md absolute right-0 top-0 mt-4 mr-4 cursor-pointer ${
                  timerActive ? "pointer-events-none" : ""
                }`}
                onClick={handleSendOTP}
                // disabled={phoneError || phone.length !== 10 || timerActive}
              >
                {!IsOtpLoading
                  ? timerActive
                    ? `Resend OTP in ${Math.floor(timerSeconds / 60)}:${(
                        timerSeconds % 60
                      )
                        .toString()
                        .padStart(2, "0")} minutes`
                    : "Send Otp"
                  : "Sending.."}
              </button>
            )}

            {showOTPInput && !verifyOtp && (
              <input
                className="Input mt-8"
                type="text"
                placeholder="Enter OTP"
                value={otpValue}
                maxLength={4}
                onChange={handleOTPChange}
              />
            )}
          </div>

          <div
            className={`Label w-[50%] text-left ${emailError ? "error" : ""}`}
          >
            Email:
          </div>
          <div className="relative">
            <input
              className={`Input ${emailError ? "border-2 border-red-500" : ""}`}
              type="email"
              placeholder="abc@gmail.com"
              value={email}
              onChange={handleEmailChange}
              readOnly
            />
            {verifyOtpEmail ? (
              <div className="p-0 absolute right-0 top-0 mt-4 mr-4">
                {/* <Lottie
                  options={defaultOptionsforGreentick}
                  height={24}
                  width={24}
                  style={{ marginTop: 8, marginLeft: 4 }}
                /> */}
              </div>
            ) : (
              <button
                className={`bg-white ${
                  !isEmailOtpLoading ? "hover:bg-black hover:text-white" : ""
                } text-black font-bold py-2 px-4 rounded-md absolute right-0 top-0 mt-4 mr-4 cursor-pointer ${
                  timerActiveEmail ? "pointer-events-none" : ""
                }`}
                onClick={handleSendOTPForEmail}
              >
                {!isEmailOtpLoading
                  ? timerActiveEmail
                    ? `Resend OTP in ${Math.floor(timerSecondsEmail / 60)}:${(
                        timerSecondsEmail % 60
                      )
                        .toString()
                        .padStart(2, "0")} minutes`
                    : "Send Otp"
                  : "Sending.."}
              </button>
            )}

            {showOTPInputEmail && !verifyOtpEmail && (
              <input
                className="Input mt-8"
                type="text"
                placeholder="Enter OTP"
                value={otpValueEmail}
                maxLength={5}
                onChange={handleOTPChangeForEmail}
              />
            )}
          </div>

          <div
            className={`Label w-full text-left ${passwordError ? "error" : ""}`}
          >
            Name:
          </div>
          <input
            className={`Input ${passwordError ? "" : ""}`}
            type="name"
            placeholder="Subhas Bose"
            value={name}
            onChange={handleNameChange}
            readOnly
          />
          <div
            className={`Label w-full text-left ${passwordError ? "error" : ""}`}
          >
            Password:
          </div>
          <div className="flex">
          <input
            className={`Input ${
              passwordError.lengthError ||
              passwordError.uppercaseError ||
              passwordError.specialCharError ||
              passwordError.numberError ||
              passwordError.lowercaseError
                ? "border-2 border-red-500"
                : ""
            }`}
            type={isPasswordVisible ? "password" : "text"}
            placeholder="*********"
            value={password}
            onChange={handlePasswordChange}
          />
               <button
        type="button"
        onClick={togglePasswordVisibility}
      >
        {isPasswordVisible ? (
          <FaEyeSlash className="text-gray-500" />
        ) : (
          <FaEye className="text-gray-500" />
        )}
      </button>
          </div>
          {passwordError.lengthError && (
            <span className="Error text-gray-600">
              * Password must be at least 8 characters long.
            </span>
          )}
          {passwordError.uppercaseError && (
            <span className="Error text-gray-600">
              * Password must contain at least one uppercase letter.
            </span>
          )}
          {passwordError.specialCharError && (
            <span className="Error text-gray-600">
              * Password must contain at least one special character.
            </span>
          )}
          {passwordError.numberError && (
            <span className="Error text-gray-600">
              * Password must contain at least one number.
            </span>
          )}
          {passwordError.lowercaseError && (
            <span className="Error text-gray-600">
              * Password must contain at least one lowercase letter.
            </span>
          )}

          <div className="Submit-Row pt-4">
            <div className="flex flex-col">
              <div className="pt-3">
                <span
                  className="text-black px-2 py-1 rounded leading-10 cursor-pointer"
                  onClick={() => {
                    handleRedirects("/facultyLogin");
                  }}
                >
                  Already have an account? Login
                </span>
              </div>
            </div>
            <div>
              {isLoading ? (
                <div className="LoadingAnimation z-50 border-2 border-[#3466FF] rounded-md">
                  {/* <Lottie options={defaultOptions} height={48} width={120} /> */}
                </div>
              ) : (
                <button 
                  onClick={handleSubmit}
                  className={`${
                    IsformFilled &&
                    // !enrollError &&
                    // !phoneError &&
                    // !emailError &&
                    // !nameError &&
                    !passwordError.lengthError &&
                    !passwordError.uppercaseError &&
                    !passwordError.specialCharError &&
                    !passwordError.numberError &&
                    !passwordError.lowercaseError &&
                    verifyOtp &&
                    verifyOtpEmail // Check if phone number is verified
                      ? "bg-[#3466FF] border-2 text-white py-3 px-12 rounded-lg text-[15px] z-10 hover:bg-transparent hover:text-[#3466FF] hover:border-2 hover:border-[#3466FF] duration-200 cursor-pointer"
                      : "border-gray-400 text-gray-400 cursor-not-allowed border-2 py-3 px-12 rounded-lg text-[15px] z-10"
                  }`}
                  disabled={
                    !IsformFilled ||
                    // enrollError ||
                    // phoneError ||
                    // emailError ||
                    // nameError ||
                    passwordError.lengthError ||
                    passwordError.uppercaseError ||
                    passwordError.specialCharError ||
                    passwordError.numberError ||
                    passwordError.lowercaseError ||
                    !verifyOtp || // Disable if phone number is not verified
                    !verifyOtpEmail // Disable if phone number is not verified
                  }
                >
                  Register
                </button>
              )}
            </div>
          </div>
        </form>
      </div>

      {/* {PopupMessage !== "" &&

        (PopupMessage === "User already exists" ? (
          <Alert
            errorMessage={PopupMessage}
            popupState={setPopupMessage}
            animationData={alertLottie}
            actionButton={alertButtonText}
            actionButtonFunction={() => {
              gsap.to(".alertcontent", {
                scale: 0,
                duration: 0.3,
                transitionTimingFunction: "cubic-bezier(0.47, 1.64, 0.41, 0.8)",
              });
              gsap.to(".alertcontainer", {
                css: {
                  backdropFilter: "blur(0px)",
                },
                duration: 0.2,
              });
              setTimeout(() => {
                setPopupMessage("");
              }, 200);
            }}
          />
        ) : OtpError ? (
          <Alert
            errorMessage={PopupMessage}
            popupState={setPopupMessage}
            animationData={alertLottie}
            actionButton={alertButtonText}
            actionButtonFunction={() => {
              gsap.to(".alertcontent", {
                scale: 0,
                duration: 0.3,
                transitionTimingFunction: "cubic-bezier(0.47, 1.64, 0.41, 0.8)",
              });
              gsap.to(".alertcontainer", {
                css: {
                  backdropFilter: "blur(0px)",
                },
                duration: 0.2,
              });
              setTimeout(() => {
                setPopupMessage("");
              }, 200);
            }}
          />
        ) : (
          <Alert
            errorMessage={PopupMessage}
            popupState={setPopupMessage}
            animationData={alertLottie}
            actionButton={alertButtonText}
            actionButtonFunction={() => {
              navigate("/home");
            }}
          />
        ))} */}
    </div>
  );
};

export default FacultySignUp;