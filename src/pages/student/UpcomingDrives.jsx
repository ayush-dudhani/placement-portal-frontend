import { useState } from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Briefcase, Calendar, ChevronDown, CircleHelp, ExternalLink, IndianRupee, Star, Users } from "lucide-react";

const drives = [
  { id: 1, company: "Google", role: "Software Engineer Intern", ctc: "30 LPA", date: "20 Oct 2026", eligibility: "CGPA ≥ 8.0", status: "UPCOMING", applied: false, rating: "4.4", jobDescription: "Work with product and engineering teams to build reliable, high-impact software for millions of users.", skills: ["DSA", "Java / C++", "Problem solving"], poc: "Aarav Sharma", pocContact: "aarav.sharma@college.edu", pastData: "8 selected last year", packageRange: "₹28–35 LPA", glassdoor: "https://www.glassdoor.co.in/Overview/Working-at-Google-EI_IE9079.11,17.htm", questions: [{ author: "Priya S.", text: "Is the online assessment open to all eligible branches?" }, { author: "Placement Cell", text: "Yes. Please check the eligibility criteria before applying." }] },
  { id: 2, company: "Microsoft", role: "SDE Intern", ctc: "28 LPA", date: "22 Oct 2026", eligibility: "CGPA ≥ 7.5", status: "UPCOMING", applied: true, rating: "4.3", jobDescription: "Contribute to production software, collaborate with experienced engineers and learn through meaningful project ownership.", skills: ["Data structures", "OOP", "Communication"], poc: "Riya Kulkarni", pocContact: "riya.kulkarni@college.edu", pastData: "5 selected last year", packageRange: "₹25–30 LPA", glassdoor: "https://www.glassdoor.co.in/Overview/Working-at-Microsoft-EI_IE1651.11,20.htm", questions: [{ author: "Vivek R.", text: "Will the interview be conducted on campus?" }] },
  { id: 3, company: "Amazon", role: "SDE-1", ctc: "32 LPA", date: "18 Oct 2026", eligibility: "CGPA ≥ 7.0", status: "ONGOING", applied: true, rating: "3.7", jobDescription: "Build customer-focused services at scale while working in a fast-paced, ownership-driven engineering environment.", skills: ["DSA", "System design basics", "Leadership principles"], poc: "Kabir Mehta", pocContact: "kabir.mehta@college.edu", pastData: "6 selected last year", packageRange: "₹27–34 LPA", glassdoor: "https://www.glassdoor.co.in/Overview/Working-at-Amazon-EI_IE6036.11,17.htm", questions: [] },
  { id: 4, company: "Infosys", role: "System Engineer", ctc: "3.6 LPA", date: "05 Oct 2026", eligibility: "CGPA ≥ 6.0", status: "COMPLETED", applied: true, rating: "3.6", jobDescription: "Support digital transformation projects across cloud, data and enterprise technology for global clients.", skills: ["Programming basics", "Aptitude", "Communication"], poc: "Neha Patil", pocContact: "neha.patil@college.edu", pastData: "42 selected last year", packageRange: "₹3.6–5.5 LPA", glassdoor: "https://www.glassdoor.co.in/Overview/Working-at-Infosys-EI_IE7927.11,18.htm", questions: [] },
];

function CompanyDetails({ drive }) {
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [questions, setQuestions] = useState(drive.questions);

  const askQuestion = (event) => {
    event.preventDefault();
    const text = question.trim();
    if (!text) return;
    setQuestions((current) => [...current, { author: "You", text }]);
    setQuestion("");
  };

  return (
    <div className="border-t border-slate-100 dark:border-slate-800">
      <button type="button" onClick={() => setOpen(!open)} className="flex w-full items-center justify-between py-4 text-left text-sm font-semibold text-indigo-600 hover:text-indigo-700">
        Learn about {drive.company} and this role <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <div className="grid gap-5 pb-2 lg:grid-cols-[1fr_.85fr]">
        <div className="space-y-5">
          <div><h3 className="font-semibold">About the role</h3><p className="mt-2 leading-6 text-muted-foreground">{drive.jobDescription}</p><div className="mt-3 flex flex-wrap gap-2">{drive.skills.map((skill) => <span key={skill} className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">{skill}</span>)}</div></div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-900"><div className="flex items-center justify-between"><h3 className="flex items-center gap-2 font-semibold"><CircleHelp className="h-4 w-4 text-indigo-600" /> Questions about this drive</h3><span className="text-xs text-muted-foreground">{questions.length} asked</span></div><div className="mt-4 space-y-3">{questions.length ? questions.map((item, index) => <div key={`${item.author}-${index}`} className="rounded-xl bg-background p-3"><p className="text-xs font-semibold text-indigo-600">{item.author}</p><p className="mt-1 text-sm text-muted-foreground">{item.text}</p></div>) : <p className="text-sm text-muted-foreground">No questions yet. Ask the POC to help your batch.</p>}</div><form className="mt-4 flex gap-2" onSubmit={askQuestion}><Input aria-label="Ask a question" value={question} onChange={(event) => setQuestion(event.target.value)} placeholder="Ask a question about this drive" /><Button type="submit" className="shrink-0 bg-indigo-600 text-white hover:bg-indigo-700">Ask</Button></form></div>
        </div>
        <div className="space-y-4 rounded-2xl border border-indigo-100 bg-indigo-50/50 p-5 dark:border-indigo-950 dark:bg-indigo-950/20"><div><p className="text-xs font-bold uppercase tracking-[.16em] text-indigo-600">Company snapshot</p><a href={drive.glassdoor} target="_blank" rel="noreferrer" className="mt-2 flex items-center gap-2 font-semibold hover:text-indigo-600">Glassdoor rating <span className="flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-sm text-amber-700"><Star className="h-3.5 w-3.5 fill-current" />{drive.rating}</span><ExternalLink className="h-3.5 w-3.5" /></a></div><div className="border-t border-indigo-100 pt-4 dark:border-indigo-900"><p className="flex items-center gap-2 font-semibold"><Users className="h-4 w-4 text-indigo-600" /> Student volunteer POC</p><p className="mt-2 text-sm font-medium">{drive.poc}</p><a className="text-sm text-indigo-600 hover:underline" href={`mailto:${drive.pocContact}`}>{drive.pocContact}</a></div><div className="border-t border-indigo-100 pt-4 dark:border-indigo-900"><p className="font-semibold">College outcomes</p><p className="mt-2 text-sm text-muted-foreground">{drive.pastData}</p><p className="mt-1 text-sm text-muted-foreground">Expected package: <span className="font-medium text-foreground">{drive.packageRange}</span></p><p className="mt-3 text-xs text-muted-foreground">Past selection data is shared by the placement cell and may vary by role and year.</p></div></div>
      </div>}
    </div>
  );
}

function DriveCard({ drive }) {
  const slug = drive.company.toLowerCase();
  return <Card className="transition hover:shadow-md hover:shadow-indigo-950/5"><CardHeader><div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"><div><div className="flex items-center gap-3"><CardTitle><Link to={`/student/companies/${slug}`} className="hover:text-indigo-600 hover:underline">{drive.company}</Link></CardTitle><span className="flex items-center gap-1 text-sm text-amber-600"><Star className="h-4 w-4 fill-current" /> {drive.rating}</span></div><p className="mt-1 text-muted-foreground">{drive.role}</p></div>{drive.status === "COMPLETED" ? <Badge variant="secondary">Completed</Badge> : drive.applied ? <Badge className="bg-indigo-100 text-indigo-700 hover:bg-indigo-100 dark:bg-indigo-950 dark:text-indigo-300">Applied</Badge> : <Button className="bg-indigo-600 text-white hover:bg-indigo-700">Apply now</Button>}</div></CardHeader><CardContent><div className="grid gap-4 border-b border-slate-100 pb-5 dark:border-slate-800 md:grid-cols-3"><div className="flex items-center gap-2 text-sm"><IndianRupee className="h-4 w-4 text-indigo-600" />{drive.ctc}</div><div className="flex items-center gap-2 text-sm"><Briefcase className="h-4 w-4 text-indigo-600" />{drive.eligibility}</div><div className="flex items-center gap-2 text-sm"><Calendar className="h-4 w-4 text-indigo-600" />{drive.date}</div></div><CompanyDetails drive={drive} /></CardContent></Card>;
}

export default function Drives() {
  const upcoming = drives.filter((drive) => drive.status === "UPCOMING");
  const ongoing = drives.filter((drive) => drive.status === "ONGOING");
  const past = drives.filter((drive) => drive.status === "COMPLETED");
  const renderDrives = (items, empty) => items.length ? items.map((drive) => <DriveCard key={drive.id} drive={drive} />) : <Card><CardContent className="py-8 text-center text-muted-foreground">{empty}</CardContent></Card>;
  return <div className="space-y-8"><div><p className="text-sm font-bold uppercase tracking-[.18em] text-indigo-600">Explore opportunities</p><h1 className="mt-2 text-3xl font-bold tracking-tight">Placement drives</h1><p className="mt-2 max-w-2xl text-muted-foreground">Review company details, opportunities and batch insights before you apply.</p></div><Tabs defaultValue="upcoming" className="space-y-5"><TabsList className="h-auto rounded-xl bg-slate-100 p-1 dark:bg-slate-900"><TabsTrigger value="upcoming" className="rounded-lg">Upcoming ({upcoming.length})</TabsTrigger><TabsTrigger value="ongoing" className="rounded-lg">Ongoing ({ongoing.length})</TabsTrigger><TabsTrigger value="past" className="rounded-lg">Past ({past.length})</TabsTrigger></TabsList><TabsContent value="upcoming" className="space-y-4">{renderDrives(upcoming, "No upcoming drives available.")}</TabsContent><TabsContent value="ongoing" className="space-y-4">{renderDrives(ongoing, "No ongoing drives available.")}</TabsContent><TabsContent value="past" className="space-y-4">{renderDrives(past, "No past drives available.")}</TabsContent></Tabs></div>;
}
