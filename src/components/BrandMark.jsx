import { GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";

export default function BrandMark({ to = "/", compact = false, admin = false }) {
  return (
    <Link to={to} className="flex min-w-0 items-center gap-3" aria-label="Placement Portal home">
      <span className={`flex shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-lg shadow-indigo-500/20 ${admin ? "from-slate-800 to-indigo-700" : "from-indigo-600 to-violet-600"} ${compact ? "h-9 w-9" : "h-10 w-10"}`}>
        <GraduationCap className="h-5 w-5" aria-hidden="true" />
      </span>
      <span className="min-w-0">
        <span className="block truncate text-sm font-bold tracking-tight sm:text-base">Placement Portal</span>
        <span className="block truncate text-xs text-muted-foreground">ABC Institute of Technology</span>
      </span>
    </Link>
  );
}
