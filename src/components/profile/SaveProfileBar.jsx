import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";

export default function SaveProfileBar({
  onSave,
  loading = false,
}) {
  return (
    <div className="sticky bottom-4 z-20 flex justify-end rounded-2xl border border-slate-200 bg-white/90 p-3 shadow-lg shadow-indigo-950/10 backdrop-blur dark:border-slate-800 dark:bg-slate-900/90">
      <Button
        size="lg"
        className="bg-indigo-600 text-white hover:bg-indigo-700"
        onClick={onSave}
        disabled={loading}
      >
        <Save className="w-4 h-4 mr-2" />

        {loading
          ? "Saving..."
          : "Save Profile"}
      </Button>
    </div>
  );
}
