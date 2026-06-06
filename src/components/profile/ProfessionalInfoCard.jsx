import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function ProfessionalInfoCard({
  profile,
  handleChange,
}) {
  return (
    <Card id="professional">
      <CardHeader>
        <CardTitle>
          Professional Information
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">

        <div className="grid md:grid-cols-2 gap-4">

          <div className="space-y-2">
            <Label>LinkedIn URL</Label>

            <Input
              name="linkedinUrl"
              value={profile.linkedinUrl}
              onChange={handleChange}
              placeholder="https://linkedin.com/in/username"
            />
          </div>

          <div className="space-y-2">
            <Label>GitHub URL</Label>

            <Input
              name="githubUrl"
              value={profile.githubUrl}
              onChange={handleChange}
              placeholder="https://github.com/username"
            />
          </div>

        </div>

        <div className="space-y-2">
          <Label>Resume Upload</Label>

          <div className="flex items-center gap-4">

            <Button
              variant="outline"
              asChild
            >
              <label htmlFor="resumeFile">
                Choose File
              </label>
            </Button>

            <Input
              hidden
              id="resumeFile"
              type="file"
              name="resumeFile"
              accept=".pdf"
              onChange={handleChange}
            />

            <span className="text-sm text-muted-foreground">
              {profile.resumeFile
                ? profile.resumeFile.name
                : "No file selected"}
            </span>

          </div>
        </div>

      </CardContent>
    </Card>
  );
}