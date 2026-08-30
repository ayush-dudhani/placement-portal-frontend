import { useEffect, useRef, useState } from "react";
import { Bell, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const notificationsByRole = {
  student: [
    { title: "Amazon shortlist published", detail: "Check your application for the next-round update.", time: "25 min" },
    { title: "Google applications close soon", detail: "Submit your application before 11:59 PM on 2 Sep.", time: "2 hr" },
    { title: "Resume clinic this Friday", detail: "Career Services · Seminar Hall B · 3:00 PM", time: "1 day" },
  ],
  admin: [
    { title: "18 applications need review", detail: "Google and Microsoft eligibility queues are pending.", time: "12 min" },
    { title: "Amazon shortlist imported", detail: "94 applicants were updated successfully.", time: "1 hr" },
    { title: "Two drives need a POC", detail: "Assign coordinators before publishing the briefs.", time: "3 hr" },
  ],
};

export default function NotificationMenu({ role = "student" }) {
  const [open, setOpen] = useState(false);
  const [read, setRead] = useState(false);
  const rootRef = useRef(null);
  const notifications = notificationsByRole[role];

  useEffect(() => {
    const close = (event) => {
      if (!rootRef.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, []);

  return (
    <div className="relative" ref={rootRef}>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="relative rounded-full"
        aria-label="Open notifications"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <Bell className="h-4 w-4" />
        {!read && <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-background" />}
      </Button>
      {open && (
        <div className="absolute right-0 top-12 z-50 w-[min(22rem,calc(100vw-2rem))] overflow-hidden rounded-2xl border bg-popover text-popover-foreground shadow-xl">
          <div className="flex items-center justify-between border-b px-4 py-3">
            <div>
              <p className="font-semibold">Notifications</p>
              <p className="text-xs text-muted-foreground">Updates that need your attention</p>
            </div>
            <button type="button" onClick={() => setRead(true)} className="text-xs font-semibold text-indigo-600 hover:text-indigo-700">Mark all read</button>
          </div>
          <div className="divide-y">
            {notifications.map((item, index) => (
              <div className="flex gap-3 px-4 py-3" key={item.title}>
                <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${read || index > 1 ? "bg-slate-300 dark:bg-slate-700" : "bg-indigo-500"}`} />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium">{item.title}</p>
                  <p className="mt-0.5 text-xs leading-5 text-muted-foreground">{item.detail}</p>
                  <p className="mt-1 text-[11px] font-medium text-indigo-600">{item.time} ago</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 bg-muted/50 px-4 py-2.5 text-xs text-muted-foreground">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> You&apos;re all caught up after these updates.
          </div>
        </div>
      )}
    </div>
  );
}
