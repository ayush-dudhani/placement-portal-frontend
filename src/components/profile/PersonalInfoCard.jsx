import { CalendarDays, Contact, Hash, Phone, UserRound } from "lucide-react";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const fields = [["firstName", "First name", "Your first name", UserRound], ["lastName", "Last name", "Your last name", UserRound], ["mobileNo", "Mobile number", "10-digit contact number", Phone], ["rollNumber", "Roll number", "University roll number", Hash], ["dateOfBirth", "Date of birth", "", CalendarDays, "date"], ["gender", "Gender", "Your gender", Contact]];

export default function PersonalInfoCard({ profile, handleChange }) {
  return <><CardHeader className="border-b border-slate-100 px-5 py-5 dark:border-slate-800"><CardTitle className="flex items-center gap-2 text-lg"><span className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-950"><UserRound className="h-4 w-4" /></span>Personal information</CardTitle><p className="mt-1 text-sm text-muted-foreground">Tell us how the placement cell can identify and contact you.</p></CardHeader><CardContent className="p-5 sm:p-6"><div className="grid gap-5 md:grid-cols-2">{fields.map(([name, label, placeholder, Icon, type = "text"]) => <div className="space-y-2" key={name}><Label className="flex items-center gap-1.5 text-sm font-medium"><Icon className="h-3.5 w-3.5 text-indigo-600" />{label}{["firstName", "lastName"].includes(name) && <span className="text-indigo-600">*</span>}</Label><Input type={type} name={name} value={profile[name]} onChange={handleChange} placeholder={placeholder} className="h-11" /></div>)}</div></CardContent></>;
}
