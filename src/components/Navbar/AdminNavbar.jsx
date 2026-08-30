import { BarChart3, Building2, LayoutDashboard, LogOut, Moon, ShieldCheck, Sun, Users } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import BrandMark from "@/components/BrandMark";
import NotificationMenu from "@/components/NotificationMenu";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ui/theme-provider";

const links = [
  ["/admin/dashboard", "Overview", LayoutDashboard],
  ["/admin/drives", "Drives", Building2],
  ["/admin/students", "Students", Users],
  ["/admin/analytics", "Analytics", BarChart3],
];

const linkClass = ({ isActive }) => `flex items-center gap-2 whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium transition ${isActive ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`;

export default function AdminNavbar() {
  const { resolvedTheme, setTheme } = useTheme();
  const navigate = useNavigate();
  const logout = () => { sessionStorage.clear(); navigate("/login"); };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-background/95 backdrop-blur dark:border-slate-800">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
        <BrandMark to="/admin/dashboard" compact admin />
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Admin workspace">
          {links.map(([to, label, Icon]) => <NavLink key={to} to={to} className={linkClass}><Icon className="h-4 w-4" />{label}</NavLink>)}
        </nav>
        <div className="flex items-center gap-1 sm:gap-2">
          <NotificationMenu role="admin" />
          <Button type="button" variant="ghost" size="icon" className="rounded-full" aria-label="Toggle colour theme" onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}>
            {resolvedTheme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          <span className="hidden items-center gap-2 rounded-full bg-indigo-50 px-3 py-2 text-sm font-semibold text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 sm:flex"><ShieldCheck className="h-4 w-4" />Admin</span>
          <Button type="button" variant="ghost" size="icon" className="rounded-full" onClick={logout} aria-label="Sign out"><LogOut className="h-4 w-4" /></Button>
        </div>
      </div>
      <nav className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 pb-2 lg:hidden sm:px-6" aria-label="Admin workspace">
        {links.map(([to, label, Icon]) => <NavLink key={to} to={to} className={linkClass}><Icon className="h-4 w-4" />{label}</NavLink>)}
      </nav>
    </header>
  );
}
