import { useState } from "react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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

    if (skills.includes(value))
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
    <Card id="skills">
      <CardHeader>
        <CardTitle>
          Skills
        </CardTitle>
      </CardHeader>

      <CardContent>

        <div className="flex gap-2">
          <Input
            value={skillInput}
            onChange={(e) =>
              setSkillInput(
                e.target.value
              )
            }
            placeholder="Java, Spring Boot, React..."
          />

          <Button
            type="button"
            onClick={addSkill}
          >
            Add Skill
          </Button>
        </div>

        <div className="flex flex-wrap gap-2 mt-4">

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
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}

        </div>

      </CardContent>
    </Card>
  );
}