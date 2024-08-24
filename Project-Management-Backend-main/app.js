const express = require('express');
const mongoose = require('mongoose');
const connectDb = require('./config/db'); // Database connection
const cors = require("cors");
require("dotenv").config();
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Connect to MongoDB
connectDb();

// Middleware
app.use(express.json());

// Use CORS middleware to allow all origins
app.use(cors());

// Routes
app.use('/api/studentsRoutes', require("./Students/studentsRoutes"));
app.use('/api/facultyRoutes', require("./Faculty/facultyRoutes"));
app.use('/api/projectRoutes', require("./Projects/projectRoutes"));

app.get("/api", (req, res) => {
    res.send("Welcome to the Project Management Backend");
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});