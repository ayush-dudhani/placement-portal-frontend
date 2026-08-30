import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function ProfessionalInfoCard({
  profile,
  handleChange,
}) {
  return (
    <>
      <CardHeader className="border-b border-slate-100 px-5 py-5 dark:border-slate-800">
        <CardTitle>Career links & resume</CardTitle>
        <p className="text-sm text-muted-foreground">Share proof of your work and the resume companies will receive.</p>
      </CardHeader>

      <CardContent className="space-y-6 p-5 sm:p-6">

        <div className="grid md:grid-cols-2 gap-4">

          <div className="space-y-2">
            <Label>LinkedIn URL</Label>

            <Input
              name="linkedinUrl"
              value={profile.linkedinUrl}
              onChange={handleChange}
              placeholder="https://linkedin.com/in/username"
              type="url"
              className="h-11"
            />
          </div>

          <div className="space-y-2">
            <Label>GitHub URL</Label>

            <Input
              name="githubUrl"
              value={profile.githubUrl}
              onChange={handleChange}
              placeholder="https://github.com/username"
              type="url"
              className="h-11"
            />
          </div>

        </div>

        <div className="space-y-2">
          <Label>Resume Upload</Label>

          <div className="flex flex-col items-start gap-3 rounded-xl border border-dashed bg-muted/30 p-4 sm:flex-row sm:items-center">

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
                : profile.resumeName || "No file selected"}
            </span>
            <span className="text-xs text-muted-foreground sm:ml-auto">PDF · max 5 MB</span>
          </div>
        </div>

      </CardContent>
    </>
  );
}
