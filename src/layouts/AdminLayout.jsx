import { Outlet } from "react-router-dom";
import AdminNavbar from "@/components/Navbar/AdminNavbar";
import Footer from "@/components/Footer";

export default function AdminLayout() {
  return <div className="min-h-screen bg-slate-50 dark:bg-slate-950"><AdminNavbar /><main className="mx-auto min-h-[calc(100vh-4rem)] max-w-7xl px-5 py-8 sm:px-6 lg:py-10"><Outlet /><Footer /></main></div>;
}
