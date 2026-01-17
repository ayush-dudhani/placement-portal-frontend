import { Outlet } from "react-router-dom";
import StudentNavbar from "../components/Navbar/StudentNavbar";
import Header from "../components/Header";
import Footer from "../components/Footer";

const StudentLayout = () => {
  return (
    <>
      <Header />
      <StudentNavbar />
      <main style={{ padding: "20px" }}>
        <Outlet />
        <Footer />
      </main>
    </>
  );
};

export default StudentLayout;
