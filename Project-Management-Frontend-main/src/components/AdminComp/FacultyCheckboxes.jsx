  // FacultyCheckboxes.jsx
  import React, { useState, useEffect } from 'react';
  import axios from 'axios';
  const FacultyCheckboxes = ({ onSelectionChange }) => {
    const [selectedFaculties, setSelectedFaculties] = useState([]);
    const [facultyLists, setFacultyLists] = useState([]);
    const handleCheckboxChange = (employeeId) => {
      setSelectedFaculties((prevSelectedFaculties) => {
        if (prevSelectedFaculties.includes(employeeId)) {
          return prevSelectedFaculties.filter(id => id !== employeeId);
        } else {
          return [...prevSelectedFaculties, employeeId];
        }
      });
    };

    useEffect(() => {
      if (onSelectionChange) {
        onSelectionChange(selectedFaculties);
      }
    }, [selectedFaculties, onSelectionChange]);
    useEffect(() => {
      const fetchFaculty = async () => {
        try {
          const response = await axios.get('http://localhost:3000/facultyRoutes/getAllFaculty', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`
            }
          });
          setFacultyLists(response.data); // Store the fetched data in the state variable
        } catch (err) {
          console.log(err)
        } 
      };

      fetchFaculty();
    }, []);
    return (
      <div>
        {facultyLists.map(faculty => (
          <div key={faculty._id}>
            <label>
              <input
                type="checkbox"
                checked={selectedFaculties.includes(faculty._id)}
                onChange={() => handleCheckboxChange(faculty._id)}
              />
              {faculty.name}
            </label>
          </div>
        ))}
      </div>
    );
  };

  export default FacultyCheckboxes;
