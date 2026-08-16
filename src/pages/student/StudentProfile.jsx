import { useState } from "react";
import { Check, ChevronLeft, ChevronRight, Save } from "lucide-react";
import ProfileCompletion from "@/components/profile/ProfileCompletion";
import PersonalInfoCard from "@/components/profile/PersonalInfoCard";
import AcademicInfoCard from "@/components/profile/AcademicInfoCard";
import ProfessionalInfoCard from "@/components/profile/ProfessionalInfoCard";
import SkillsCard from "@/components/profile/SkillsCard";
import { Button } from "@/components/ui/button";

const steps = ["Personal", "Education", "Career", "Skills"];

export default function StudentProfile() {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [skills, setSkills] = useState(["Java", "React", "SQL"]);
  const [profile, setProfile] = useState({ firstName: "", lastName: "", mobileNo: "", rollNumber: "", branch: "", yearOfPassing: "", cgpa: "", tenthPercentage: "", twelfthPercentage: "", diplomaPercentage: "", activeBacklogs: "", gender: "", dateOfBirth: "", linkedinUrl: "", githubUrl: "", resumeFile: null });
  const fields = ["firstName", "lastName", "mobileNo", "rollNumber", "branch", "yearOfPassing", "cgpa", "tenthPercentage", "twelfthPercentage", "activeBacklogs", "gender", "dateOfBirth", "linkedinUrl", "githubUrl"];
  const completion = Math.round(((fields.filter((field) => profile[field]?.toString().trim()).length + (skills.length ? 1 : 0) + (profile.resumeFile ? 1 : 0)) / (fields.length + 2)) * 100);
  const handleChange = ({ target: { name, value, files } }) => setProfile((current) => ({ ...current, [name]: name === "resumeFile" ? files[0] : value }));
  const handleSelectChange = (field, value) => setProfile((current) => ({ ...current, [field]: value }));
  const saveProfile = async () => { setLoading(true); try { console.log("Saving Profile", { ...profile, skills }); } finally { setLoading(false); } };
  const content = [<PersonalInfoCard profile={profile} handleChange={handleChange} />, <AcademicInfoCard profile={profile} handleChange={handleChange} handleSelectChange={handleSelectChange} />, <ProfessionalInfoCard profile={profile} handleChange={handleChange} />, <SkillsCard skills={skills} setSkills={setSkills} />];

  return <div className="mx-auto max-w-5xl space-y-6"><div><p className="text-sm font-bold uppercase tracking-[.18em] text-indigo-600">Career profile</p><h1 className="mt-2 text-3xl font-bold tracking-tight">Build your profile</h1><p className="mt-2 text-muted-foreground">Complete one section at a time—your progress is saved when you finish.</p></div><ProfileCompletion completion={completion} /><div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm dark:border-slate-800 dark:bg-slate-900"><div className="grid grid-cols-4 gap-1">{steps.map((label, index) => <button type="button" key={label} onClick={() => setStep(index)} className={`flex flex-col items-center gap-2 rounded-xl px-2 py-3 text-xs font-semibold transition sm:flex-row sm:justify-center sm:text-sm ${index === step ? "bg-indigo-600 text-white" : index < step ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300" : "text-muted-foreground hover:bg-slate-50 dark:hover:bg-slate-800"}`}><span className={`flex h-5 w-5 items-center justify-center rounded-full text-xs ${index < step ? "bg-indigo-600 text-white" : "bg-current/15"}`}>{index < step ? <Check className="h-3.5 w-3.5" /> : index + 1}</span>{label}</button>)}</div></div><div className="space-y-4"><div className="flex items-center justify-between"><div><p className="text-sm font-bold text-indigo-600">Step {step + 1} of {steps.length}</p><h2 className="mt-1 text-xl font-bold">{steps[step]} details</h2></div><span className="text-sm text-muted-foreground">{Math.round(((step + 1) / steps.length) * 100)}% through form</span></div>{content[step]}</div><div className="flex items-center justify-between border-t border-slate-200 pt-5 dark:border-slate-800"><Button variant="outline" onClick={() => setStep((current) => Math.max(0, current - 1))} disabled={step === 0}><ChevronLeft className="mr-2 h-4 w-4" />Back</Button>{step < steps.length - 1 ? <Button className="bg-indigo-600 text-white hover:bg-indigo-700" onClick={() => setStep((current) => current + 1)}>Continue<ChevronRight className="ml-2 h-4 w-4" /></Button> : <Button className="bg-indigo-600 text-white hover:bg-indigo-700" onClick={saveProfile} disabled={loading}><Save className="mr-2 h-4 w-4" />{loading ? "Saving..." : "Save profile"}</Button>}</div></div>;
}
