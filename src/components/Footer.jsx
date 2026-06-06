import { Separator } from "@/components/ui/separator";

export default function Footer() {
  return (
    <footer className="border-t bg-background mt-12">
      <div className="max-w-7xl mx-auto px-6 py-10">

        <div className="grid gap-8 md:grid-cols-3">

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-semibold">
              Quick Links
            </h4>

            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <button className="text-left hover:text-foreground transition-colors">
                Student Dashboard
              </button>

              <button className="text-left hover:text-foreground transition-colors">
                Company Drives
              </button>

              <button className="text-left hover:text-foreground transition-colors">
                Placement Statistics
              </button>

              <button className="text-left hover:text-foreground transition-colors">
                Contact Placement Cell
              </button>
            </div>
          </div>

          {/* Support */}
          <div className="space-y-3">
            <h4 className="font-semibold">
              Support
            </h4>

            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <button className="text-left hover:text-foreground transition-colors">
                Help
              </button>

              <button className="text-left hover:text-foreground transition-colors">
                Guidelines
              </button>

              <button className="text-left hover:text-foreground transition-colors">
                FAQs
              </button>
            </div>
          </div>

          {/* Address */}
          <div className="space-y-3">
            <h4 className="font-semibold">
              College Address
            </h4>

            <p className="text-sm text-muted-foreground leading-6">
              ABC Institute of Technology
              <br />
              Pune, Maharashtra – 411001
              <br />
              India
            </p>
          </div>

        </div>

        <Separator className="my-6" />

        <div className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} ABC Institute of Technology | Placement Portal
        </div>

      </div>
    </footer>
  );
}