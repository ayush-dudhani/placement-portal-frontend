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
    <aside className="w-64 border-r bg-background min-h-screen sticky top-0">
      <div className="p-6">
        <h2 className="text-xl font-bold">
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
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-muted transition"
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