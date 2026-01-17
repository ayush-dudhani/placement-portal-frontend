import { BrowserRouter, Routes, Route } from "react-router-dom";

import PublicLayout from "./layouts/PublicLayout";
import StudentLayout from "./layouts/StudentLayout";

// import Login from "./pages/auth/Login";
// import Register from "./pages/auth/Register";

// import StudentHome from "./pages/student/StudentHome";
import StudentProfile from "./pages/student/StudentProfile";
// import UpcomingDrives from "./pages/student/UpcomingDrives";
// import MyApplications from "./pages/student/MyApplications";
import LoginPage from "./pages/LoginPage";
import StudentDashboard from "./pages/student/StudentDashboard";
import Header from "./components/Header";
import Footer from "./components/Footer";
import UpcomingDrives from "./pages/student/UpcomingDrives";
import MyApplications from "./pages/student/MyApplications";

function App() {
  return (
    
    <BrowserRouter>
      <Routes>
        
        {/* PUBLIC ROUTES */}
        <Route element={<PublicLayout />}>
          <Route path="/login" element={<LoginPage />} />
          {/* <Route path="/register" element={<Register />} /> */}
        </Route>

        {/* STUDENT ROUTES */}
        <Route path="/student" element={<StudentLayout />}>
          <Route path="dashboard" element={<StudentDashboard />} />
          <Route path="profile" element={<StudentProfile />} />
          <Route path="drives" element={<UpcomingDrives />} />
          <Route path="applications" element={<MyApplications />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
