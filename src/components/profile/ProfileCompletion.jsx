import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function ProfileCompletion({
  completion = 42,
}) {
  return (
    <Card className="border-indigo-100 bg-gradient-to-r from-indigo-50 to-violet-50 dark:border-indigo-950 dark:from-indigo-950/40 dark:to-violet-950/30">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-3">
          <span className="font-medium">
            Profile Completion
          </span>

          <span className="rounded-full bg-white px-2.5 py-1 text-sm font-bold text-indigo-700 shadow-sm dark:bg-slate-900 dark:text-indigo-300">
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
