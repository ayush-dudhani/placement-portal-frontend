import { useState } from "react";

import ProfileSidebar from "@/components/profile/ProfileSidebar";
import ProfileCompletion from "@/components/profile/ProfileCompletion";
import PersonalInfoCard from "@/components/profile/PersonalInfoCard";
import AcademicInfoCard from "@/components/profile/AcademicInfoCard";
import ProfessionalInfoCard from "@/components/profile/ProfessionalInfoCard";
import SkillsCard from "@/components/profile/SkillsCard";
import SaveProfileBar from "@/components/profile/SaveProfileBar";

export default function StudentProfile() {
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    mobileNo: "",
    rollNumber: "",

    branch: "",
    yearOfPassing: "",
    cgpa: "",

    tenthPercentage: "",
    twelfthPercentage: "",
    diplomaPercentage: "",
    activeBacklogs: "",

    gender: "",
    dateOfBirth: "",

    linkedinUrl: "",
    githubUrl: "",

    resumeFile: null,
  });

  const [skills, setSkills] = useState([
    "Java",
    "React",
    "SQL",
  ]);

  const [loading, setLoading] =
    useState(false);

  const profileFields = [
    "firstName",
    "lastName",
    "mobileNo",
    "rollNumber",
    "branch",
    "yearOfPassing",
    "cgpa",
    "tenthPercentage",
    "twelfthPercentage",
    "activeBacklogs",
    "gender",
    "dateOfBirth",
    "linkedinUrl",
    "githubUrl",
  ];

  const completion = Math.round(
    (
      profileFields.filter(
        (field) =>
          profile[field] &&
          profile[field]
            .toString()
            .trim() !== ""
      ).length +
      (skills.length > 0 ? 1 : 0) +
      (profile.resumeFile ? 1 : 0)
    ) /
      (profileFields.length + 2) *
      100
  );

  const handleChange = (e) => {
    const {
      name,
      value,
      files,
    } = e.target;

    if (
      name === "resumeFile"
    ) {
      setProfile((prev) => ({
        ...prev,
        resumeFile: files[0],
      }));

      return;
    }

    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (
    field,
    value
  ) => {
    setProfile((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave =
    async () => {
      try {
        setLoading(true);

        const payload = {
          ...profile,
          skills,
        };

        console.log(
          "Saving Profile",
          payload
        );

        // TODO:
        // call backend API

        // await studentApi.updateProfile(payload);

      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="min-h-screen bg-muted/20">
      <div className="flex">

        <ProfileSidebar />

        <main className="flex-1 p-8">
          <div className="max-w-5xl mx-auto space-y-6">

            <div>
              <h1 className="text-4xl font-bold">
                My Profile
              </h1>

              <p className="text-muted-foreground mt-1">
                Complete your
                profile to apply
                for placement
                opportunities.
              </p>
            </div>

            <ProfileCompletion
              completion={
                completion
              }
            />

            <PersonalInfoCard
              profile={profile}
              handleChange={
                handleChange
              }
            />

            <AcademicInfoCard
              profile={profile}
              handleChange={
                handleChange
              }
              handleSelectChange={
                handleSelectChange
              }
            />

            <ProfessionalInfoCard
              profile={profile}
              handleChange={
                handleChange
              }
            />

            <SkillsCard
              skills={skills}
              setSkills={setSkills}
            />

            <SaveProfileBar
              loading={loading}
              onSave={
                handleSave
              }
            />

          </div>
        </main>

      </div>
    </div>
  );
}