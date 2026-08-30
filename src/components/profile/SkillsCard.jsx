import { useState } from "react";

import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { X } from "lucide-react";

export default function SkillsCard({
  skills,
  setSkills,
}) {
  const [skillInput, setSkillInput] =
    useState("");

  const addSkill = () => {
    const value =
      skillInput.trim();

    if (!value) return;

    if (skills.some((skill) => skill.toLowerCase() === value.toLowerCase()))
      return;

    setSkills([
      ...skills,
      value,
    ]);

    setSkillInput("");
  };

  const removeSkill = (
    skillToRemove
  ) => {
    setSkills(
      skills.filter(
        (skill) =>
          skill !== skillToRemove
      )
    );
  };

  return (
    <>
      <CardHeader className="border-b border-slate-100 px-5 py-5 dark:border-slate-800">
        <CardTitle>Skills</CardTitle>
        <p className="text-sm text-muted-foreground">Add specific, demonstrable skills to improve role matching.</p>
      </CardHeader>

      <CardContent className="p-5 sm:p-6">

        <div className="flex flex-col gap-2 sm:flex-row">
          <Input
            value={skillInput}
            onChange={(e) =>
              setSkillInput(
                e.target.value
              )
            }
            placeholder="Java, Spring Boot, React..."
            className="h-11"
            onKeyDown={(event) => { if (event.key === "Enter") { event.preventDefault(); addSkill(); } }}
          />

          <Button
            type="button"
            onClick={addSkill}
          >
            Add skill
          </Button>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">

          {skills.map((skill) => (
            <Badge
              key={skill}
              variant="secondary"
              className="px-3 py-1"
            >
              {skill}

              <button
                className="ml-2"
                onClick={() =>
                  removeSkill(skill)
                }
                aria-label={`Remove ${skill}`}
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}

        </div>
        {!skills.length && <p className="mt-4 text-sm text-muted-foreground">No skills added yet. Start with the tools, languages and strengths you can discuss in an interview.</p>}

      </CardContent>
    </>
  );
}
