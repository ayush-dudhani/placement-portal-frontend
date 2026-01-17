import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const PublicLayout = () => {
  return (
    <div className="public-container">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default PublicLayout;
