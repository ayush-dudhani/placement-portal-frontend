import { GraduationCap, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ui/theme-provider";

export default function AuthHeader() {
  const { theme, setTheme } = useTheme();

  return (
    <header className="border-b bg-background">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        <div className="flex items-center gap-4">

          <div className="flex h-14 w-14 items-center justify-center rounded-xl border bg-muted">
            <GraduationCap className="h-7 w-7" />
          </div>

          <div>
            <h1 className="text-xl font-bold">
              ABC Institute of Technology
            </h1>

            <p className="text-sm text-muted-foreground">
              Placement & Career Portal
            </p>
          </div>

        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setTheme(
              theme === "dark"
                ? "light"
                : "dark"
            )
          }
        >
          {theme === "dark" ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )}
        </Button>

      </div>
    </header>
  );
}