import { ImCross } from "react-icons/im";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
const FacultyProfile = () => {
  const [facultyDetails, setFacultyDetails] = useState([]);
  const [editMode,setEditMode]=useState(false)
  const navigate=useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    employee_id: '',
    phone: '',
    email: ''
  });
  useEffect(() => {
    const fetchFacultyProflie = async () => {
      try {
        const response = await axios.get('http://localhost:3000/facultyRoutes/facultyProfile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`
          }
        });
         // Store the fetched data in the state variable
        console.log(response.data)
        setFacultyDetails(response.data);
        setEditMode(false)
        setFormData({
              name: response.data.name||'',
    employee_id: response.data.employee_id||'',
    phone: response.data.phone||'',
    email: response.data.email||''
        });
      } catch (err) {
        console.log(err)
      } 
    };

    fetchFacultyProflie();
  }, []);
  const handleSave = async () => {
    try {
      const response = await axios.put('http://localhost:3000/facultyRoutes/editFacultyProfile', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`
        }
      });
      setFacultyDetails(response.data);
      setEditMode(false);
    } catch (err) {
      console.log(err);
    }
  };
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  

  
  if (!facultyDetails) {
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
      <span className="text-5xl bg-white">Employee Id-</span>
      <input
                type="text"
                name="employee_id"
                value={formData.employee_id}
                onChange={handleChange}
                readOnly={true}
                className={`text-5xl bg-white border ${editMode ? 'border-gray-300 p-1' : 'border-none'}`}
              />
      </div>
      <div className="flex gap-1 mt-5 bg-white">
        <div className="bg-white">
      <span className="text-5xl bg-white">Phone No.-</span>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  readOnly={!editMode}
                  className={`text-5xl bg-white border ${editMode ? 'border-gray-300 p-1' : 'border-none'}`}
                />
        </div>
        <div className="bg-white">
        <span className="text-5xl bg-white">Email-</span>
        <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  readOnly={!editMode}
                  className={`w-[20vw] text-5xl bg-white border ${editMode ? 'border-gray-300 p-1' : 'border-none'}`}
                />
        </div>
        
      </div>
      </div>
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

export default FacultyProfile;