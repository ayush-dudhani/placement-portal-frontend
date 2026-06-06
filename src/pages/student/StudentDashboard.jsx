import { Link } from "react-router-dom";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Button,
} from "@/components/ui/button";

import {
  Badge,
} from "@/components/ui/badge";

import {
  Progress,
} from "@/components/ui/progress";

import {
  Briefcase,
  FileText,
  User,
} from "lucide-react";

export default function StudentDashboard() {
  const username =
    sessionStorage.getItem("username") ||
    sessionStorage.getItem("email");

  const profileCompletion = 70;

  const activeDrives = [
    {
      id: 1,
      company: "Google",
      role: "SDE Intern",
      status: "Apply",
    },
    {
      id: 2,
      company: "TCS",
      role: "Digital",
      status: "Applied",
    },
  ];

  const applications = [
    {
      id: 1,
      company: "Infosys",
      status: "Shortlisted",
    },
    {
      id: 2,
      company: "Wipro",
      status: "Under Review",
    },
  ];

  return (
    <div className="space-y-6">

      {/* Welcome */}
      <div>
        <h1 className="text-3xl font-bold">
          Welcome, {username} 👋
        </h1>

        <p className="text-muted-foreground mt-1">
          Track your placements, applications,
          and profile progress.
        </p>
      </div>

      {/* Top Cards */}
      <div className="grid gap-4 md:grid-cols-3">

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Profile Completion
                </p>

                <p className="text-2xl font-bold">
                  {profileCompletion}%
                </p>
              </div>

              <User className="h-5 w-5 text-muted-foreground" />
            </div>

            <Progress
              value={profileCompletion}
              className="mt-4"
            />

            <Link to="/student/profile">
              <Button
                variant="outline"
                className="w-full mt-4"
              >
                Complete Profile
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Active Drives
                </p>

                <p className="text-2xl font-bold">
                  {activeDrives.length}
                </p>
              </div>

              <Briefcase className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Applications
                </p>

                <p className="text-2xl font-bold">
                  {applications.length}
                </p>
              </div>

              <FileText className="h-5 w-5 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

      </div>

      {/* Main Grid */}
      <div className="grid gap-6 lg:grid-cols-2">

        {/* Drives */}
        <Card>
          <CardHeader>
            <CardTitle>
              Active Company Drives
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            {activeDrives.map((drive) => (
              <div
                key={drive.id}
                className="flex items-center justify-between border rounded-lg p-4"
              >
                <div>
                  <p className="font-medium">
                    {drive.company}
                  </p>

                  <p className="text-sm text-muted-foreground">
                    {drive.role}
                  </p>
                </div>

                {drive.status === "Applied" ? (
                  <Button
                    disabled
                    variant="secondary"
                  >
                    Applied
                  </Button>
                ) : (
                  <Button>
                    Apply
                  </Button>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Applications */}
        <Card>
          <CardHeader>
            <CardTitle>
              My Applications
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            {applications.map((app) => (
              <div
                key={app.id}
                className="flex items-center justify-between border rounded-lg p-4"
              >
                <span className="font-medium">
                  {app.company}
                </span>

                <Badge
                  variant={
                    app.status ===
                    "Shortlisted"
                      ? "default"
                      : "secondary"
                  }
                >
                  {app.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

      </div>

    </div>
  );
}