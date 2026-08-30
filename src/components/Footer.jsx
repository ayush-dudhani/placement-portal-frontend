import { Link, useLocation } from "react-router-dom";
import BrandMark from "@/components/BrandMark";

export default function Footer() {
  const { pathname } = useLocation();
  const isWorkspace = pathname.startsWith("/student") || pathname.startsWith("/admin");
  const home = pathname.startsWith("/admin") ? "/admin/dashboard" : pathname.startsWith("/student") ? "/student/dashboard" : "/";

  if (isWorkspace) {
    return (
      <footer className="mt-12 flex flex-col gap-2 border-t py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} ABC Institute of Technology</p>
        <div className="flex flex-wrap gap-x-4 gap-y-2"><a href="mailto:placements@college.edu" className="hover:text-foreground">Placement support</a><span>Academic year 2026–27</span></div>
      </footer>
    );
  }

  if (pathname !== "/") {
    return <footer className="border-t bg-background"><div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6"><p>© {new Date().getFullYear()} ABC Institute of Technology</p><a href="mailto:placements@college.edu" className="hover:text-foreground">Need help? Contact the placement cell</a></div></footer>;
  }

  return (
    <footer className="border-t bg-background">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 sm:px-6 md:grid-cols-[1.3fr_.7fr_.7fr]">
        <div><BrandMark to={home} /><p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">One trusted workspace for verified campus opportunities, student readiness, applications and placement outcomes.</p></div>
        <div><h2 className="text-sm font-semibold">Portal</h2><div className="mt-3 flex flex-col gap-2 text-sm text-muted-foreground"><Link to="/login" className="hover:text-foreground">Sign in</Link><Link to="/signup" className="hover:text-foreground">Student registration</Link><Link to="/forgot-password" className="hover:text-foreground">Account recovery</Link></div></div>
        <div><h2 className="text-sm font-semibold">Placement cell</h2><div className="mt-3 flex flex-col gap-2 text-sm text-muted-foreground"><a href="mailto:placements@college.edu" className="hover:text-foreground">placements@college.edu</a><span>Pune, Maharashtra – 411001</span><span>Mon–Fri · 9:00 AM–5:00 PM</span></div></div>
      </div>
      <div className="border-t"><div className="mx-auto max-w-7xl px-5 py-4 text-xs text-muted-foreground sm:px-6">© {new Date().getFullYear()} ABC Institute of Technology · Placement & Career Portal</div></div>
    </footer>
  );
}
