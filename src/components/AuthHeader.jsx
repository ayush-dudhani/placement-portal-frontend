import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ui/theme-provider";
import { Link } from "react-router-dom";
import BrandMark from "@/components/BrandMark";

export default function AuthHeader() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-background/90 backdrop-blur dark:border-slate-800">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 sm:px-6">

        <BrandMark />

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" aria-label="Toggle colour theme" onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}>{resolvedTheme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}</Button>
          <Button asChild variant="ghost" className="hidden sm:inline-flex"><Link to="/login">Sign in</Link></Button>
          <Button asChild className="hidden bg-indigo-600 text-white hover:bg-indigo-700 sm:inline-flex"><Link to="/signup">Get started</Link></Button>
        </div>

      </div>
    </header>
  );
}
