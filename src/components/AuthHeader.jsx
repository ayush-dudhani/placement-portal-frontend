import { GraduationCap, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ui/theme-provider";
import { Link } from "react-router-dom";

export default function AuthHeader() {
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-background/90 backdrop-blur dark:border-slate-800">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 sm:px-6">

        <div className="flex items-center gap-4">

          <Link to="/" className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/25"><GraduationCap className="h-6 w-6" /></Link>

          <div>
            <Link to="/" className="text-base font-bold tracking-tight sm:text-lg">ABC Institute of Technology</Link>

            <p className="text-sm text-muted-foreground">
              Placement & Career Portal
            </p>
          </div>

        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" aria-label="Toggle colour theme" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>{theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}</Button>
          <Button asChild variant="ghost" className="hidden sm:inline-flex"><Link to="/login">Sign in</Link></Button>
          <Button asChild className="bg-indigo-600 text-white hover:bg-indigo-700"><Link to="/signup">Get started</Link></Button>
        </div>

      </div>
    </header>
  );
}
