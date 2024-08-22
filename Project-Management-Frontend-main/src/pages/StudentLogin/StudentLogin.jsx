import { useState, useEffect } from "react";
import "./StudentLogin.css";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Importing icons

import axios from "axios";
const StudentLogin = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);
  const togglePasswordVisibility = () => {
      setIsPasswordVisible(prevState => !prevState);
    };
  const [formData, setFormData] = useState({
    enrollment_no: '',
    password:''
    
  });
  const navigate=useNavigate()
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const accesstokenFetch= async(e) =>{
    e.preventDefault()
    const response = await axios.post(
      import.meta.env.VITE_BACKEND_URL +
        "studentsRoutes/signin",
       {
        enrollment_no:formData.enrollment_no, 
            password:formData.password
          
        }
    );
    console.log(response.data)
    localStorage.setItem("student_token",response.data.accessToken)
    navigate("/student-dashboard")
  }
  return (
    <div className="Container overflow-hidden w-[100vw] h-[100vh]">
      <div className="Left relative z-[1] overflow-hidden">
        <div className="curve1 absolute -z-10 right-0">
         
        </div>
        <div className="circle  absolute bottom-[-100px] left-[-100px]">
          <div className="circle1 bg-[#274FC7] h-[20vw] w-[20vw] rounded-[100%]"></div>
          <div className="circle2 absolute top-[-20%] bg-[#0545C0] h-[25vw] w-[25vw] rounded-[100%] -z-10 left-[-3%]"></div>
          <div className="circle2 absolute top-[-40%] bg-[#264ECA] h-[30vw] w-[30vw] rounded-[100%] left-[-8%] -z-20"></div>
        </div>
      </div>
      <div className="Right pt-5">
        <form className="Form pt-5">
          <div className="Heading">Student SignIn</div>
          <div
            className={`Label w-full text-left`}
          >
            Enrollment No:
          </div>
          <input
            className={`Input border-2 border-red-500" `}
            type="number"
            name="enrollment_no"
            placeholder="21021002019054"
            value={formData.enrollment_no}
            onChange={handleChange}
            required
          />

          <div
            className={`Label w-full text-left `}
          >
            Password:
          </div>
          <div className="flex">
          <input
            className= "border-2 border-red-500 w-full"
            type={isPasswordVisible?"password":"text"}
            name="password"
            placeholder="*********"
            value={formData.password}
            onChange={handleChange}
            required
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
          
          <div className="Submit-Row pt-4">
            <div className="flex flex-col">
              <div className="pt-3">
                <span
                  className="text-black px-2 py-1 rounded leading-10 cursor-pointer"
                  onClick={()=>navigate("/studentSignUp")}
                >
                  Don't have an account? Register
                </span>
              </div>
            </div>
            <div>
              
                <button className="cursor-pointer px-4 py-4 bg-blue-500 text-white"
                 onClick={accesstokenFetch}
                >
                  Login
                </button>
              
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentLogin;