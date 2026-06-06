import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function ProfileCompletion({
  completion = 42,
}) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-3">
          <span className="font-medium">
            Profile Completion
          </span>

          <span className="font-semibold">
            {completion}%
          </span>
        </div>

        <Progress value={completion} />

        <p className="mt-3 text-sm text-muted-foreground">
          Complete your education and
          experience details to unlock
          more placement opportunities.
        </p>
      </CardContent>
    </Card>
  );
}