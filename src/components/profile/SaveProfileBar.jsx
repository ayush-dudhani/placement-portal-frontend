import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";

export default function SaveProfileBar({
  onSave,
  loading = false,
}) {
  return (
    <div className="flex justify-end">
      <Button
        size="lg"
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