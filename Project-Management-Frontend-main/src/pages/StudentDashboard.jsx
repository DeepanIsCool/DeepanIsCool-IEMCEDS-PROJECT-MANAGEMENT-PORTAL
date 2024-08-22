// expiresIn
import React, { useEffect,useState } from 'react'
import { CurrentProjectCard } from '../components/StudentComp/CurrentProjectCard'
import axios from "axios"
import NewProjects from '../components/StudentComp/NewProjects'
import { useNavigate } from 'react-router-dom'
const StudentDashboard = () => {
  const [newprojects,setNewProjects]=useState([])
  const [allProject,setAllProjects]=useState([])
  const [facultyList,setFacultyLists]=useState([])
  const [studentList,setStudentList]=useState([])
  const [studentName,setStudentName]=useState("")
  const navigate=useNavigate()
  useEffect(() => {
    const fetchFacultyProflie = async () => {
      try {
        const response = await axios.get('http://localhost:3000/studentsRoutes/studentProfile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("student_token")}`
          }
        });
         // Store the fetched data in the state variable
        console.log(response.data)
       setStudentName(response.data.name)
      } catch (err) {
        console.log(err)
      } 
    };
  
    fetchFacultyProflie();
  }, []);
//   async function accesstokenFetch() {
//     const response = await axios.post(
//       import.meta.env.VITE_BACKEND_URL +
//         "facultyRoutes/signin",
//        {
//             "employee_id":"100000", 
//             "password":"Deepan@1234"
          
//         }
//     );
//     // console.log(response.data.accessToken)
//   localStorage.setItem("access_token",response.data.accessToken)
//   }
//   async function studentaccesstokenFetch() {
//     const response = await axios.post(
//       import.meta.env.VITE_BACKEND_URL +
//         "studentsRoutes/signin",
//         {
//           "password":"Priyanshu@1234",
//           "enrollment_no":"12021002019060"
//         }
//     );
//     // console.log(response.data.accessToken)
//   localStorage.setItem("student_token",response.data.accessToken)
//   }
// useEffect(() => {
//   accesstokenFetch()
//   studentaccesstokenFetch()
// }); 
useEffect(() => {
  const fetchAllProjects = async () => {
    try {
      const response = await axios.get('http://localhost:3000/projectRoutes/getAllProjects', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("student_token")}`
        }
      });
      setAllProjects(response.data)
      console.log(response.data)
    } catch (err) {
      console.log(err)
    } 
  };

  fetchAllProjects();
}, [setAllProjects]);
useEffect(() => {
  const fetchFaculty = async () => {
    try {
      const response = await axios.get('http://localhost:3000/facultyRoutes/getAllFaculty', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`
        }
      });
      setFacultyLists(response.data); // Store the fetched data in the state variable
      // console.log(response.data)
    } catch (err) {
      console.log(err)
    } 
  };
  const fetchCurrentStudent = async () => {
    try {
      const response = await axios.get('http://localhost:3000/studentsRoutes/getCurrentProject', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("student_token")}`
        }
      });
       // Store the fetched data in the state variable
      //  setProjects
      // console.log(response.data)
      setNewProjects(response.data)
    } catch (err) {
      console.log(err)
    } 
  };
  const fetchAllStudents = async () => {
    try {
      const response = await axios.get('http://localhost:3000/studentsRoutes/getAllStudents', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("student_token")}`
        }
      });
       // Store the fetched data in the state variable
       setStudentList(response.data)
      console.log(response.data)
    } catch (err) {
      console.log(err)
    } 
  };
  fetchCurrentStudent()
  fetchFaculty();
  fetchAllStudents()
}, []);
  return (
    
    <div className='bg-whitesmoke w-[100vw] min-h-[100vh] relative'>
      <div className='px-10 py-10'>
        <div className='flex items-center justify-between'>
          <h1>{studentName}</h1>
          <div className='flex gap-5'>
            <button className='border-blue-400 border-2 px-5 py-3 rounded-md text-black text-xl'>{studentName}</button>
            <img className="w-14 h-14 rounded-[50%] object-cover cursor-pointer" src="https://plus.unsplash.com/premium_photo-1671656349218-5218444643d8?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
            onClick={()=>navigate("/studentProfile")}
            />
          </div>
        </div>
        <h2>Current Project</h2>
        <div className='flex gap-5 flex-wrap'>
        {newprojects.map((newproject,index)=>(
          <CurrentProjectCard
          key={index}
          title={newproject.project_name}
          launchDate={newproject.launchDate}
          requirement={newproject.requirements}
            description={newproject.description}
            tags={newproject.requirements}
            facultyId={newproject.faculty_list}
            facultyList={facultyList}
            projectId={newproject._id}
            studentList={studentList}
            studentId={newproject.studentTeam}
            githubLink={newproject.githubLink}
          />
        ))}
        </div>
      </div>
      <div className='px-5 py-10'>
      <h2>New Projects</h2>
      {
        allProject.map((project, index) => (
          <NewProjects
            key={index}
            title={project.project_name}
            description={project.description}
            tags={project.requirements}
            facultyId={project.faculty_list}
            facultyList={facultyList}
            projectId={project._id}
            studentList={studentList}
            studentId={project.studentTeam}
            
          />
          
        ))

      }
      </div>
    </div>

  )
}

export default StudentDashboard