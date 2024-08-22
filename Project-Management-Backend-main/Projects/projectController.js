const asyncHandler = require("express-async-handler");
const Project = require("./projectModel");
const ProjectApplication = require("./projectApplicationModel");
const constants = require("../constants");
const FacultyUser = require("../Faculty/facultyUserModel");
const StudentUser = require("../Students/studentsUserModel");
const Faculty = require("../Faculty/facultyUserModel");

const CreateProject = asyncHandler(async (req, res) => {
    // Destructure required fields from formData
    const { project_name, launchDate, launchTime, status, expiryDate, requirements, projectDuration, description, faculty_list,githubLink } = req.body;

    // Check if all required fields are present
    if (!project_name || !launchDate || !launchTime || !status || !expiryDate || !requirements || !projectDuration) {
        return res.status(400).json({ error: "All fields are required" });
    }

    // Check if a project with the same project_name already exists
    const existingProject = await Project.findOne({ project_name });
    if (existingProject) {
        return res.status(400).json({ error: "A project with the same project_name already exists" });
    }

    // Create new project
    const newProject = new Project({
        project_name,
        launchDate,
        launchTime,
        status,
        expiryDate,
        projectDuration,
        description,
        requirements,
        faculty_list,
        githubLink,
        createdBY: req.user._id, // Assume user ID is available in req.user
    });

    // Save the Project to the database
    try {
        const savedProject = await newProject.save();
        res.status(201).json({ message: "Project created successfully", project: savedProject });
    } catch (error) {
        console.error("Error creating project:", error);
        res.status(500).json({ error: "Error creating project", message: error.message });
    }
});

const EditProject = async (req, res) => {
  try {
    const { project_name, launchDate, launchTime, status, expiryDate, projectDuration, description, requirements, faculty_list, githubLink } = req.body;
    const projectId = req.params.id; // Extract project ID from the request parameters
    console.log(projectId);

    // Fetch the project using the provided project ID
    const project = await Project.findById(projectId);

    // Check if the project exists
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Update fields if they are provided in the request body
    if (project_name) project.project_name = project_name;
    if (description) project.description = description;
    if (launchDate) project.launchDate = launchDate;
    if (launchTime) project.launchTime = launchTime;
    if (status) project.status = status;
    if (expiryDate) project.expiryDate = expiryDate;
    if (projectDuration) project.projectDuration = projectDuration;
    if (requirements) project.requirements = requirements;
    if (faculty_list) project.faculty_list = faculty_list;
    if (githubLink) project.githubLink = githubLink;

    // Save the updated project
    await project.save();

    // Return a success response
    res.status(200).json({ message: "Project updated successfully" });
  } catch (error) {
    console.error("Error updating project:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


const getAllApplications = asyncHandler(async (req, res) => {
  try {
    // Extract facultyId from the authenticated user
    const facultyId = req.user.id;

    // Find all project applications where the head_facultyId matches the facultyId
    const applications = await ProjectApplication.find({ facultyId: facultyId });

    // Return the applications in the response
    res.status(200).json(applications);
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

const getProjectById = asyncHandler(async (req, res) => {
  try {
    // Extract the project ID from the request body
    const { id } = req.body;

    // Ensure the ID is provided
    if (!id) {
      return res.status(constants.VALIDATION_ERROR).json({ message: "Project ID is required" });
    }

    // Fetch the project by ID
    const project = await Project.findById(id);
    if (!project) {
      return res.status(constants.NOT_FOUND).json({ message: "Project not found" });
    }

    // Return the project details
    return res.status(constants.OK).json(project);
  } catch (error) {
    console.error("Error fetching project:", error);
    res.status(constants.INTERNAL_SERVER_ERROR).json({ message: "Internal server error" });
  }
});

// Function to get projects
const getProjects = asyncHandler(async (req, res) => {
  try {
    const userId = req.user.id; // Extract user ID from the request

    // Fetch and return all projects where the user is the head faculty (createdBY) or in the faculty list
    const projects = await Project.find({
      $or: [
        { createdBY: userId },
        { faculty_list: userId }
      ]
    });

    if (projects.length === 0) {
      return res.status(404).json({ message: 'No projects found for this user' });
    }

    return res.status(200).json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Student applies for a project
const applyForProject = async (req, res) => {
  const { projectId } = req.body;
  const studentId = req.user._id;

  try {
    // Fetch the project using the provided project ID
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Check if the student has already applied for this project
    const existingApplication = await ProjectApplication.findOne({ studentId, projectId });
    if (existingApplication) {
      return res.status(400).json({ message: 'You have already applied for this project' });
    }

    // Fetch the student details
    const student = await StudentUser.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Combine createdBY and faculty_list into the facultyId array
    const facultyId = [project.createdBY, ...project.faculty_list];

    // Create a new project assignment
    const application = new ProjectApplication({
      studentId: studentId,
      projectId: projectId,
      facultyId: facultyId, // Add the faculty IDs
      student_name: student.name,
      project_name: project.project_name,
    });

    // Save the application
    await application.save();

    // Return a success response
    res.status(201).json({ message: 'Application submitted successfully', application: application });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const approveApplication = async (req, res) => {
  const { applicationId, status } = req.body;

  try {
    // Find the application by ID and populate project details
    const application = await ProjectApplication.findById(applicationId);
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    // Handle the status (approve or reject)
    if (status === 'Approved') {
      application.status = 'Approved';
      await application.save();

      // Add student to the project's studentTeam
      await Project.findByIdAndUpdate(application.projectId, {
        $addToSet: { studentTeam: application.studentId }
      });

      await ProjectApplication.findByIdAndDelete(applicationId);

      res.status(200).json({ message: 'Application approved successfully' });
    } else if (status === 'Rejected') {
      await ProjectApplication.findByIdAndDelete(applicationId);
      res.status(200).json({ message: 'Application rejected and deleted successfully' });
    } else {
      return res.status(400).json({ message: 'Invalid status' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const deleteProject = async (req, res) => {
  const { projectID } = req.body;
  
  try {
    // Delete all project assignments related to the project
    const result2 = await ProjectApplication.deleteMany({ projectId: projectID });

    // Delete the project
    const result1 = await Project.findByIdAndDelete(projectID);

    if (!result1) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Check if any project assignments were deleted
    if (result2.deletedCount === 0) {
      return res.status(404).json({ message: "No related ProjectAssignments found" });
    }

    res.status(200).json({ message: "Project and related applications deleted successfully" });
  } catch (error) {
    console.error("Error deleting project:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAllProjects = asyncHandler(async (req, res) => {
  try {
    const projects = await Project.find({});
    if (projects.length === 0) {
      return res.status(constants.NOT_FOUND).json({ message: 'No projects found' });
    }
    return res.status(constants.OK).json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(constants.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
  }
});




  
module.exports = { getProjects, EditProject, CreateProject, applyForProject, approveApplication, getAllApplications, deleteProject,getAllProjects,getProjectById };
  

