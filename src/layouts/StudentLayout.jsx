import { Outlet } from "react-router-dom";
import StudentNavbar from "../components/Navbar/StudentNavbar";
import Header from "../components/Header";
import Footer from "../components/Footer";

const StudentLayout = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <StudentNavbar />
      <main className="mx-auto min-h-[calc(100vh-4rem)] max-w-7xl px-5 py-8 sm:px-6 lg:py-10">
        <Outlet />
        <Footer />
      </main>
    </div>
  );
};

export default StudentLayout;
