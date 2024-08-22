import { useEffect } from "react";
import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import AdminDashboard from "./pages/AdminDashboard";
import ProjectForm from "./pages/Project-form";
import StudentDashboard from "./pages/StudentDashboard";
import Admin from "./pages/Admin";
import EditForm from "./pages/EditForm";
import StudentProfile from "./pages/StudentProfile";
import FacultyProfile from "./pages/FacultyProfile";
import FacultySignUp from "./pages/FacultySignUp/FacultySignUp";
import StudentSignUp from "./pages/StudentSignUp/StudentSignUp";
import FacultyLogin from "./pages/FacultyLogin/FacultyLogin";
import StudentLogin from "./pages/StudentLogin/StudentLogin";
import MainDashboard from "./pages/MainDashboad";
function App() {
  
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  useEffect(() => {
    let title = "";
    let metaDescription = "";

    switch (pathname) {
      case "/":
        title = "";
        metaDescription = "";
        break;
      case "/admin-dashboard":
        title = "";
        metaDescription = "";
        break;
    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag = document.querySelector(
        'head > meta[name="description"]'
      );
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);

  return (
    <Routes>
      <Route path="/" element={<MainDashboard />} />

      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/edit/:projectId" element={<EditForm />} />
      <Route path="/Project-form" element={<ProjectForm />} />
      <Route path="/student-dashboard" element={<StudentDashboard/>}/>
      <Route path="/studentProfile" element={<StudentProfile/>}/>
      <Route path="/facultyProfile" element={<FacultyProfile/>}/>

      <Route path="/studentSignUp" element={<StudentSignUp/>}/>
      <Route path="/facultySignUp" element={<FacultySignUp/>}/>
      <Route path="/facultyLogin" element={<FacultyLogin/>}/>
      <Route path="/studentLogin" element={<StudentLogin/>}/>
      <Route path="/admin-dashboard" element={<Admin/>}/>
    </Routes>
  );
}
export default App;
