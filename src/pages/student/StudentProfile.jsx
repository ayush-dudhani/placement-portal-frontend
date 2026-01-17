import { useState } from "react";
import "../../styles/studentProfile.css";

const StudentProfile = () => {
  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    phone: "",
    branch: "",
    year: "",
    cgpa: "",
    skills: "",
  });

  const completion = Math.round(
    Object.values(profile).filter((v) => v !== "").length /
      Object.keys(profile).length *
      100
  );

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="profile-page">

      {/* Completion */}
      <div className="profile-card">
        <h3>Profile Completion</h3>
        <div className="progress-bar">
          <div className="progress" style={{ width: `${completion}%` }} />
        </div>
        <p>{completion}% completed</p>
      </div>

      {/* Personal Details */}
      <div className="profile-card">
        <h3>Personal Details</h3>

        <div className="form-grid">
          <input
            name="fullName"
            placeholder="Full Name"
            value={profile.fullName}
            onChange={handleChange}
          />
          <input
            name="email"
            placeholder="College Email"
            value={profile.email}
            onChange={handleChange}
          />
          <input
            name="phone"
            placeholder="Mobile Number"
            value={profile.phone}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Academic Details */}
      <div className="profile-card">
        <h3>Academic Details</h3>

        <div className="form-grid">
          <input
            name="branch"
            placeholder="Branch / Department"
            value={profile.branch}
            onChange={handleChange}
          />
          <input
            name="year"
            placeholder="Passing Year"
            value={profile.year}
            onChange={handleChange}
          />
          <input
            name="cgpa"
            placeholder="CGPA"
            value={profile.cgpa}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Skills */}
      <div className="profile-card">
        <h3>Skills</h3>
        <textarea
          name="skills"
          placeholder="Enter skills (Java, Spring Boot, React...)"
          value={profile.skills}
          onChange={handleChange}
        />
      </div>

      {/* Resume */}
      <div className="profile-card">
        <h3>Resume</h3>
        <input type="file" />
        <p className="hint">Upload PDF only (Max 2MB)</p>
      </div>

      <button className="save-btn">Save Profile</button>
    </div>
  );
};

export default StudentProfile;
