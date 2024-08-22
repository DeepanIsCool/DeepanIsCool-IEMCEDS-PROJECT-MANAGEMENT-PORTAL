import React, { useEffect, useState } from "react";
import axios from "axios";
import useCurrentDate from "../hooks/useCurrentDate";
import useCurrentTime from "../hooks/useCurrentTime";
import FacultyCheckboxes from "../components/AdminComp/FacultyCheckboxes";
import useProjectDuration from "../hooks/useProjectDuration";
import { useNavigate } from "react-router-dom";
function ProjectForm() {
  const navigate = useNavigate();
  const [id,setId]=useState("")
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
       setId(response.data._id)
      } catch (err) {
        console.log(err)
      } 
    };

    fetchFacultyProflie();
  }, []);
  const [formData, setFormData] = useState({
    project_name: "",
    launchDate: "",
    launchTime: "",
    status: "",
    expiryDate: "",
    expiryTime: "",
    projectDuration: "",
    description: "",
    requirements: "",
    faculty_list:[id]
  });
   const currentDate=useCurrentDate()
  const currentTime=useCurrentTime()
  const expiryDate=formData.expiryDate
  const duration = useProjectDuration(currentDate,expiryDate)
  const [responseMessage, setResponseMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedFaculties, setSelectedFaculties] = useState([]);

  const handleSelectionChange = (newSelection) => {
    setSelectedFaculties(newSelection);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const defaultId = id; // Replace with your actual default faculty ID
    const updatedFacultyList = formData.faculty_list.length === 0 
      ? [defaultId] 
      : formData.faculty_list;
  
    // Prepare the data to be sent to the API
    const dataToSend = {
      ...formData,
      faculty_list: updatedFacultyList
    };
console.log(formData);
    try {
      const response = await axios.post(
        "http://localhost:3000/projectRoutes/createProject",
        dataToSend,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      console.log(formData);
      setResponseMessage(
        response.data.message || "Form submitted successfully!"
      );
      setErrorMessage("");
      setFormData({
        project_name: "",
        launchDate: "",
        launchTime: "",
        status: "",
        expiryDate: "",
        expiryTime: "",
        projectDuration: "",
        description: "",
        requirements: "",
        faculty_list:[]
      });
      navigate("/admin-dashboard")
    } catch (error) {
      console.error("Error submitting form:", error.response.data);
      setResponseMessage("");
      setErrorMessage("Error submitting form. Please try again.");
    }
  };
  formData.launchDate=currentDate
  formData.launchTime=currentTime
  formData.status="Upcoming"
 formData.projectDuration=duration
 formData.faculty_list=selectedFaculties
  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Project Form</h1>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="mb-4">
            <label
              htmlFor="project_name"
              className="block text-gray-700 font-bold mb-2"
              onClick={()=>console.log(formData)}
            >
              Project Name
            </label>
            <input
              type="text"
              id="project_name"
              name="project_name"
              value={formData.project_name}
              onChange={handleChange}
              className="w-[98%] px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="expiryDate"
              className="block text-gray-700 font-bold mb-2"
            >
              Expiry Date
            </label>
            <input
              type="date"
              id="expiryDate"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
              min={currentDate}
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="expiryTime"
              className="block text-gray-700 font-bold mb-2"
            >
              Expiry Time
            </label>
            <input
              type="time"
              id="expiryTime"
              name="expiryTime"
              value={formData.expiryTime}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
              required
            />
          </div>

          <div className="mb-4 ml-3">
            <p className="inline text-gray-700 font-bold mb-2">Project Duration</p>
          <p className="border-solid border-cyan-950 border-2">{duration}</p>
          </div>

          <div className="mb-4 col-span-2">
            <label
              htmlFor="description"
              className="block text-gray-700 font-bold mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
              rows="4"
              required
            ></textarea>
          </div>

          <div className="mb-4 col-span-2">
            <label
              htmlFor="requirements"
              className="block text-gray-700 font-bold mb-2"
            >
              Requirements
            </label>
            <textarea
              id="requirements"
              name="requirements"
              value={formData.requirements}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500"
              rows="4"
              required
            ></textarea>
          </div>

        </div>
        <h3>Select Faculty</h3>
        <FacultyCheckboxes onSelectionChange={handleSelectionChange} />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
        >
          Submit
        </button>
      </form>
      {responseMessage && (
        <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-lg">
          {responseMessage}
        </div>
      )}
      {errorMessage && (
        <div className="mt-4 p-4 bg-red-100 text-red-800 rounded-lg">
          {errorMessage}
        </div>
      )}

    </div>
  );
}
export default ProjectForm;