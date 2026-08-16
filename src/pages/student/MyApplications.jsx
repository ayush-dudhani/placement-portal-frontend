import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";

import { Badge } from "@/components/ui/badge";

const applications = [
  {
    id: 1,
    company: "Google",
    role: "Software Engineer",
    appliedOn: "10 Oct 2026",
    status: "UNDER_REVIEW",
  },
  {
    id: 2,
    company: "Infosys",
    role: "System Engineer",
    appliedOn: "05 Oct 2026",
    status: "REJECTED",
  },
  {
    id: 3,
    company: "Amazon",
    role: "SDE-1",
    appliedOn: "12 Oct 2026",
    status: "SHORTLISTED",
  },
];

const getStatusBadge = (status) => {
  switch (status) {
    case "APPLIED":
      return (
        <Badge variant="secondary">
          Applied
        </Badge>
      );

    case "UNDER_REVIEW":
      return (
        <Badge variant="outline">
          Under Review
        </Badge>
      );

    case "SHORTLISTED":
      return (
        <Badge>
          Shortlisted
        </Badge>
      );

    case "REJECTED":
      return (
        <Badge variant="destructive">
          Not Selected
        </Badge>
      );

    case "SELECTED":
      return (
        <Badge>
          Selected
        </Badge>
      );

    default:
      return (
        <Badge variant="secondary">
          {status}
        </Badge>
      );
  }
};

export default function MyApplications() {
  return (
    <div className="space-y-8">

      <div>
        <p className="text-sm font-bold uppercase tracking-[.18em] text-indigo-600">Application centre</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight">
          My Applications
        </h1>

        <p className="text-muted-foreground mt-1">
          Track the status of all company applications.
        </p>
      </div>

      {/* Status Guide */}
      <Card className="border-indigo-100 bg-indigo-50/40 dark:border-indigo-950 dark:bg-indigo-950/20">
        <CardHeader>
          <CardTitle>
            Application Status Guide
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid gap-3 md:grid-cols-2">

            <div className="flex items-center gap-3">
              <Badge variant="secondary">
                Applied
              </Badge>

              <span className="text-sm text-muted-foreground">
                Successfully applied
              </span>
            </div>

            <div className="flex items-center gap-3">
              <Badge variant="outline">
                Under Review
              </Badge>

              <span className="text-sm text-muted-foreground">
                Resume / eligibility being checked
              </span>
            </div>

            <div className="flex items-center gap-3">
              <Badge>
                Shortlisted
              </Badge>

              <span className="text-sm text-muted-foreground">
                Selected for next round
              </span>
            </div>

            <div className="flex items-center gap-3">
              <Badge variant="destructive">
                Not Selected
              </Badge>

              <span className="text-sm text-muted-foreground">
                Application rejected
              </span>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Applications */}
      <Card className="shadow-md shadow-indigo-950/5">
        <CardHeader>
          <CardTitle>
            Applications
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">

          {applications.map((app) => (
            <div
              key={app.id}
              className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-slate-50/70 p-4 transition hover:border-indigo-200 hover:bg-indigo-50/40 md:flex-row md:items-center md:justify-between dark:border-slate-800 dark:bg-slate-900"
            >

              <div>
                <h3 className="font-semibold">
                  <Link className="hover:text-indigo-600 hover:underline" to={`/student/companies/${app.company.toLowerCase()}`}>
                    {app.company}
                  </Link>
                </h3>

                <p className="text-sm text-muted-foreground">
                  {app.role}
                </p>

                <p className="text-xs text-muted-foreground mt-1">
                  Applied on {app.appliedOn}
                </p>
              </div>

              <div>
                {getStatusBadge(app.status)}
              </div>

            </div>
          ))}

        </CardContent>
      </Card>

    </div>
  );
}
