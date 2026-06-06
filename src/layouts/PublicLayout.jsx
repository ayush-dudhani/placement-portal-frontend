import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AuthHeader from "@/components/AuthHeader";

const PublicLayout = () => {
  return (
    <div className="public-container">
      <AuthHeader />
      <Outlet />
      <Footer />
    </div>
  );
};

export default PublicLayout;
