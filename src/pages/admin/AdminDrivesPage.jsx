import { useMemo, useState } from "react";
import { CalendarDays, CheckCircle2, ChevronDown, ClipboardCheck, Plus, Search, Users, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const initialDrives = [
  { id: 1, company: "Google", role: "Software Engineer Intern", date: "05 Sep 2026", applicants: 128, eligible: 96, stage: "Applications open", owner: "Aarav Sharma", deadline: "02 Sep 2026" },
  { id: 2, company: "Amazon", role: "SDE-1", date: "03 Sep 2026", applicants: 94, eligible: 81, stage: "Shortlisting", owner: "Kabir Mehta", deadline: "31 Aug 2026" },
  { id: 3, company: "Microsoft", role: "SDE Intern", date: "09 Sep 2026", applicants: 76, eligible: 62, stage: "Applications open", owner: "Riya Kulkarni", deadline: "04 Sep 2026" },
  { id: 4, company: "Infosys", role: "System Engineer", date: "21 Aug 2026", applicants: 214, eligible: 196, stage: "Completed", owner: "Neha Patil", deadline: "Closed" },
];

const tone = {
  Draft: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
  "Applications open": "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
  Shortlisting: "bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300",
  Completed: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
};

export default function AdminDrivesPage() {
  const [drives, setDrives] = useState(initialDrives);
  const [query, setQuery] = useState("");
  const [stage, setStage] = useState("all");
  const [creating, setCreating] = useState(false);
  const [expanded, setExpanded] = useState(null);
  const [created, setCreated] = useState(false);
  const [draft, setDraft] = useState({ company: "", role: "", date: "", deadline: "" });
  const visible = useMemo(() => drives.filter((drive) => `${drive.company} ${drive.role}`.toLowerCase().includes(query.toLowerCase()) && (stage === "all" || drive.stage === stage)), [drives, query, stage]);

  const createDrive = (event) => {
    event.preventDefault();
    const formatDate = (value) => value ? new Intl.DateTimeFormat("en-IN", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(`${value}T00:00:00`)) : "Not set";
    setDrives((current) => [{ id: Date.now(), ...draft, date: formatDate(draft.date), deadline: formatDate(draft.deadline), applicants: 0, eligible: 0, stage: "Draft", owner: "Unassigned" }, ...current]);
    setDraft({ company: "", role: "", date: "", deadline: "" });
    setCreating(false);
    setCreated(true);
  };

  return (
    <div className="space-y-8">
      <section className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-sm font-bold uppercase tracking-[.18em] text-indigo-600">Recruitment management</p><h1 className="mt-2 text-3xl font-bold tracking-tight">Campus drives</h1><p className="mt-2 text-muted-foreground">Create, publish and track every company visit from one workspace.</p></div><Button className="h-10 bg-indigo-600 text-white hover:bg-indigo-700" onClick={() => { setCreating((value) => !value); setCreated(false); }}>{creating ? <X className="mr-2 h-4 w-4" /> : <Plus className="mr-2 h-4 w-4" />}{creating ? "Cancel" : "Create drive"}</Button></section>

      {created && <div role="status" className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-200"><CheckCircle2 className="h-4 w-4" />Drive saved as a draft. Add criteria and a POC before publishing.</div>}

      {creating && <Card className="border-indigo-200 dark:border-indigo-900"><CardContent className="pt-6"><form onSubmit={createDrive}><div className="mb-5"><h2 className="text-lg font-bold">New campus drive</h2><p className="mt-1 text-sm text-muted-foreground">Start with the core details. The drive will remain a draft.</p></div><div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"><div className="space-y-2"><Label htmlFor="drive-company">Company</Label><Input id="drive-company" required value={draft.company} onChange={(event) => setDraft((current) => ({ ...current, company: event.target.value }))} placeholder="Company name" /></div><div className="space-y-2"><Label htmlFor="drive-role">Role</Label><Input id="drive-role" required value={draft.role} onChange={(event) => setDraft((current) => ({ ...current, role: event.target.value }))} placeholder="Role title" /></div><div className="space-y-2"><Label htmlFor="drive-date">Drive date</Label><Input id="drive-date" required type="date" value={draft.date} onChange={(event) => setDraft((current) => ({ ...current, date: event.target.value }))} /></div><div className="space-y-2"><Label htmlFor="drive-deadline">Application deadline</Label><Input id="drive-deadline" type="date" value={draft.deadline} onChange={(event) => setDraft((current) => ({ ...current, deadline: event.target.value }))} /></div></div><div className="mt-5 flex justify-end"><Button type="submit" className="bg-indigo-600 text-white hover:bg-indigo-700">Save draft</Button></div></form></CardContent></Card>}

      <section className="grid gap-4 sm:grid-cols-3">{[[drives.filter((item) => item.stage !== "Completed").length, "Active drives", `${drives.filter((item) => item.stage === "Draft").length} draft needs review`], [drives.reduce((sum, item) => sum + item.applicants, 0), "Total applications", "This placement season"], ["81%", "Eligibility verified", "345 of 426 applications"]].map(([value, label, note]) => <Card key={label}><CardContent className="pt-6"><p className="text-sm text-muted-foreground">{label}</p><p className="mt-1 text-3xl font-bold">{value}</p><p className="mt-3 text-sm text-muted-foreground">{note}</p></CardContent></Card>)}</section>

      <Card><CardContent className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between"><div className="relative w-full sm:max-w-sm"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><Input value={query} onChange={(event) => setQuery(event.target.value)} className="h-10 pl-9" placeholder="Search company or role" aria-label="Search drives" /></div><Select value={stage} onValueChange={setStage}><SelectTrigger className="h-10 w-full sm:w-48"><SelectValue placeholder="All stages" /></SelectTrigger><SelectContent><SelectItem value="all">All stages</SelectItem>{Object.keys(tone).map((item) => <SelectItem value={item} key={item}>{item}</SelectItem>)}</SelectContent></Select></CardContent></Card>

      <section className="space-y-3">{visible.map((drive) => <Card key={drive.id} className="transition hover:border-indigo-200 hover:shadow-md dark:hover:border-indigo-900"><CardContent className="p-0"><div className="flex flex-col gap-5 p-5 lg:flex-row lg:items-center"><div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 font-bold text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">{drive.company.slice(0, 1)}</div><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><h2 className="font-semibold">{drive.company}</h2><Badge className={tone[drive.stage]}>{drive.stage}</Badge></div><p className="mt-1 text-sm text-muted-foreground">{drive.role}</p></div><div className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm sm:flex sm:items-center"><span className="flex items-center gap-2 text-muted-foreground"><CalendarDays className="h-4 w-4 text-indigo-500" />{drive.date}</span><span className="flex items-center gap-2 text-muted-foreground"><Users className="h-4 w-4 text-indigo-500" />{drive.applicants} applicants</span><span className="flex items-center gap-2 text-muted-foreground"><ClipboardCheck className="h-4 w-4 text-indigo-500" />{drive.eligible} eligible</span></div><Button variant="ghost" size="sm" className="justify-between text-indigo-600" onClick={() => setExpanded((current) => current === drive.id ? null : drive.id)} aria-expanded={expanded === drive.id}>Manage <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${expanded === drive.id ? "rotate-180" : ""}`} /></Button></div>{expanded === drive.id && <div className="grid gap-4 border-t bg-muted/20 px-5 py-4 text-sm sm:grid-cols-3"><div><p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Application deadline</p><p className="mt-1 font-medium">{drive.deadline}</p></div><div><p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Drive owner</p><p className="mt-1 font-medium">{drive.owner}</p></div><div className="flex items-end gap-2 sm:justify-end"><Button size="sm" variant="outline">Edit details</Button><Button size="sm" className="bg-indigo-600 text-white hover:bg-indigo-700">Review applicants</Button></div></div>}</CardContent></Card>)}</section>
      {!visible.length && <Card><CardContent className="py-12 text-center"><Search className="mx-auto h-6 w-6 text-indigo-600" /><h2 className="mt-3 font-semibold">No drives found</h2><p className="mt-1 text-sm text-muted-foreground">Try another search or stage filter.</p></CardContent></Card>}
    </div>
  );
}
