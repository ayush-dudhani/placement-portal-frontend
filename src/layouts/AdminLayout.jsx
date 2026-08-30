import { Outlet } from "react-router-dom";
import AdminNavbar from "@/components/Navbar/AdminNavbar";
import Footer from "@/components/Footer";

export default function AdminLayout() {
  return <div className="min-h-screen bg-slate-50 dark:bg-slate-950"><a href="#main-content" className="sr-only z-[100] rounded-md bg-background px-4 py-2 focus:not-sr-only focus:fixed focus:left-4 focus:top-4">Skip to main content</a><AdminNavbar /><main id="main-content" className="mx-auto min-h-[calc(100vh-4rem)] max-w-7xl px-4 py-7 sm:px-6 lg:py-10"><Outlet /><Footer /></main></div>;
}
