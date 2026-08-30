import { ArrowLeft, Compass } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
  return (
    <main id="main-content" className="flex min-h-[70vh] items-center justify-center px-5 py-16 text-center">
      <div>
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600 dark:bg-indigo-950"><Compass className="h-6 w-6" /></span>
        <p className="mt-6 text-sm font-bold uppercase tracking-[.18em] text-indigo-600">404 · Page not found</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight">This page isn&apos;t in the portal.</h1>
        <p className="mx-auto mt-3 max-w-md text-muted-foreground">The link may be outdated, or you may not have access to this workspace.</p>
        <Button asChild className="mt-6 bg-indigo-600 text-white hover:bg-indigo-700"><Link to="/"><ArrowLeft className="mr-2 h-4 w-4" />Back to portal</Link></Button>
      </div>
    </main>
  );
}
