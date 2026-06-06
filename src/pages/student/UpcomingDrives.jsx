import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { Badge } from "@/components/ui/badge";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

import {
  Calendar,
  Briefcase,
  IndianRupee,
} from "lucide-react";

const drives = [
  {
    id: 1,
    company: "Google",
    role: "Software Engineer Intern",
    ctc: "30 LPA",
    date: "20 Oct 2026",
    eligibility: "CGPA ≥ 8.0",
    status: "UPCOMING",
    applied: false,
  },
  {
    id: 2,
    company: "Microsoft",
    role: "SDE Intern",
    ctc: "28 LPA",
    date: "22 Oct 2026",
    eligibility: "CGPA ≥ 7.5",
    status: "UPCOMING",
    applied: true,
  },
  {
    id: 3,
    company: "Amazon",
    role: "SDE-1",
    ctc: "32 LPA",
    date: "18 Oct 2026",
    eligibility: "CGPA ≥ 7.0",
    status: "ONGOING",
    applied: true,
  },
  {
    id: 4,
    company: "Infosys",
    role: "System Engineer",
    ctc: "3.6 LPA",
    date: "05 Oct 2026",
    eligibility: "CGPA ≥ 6.0",
    status: "COMPLETED",
    applied: true,
  },
];

const upcomingDrives = drives.filter(
  (drive) => drive.status === "UPCOMING"
);

const ongoingDrives = drives.filter(
  (drive) => drive.status === "ONGOING"
);

const pastDrives = drives.filter(
  (drive) => drive.status === "COMPLETED"
);

function DriveCard({ drive }) {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

          <div>
            <CardTitle>
              {drive.company}
            </CardTitle>

            <p className="text-muted-foreground mt-1">
              {drive.role}
            </p>
          </div>

          {drive.status === "COMPLETED" ? (
            <Badge variant="secondary">
              Completed
            </Badge>
          ) : drive.applied ? (
            <Badge>
              Applied
            </Badge>
          ) : (
            <Button>
              Apply
            </Button>
          )}

        </div>
      </CardHeader>

      <CardContent>

        <div className="grid gap-4 md:grid-cols-3">

          <div className="flex items-center gap-2 text-sm">
            <IndianRupee className="h-4 w-4 text-muted-foreground" />
            <span>{drive.ctc}</span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Briefcase className="h-4 w-4 text-muted-foreground" />
            <span>{drive.eligibility}</span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>{drive.date}</span>
          </div>

        </div>

      </CardContent>
    </Card>
  );
}

export default function Drives() {
  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-3xl font-bold">
          Placement Drives
        </h1>

        <p className="text-muted-foreground mt-1">
          Browse upcoming opportunities,
          track active drives, and review
          completed recruitment processes.
        </p>
      </div>

      <Tabs
        defaultValue="upcoming"
        className="space-y-4"
      >

        <TabsList>
          <TabsTrigger value="upcoming">
            Upcoming ({upcomingDrives.length})
          </TabsTrigger>

          <TabsTrigger value="ongoing">
            Ongoing ({ongoingDrives.length})
          </TabsTrigger>

          <TabsTrigger value="past">
            Past ({pastDrives.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent
          value="upcoming"
          className="space-y-4"
        >
          {upcomingDrives.length > 0 ? (
            upcomingDrives.map((drive) => (
              <DriveCard
                key={drive.id}
                drive={drive}
              />
            ))
          ) : (
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                No upcoming drives available.
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent
          value="ongoing"
          className="space-y-4"
        >
          {ongoingDrives.length > 0 ? (
            ongoingDrives.map((drive) => (
              <DriveCard
                key={drive.id}
                drive={drive}
              />
            ))
          ) : (
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                No ongoing drives available.
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent
          value="past"
          className="space-y-4"
        >
          {pastDrives.length > 0 ? (
            pastDrives.map((drive) => (
              <DriveCard
                key={drive.id}
                drive={drive}
              />
            ))
          ) : (
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                No past drives available.
              </CardContent>
            </Card>
          )}
        </TabsContent>

      </Tabs>

    </div>
  );
}