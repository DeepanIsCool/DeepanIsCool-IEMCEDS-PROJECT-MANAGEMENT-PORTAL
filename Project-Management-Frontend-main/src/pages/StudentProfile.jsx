import { ImCross } from "react-icons/im";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
const StudentProfile = () => {
  const [studentDetails, setStudentDetails] = useState([]);
  const [skills,setSkills]=useState([])
  const [editMode,setEditMode]=useState(false)
  const navigate=useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    enrollment_no: '',
    stream: '',
    year: '',
    Sec: '',
    roll_number: '',
    Introduction: '',
    resume: '',
    Skills:[]
  });
  const [newSkill, setNewSkill] = useState('');
  useEffect(() => {
    const fetchStudentProflie = async () => {
      try {
        const response = await axios.get('http://localhost:3000/studentsRoutes/studentProfile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("student_token")}`
          }
        });
         // Store the fetched data in the state variable
        console.log(response.data)
        setStudentDetails(response.data)
        setSkills(response.data.Skills)
         setFormData({
          name: response.data.name || '',
          enrollment_no: response.data.enrollment_no || '',
          stream: response.data.stream || '',
          year: response.data.year || '',
          Sec: response.data.Sec || '',
          roll_number: response.data.roll_number || '',
          Introduction: response.data.Introduction || '',
          resume: response.data.resume || '',
          Skills: response.data.Skills || [],
        });


      } catch (err) {
        console.log(err)
      } 
    };

    fetchStudentProflie();
  }, []);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSkillChange = (index, value) => {
    const updatedSkills = [...formData.Skills];
    updatedSkills[index] = value;
    setFormData({ ...formData, Skills: updatedSkills });
  };

  const handleAddSkill = () => {
    setFormData(prevFormData => ({
      ...prevFormData,
      Skills: [...prevFormData.Skills, newSkill]
    }));
    setNewSkill('');
  };

  const handleRemoveSkill = (index) => {
    const updatedSkills = formData.Skills.filter((_, i) => i !== index);
    setFormData({ ...formData, Skills: updatedSkills });
  };

  const handleSave = async () => {
    try {
      const response = await axios.put('http://localhost:3000/studentsRoutes/editStudentProfile', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("student_token")}`
        }
      });

      setStudentDetails(response.data);
      setEditMode(false);
    } catch (err) {
      console.log(err);
    }
  };
  
  if (!studentDetails) {
    return <div>Loading...</div>;
  }
  return (
    <div className="w-[100vw] min-h-[100vh]">
      <div className="px-3 py-0">
      <div className="h-[30vh] w-[100%] flex items-center bg-white gap-10 mt-20">
      <img className="w-[15vw] h-full rounded-[60%] object-cover" src="https://plus.unsplash.com/premium_photo-1671656349218-5218444643d8?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/>
      <div className="flex flex-col bg-white">
      <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              readOnly={true}
              className={`text-29xl font-[550] block bg-white border ${editMode ? 'border-gray-300 p-1' : 'border-none'}`}
            />
      <div className="bg-white">
      <span className="text-5xl bg-white">Enrollment Number-</span>
      <input
                type="text"
                name="enrollment_no"
                value={formData.enrollment_no}
                onChange={handleChange}
                readOnly={true}
                className={`text-5xl bg-white border ${editMode ? 'border-gray-300 p-1' : 'border-none'}`}
              />
      </div>
      <div className="flex gap-1 mt-5 bg-white">
        <div className="bg-white">
      <span className="text-5xl bg-white">Stream-</span>
                <input
                  type="text"
                  name="stream"
                  value={formData.stream}
                  onChange={handleChange}
                  readOnly={!editMode}
                  className={`text-5xl bg-white border ${editMode ? 'border-gray-300 p-1' : 'border-none'}`}
                />
        </div>
        <div className="bg-white">
        <span className="text-5xl bg-white">Year-</span>
        <input
                  type="text"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  readOnly={!editMode}
                  className={`text-5xl bg-white border ${editMode ? 'border-gray-300 p-1' : 'border-none'}`}
                />
        </div>
        <div className="bg-white">
        <span className="text-5xl bg-white">Sec-</span>
        <input
                  type="text"
                  name="Sec"
                  value={formData.Sec}
                  onChange={handleChange}
                  readOnly={!editMode}
                  className={`text-5xl bg-white border ${editMode ? 'border-gray-300 p-1' : 'border-none'}`}
                />
        </div>
        <div className="bg-white">
        <span className="text-5xl bg-white">Roll-</span>
        <input
                  type="text"
                  name="roll_number"
                  value={formData.roll_number}
                  onChange={handleChange}
                  readOnly={!editMode}
                  className={`text-5xl bg-white border ${editMode ? 'border-gray-300 p-1' : 'border-none'}`}
                />
        </div>
      </div>
      </div>
      </div>
      <div className="min-h-[35vh] mt-5 flex items-center justify-center flex-col">
          <h3 className="text-21xl font-semibold">Student Introduction</h3>
                <textarea
                  name="Introduction"
                  value={formData.Introduction}
                  readOnly={!editMode}
                  onChange={handleChange}
                  className={`text-5xl bg-white border ${editMode ? 'border-gray-300 p-1' : 'border-none'}`}
                />
              
      </div>
      <div className="bg-white">
              <h3 className="bg-white text-10xl font-semibold">Skills</h3>
              {editMode ? (
                <>
                  <div className="flex gap-2 items-center">
                    <input
                      type="text"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      className="border border-gray-300 p-2"
                      placeholder="Add new skill"
                    />
                    <button
                      onClick={handleAddSkill}
                      className="bg-blue-600 px-4 py-2 rounded-md text-white"
                    >
                      +
                    </button>
                  </div>
                  <div className="min-h-16 flex items-center gap-5 justify-start rounded-md px-6 flex-wrap mt-2">
                    {formData.Skills.map((skill, index) => (
                      <div key={index} className="flex items-center">
                        <input
                          type="text"
                          value={skill}
                          onChange={(e) => handleSkillChange(index, e.target.value)}
                          className="bg-blue-600 px-4 py-3 rounded-md text-white"
                        />
                        <button
                          onClick={() => handleRemoveSkill(index)}
                          className="ml-2 bg-red-600 px-2 py-1 rounded-md text-white"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="min-h-16 flex items-center gap-5 justify-start rounded-md px-6 flex-wrap mt-2">
                  {formData.Skills.length > 0 ? (
                    formData.Skills.map((skill, index) => (
                      <p key={index} className="bg-blue-600 px-4 py-3 rounded-md text-white">
                        {skill}
                      </p>
                    ))
                  ) : (
                    <p className="bg-blue-600 px-4 py-3 rounded-md text-white">No skills available</p>
                  )}
                </div>
              )}
            </div>
            <div className="bg-white mt-5">
              <h3 className="text-10xl font-semibold">Resume</h3>
              {editMode ? (
                <input
                  type="text"
                  name="resume"
                  value={formData.resume}
                  onChange={handleChange}
                  className="bg-white border border-gray-300 p-2"
                  placeholder="Enter resume URL"
                />
              ) : (
                <a href={formData.resume} className="text-blue-500" target="_blank" rel="noopener noreferrer">
                  View Resume
                </a>
              )}
            </div>
<div className="flex justify-end px-5">
              {editMode ? (
                <>
                  <button onClick={handleSave} className="bg-blue-600 px-10 py-3 rounded-md text-white cursor-pointer">Save</button>
                  <button onClick={() => setEditMode(false)} className="bg-blue-600 px-10 py-3 rounded-md text-white cursor-pointer ml-2">Cancel</button>
                </>
              ) : (
                <button onClick={() => setEditMode(true)} className="bg-blue-600 px-10 py-3 rounded-md text-white cursor-pointer">Edit</button>
              )}
            </div>
      </div>
      </div>    
  )
}

export default StudentProfile;