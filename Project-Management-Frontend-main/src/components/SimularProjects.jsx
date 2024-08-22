import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import GroupComponent from "./GroupComponent";

const SimularProjects = ({ className = "" }) => {
  const navigate = useNavigate();
  const [numberOfComponents, setNumberOfComponents] = useState(2);
  const [formData, setFormData] = useState({});
  const [isFormOpen, setIsFormOpen] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:3000/projectRoutes/createProject"); // Replace with your API endpoint
      const data = await response.json();
      setFormData(data);
      setIsFormOpen(true); // Open the form after fetching data
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  const handleAddMoreClick = () => {
    navigate("/project-form"); // Navigate to ProjectForm.jsx when the button is clicked
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    setNumberOfComponents((prevCount) => prevCount + 1);
    setIsFormOpen(false); // Close the form after submission
  };

  return (
    <section
      className={`self-stretch flex flex-row items-start justify-end py-0 pr-[26px] pl-[30px] box-border max-w-full ${className}`}
    >
      <div className="flex-1 flex flex-col items-start justify-start gap-[63px] max-w-full mq900:gap-[31px] mq450:gap-[16px]">
        {Array.from({ length: numberOfComponents }).map((_, index) => (
          <GroupComponent key={index} propFlex="unset" propAlignSelf="stretch" />
        ))}
      </div>
      <div className="w-[120px] flex flex-col items-start justify-start pt-[5px] px-0 pb-0 box-border text-white">
        <div className="self-stretch h-9 relative">
          <button
            className="bg-royalblue-100 hover:bg-sky-700 rounded w-full h-full cursor-pointer z-[1]"
            onClick={handleAddMoreClick}
          >
            ADD MORE
          </button>
        </div>
      </div>

      {isFormOpen && (
        <div className="form-overlay">
          <form onSubmit={handleFormSubmit}>
            {/* Render form fields based on fetched data */}
            <div>
              <label htmlFor="projectName">Project Name:</label>
              <input
                type="text"
                id="projectName"
                value={formData.projectName || ""}
                onChange={(e) =>
                  setFormData({ ...formData, projectName: e.target.value })
                }
              />
            </div>
            <button type="submit">Submit</button>
            <button type="button" onClick={() => setIsFormOpen(false)}>
              Cancel
            </button>
          </form>
        </div>
      )}
    </section>
  );
};

SimularProjects.propTypes = {
  className: PropTypes.string,
};

export default SimularProjects;
