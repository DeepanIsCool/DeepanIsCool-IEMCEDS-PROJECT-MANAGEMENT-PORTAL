import React from "react";
import { useNavigate } from "react-router-dom";

function MainDashboard() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 p-8 h-[100vh]">
      <h1 className="text-4xl font-bold mb-12 text-gray-800">Main Dashboard</h1>
      <div className="flex space-x-6">
        <button
          onClick={() => navigate("/facultySignUp")}
          className="bg-blue-600 text-white py-4 px-8 text-xl font-semibold rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-300 cursor-pointer"
        >
          Faculty
        </button>
        <button
          onClick={() => navigate("/studentSignUp")}
          className="bg-green-600 text-white py-4 px-8 text-xl font-semibold rounded-lg shadow-lg hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 transition duration-300 cursor-pointer"
        >
          Student
        </button>
      </div>
    </div>
  );
}

export default MainDashboard;
