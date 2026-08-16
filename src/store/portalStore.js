import { create } from "zustand";
import { persist } from "zustand/middleware";

export const usePortalStore = create(
  persist(
    (set) => ({
      companyThreads: {},
      addCompanyQuestion: (companySlug, text, initialThreads = []) => set((state) => {
        const existing = state.companyThreads[companySlug] || initialThreads;
        return {
          companyThreads: {
            ...state.companyThreads,
            [companySlug]: [...existing, { author: "You", text, replies: [] }],
          },
        };
      }),
      addCompanyReply: (companySlug, questionIndex, reply) => set((state) => {
        const threads = [...(state.companyThreads[companySlug] || [])];
        if (!threads[questionIndex]) return state;
        threads[questionIndex] = {
          ...threads[questionIndex],
          replies: [...(threads[questionIndex].replies || []), reply],
        };
        return { companyThreads: { ...state.companyThreads, [companySlug]: threads } };
      }),
    }),
    { name: "placement-portal-store", version: 1 },
  ),
);
