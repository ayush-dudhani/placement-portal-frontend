import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BriefcaseBusiness, CalendarDays, CheckCircle2, Clock3, IndianRupee, MapPin, Search, SlidersHorizontal, Star, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { companyList } from "@/data/companies";

const driveState = {
  google: { status: "Upcoming", deadline: "Closes in 4 days", applied: false },
  microsoft: { status: "Upcoming", deadline: "Closes in 6 days", applied: false },
  amazon: { status: "Live now", deadline: "Closes in 2 days", applied: true },
  infosys: { status: "Closed", deadline: "Drive completed", applied: true },
};

const statusStyles = {
  Upcoming: "bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300",
  "Live now": "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
  Closed: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
};

const drives = companyList.flatMap((company) => company.roles.map((role) => ({ ...role, company, ...driveState[company.slug] }))).sort((a, b) => (a.status === "Live now" ? -1 : b.status === "Live now" ? 1 : 0));

export default function UpcomingDrives() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All");
  const [applied, setApplied] = useState(() => new Set(drives.filter((drive) => drive.applied).map((drive) => `${drive.company.slug}-${drive.title}`)));
  const visibleDrives = useMemo(() => drives.filter((drive) => {
    const text = `${drive.company.name} ${drive.title} ${drive.company.location} ${drive.package} ${drive.eligibility}`.toLowerCase();
    return text.includes(query.toLowerCase()) && (status === "All" || drive.status === status);
  }), [query, status]);
  const apply = (id) => setApplied((current) => new Set([...current, id]));

  return <div className="space-y-8">
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-700 via-indigo-700 to-violet-700 p-7 text-white shadow-xl shadow-indigo-950/15 sm:p-9"><div className="absolute right-0 top-0 h-56 w-56 rounded-full bg-white/10 blur-3xl" /><div className="relative max-w-2xl"><p className="text-sm font-bold uppercase tracking-[.18em] text-indigo-200">Your opportunity board</p><h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Find the role that moves you forward.</h1><p className="mt-3 leading-7 text-indigo-100">Review campus drives, compare package details and apply to roles that match your profile.</p><div className="mt-6 flex flex-wrap gap-4 text-sm"><span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-emerald-300" />{drives.filter((drive) => drive.status === "Live now").length} drive live now</span><span className="flex items-center gap-2"><BriefcaseBusiness className="h-4 w-4" />{drives.filter((drive) => drive.status !== "Closed").length} open roles</span></div></div></section>
    <section className="grid gap-4 sm:grid-cols-3">{[[drives.filter((drive) => drive.status === "Live now").length, "Live opportunities", "Apply before the deadline"], [drives.filter((drive) => drive.status === "Upcoming").length, "Upcoming roles", "Prepare your profile early"], [applied.size, "Applications started", "Track them in Applications"]].map(([value, label, note]) => <Card key={label}><CardContent className="pt-6"><p className="text-3xl font-bold">{value}</p><p className="mt-1 font-medium">{label}</p><p className="mt-2 text-sm text-muted-foreground">{note}</p></CardContent></Card>)}</section>
    <Card><CardContent className="space-y-4 py-5"><div className="relative"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><Input className="h-11 pl-9" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search company, role, CTC or location" />{query && <button type="button" aria-label="Clear drive search" onClick={() => setQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"><X className="h-4 w-4" /></button>}</div><div className="flex flex-wrap items-center gap-2"><SlidersHorizontal className="h-4 w-4 text-indigo-600" />{["All", "Live now", "Upcoming", "Closed"].map((item) => <Button key={item} size="sm" variant={status === item ? "default" : "outline"} onClick={() => setStatus(item)} className={status === item ? "bg-indigo-600 text-white hover:bg-indigo-700" : ""}>{item}{item !== "All" && ` (${drives.filter((drive) => drive.status === item).length})`}</Button>)}</div></CardContent></Card>
    <div className="flex items-center justify-between"><div><p className="text-sm font-semibold">{visibleDrives.length} role{visibleDrives.length !== 1 ? "s" : ""} found</p><p className="mt-1 text-sm text-muted-foreground">Packages and requirements are shown for quick comparison.</p></div><Link className="hidden text-sm font-semibold text-indigo-600 hover:text-indigo-700 sm:block" to="/student/companies">Browse companies <ArrowRight className="ml-1 inline h-4 w-4" /></Link></div>
    <section className="space-y-4">{visibleDrives.map((drive) => { const id = `${drive.company.slug}-${drive.title}`; const hasApplied = applied.has(id); return <Card key={id} className="overflow-visible transition hover:border-indigo-200 hover:shadow-md hover:shadow-indigo-950/5 dark:hover:border-indigo-800"><CardContent className="py-5"><div className="flex flex-col gap-5 lg:flex-row lg:items-center"><div className="flex items-start gap-4 lg:w-[31%]"><span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 text-lg font-bold text-white">{drive.company.name[0]}</span><div><div className="flex flex-wrap items-center gap-2"><Link to={`/student/company?companyid=${drive.company.slug}`} className="font-semibold hover:text-indigo-600 hover:underline">{drive.company.name}</Link><span className="flex items-center gap-1 text-xs font-semibold text-amber-600"><Star className="h-3.5 w-3.5 fill-current" />{drive.company.rating}</span></div><h2 className="mt-1 text-lg font-bold">{drive.title}</h2><p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground"><MapPin className="h-3.5 w-3.5 text-indigo-600" />{drive.company.location}</p></div></div><div className="grid flex-1 grid-cols-2 gap-x-5 gap-y-4 text-sm sm:grid-cols-3"><div><p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">CTC</p><p className="mt-1 flex items-center gap-1 font-semibold"><IndianRupee className="h-3.5 w-3.5 text-indigo-600" />{drive.package}</p></div><div><p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Eligibility</p><p className="mt-1 font-semibold">{drive.eligibility}</p></div><div><p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Drive date</p><p className="mt-1 flex items-center gap-1 font-semibold"><CalendarDays className="h-3.5 w-3.5 text-indigo-600" />{drive.date}</p></div></div><div className="flex shrink-0 flex-wrap items-center gap-2 lg:w-48 lg:justify-end"><Badge className={statusStyles[drive.status]}>{drive.status}</Badge>{drive.status !== "Closed" && <span className="flex w-full items-center justify-end gap-1 text-xs text-muted-foreground"><Clock3 className="h-3.5 w-3.5" />{drive.deadline}</span>}<Button asChild size="sm" variant="outline"><Link to={`/student/company?companyid=${drive.company.slug}`}>Details</Link></Button>{drive.status !== "Closed" && <Button size="sm" disabled={hasApplied} onClick={() => apply(id)} className="bg-indigo-600 text-white hover:bg-indigo-700">{hasApplied ? <><CheckCircle2 className="mr-1 h-3.5 w-3.5" />Applied</> : "Apply"}</Button>}</div></div></CardContent></Card>; })}</section>
    {!visibleDrives.length && <Card><CardContent className="py-14 text-center"><Search className="mx-auto h-7 w-7 text-indigo-600" /><h2 className="mt-4 font-semibold">No matching drives</h2><p className="mt-1 text-sm text-muted-foreground">Try searching a different company, role, CTC or location.</p><Button className="mt-4" variant="outline" size="sm" onClick={() => { setQuery(""); setStatus("All"); }}>Clear filters</Button></CardContent></Card>}
  </div>;
}
