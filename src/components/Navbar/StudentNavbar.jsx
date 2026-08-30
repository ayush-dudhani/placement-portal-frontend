import { BriefcaseBusiness, Building2, FileText, LayoutDashboard, LogOut, Moon, Sun, UserRound } from "lucide-react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import BrandMark from "@/components/BrandMark";
import NotificationMenu from "@/components/NotificationMenu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ui/theme-provider";
import { API_BASE_URL } from "@/config";

const links = [
  ["/student/dashboard", "Home", LayoutDashboard],
  ["/student/drives", "Drives", BriefcaseBusiness],
  ["/student/companies", "Companies", Building2],
  ["/student/applications", "Applications", FileText],
  ["/student/profile", "Profile", UserRound],
];

const linkClass = ({ isActive }) => `flex items-center gap-2 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium transition ${isActive ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`;

export default function StudentNavbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { resolvedTheme, setTheme } = useTheme();
  const username = sessionStorage.getItem("username") || sessionStorage.getItem("email") || "Student";
  const navClass = (to) => ({ isActive }) => linkClass({ isActive: isActive || (to === "/student/companies" && location.pathname === "/student/company") });

  const handleLogout = async () => {
    try {
      const token = sessionStorage.getItem("accessToken");
      if (API_BASE_URL && token) {
        await fetch(`${API_BASE_URL}/api/v1/auth/logout`, { method: "POST", credentials: "include", headers: { Authorization: `Bearer ${token}` } });
      }
    } catch {
      // A failed server logout should not trap the user in the local session.
    } finally {
      sessionStorage.clear();
      navigate("/login");
    }
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-background/95 backdrop-blur dark:border-slate-800">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
        <BrandMark to="/student/dashboard" compact />
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Student workspace">
          {links.map(([to, label, Icon]) => <NavLink key={to} to={to} className={navClass(to)}><Icon className="h-4 w-4" />{label}</NavLink>)}
        </nav>
        <div className="flex items-center gap-1 sm:gap-2">
          <NotificationMenu role="student" />
          <Button type="button" variant="ghost" size="icon" className="rounded-full" aria-label="Toggle colour theme" onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}>
            {resolvedTheme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          <div className="hidden items-center gap-2 rounded-full border py-1 pl-1 pr-3 sm:flex">
            <Avatar className="h-8 w-8"><AvatarFallback className="bg-indigo-100 text-xs font-bold text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">{username.charAt(0).toUpperCase()}</AvatarFallback></Avatar>
            <span className="max-w-28 truncate text-sm font-medium">{username.split("@")[0]}</span>
          </div>
          <Button type="button" variant="ghost" size="icon" className="rounded-full" onClick={handleLogout} aria-label="Sign out"><LogOut className="h-4 w-4" /></Button>
        </div>
      </div>
      <nav className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 pb-2 lg:hidden sm:px-6" aria-label="Student workspace">
        {links.map(([to, label, Icon]) => <NavLink key={to} to={to} className={navClass(to)}><Icon className="h-4 w-4" />{label}</NavLink>)}
      </nav>
    </header>
  );
}
