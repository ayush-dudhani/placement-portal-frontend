export default function StaticFallbackNotice({ resource = "data" }) {
  return <div role="status" className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900 dark:border-amber-950 dark:bg-amber-950/30 dark:text-amber-200">
    API unavailable. Showing static temporary {resource} for preview only.
  </div>;
}
