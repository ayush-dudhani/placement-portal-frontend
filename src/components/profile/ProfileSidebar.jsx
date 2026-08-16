import {
  User,
  GraduationCap,
  Briefcase,
  Lightbulb,
  FileText,
} from "lucide-react";

const menuItems = [
  {
    id: "personal",
    label: "Personal Info",
    icon: User,
  },
  {
    id: "academic",
    label: "Education",
    icon: GraduationCap,
  },
  {
    id: "professional",
    label: "Experience",
    icon: Briefcase,
  },
  {
    id: "skills",
    label: "Skills",
    icon: Lightbulb,
  },
  {
    id: "documents",
    label: "Documents",
    icon: FileText,
  },
];

export default function ProfileSidebar() {
  const scrollToSection = (id) => {
    document
      .getElementById(id)
      ?.scrollIntoView({
        behavior: "smooth",
      });
  };

  return (
    <aside className="sticky top-16 hidden min-h-[calc(100vh-4rem)] w-64 shrink-0 border-r border-slate-200 bg-white/80 dark:border-slate-800 dark:bg-slate-900/80 lg:block">
      <div className="p-6">
        <p className="text-xs font-bold uppercase tracking-[.16em] text-indigo-600">Student workspace</p>
        <h2 className="mt-2 text-xl font-bold tracking-tight">
          My Profile
        </h2>

        <p className="text-sm text-muted-foreground mt-1">
          Complete your profile to apply
        </p>
      </div>

      <nav className="px-3">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() =>
                scrollToSection(item.id)
              }
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition hover:bg-indigo-50 hover:text-indigo-700 dark:hover:bg-indigo-950 dark:hover:text-indigo-300"
            >
              <Icon className="w-4 h-4" />
              {item.label}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
