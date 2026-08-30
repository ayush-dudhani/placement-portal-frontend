import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Building2, ExternalLink, IndianRupee, MapPin, Search, Star, UsersRound, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { companyList } from "@/data/companies";
import { portalApi } from "@/api/portalApi";
import StaticFallbackNotice from "@/components/StaticFallbackNotice";

const categories = {
  google: "Product & AI",
  microsoft: "Cloud & Software",
  amazon: "E-commerce & Cloud",
  infosys: "IT Services",
};

export default function CompaniesPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [companies, setCompanies] = useState([]);
  const [fallback, setFallback] = useState(false);
  useEffect(() => {
    portalApi.companies().then((page) => {
      setCompanies((page.content || []).map((company) => ({ ...company, slug: String(company.id), location: "", rating: "—", roles: [], outcomes: { selected: 0, package: "—", year: "" } })));
    }).catch(() => { setCompanies(companyList); setFallback(true); });
  }, []);
  const companyCategories = ["All", ...new Set(Object.values(categories))];
  const visibleCompanies = useMemo(() => companies.filter((company) => {
    const searchable = `${company.name} ${company.location} ${company.outcomes.selected} ${company.outcomes.package} ${company.roles.map((role) => `${role.title} ${role.package}`).join(" ")}`.toLowerCase();
    return searchable.includes(query.toLowerCase()) && (category === "All" || categories[company.slug] === category);
  }), [category, companies, query]);
  const totalSelections = companies.reduce((total, company) => total + (Number.parseInt(company.outcomes?.selected, 10) || 0), 0);

  return <div className="space-y-8">
    {fallback && <StaticFallbackNotice resource="company data" />}
    <section>
      <p className="text-sm font-bold uppercase tracking-[.18em] text-indigo-600">Hiring partners</p>
      <h1 className="mt-2 text-3xl font-bold tracking-tight">Company directory</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">Compare roles, CTC ranges, locations and last year&apos;s campus outcomes before you apply.</p>
    </section>

    <section className="grid gap-4 sm:grid-cols-3">
      {[[companies.length, "Verified companies", "Campus hiring partners"], [companies.reduce((total, company) => total + company.roles.length, 0), "Roles offered", "Across partner companies"], [totalSelections, "Placed last year", "From listed outcomes"]].map(([value, label, note]) => <Card key={label}><CardContent className="pt-6"><p className="text-3xl font-bold">{value}</p><p className="mt-1 font-medium">{label}</p><p className="mt-2 text-sm text-muted-foreground">{note}</p></CardContent></Card>)}
    </section>

    <Card className="border-indigo-100 bg-indigo-50/40 dark:border-indigo-950 dark:bg-indigo-950/20">
      <CardContent className="space-y-4 py-5">
        <div className="relative"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><Input value={query} onChange={(event) => setQuery(event.target.value)} className="h-11 bg-background pl-9" placeholder="Search company, role, CTC or location" />{query && <button type="button" aria-label="Clear company search" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground" onClick={() => setQuery("")}><X className="h-4 w-4" /></button>}</div>
        <div className="flex flex-wrap gap-2">{companyCategories.map((item) => <Button key={item} size="sm" variant={category === item ? "default" : "outline"} onClick={() => setCategory(item)} className={category === item ? "bg-indigo-600 text-white hover:bg-indigo-700" : "bg-background"}>{item}</Button>)}</div>
      </CardContent>
    </Card>

    <div className="flex items-center justify-between"><div><p className="text-sm font-semibold">{visibleCompanies.length} {visibleCompanies.length === 1 ? "company" : "companies"} found</p><p className="mt-1 text-sm text-muted-foreground">Choose a company to see full role descriptions and eligibility.</p></div></div>

    {visibleCompanies.length ? <section className="space-y-4">
      {visibleCompanies.map((company) => <Link key={company.slug} to={`/student/company?companyid=${company.slug}`} className="group block">
        <Card className="overflow-visible border-slate-200 transition duration-200 group-hover:border-indigo-300 group-hover:shadow-lg group-hover:shadow-indigo-950/5 dark:group-hover:border-indigo-800">
          <CardContent className="p-5 sm:p-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center">
              <div className="flex min-w-0 items-start gap-4 lg:w-[31%]"><span className="flex h-13 w-13 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 text-xl font-bold text-white shadow-md shadow-indigo-500/20">{company.name[0]}</span><div className="min-w-0"><div className="flex flex-wrap items-center gap-2"><h2 className="text-xl font-bold">{company.name}</h2><span className="rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">{categories[company.slug]}</span></div><p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground"><MapPin className="h-4 w-4 shrink-0 text-indigo-600" />{company.location}</p></div></div>
              <div className="grid flex-1 grid-cols-2 gap-x-5 gap-y-4 text-sm sm:grid-cols-4">
                <div><p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Roles</p><p className="mt-1 flex items-center gap-1.5 font-semibold"><Building2 className="h-4 w-4 text-indigo-600" />{company.roles.length} open</p></div>
                <div><p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">CTC offered</p><p className="mt-1 flex items-center gap-1.5 font-semibold"><IndianRupee className="h-4 w-4 text-indigo-600" />{company.outcomes.package}</p></div>
                <div><p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Last year placed</p><p className="mt-1 flex items-center gap-1.5 font-semibold"><UsersRound className="h-4 w-4 text-indigo-600" />{company.outcomes.selected}</p></div>
                <div><p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Rating</p><p className="mt-1 flex items-center gap-1.5 font-semibold text-amber-600"><Star className="h-4 w-4 fill-current" />{company.rating}</p></div>
              </div>
              <div className="flex shrink-0 items-center gap-2 border-t border-slate-100 pt-4 lg:border-0 lg:pt-0"><span className="text-sm font-semibold text-indigo-600">View details</span><ArrowRight className="h-4 w-4 text-indigo-600 transition-transform group-hover:translate-x-1" /></div>
            </div>
            <div className="mt-5 border-t border-slate-100 pt-4 text-sm dark:border-slate-800"><span className="font-medium text-muted-foreground">Roles available: </span><span>{company.roles.map((role) => role.title).join(" · ")}</span></div>
          </CardContent>
        </Card>
      </Link>)}
    </section> : <Card><CardContent className="py-14 text-center"><Building2 className="mx-auto h-7 w-7 text-indigo-600" /><h2 className="mt-4 font-semibold">No companies found</h2><p className="mt-1 text-sm text-muted-foreground">Try a different company, role, CTC or location.</p><Button variant="outline" size="sm" className="mt-4" onClick={() => { setQuery(""); setCategory("All"); }}>Clear filters</Button></CardContent></Card>}
  </div>;
}
