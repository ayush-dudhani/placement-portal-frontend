import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { CalendarClock, CheckCircle2, CircleX, Clock3, FileCheck2, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { usePortalStore } from "@/store/portalStore";
import { portalApi } from "@/api/portalApi";
import StaticFallbackNotice from "@/components/StaticFallbackNotice";

const statusConfig = {
  APPLIED: { label: "Applied", tone: "bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300", step: 1 },
  UNDER_REVIEW: { label: "Under review", tone: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300", step: 2 },
  SHORTLISTED: { label: "Shortlisted", tone: "bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300", step: 3 },
  SELECTED: { label: "Selected", tone: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300", step: 4 },
  NOT_SELECTED: { label: "Not selected", tone: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300", step: 2 },
};

const filters = ["All", "Active", "Shortlisted", "Closed"];

export default function MyApplications() {
  const fallbackApplications = usePortalStore((state) => state.applications);
  const [applications, setApplications] = useState([]);
  const [fallback, setFallback] = useState(false);
  useEffect(() => { portalApi.applications().then((page) => setApplications((page.content || []).map((a) => ({ ...a, company: a.driveTitle || "Company", companySlug: String(a.driveId), role: a.roleTitle, appliedOn: a.appliedAt?.slice(0, 10) || "—", updatedAt: a.appliedAt?.slice(0, 10) || "—", nextStep: a.status, id: a.id })))).catch(() => { setApplications(fallbackApplications); setFallback(true); }); }, [fallbackApplications]);
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");
  const visible = useMemo(() => applications.filter((application) => {
    const statusMatch = filter === "All" || (filter === "Active" && ["APPLIED", "UNDER_REVIEW"].includes(application.status)) || (filter === "Shortlisted" && application.status === "SHORTLISTED") || (filter === "Closed" && ["SELECTED", "NOT_SELECTED"].includes(application.status));
    return statusMatch && `${application.company} ${application.role}`.toLowerCase().includes(query.toLowerCase());
  }), [applications, filter, query]);
  const activeCount = applications.filter((application) => ["APPLIED", "UNDER_REVIEW", "SHORTLISTED"].includes(application.status)).length;

  return (
    <div className="space-y-8">{fallback && <StaticFallbackNotice resource="application data" />}
      <section><p className="text-sm font-bold uppercase tracking-[.18em] text-indigo-600">Application centre</p><h1 className="mt-2 text-3xl font-bold tracking-tight">My applications</h1><p className="mt-2 max-w-2xl text-muted-foreground">Track every application, understand its current stage and prepare for the next action.</p></section>

      <section className="grid gap-4 sm:grid-cols-3">
        {[[applications.length, "Total applications", FileCheck2, "This placement season"], [activeCount, "In progress", Clock3, "Awaiting or in selection rounds"], [applications.filter((item) => item.status === "SHORTLISTED").length, "Shortlisted", CheckCircle2, "Action may be required"]].map(([value, label, Icon, note]) => <Card key={label}><CardContent className="flex items-start justify-between pt-6"><div><p className="text-sm text-muted-foreground">{label}</p><p className="mt-1 text-3xl font-bold">{value}</p><p className="mt-3 text-xs text-muted-foreground">{note}</p></div><span className="rounded-xl bg-indigo-100 p-2.5 text-indigo-600 dark:bg-indigo-950"><Icon className="h-5 w-5" /></span></CardContent></Card>)}
      </section>

      <Card><CardContent className="flex flex-col gap-3 py-4 lg:flex-row lg:items-center lg:justify-between"><div className="relative w-full lg:max-w-sm"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><Input value={query} onChange={(event) => setQuery(event.target.value)} className="h-10 pl-9" placeholder="Search company or role" aria-label="Search applications" /></div><div className="flex gap-2 overflow-x-auto">{filters.map((item) => <Button key={item} size="sm" variant={filter === item ? "default" : "outline"} className={filter === item ? "bg-indigo-600 text-white hover:bg-indigo-700" : ""} onClick={() => setFilter(item)}>{item}</Button>)}</div></CardContent></Card>

      <section className="space-y-4">
        {visible.map((application) => {
          const status = statusConfig[application.status];
          const closed = application.status === "NOT_SELECTED";
          return <Card key={application.id} className="overflow-hidden transition hover:border-indigo-200 hover:shadow-md dark:hover:border-indigo-900"><CardContent className="p-0"><div className="flex flex-col gap-5 p-5 sm:p-6 lg:flex-row lg:items-start lg:justify-between"><div className="flex min-w-0 gap-4"><span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 text-lg font-bold text-white">{application.company[0]}</span><div><div className="flex flex-wrap items-center gap-2"><Link to={`/student/company?companyid=${application.companySlug}`} className="text-lg font-bold hover:text-indigo-600 hover:underline">{application.company}</Link><Badge className={status.tone}>{status.label}</Badge></div><p className="mt-1 font-medium">{application.role}</p><p className="mt-1 text-xs text-muted-foreground">Applied {application.appliedOn} · Updated {application.updatedAt}</p></div></div><div className="rounded-xl border bg-muted/30 p-3 lg:w-72"><p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Next step</p><p className="mt-1 flex items-start gap-2 text-sm font-medium">{closed ? <CircleX className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" /> : <CalendarClock className="mt-0.5 h-4 w-4 shrink-0 text-indigo-600" />}{application.nextStep}</p></div></div><div className="border-t bg-muted/20 px-5 py-4 sm:px-6"><div className="grid grid-cols-4 gap-2" aria-label={`Application progress: ${status.label}`}>{["Applied", "Review", "Shortlist", "Offer"].map((label, index) => { const complete = index + 1 <= status.step && !closed; const stopped = closed && index + 1 === status.step; return <div key={label}><div className={`h-1.5 rounded-full ${complete ? "bg-indigo-500" : stopped ? "bg-slate-400" : "bg-slate-200 dark:bg-slate-800"}`} /><p className={`mt-2 text-[11px] font-medium ${complete ? "text-indigo-700 dark:text-indigo-300" : "text-muted-foreground"}`}>{label}</p></div>; })}</div></div></CardContent></Card>;
        })}
      </section>

      {!visible.length && <Card><CardContent className="py-14 text-center"><Search className="mx-auto h-7 w-7 text-indigo-600" /><h2 className="mt-4 font-semibold">No applications found</h2><p className="mt-1 text-sm text-muted-foreground">Try another filter or explore current placement drives.</p><Button asChild className="mt-4 bg-indigo-600 text-white hover:bg-indigo-700"><Link to="/student/drives">Explore drives</Link></Button></CardContent></Card>}
    </div>
  );
}
