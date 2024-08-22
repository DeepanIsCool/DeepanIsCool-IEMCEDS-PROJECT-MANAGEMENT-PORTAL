import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactDOM from "react-dom";
const CurrentProjectExtended = ({setPopUp,show,FacultyNames,requirements,title,description,team,projectId,githubLink}) => {
  const [joinedProjects, setJoinedProjects] = useState(() => {
    // Retrieve the joined projects from localStorage or initialize as an empty array
    const storedJoinedProjects = localStorage.getItem('joinedProjects');
    return storedJoinedProjects ? JSON.parse(storedJoinedProjects) : [];
  });
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

  async function apply(id) {
    try{
      const response = await axios.post(
         "http://localhost:3000/projectRoutes/applyforProject",
        {
          projectId:id
        },
        {
          headers: {
            authorization: "Bearer " + localStorage.getItem("student_token"),
          },
        })
      console.log(response.data)
      const updatedJoinedProjects = [...joinedProjects, id];
        setJoinedProjects(updatedJoinedProjects);

        // Store the updated list in localStorage
        localStorage.setItem('joinedProjects', JSON.stringify(updatedJoinedProjects));
    }
    catch(err){
      console.log(err)
      
        
      
    }
    }
  return ReactDOM.createPortal(
    <>
    
    <div className="   modal-wrapper  left-0 right-0 bottom-0 top-0 fixed" ></div>
    <div className="min-w-[100vw] max-h-[90vh]  left-0 top-0 fixed overflow-y-auto mt-10  " >
    
    <div className='mb-5 ml-3 hover:cursor-pointer' onClick={()=>setPopUp(false)}>
     &lt;  BACK
    </div>
    <div className="min-w-[90vw] mx-auto p-6 bg-white rounded-lg shadow-lg min-h-[80vh]">
      {/* Section 1 */}
      <div className="flex mb-6">
        <div className="w-1/2 flex justify-center items-center h-[40vh]">
          <img src="https://plus.unsplash.com/premium_photo-1722586209835-46ae3736ec12?q=80&w=1870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Project" className="rounded-lg h-full w-[80%] object-cover"/>
        </div>
        <div className="w-1/2 pl-6 flex flex-col items-center justify-center relative">
          <h2 className="text-2xl font-bold mb-4 w-full">{title}</h2>
          <div className="bg-blue-100 p-4 rounded-lg text-center w-[96%]">
            <p className="text-lg font-bold bg-blue-100">{description}</p>
          </div>
        </div>
      </div>

      {/* Section 2 */}
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">Requirements</h2>
        <div className=" px-2 py-1 rounded-lg text-center">
          <p className="text-xl  text-black font-bold">{requirements}</p>
        </div>
      </div>

      {/* Faculty Section */}
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">Faculty</h2>
        <div className="flex flex-wrap">

                {FacultyNames.length > 0 ? (
            FacultyNames.map((name, index) => (
              <div className="p-2" key={index}>
              <p className="text-center mt-2 bg-blue-500 rounded-md px-3 py-2 text-white" >{name}</p>
            </div>
            ))
          ) : (
            <p className="text-center mt-2 bg-blue-500 rounded-md px-3 py-2 text-white" >No faculties selected</p>
          )}
          {/* Repeat the above div for each faculty member */}
        </div>
      </div>

      {/* Team Section */}
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">Team</h2>
        <div className="flex flex-wrap">
        {team.length > 0 ? (
            team.map((name, index) => (
              <div className="p-2" key={index}>
              <p className="text-center mt-2 bg-blue-500 rounded-md px-3 py-2 text-white" >{name}</p>
            </div>
            ))
          ) : (
            <p className="text-center mt-2 bg-blue-500 rounded-md px-3 py-2 text-white" >No students selected</p>
          )}
          {/* Repeat the above div for each team member */}
        </div>
      </div>

      {/* Request to Join Button */}
      <div className='mb-6'>
      <h2 className="text-xl font-bold mb-4">Github Link</h2>
      <div className="text-left">
       <a href={githubLink} target="_blank" rel="noopener noreferrer">View Github Link</a>
      </div>
      </div>
    </div>
      </div>
    </>,
    document.querySelector(".CurrentProjectExtended")
  );
};

export default CurrentProjectExtended;
