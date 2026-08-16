import { Link } from "react-router-dom";
import { ArrowRight, Briefcase, CheckCircle2, FileText, UserRound } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const drives = [
      { id: 1, company: "Google", role: "SDE Intern", deadline: "Closes in 4 days", applied: false },
  { id: 2, company: "TCS", role: "Digital", deadline: "Application submitted", applied: true },
];

const applications = [
  { id: 1, company: "Infosys", role: "Systems Engineer", status: "Shortlisted", tone: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300" },
  { id: 2, company: "Wipro", role: "Project Engineer", status: "Under review", tone: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300" },
];

export default function StudentDashboard() {
  const username = sessionStorage.getItem("username") || sessionStorage.getItem("email") || "Student";
  const profileCompletion = 70;

  return (
    <div className="space-y-8">
      <section className="flex flex-col gap-5 rounded-3xl border border-indigo-100 bg-gradient-to-br from-indigo-50 to-violet-100 p-7 dark:border-indigo-950 dark:from-indigo-950/50 dark:to-violet-950/40 sm:flex-row sm:items-end sm:justify-between sm:p-9">
        <div>
          <p className="text-sm font-bold uppercase tracking-[.18em] text-indigo-600">Student workspace</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Welcome back, {username.split("@")[0]}.</h1>
          <p className="mt-3 max-w-xl text-slate-600 dark:text-slate-300">Here&apos;s a quick view of your placement journey and what needs your attention.</p>
        </div>
        <Button asChild className="h-10 bg-indigo-600 text-white hover:bg-indigo-700"><Link to="/student/drives">Explore drives <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        <Card className="border-indigo-100 dark:border-indigo-950"><CardContent className="pt-6"><div className="flex items-start justify-between"><div><p className="text-sm text-muted-foreground">Profile completion</p><p className="mt-1 text-3xl font-bold">{profileCompletion}%</p></div><span className="rounded-xl bg-indigo-100 p-2.5 text-indigo-600 dark:bg-indigo-950"><UserRound className="h-5 w-5" /></span></div><Progress value={profileCompletion} className="mt-5" /><Link to="/student/profile" className="mt-3 inline-block text-sm font-semibold text-indigo-600 hover:text-indigo-700">Complete profile →</Link></CardContent></Card>
        <Card><CardContent className="pt-6"><div className="flex items-start justify-between"><div><p className="text-sm text-muted-foreground">Active drives</p><p className="mt-1 text-3xl font-bold">{drives.length}</p><p className="mt-3 text-sm text-muted-foreground">Opportunities waiting for you</p></div><span className="rounded-xl bg-violet-100 p-2.5 text-violet-600 dark:bg-violet-950"><Briefcase className="h-5 w-5" /></span></div></CardContent></Card>
        <Card><CardContent className="pt-6"><div className="flex items-start justify-between"><div><p className="text-sm text-muted-foreground">Applications</p><p className="mt-1 text-3xl font-bold">{applications.length}</p><p className="mt-3 text-sm text-muted-foreground">1 update this week</p></div><span className="rounded-xl bg-emerald-100 p-2.5 text-emerald-600 dark:bg-emerald-950"><FileText className="h-5 w-5" /></span></div></CardContent></Card>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <Card><CardHeader className="flex-row items-center justify-between"><div><CardTitle>Open opportunities</CardTitle><p className="mt-1 text-sm text-muted-foreground">Apply before the deadline.</p></div><Button asChild variant="ghost" className="text-indigo-600"><Link to="/student/drives">View all</Link></Button></CardHeader><CardContent className="space-y-3">{drives.map((drive) => <div key={drive.id} className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-slate-900"><div><p className="font-semibold"><Link className="hover:text-indigo-600 hover:underline" to={`/student/companies/${drive.company.toLowerCase()}`}>{drive.company}</Link></p><p className="mt-0.5 text-sm text-muted-foreground">{drive.role} · {drive.deadline}</p></div>{drive.applied ? <Badge className="bg-indigo-100 text-indigo-700 hover:bg-indigo-100 dark:bg-indigo-950 dark:text-indigo-300">Applied</Badge> : <Button size="sm" className="bg-indigo-600 text-white hover:bg-indigo-700">Apply</Button>}</div>)}</CardContent></Card>
        <Card><CardHeader className="flex-row items-center justify-between"><div><CardTitle>Application updates</CardTitle><p className="mt-1 text-sm text-muted-foreground">Your latest application activity.</p></div><Button asChild variant="ghost" className="text-indigo-600"><Link to="/student/applications">View all</Link></Button></CardHeader><CardContent className="space-y-3">{applications.map((application) => <div key={application.id} className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-slate-900"><div><p className="font-semibold"><Link className="hover:text-indigo-600 hover:underline" to={`/student/companies/${application.company.toLowerCase()}`}>{application.company}</Link></p><p className="mt-0.5 text-sm text-muted-foreground">{application.role}</p></div><span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${application.tone}`}>{application.status}</span></div>)}</CardContent></Card>
      </section>

      <div className="flex items-center gap-3 rounded-2xl border border-emerald-100 bg-emerald-50/70 px-5 py-4 text-sm text-emerald-800 dark:border-emerald-950 dark:bg-emerald-950/30 dark:text-emerald-200"><CheckCircle2 className="h-5 w-5 shrink-0" /><span>Your profile is on track. Add your resume to unlock the best matching opportunities.</span></div>
    </div>
  );
}
