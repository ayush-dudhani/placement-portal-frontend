import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
    <Card id="academic">
      <CardHeader>
        <CardTitle>
          Academic Information
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid md:grid-cols-2 gap-4">

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
              <SelectTrigger>
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
              <SelectTrigger>
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
            />
          </div>

          <div className="space-y-2">
            <Label>10th Percentage</Label>

            <Input
              name="tenthPercentage"
              value={profile.tenthPercentage}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label>12th Percentage</Label>

            <Input
              name="twelfthPercentage"
              value={profile.twelfthPercentage}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label>Diploma Percentage</Label>

            <Input
              name="diplomaPercentage"
              value={profile.diplomaPercentage}
              onChange={handleChange}
            />
          </div>

        </div>
      </CardContent>
    </Card>
  );
}