import React, { useEffect, useState } from 'react'
import StudentApplication from '../components/AdminComp/StudentApplicationComp'
import axios from 'axios';
import AdminProjects from '../components/AdminComp/AdminProjects';
import { useNavigate } from 'react-router-dom';
const Admin = () => {
  

    const [applications, setApplications] = useState([])
    const [facultyName,setFacultyName]=useState("")
    const [projects,setProjects]=useState([])
    const [facultyList,setFacultyLists]=useState([])
  const [studentList,setStudentList]=useState([])
  const navigate = useNavigate();
// For fetching signin access token
useEffect(() => {
  const fetchFacultyProflie = async () => {
    try {
      const response = await axios.get('http://localhost:3000/facultyRoutes/facultyProfile', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`
        }
      });
       // Store the fetched data in the state variable
      // console.log(response.data)
     setFacultyName(response.data.name)
    } catch (err) {
      console.log(err)
    } 
  };

  fetchFacultyProflie();
}, []);
              const fetchApplications = async () => {
          try {
            const response = await axios.get('http://localhost:3000/projectRoutes/getallapplications', {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`
              }
            });
            setApplications(response.data); // Store the fetched data in the state variable
            // console.log(response.data)
            // console.log(localStorage.getItem("access_token"))
          } catch (err) {
            console.log(err)
          } 
        };
      
      // For fetching applications
      useEffect(() => {

    
        fetchApplications();
      }, [setApplications]);
  
      // To get projects 
      useEffect(() => {
        const fetchProjects = async () => {
          try {
            const response = await axios.get('http://localhost:3000/projectRoutes/getProjects', {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`
              }
            });
            console.log(response.data)
            setProjects(response.data); // Store the fetched data in the state variable
          } catch (err) {
            console.log(err)
          } 
        };
    
        fetchProjects();
      }, [setProjects]);


    useEffect(() => {
      const fetchFaculty = async () => {
        try {
          const response = await axios.get('http://localhost:3000/facultyRoutes/getAllFaculty', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`
            }
          });
          // setFacultyLists(response.data); // Store the fetched data in the state variable
          // console.log(response.data)
        } catch (err) {
          console.log(err)
        } 
      };

      fetchFaculty();
    }, []);
    const handleDelete = (projectId) => {
      setProjects(projects.filter(project => project._id !== projectId));
      console.log("Working")
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
    useEffect(()=>{
      fetchAllStudents()
    },[])
  return (
    <div className='w-full h-full relative flex flex-col items-center justify-center'>
        <div className=' w-full'>
        <div className='flex items-center justify-between'>
          <h1>Managment</h1>
          <div className='flex gap-5'>
            <button className='border-blue-400 border-2 px-5 py-3 rounded-md text-black text-xl'>{facultyName}</button>
            <img className="w-14 h-14 rounded-[50%] object-cover cursor-pointer" src="https://plus.unsplash.com/premium_photo-1671656349218-5218444643d8?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
            onClick={()=>navigate("/facultyProfile")}
            />
          </div>
        </div>
        
        <h3 className='px-10 text-10xl font-semibold'>Student Applications</h3>
        </div>
        {applications.map((application, index) => (
        <StudentApplication 
          key={index}
          title={application.student_name}
          description={application.project_name}
          date= {application.appliedAt}
          studentId={application.studentId}
          applicationId={application._id}
        />
        
      ))}
        <h3 className='pl-44 text-10xl font-semibold  w-full'>Your Projects</h3>
        {projects.map((project, index) => (
        <AdminProjects 
        key={index}
        title={project.project_name}
        launchDate={project.launchDate}
        requirement={project.requirements}
          description={project.description}
          tags={project.requirements}
          facultyId={project.faculty_list}
          facultyList={facultyList}
          projectId={project._id}
          studentList={studentList}
          studentId={project.studentTeam}
          githubLink={project.githubLink}
          onDelete={handleDelete}
        />
        
      ))}
      <button className='h-[5vh] w-[5vw] hover:cursor-pointer' onClick={()=>navigate("/project-form")}>
     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="blue"><path d="M4 3H20C20.5523 3 21 3.44772 21 4V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3ZM11 11H7V13H11V17H13V13H17V11H13V7H11V11Z"></path></svg>
      </button>
      
    </div>
  )
}

export default Admin