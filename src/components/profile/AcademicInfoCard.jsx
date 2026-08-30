import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AcademicInfoCard({
  profile,
  handleChange,
  handleSelectChange,
}) {
  const passingYears = Array.from(
    { length: 8 },
    (_, i) => 2024 + i
  );

  return (
    <>
      <CardHeader className="border-b border-slate-100 px-5 py-5 dark:border-slate-800">
        <CardTitle>Academic information</CardTitle>
        <p className="text-sm text-muted-foreground">These details determine your eligibility for campus drives.</p>
      </CardHeader>

      <CardContent className="p-5 sm:p-6">
        <div className="grid gap-5 md:grid-cols-2">

          <div className="space-y-2">
            <Label>
              Branch
              <Badge
                variant="secondary"
                className="ml-2"
              >
                Required
              </Badge>
            </Label>

            <Select
              value={profile.branch}
              onValueChange={(value) =>
                handleSelectChange(
                  "branch",
                  value
                )
              }
            >
            <SelectTrigger className="h-11 w-full">
                <SelectValue placeholder="Select Branch" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="CSE">
                  Computer Science
                </SelectItem>

                <SelectItem value="IT">
                  Information Technology
                </SelectItem>

                <SelectItem value="ENTC">
                  Electronics & Telecom
                </SelectItem>

                <SelectItem value="MECH">
                  Mechanical
                </SelectItem>

                <SelectItem value="CIVIL">
                  Civil
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>
              Passing Year
              <Badge
                variant="secondary"
                className="ml-2"
              >
                Required
              </Badge>
            </Label>

            <Select
              value={profile.yearOfPassing}
              onValueChange={(value) =>
                handleSelectChange(
                  "yearOfPassing",
                  value
                )
              }
            >
            <SelectTrigger className="h-11 w-full">
                <SelectValue placeholder="Select Year" />
              </SelectTrigger>

              <SelectContent>
                {passingYears.map((year) => (
                  <SelectItem
                    key={year}
                    value={String(year)}
                  >
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>
              CGPA
              <Badge
                variant="secondary"
                className="ml-2"
              >
                Required
              </Badge>
            </Label>

            <Input
              type="number"
              min="0"
              max="10"
              step="0.01"
              name="cgpa"
              value={profile.cgpa}
              onChange={handleChange}
              placeholder="8.50"
              className="h-11"
            />

            <p className="text-xs text-muted-foreground">
              Value must be between 0 and 10
            </p>
          </div>

          <div className="space-y-2">
            <Label>Active Backlogs</Label>

            <Input
              type="number"
              min="0"
              name="activeBacklogs"
              value={profile.activeBacklogs}
              onChange={handleChange}
              className="h-11"
            />
          </div>

          <div className="space-y-2">
            <Label>10th Percentage</Label>

            <Input
              name="tenthPercentage"
              value={profile.tenthPercentage}
              onChange={handleChange}
              type="number"
              min="0"
              max="100"
              step="0.01"
              className="h-11"
            />
          </div>

          <div className="space-y-2">
            <Label>12th Percentage</Label>

            <Input
              name="twelfthPercentage"
              value={profile.twelfthPercentage}
              onChange={handleChange}
              type="number"
              min="0"
              max="100"
              step="0.01"
              className="h-11"
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label>Diploma Percentage</Label>

            <Input
              name="diplomaPercentage"
              value={profile.diplomaPercentage}
              onChange={handleChange}
              type="number"
              min="0"
              max="100"
              step="0.01"
              className="h-11"
            />
          </div>

        </div>
      </CardContent>
    </>
  );
}
