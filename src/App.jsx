import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import "../src/App.css";
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
import SignupPage from "./pages/SignupPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import LandingPage from "./pages/LandingPage";
import CompaniesPage from "./pages/student/CompaniesPage";
import CompanyDetailsPage from "./pages/student/CompanyDetailsPage";
import LegacyCompanyRedirect from "./pages/student/LegacyCompanyRedirect";
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminDrivesPage from "./pages/admin/AdminDrivesPage";
import AdminStudentsPage from "./pages/admin/AdminStudentsPage";
import AdminAnalyticsPage from "./pages/admin/AdminAnalyticsPage";
import RequireRole from "./components/RequireRole";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          {/* <Route path="/register" element={<Register />} /> */}
        </Route>

        {/* STUDENT ROUTES */}
        <Route element={<RequireRole role="STUDENT" />}>
          <Route path="/student" element={<StudentLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<StudentDashboard />} />
            <Route path="profile" element={<StudentProfile />} />
            <Route path="drives" element={<UpcomingDrives />} />
            <Route path="applications" element={<MyApplications />} />
            <Route path="companies" element={<CompaniesPage />} />
            <Route path="company" element={<CompanyDetailsPage />} />
            <Route path="companies/:slug" element={<LegacyCompanyRedirect />} />
          </Route>
        </Route>

        <Route element={<RequireRole role="ADMIN" />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="drives" element={<AdminDrivesPage />} />
            <Route path="students" element={<AdminStudentsPage />} />
            <Route path="analytics" element={<AdminAnalyticsPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
