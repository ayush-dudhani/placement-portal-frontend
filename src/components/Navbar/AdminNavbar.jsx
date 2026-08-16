import { BarChart3, Bell, Building2, GraduationCap, LayoutDashboard, LogOut, Moon, ShieldCheck, Sun, Users } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ui/theme-provider";

const links = [
  ["/admin/dashboard", "Overview", LayoutDashboard],
  ["/admin/drives", "Drives", Building2],
  ["/admin/students", "Students", Users],
  ["/admin/analytics", "Analytics", BarChart3],
];

export default function AdminNavbar() {
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const logout = () => { sessionStorage.clear(); navigate("/login"); };
  return <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-background/90 backdrop-blur dark:border-slate-800"><div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-6"><div className="flex items-center gap-6"><Link to="/admin/dashboard" className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-slate-800 to-indigo-700 text-white shadow-lg shadow-indigo-500/25"><GraduationCap className="h-5 w-5" /></span><span><span className="block text-sm font-bold tracking-tight">Placement Portal</span><span className="block text-xs text-muted-foreground">Admin workspace</span></span></Link><nav className="hidden items-center gap-1 lg:flex">{links.map(([to, label, Icon]) => <Link key={to} to={to} className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition ${location.pathname === to ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}><Icon className="h-4 w-4" />{label}</Link>)}</nav></div><div className="flex items-center gap-2"><Button variant="ghost" size="icon" className="rounded-full" aria-label="Notifications"><Bell className="h-4 w-4" /></Button><Button variant="ghost" size="icon" className="rounded-full" aria-label="Toggle colour theme" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>{theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}</Button><span className="hidden items-center gap-2 rounded-lg bg-indigo-50 px-3 py-2 text-sm font-semibold text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 sm:flex"><ShieldCheck className="h-4 w-4" />Admin</span><Button variant="outline" size="sm" onClick={logout}><LogOut className="mr-2 h-4 w-4" />Logout</Button></div></div></header>;
}
