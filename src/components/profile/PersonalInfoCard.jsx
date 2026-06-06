import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

import { Badge } from "@/components/ui/badge";

export default function PersonalInfoCard({
  profile,
  handleChange,
}) {
  return (
    <Card id="personal">
      <CardHeader>
        <CardTitle>
          Personal Information
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>
              First Name
              <Badge
                className="ml-2"
                variant="secondary"
              >
                Required
              </Badge>
            </Label>

            <Input
              name="firstName"
              value={profile.firstName}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label>
              Last Name
              <Badge
                className="ml-2"
                variant="secondary"
              >
                Required
              </Badge>
            </Label>

            <Input
              name="lastName"
              value={profile.lastName}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label>
              Mobile Number
            </Label>

            <Input
              name="mobileNo"
              value={profile.mobileNo}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label>
              Roll Number
            </Label>

            <Input
              name="rollNumber"
              value={profile.rollNumber}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label>
              Date Of Birth
            </Label>

            <Input
              type="date"
              name="dateOfBirth"
              value={profile.dateOfBirth}
              onChange={handleChange}
            />
          </div>

          <div className="space-y-2">
            <Label>Gender</Label>

            <Input
              name="gender"
              value={profile.gender}
              onChange={handleChange}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}