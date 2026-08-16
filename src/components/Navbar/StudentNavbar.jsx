import { Bell, LogOut, User, GraduationCap, Moon, Sun } from "lucide-react";

import { Link, useLocation, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { useTheme } from "@/components/ui/theme-provider";
import { API_BASE_URL } from "@/config";

export default function StudentNavbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, setTheme } = useTheme();

  const username =
    sessionStorage.getItem("username") || sessionStorage.getItem("email");

  const handleLogout = async () => {
    try {
      const token = sessionStorage.getItem("token");

      await fetch(`${API_BASE_URL}/auth/logout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } finally {
      sessionStorage.clear();
      navigate("/login");
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-background/90 backdrop-blur dark:border-slate-800">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-6">
        {/* Left */}
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3">
            {/* <img
              src="/college-logo.png"
              alt="College Logo"
              className="h-10 w-10"
            /> */}
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/25"><GraduationCap className="h-5 w-5" /></div>

            <div>
              <h2 className="font-bold tracking-tight">Placement Portal</h2>

              <p className="text-xs text-muted-foreground">PCCOE</p>
            </div>
          </div>

          <nav className="hidden items-center gap-1 md:flex">
            {[["/student/dashboard", "Dashboard"], ["/student/drives", "Drives"], ["/student/companies", "Companies"], ["/student/applications", "Applications"], ["/student/profile", "Profile"]].map(([to, label]) => (
              <Link key={to} to={to} className={`rounded-lg px-3 py-2 text-sm font-medium transition ${(location.pathname === to || (to === "/student/companies" && location.pathname === "/student/company")) ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}>{label}</Link>
            ))}
          </nav>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">
          <Button size="icon" variant="ghost" className="rounded-full">
            <Bell className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button>
          <div className="flex items-center gap-2">
            <Avatar>
              {/* <AvatarImage src={profileImageUrl} /> */}
              <AvatarFallback>
                {username ? (
                  username.charAt(0).toUpperCase()
                ) : (
                  <User className="h-4 w-4" />
                )}
              </AvatarFallback>
            </Avatar>

            <span className="hidden max-w-28 truncate text-sm font-medium md:block">{username}</span>
          </div>

          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
}
