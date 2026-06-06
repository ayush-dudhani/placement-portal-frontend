import { Bell, LogOut, User, GraduationCap, Moon, Sun } from "lucide-react";

import { Link, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { useTheme } from "@/components/ui/theme-provider";

export default function StudentNavbar() {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();

  const username =
    sessionStorage.getItem("username") || sessionStorage.getItem("email");

  const handleLogout = async () => {
    try {
      const token = sessionStorage.getItem("token");

      await fetch("http://localhost:8080/auth/logout", {
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
    <header className="border-b bg-background">
      <div className="max-w-7xl mx-auto h-16 px-6 flex items-center justify-between">
        {/* Left */}
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3">
            {/* <img
              src="/college-logo.png"
              alt="College Logo"
              className="h-10 w-10"
            /> */}
            <GraduationCap className="h-7 w-7" />

            <div>
              <h2 className="font-semibold">Placement Portal</h2>

              <p className="text-xs text-muted-foreground">PCCOE</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/student/dashboard"
              className="text-sm hover:text-primary"
            >
              Dashboard
            </Link>

            <Link to="/student/drives" className="text-sm hover:text-primary">
              Drives
            </Link>

            <Link
              to="/student/applications"
              className="text-sm hover:text-primary"
            >
              Applications
            </Link>

            <Link to="/student/profile" className="text-sm hover:text-primary">
              Profile
            </Link>
          </nav>
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">
          <Button size="icon" variant="ghost">
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

            <span className="hidden md:block text-sm">{username}</span>
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
