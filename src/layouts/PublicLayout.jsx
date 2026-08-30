import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import AuthHeader from "@/components/AuthHeader";

const PublicLayout = () => {
  return (
    <div className="public-container">
      <a href="#main-content" className="sr-only z-[100] rounded-md bg-background px-4 py-2 focus:not-sr-only focus:fixed focus:left-4 focus:top-4">Skip to main content</a>
      <AuthHeader />
      <div id="main-content"><Outlet /></div>
      <Footer />
    </div>
  );
};

export default PublicLayout;
