
import { ImCross } from "react-icons/im";
import React, { useState, useEffect } from 'react';
import ReactDOM from "react-dom";

import axios from 'axios';
const AdminDashboard1 = ({setPopUp,show,studentId,title,applicationId}) => {
  // const navigate = useNavigate();
  // const { studentId } = useParams();
  const [studentDetails, setStudentDetails] = useState([]);
  const [skills,setSkills]=useState([])
  // const token = localStorage.getItem("access_token"); // Replace with actual token
  // // console.log(token)
  async function approve(id) {
    try{
      const response = await axios.post(
         "http://localhost:3000/projectRoutes/approveforProject",
         {
          applicationId:applicationId,
          status : "Approved"
        },
        {
          headers: {
            authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        })
      console.log(response.data)
      setPopUp(false)
    }
    catch(err){
      console.log(err) 
    }
    }
  async function reject(id) {
    try{
      const response = await axios.post(
         "http://localhost:3000/projectRoutes/approveforProject",
         {
          applicationId:applicationId,
          status : "Rejected"
        },
        {
          headers: {
            authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        })
      console.log(response.data)
      setPopUp(false)
    }
    catch(err){
      console.log(err) 
    }
    }

  useEffect(() => {
    async function fetchStudentDetails(){
      try{
        const response = await axios.post (
          "http://localhost:3000/studentsRoutes/studentdetails",
          {
            id:studentId
               },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("access_token"),
            },
          }
        );
        console.log(response.data)
        setStudentDetails(response.data)
        setSkills(response.data.Skills)
        console.log(skills)
      }
      catch(error){
          console.log(error)
         console.log(localStorage.getItem("access_token"))

      }
  }

    fetchStudentDetails();
  }, []);

  
  if (!studentDetails) {
    return <div>Loading...</div>;
  }
  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [show]);

  return ReactDOM.createPortal(
    <>
    <div className="   modal-wrapper  left-0 right-0 bottom-0 top-0 fixed" ></div>
    <div className="min-w-[100vw] max-h-[90vh]  left-0 top-0 fixed overflow-y-auto" >
    <div className=" rounded-xl border cross bg-white relative px-10 py-10 mb-5 w-[80vw] min-h-[100vh] mt-10">
      <div className="w-[100%] h-[5vh] flex bg-white">
        <div className="bg-white">
        <span className="text-21xl text-gray font-medium mt-2 bg-white">Applied for - </span>
        <span className="text-29xl  font-[550] ml-3 mt-1 bg-white">{title}</span>
        </div>
        <div className="ml-[36.25rem] bg-white flex gap-5">
        <button className='text-xl cursor-pointer bg-green-500 text-white rounded-md py-1 px-10'
        onClick={approve}
        >
          Approve
            </button> 
        <button className='text-xl cursor-pointer bg-red-500 text-white rounded-md py-3 px-10'
        onClick={reject}
        >
          Reject
            </button> 
        </div>
        <ImCross color="white" className="px-2 py-2 rounded-[50%] bg-red-500  absolute top-0 right-0 hover:cursor-pointer" onClick={()=>setPopUp(false)}  / >
      </div>
      <div className="h-[30vh] w-[100%] flex items-center bg-white gap-10 mt-20">
      <img className="w-72 h-full rounded-[60%] object-cover" src="https://plus.unsplash.com/premium_photo-1671656349218-5218444643d8?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/>
      <div className="flex flex-col bg-white">
      <h1 className="text-29xl  font-[550]  bg-white block ">{studentDetails.name}</h1>
      <div className="bg-white">
      <span className="text-5xl bg-white">Enrollment Number-</span>
      <span className="text-5xl bg-white">{studentDetails.enrollment_no}</span>
      </div>
      <div className="flex gap-10 mt-5 bg-white">
        <div className="bg-white">
      <span className="text-5xl bg-white">Stream-</span>
      <span className="text-5xl bg-white">{studentDetails.stream}</span>
        </div>
        <div className="bg-white">
        <span className="text-5xl bg-white">Year-</span>
      <span className="text-5xl bg-white">{studentDetails.year}</span>
        </div>
        <div className="bg-white">
        <span className="text-5xl bg-white">Sec-</span>
      <span className="text-5xl bg-white">{studentDetails.Sec}</span>
        </div>
        <div className="bg-white">
        <span className="text-5xl bg-white">Roll-</span>
      <span className="text-5xl bg-white">{studentDetails.roll_number}</span>
        </div>
      </div>
      </div>
      </div>
      <div className="min-h-[35vh] mt-5 flex items-center justify-center flex-col">
          <h3 className="text-21xl font-semibold">Student Introduction</h3>
          <span className="text-3xl">{studentDetails.Introduction}</span>
      </div>
      <div className="bg-white">
        <h3 className="bg-white text-10xl font-semibold">Skills</h3>
      <div className="min-h-16  flex items-center gap-5 justify-start rounded-md px-6 flex-wrap">
      {(skills && skills.length > 0)? (
    skills.map((skill, index) => (
      <p className='bg-blue-600 px-4 py-3 rounded-md text-white' key={index}>
        {skill}
      </p>
    ))
  ) : (
    <p className='bg-blue-600 px-4 py-3 rounded-md text-white' >No skills available</p>
  )}
        
      </div>

      </div>
      <h3 className="bg-white text-10xl font-semibold">Resume:
      <a href={studentDetails.resume}>Resume Link</a>
      </h3>
      </div>
    </div>
      
    </>,
    document.querySelector(".myPortalModalDiv")
  )
}

export default AdminDashboard1;
