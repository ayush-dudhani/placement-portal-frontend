import { create } from "zustand";
import { persist } from "zustand/middleware";

export const applicationKey = (companySlug, roleTitle) => `${companySlug}::${roleTitle}`;

const defaultApplications = [
  { id: applicationKey("google", "Software Engineer Intern"), companySlug: "google", company: "Google", role: "Software Engineer Intern", appliedOn: "27 Aug 2026", status: "UNDER_REVIEW", nextStep: "Eligibility review in progress", updatedAt: "Today, 10:40 AM" },
  { id: applicationKey("infosys", "System Engineer"), companySlug: "infosys", company: "Infosys", role: "System Engineer", appliedOn: "10 Aug 2026", status: "NOT_SELECTED", nextStep: "No action required", updatedAt: "24 Aug 2026" },
  { id: applicationKey("amazon", "SDE-1"), companySlug: "amazon", company: "Amazon", role: "SDE-1", appliedOn: "25 Aug 2026", status: "SHORTLISTED", nextStep: "Online assessment · 3 Sep, 10:00 AM", updatedAt: "Today, 9:15 AM" },
];

export const emptyProfile = {
  firstName: "", lastName: "", mobileNo: "", rollNumber: "", branch: "", yearOfPassing: "", cgpa: "", tenthPercentage: "", twelfthPercentage: "", diplomaPercentage: "", activeBacklogs: "", gender: "", dateOfBirth: "", linkedinUrl: "", githubUrl: "", resumeName: "",
};

const completionFields = ["firstName", "lastName", "mobileNo", "rollNumber", "branch", "yearOfPassing", "cgpa", "tenthPercentage", "twelfthPercentage", "activeBacklogs", "gender", "dateOfBirth", "linkedinUrl", "githubUrl"];

export function getProfileCompletion(profile, skills) {
  const completed = completionFields.filter((field) => profile[field]?.toString().trim()).length;
  return Math.round(((completed + (skills.length ? 1 : 0) + (profile.resumeName ? 1 : 0)) / (completionFields.length + 2)) * 100);
}

export const usePortalStore = create(
  persist(
    (set, get) => ({
      applications: defaultApplications,
      profile: emptyProfile,
      skills: ["Java", "React", "SQL"],
      companyThreads: {},
      applyToRole: ({ companySlug, company, role }) => {
        const id = applicationKey(companySlug, role);
        if (get().applications.some((application) => application.id === id)) return false;
        set((state) => ({ applications: [{ id, companySlug, company, role, appliedOn: new Intl.DateTimeFormat("en-IN", { day: "2-digit", month: "short", year: "numeric" }).format(new Date()), status: "APPLIED", nextStep: "Application received by the placement cell", updatedAt: "Just now" }, ...state.applications] }));
        return true;
      },
      saveProfile: (profile, skills) => set({ profile, skills }),
      addCompanyQuestion: (companySlug, text, initialThreads = []) => set((state) => {
        const existing = state.companyThreads[companySlug] || initialThreads;
        return { companyThreads: { ...state.companyThreads, [companySlug]: [...existing, { author: "You", text, replies: [] }] } };
      }),
      addCompanyReply: (companySlug, questionIndex, reply) => set((state) => {
        const threads = [...(state.companyThreads[companySlug] || [])];
        if (!threads[questionIndex]) return state;
        threads[questionIndex] = { ...threads[questionIndex], replies: [...(threads[questionIndex].replies || []), reply] };
        return { companyThreads: { ...state.companyThreads, [companySlug]: threads } };
      }),
    }),
    { name: "placement-portal-store", version: 2 },
  ),
);
