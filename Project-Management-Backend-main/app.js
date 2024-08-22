//app,.js
const express = require('express');
const mongoose = require('mongoose');
const connectDb = require('./config/db'); // Database connection
const studentsRoutes = require('./Students/studentsRoutes');
const cors = require("cors");
require("dotenv").config();
const session = require("express-session");
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Connect to MongoDB
connectDb();

// Middleware
app.use(express.json());
const allowedOrigins = "*";
// [
//   "http://localhost:5173",
//   "http://localhost:5174"
  
  
// ];


const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }  
  },
};

app.use(cors(corsOptions));
const resumeDir = path.join(__dirname, 'Resumes');

// Check if the "resume" directory exists, if not, create it
if (!fs.existsSync(resumeDir)) {
  fs.mkdirSync(resumeDir);
  console.log('Directory "resume" created.');
} else {
  console.log('Directory "resume" already exists.');
}
// Routes
// app.use('/studentsRoutes', studentsRoutes);
app.use('/api/studentsRoutes', require("./Students/studentsRoutes"));
app.use('/api/facultyRoutes', require("./Faculty/facultyRoutes"));
//app.use('/adminRoutes', require("./Admin/adminRoutes"));
app.use('/api/projectRoutes', require("./Projects/projectRoutes"));

app.get("/api", (req, res) => {
    res.send("Welcome to the Project Management Backend");
  });
// Start server
app.listen(3000, () => {
    console.log(`Server is running on port 3000`);
});
