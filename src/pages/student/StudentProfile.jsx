import { useEffect, useState } from "react";
import { BriefcaseBusiness, Check, CheckCircle2, ChevronLeft, ChevronRight, GraduationCap, Lightbulb, Save, UserRound } from "lucide-react";
import PersonalInfoCard from "@/components/profile/PersonalInfoCard";
import AcademicInfoCard from "@/components/profile/AcademicInfoCard";
import ProfessionalInfoCard from "@/components/profile/ProfessionalInfoCard";
import SkillsCard from "@/components/profile/SkillsCard";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { getProfileCompletion, usePortalStore } from "@/store/portalStore";
import { portalApi } from "@/api/portalApi";
import StaticFallbackNotice from "@/components/StaticFallbackNotice";

const steps = [{ label: "Personal", description: "Basic details", icon: UserRound }, { label: "Education", description: "Academic record", icon: GraduationCap }, { label: "Career", description: "Links & resume", icon: BriefcaseBusiness }, { label: "Skills", description: "Your strengths", icon: Lightbulb }];

export default function StudentProfile() {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const storedProfile = usePortalStore((state) => state.profile);
  const storedSkills = usePortalStore((state) => state.skills);
  const persistProfile = usePortalStore((state) => state.saveProfile);
  const [skills, setSkills] = useState(storedSkills);
  const [profile, setProfile] = useState({ ...storedProfile, resumeFile: null });
  const [fallback, setFallback] = useState(false);
  const [saved, setSaved] = useState(false);
  useEffect(() => {
    Promise.all([portalApi.profile(), portalApi.academics(), portalApi.skills()]).then(([p, a, s]) => {
      setProfile((current) => ({ ...current, firstName: p.firstName || "", lastName: p.lastName || "", mobileNo: p.mobileNo || "", rollNumber: p.rollNumber || "", dateOfBirth: p.dateOfBirth || "", gender: p.gender || "", linkedinUrl: p.linkedinUrl || "", githubUrl: p.githubUrl || "", branch: a.branch || "", yearOfPassing: a.graduationYear || "", cgpa: a.cgpa || "", tenthPercentage: a.tenthPercentage || "", twelfthPercentage: a.twelfthPercentage || "", diplomaPercentage: a.diplomaPercentage || "", activeBacklogs: a.activeBacklogs ?? "" }));
      setSkills((s || []).map((item) => item.name || item));
    }).catch(() => setFallback(true));
  }, []);
  const completion = getProfileCompletion({ ...profile, resumeName: profile.resumeFile?.name || profile.resumeName }, skills);
  const handleChange = ({ target: { name, value, files } }) => { setSaved(false); setProfile((current) => ({ ...current, [name]: name === "resumeFile" ? files[0] : value })); };
  const handleSelectChange = (field, value) => { setSaved(false); setProfile((current) => ({ ...current, [field]: value })); };
  const updateSkills = (nextSkills) => { setSaved(false); setSkills(nextSkills); };
  const saveProfile = async () => { setLoading(true); try { const persistableProfile = { ...profile, resumeName: profile.resumeFile?.name || profile.resumeName }; delete persistableProfile.resumeFile; await Promise.all([portalApi.updateProfile({ firstName: persistableProfile.firstName, lastName: persistableProfile.lastName, mobileNo: persistableProfile.mobileNo, rollNumber: persistableProfile.rollNumber, dateOfBirth: persistableProfile.dateOfBirth, gender: persistableProfile.gender, linkedinUrl: persistableProfile.linkedinUrl, githubUrl: persistableProfile.githubUrl }), portalApi.updateAcademics({ cgpa: Number(persistableProfile.cgpa) || null, tenthPercentage: Number(persistableProfile.tenthPercentage) || null, twelfthPercentage: Number(persistableProfile.twelfthPercentage) || null, diplomaPercentage: Number(persistableProfile.diplomaPercentage) || null, activeBacklogs: Number(persistableProfile.activeBacklogs) || 0, branch: persistableProfile.branch, graduationYear: Number(persistableProfile.yearOfPassing) }), portalApi.updateSkills(skills)]); persistProfile(persistableProfile, skills); setSaved(true); } catch { persistProfile({ ...profile, resumeName: profile.resumeFile?.name || profile.resumeName }, skills); setFallback(true); setSaved(true); } finally { setLoading(false); } };
  const content = [<PersonalInfoCard key="personal" profile={profile} handleChange={handleChange} />, <AcademicInfoCard key="academic" profile={profile} handleChange={handleChange} handleSelectChange={handleSelectChange} />, <ProfessionalInfoCard key="professional" profile={profile} handleChange={handleChange} />, <SkillsCard key="skills" skills={skills} setSkills={updateSkills} />];
  const ActiveIcon = steps[step].icon;
  const fallbackNotice = fallback ? <StaticFallbackNotice resource="profile data" /> : null;

  return <div className="mx-auto max-w-6xl space-y-5 pb-6"><section><p className="text-sm font-bold uppercase tracking-[.18em] text-indigo-600">Career profile</p><h1 className="mt-1 text-3xl font-bold tracking-tight">Complete your profile</h1><p className="mt-2 text-muted-foreground">Keep your information up to date to receive the right placement opportunities.</p></section>
    <section className="rounded-2xl border border-slate-200 bg-white p-2 shadow-sm dark:border-slate-800 dark:bg-slate-900"><div className="grid grid-cols-4 gap-1">{steps.map((item, index) => { const Icon = item.icon; const active = index === step; return <button type="button" key={item.label} onClick={() => setStep(index)} className={`flex min-w-0 items-center justify-center gap-2 rounded-xl px-2 py-2.5 text-left transition sm:justify-start sm:px-3 ${active ? "bg-indigo-600 text-white shadow-sm" : "text-muted-foreground hover:bg-slate-50 hover:text-indigo-700 dark:hover:bg-slate-800"}`}><span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${active ? "bg-white/15" : index < step ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-950" : "bg-slate-100 dark:bg-slate-800"}`}>{index < step ? <Check className="h-3.5 w-3.5" /> : <Icon className="h-3.5 w-3.5" />}</span><span className="hidden min-w-0 sm:block"><span className="block truncate text-sm font-semibold">{item.label}</span><span className={`block truncate text-xs ${active ? "text-indigo-100" : "text-muted-foreground"}`}>{item.description}</span></span></button>; })}</div></section>
    <section className="rounded-2xl border border-indigo-100 bg-indigo-50/50 px-4 py-3 dark:border-indigo-950 dark:bg-indigo-950/20"><div className="flex items-center justify-between gap-4"><div className="flex items-center gap-2"><ActiveIcon className="h-4 w-4 text-indigo-600" /><p className="text-sm"><span className="font-semibold">Step {step + 1}: {steps[step].label}</span><span className="hidden text-muted-foreground sm:inline"> · {steps[step].description}</span></p></div><span className="shrink-0 text-sm font-bold text-indigo-700 dark:text-indigo-300">{completion}% complete</span></div><Progress value={completion} className="mt-2.5 h-1.5" /></section>
    {saved && <div role="status" className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-200"><CheckCircle2 className="h-4 w-4" />Profile saved. Your readiness score is now updated across the portal.</div>}
    <section className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">{content[step]}<div className="flex items-center justify-between border-t border-slate-200 px-5 py-4 dark:border-slate-800"><Button variant="outline" className="h-9" onClick={() => setStep((current) => Math.max(0, current - 1))} disabled={step === 0}><ChevronLeft className="mr-1 h-4 w-4" />Back</Button>{step < steps.length - 1 ? <Button className="h-9 bg-indigo-600 text-white hover:bg-indigo-700" onClick={() => setStep((current) => current + 1)}>Continue<ChevronRight className="ml-1 h-4 w-4" /></Button> : <Button className="h-9 bg-indigo-600 text-white hover:bg-indigo-700" onClick={saveProfile} disabled={loading}><Save className="mr-2 h-4 w-4" />{loading ? "Saving..." : "Save profile"}</Button>}</div></section></div>;
}
