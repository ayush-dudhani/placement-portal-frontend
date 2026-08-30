import { Link } from "react-router-dom";
import { ArrowRight, BriefcaseBusiness, CalendarClock, CheckCircle2, CircleAlert, FileText, UserRound } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { getProfileCompletion, usePortalStore } from "@/store/portalStore";

const opportunities = [
  { company: "Amazon", slug: "amazon", role: "SDE-1", deadline: "Closes in 2 days", match: "Eligible" },
  { company: "Google", slug: "google", role: "Product Analyst", deadline: "Closes in 4 days", match: "Check criteria" },
  { company: "Microsoft", slug: "microsoft", role: "SDE Intern", deadline: "Closes in 6 days", match: "Eligible" },
];

const statusTone = {
  APPLIED: "bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300",
  UNDER_REVIEW: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
  SHORTLISTED: "bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300",
  SELECTED: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
  NOT_SELECTED: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300",
};

const statusLabel = { APPLIED: "Applied", UNDER_REVIEW: "Under review", SHORTLISTED: "Shortlisted", SELECTED: "Selected", NOT_SELECTED: "Not selected" };

export default function StudentDashboard() {
  const username = sessionStorage.getItem("username") || sessionStorage.getItem("email") || "Student";
  const applications = usePortalStore((state) => state.applications);
  const profile = usePortalStore((state) => state.profile);
  const skills = usePortalStore((state) => state.skills);
  const profileCompletion = getProfileCompletion(profile, skills);
  const latestApplications = applications.slice(0, 3);

  return (
    <div className="space-y-8">
      <section className="flex flex-col gap-5 rounded-3xl border border-indigo-100 bg-gradient-to-br from-indigo-50 to-violet-100 p-6 dark:border-indigo-950 dark:from-indigo-950/50 dark:to-violet-950/40 sm:flex-row sm:items-end sm:justify-between sm:p-9">
        <div><p className="text-sm font-bold uppercase tracking-[.18em] text-indigo-600">Student workspace</p><h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Welcome back, {username.split("@")[0]}.</h1><p className="mt-3 max-w-xl text-slate-600 dark:text-slate-300">You have one shortlisted application and an assessment coming up. Here&apos;s what to do next.</p></div>
        <Button asChild className="h-10 bg-indigo-600 text-white hover:bg-indigo-700"><Link to="/student/applications">View applications <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-indigo-100 dark:border-indigo-950"><CardContent className="pt-6"><div className="flex items-start justify-between"><div><p className="text-sm text-muted-foreground">Profile readiness</p><p className="mt-1 text-3xl font-bold">{profileCompletion}%</p></div><span className="rounded-xl bg-indigo-100 p-2.5 text-indigo-600 dark:bg-indigo-950"><UserRound className="h-5 w-5" /></span></div><Progress value={profileCompletion} className="mt-4" /><Link to="/student/profile" className="mt-3 inline-block text-sm font-semibold text-indigo-600 hover:text-indigo-700">Complete profile →</Link></CardContent></Card>
        <Card><CardContent className="pt-6"><div className="flex items-start justify-between"><div><p className="text-sm text-muted-foreground">Open roles</p><p className="mt-1 text-3xl font-bold">5</p><p className="mt-3 text-sm text-muted-foreground">3 may match your profile</p></div><span className="rounded-xl bg-violet-100 p-2.5 text-violet-600 dark:bg-violet-950"><BriefcaseBusiness className="h-5 w-5" /></span></div></CardContent></Card>
        <Card><CardContent className="pt-6"><div className="flex items-start justify-between"><div><p className="text-sm text-muted-foreground">Applications</p><p className="mt-1 text-3xl font-bold">{applications.length}</p><p className="mt-3 text-sm text-muted-foreground">{applications.filter((item) => item.status === "SHORTLISTED").length} shortlisted</p></div><span className="rounded-xl bg-emerald-100 p-2.5 text-emerald-600 dark:bg-emerald-950"><FileText className="h-5 w-5" /></span></div></CardContent></Card>
        <Card className="border-amber-200 bg-amber-50/60 dark:border-amber-950 dark:bg-amber-950/20"><CardContent className="pt-6"><div className="flex items-start justify-between"><div><p className="text-sm text-muted-foreground">Next event</p><p className="mt-1 text-xl font-bold">Amazon OA</p><p className="mt-3 text-sm text-muted-foreground">3 Sep · 10:00 AM</p></div><span className="rounded-xl bg-amber-100 p-2.5 text-amber-700 dark:bg-amber-950"><CalendarClock className="h-5 w-5" /></span></div></CardContent></Card>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
        <Card><CardHeader className="flex-row items-center justify-between gap-3"><div><CardTitle>Recommended opportunities</CardTitle><p className="mt-1 text-sm text-muted-foreground">Prioritised by deadline and eligibility.</p></div><Button asChild variant="ghost" className="text-indigo-600"><Link to="/student/drives">View all</Link></Button></CardHeader><CardContent className="space-y-3">{opportunities.map((drive) => <div key={`${drive.slug}-${drive.role}`} className="flex flex-col gap-3 rounded-xl border bg-muted/30 p-4 sm:flex-row sm:items-center sm:justify-between"><div><p className="font-semibold"><Link className="hover:text-indigo-600 hover:underline" to={`/student/company?companyid=${drive.slug}`}>{drive.company}</Link></p><p className="mt-0.5 text-sm text-muted-foreground">{drive.role} · {drive.deadline}</p></div><div className="flex items-center gap-2"><Badge variant="outline" className={drive.match === "Eligible" ? "border-emerald-200 text-emerald-700 dark:border-emerald-900 dark:text-emerald-300" : "border-amber-200 text-amber-700 dark:border-amber-900 dark:text-amber-300"}>{drive.match}</Badge><Button asChild size="sm" variant="outline"><Link to={`/student/company?companyid=${drive.slug}`}>Review</Link></Button></div></div>)}</CardContent></Card>
        <Card><CardHeader className="flex-row items-center justify-between gap-3"><div><CardTitle>Latest application updates</CardTitle><p className="mt-1 text-sm text-muted-foreground">Status and next step at a glance.</p></div><Button asChild variant="ghost" className="text-indigo-600"><Link to="/student/applications">View all</Link></Button></CardHeader><CardContent className="space-y-3">{latestApplications.map((application) => <div key={application.id} className="rounded-xl border bg-muted/30 p-4"><div className="flex items-start justify-between gap-3"><div><p className="font-semibold">{application.company}</p><p className="mt-0.5 text-sm text-muted-foreground">{application.role}</p></div><Badge className={statusTone[application.status]}>{statusLabel[application.status]}</Badge></div><p className="mt-3 flex items-start gap-2 text-xs text-muted-foreground">{application.status === "SHORTLISTED" ? <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600" /> : <CircleAlert className="mt-0.5 h-3.5 w-3.5 shrink-0 text-indigo-600" />}{application.nextStep}</p></div>)}</CardContent></Card>
      </section>

      {profileCompletion < 80 && <div className="flex flex-col gap-3 rounded-2xl border border-amber-200 bg-amber-50/70 px-5 py-4 text-sm text-amber-900 dark:border-amber-950 dark:bg-amber-950/30 dark:text-amber-200 sm:flex-row sm:items-center sm:justify-between"><span className="flex items-start gap-3"><CircleAlert className="mt-0.5 h-5 w-5 shrink-0" /><span><strong>Improve your application readiness.</strong> Complete your academic details and upload a PDF resume before the next deadline.</span></span><Button asChild size="sm" variant="outline" className="shrink-0 border-amber-300 bg-white/60 dark:bg-transparent"><Link to="/student/profile">Update profile</Link></Button></div>}
    </div>
  );
}
