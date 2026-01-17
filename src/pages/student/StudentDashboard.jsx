import "../../styles/studentDashboard.css";

const StudentDashboard = () => {
  // later this comes from backend
  const studentName = "Ayush";
  const profileCompletion = 70;

  const activeDrives = [
    { id: 1, company: "Google", role: "SDE Intern", status: "Apply" },
    { id: 2, company: "TCS", role: "Digital", status: "Applied" },
  ];

  const applications = [
    { id: 1, company: "Infosys", status: "Shortlisted" },
    { id: 2, company: "Wipro", status: "Under Review" },
  ];

  return (
    <div className="student-dashboard">
      <h2 className="welcome-text">Welcome, {studentName} 👋</h2>

      {/* Profile Status */}
      <div className="card profile-card">
        <h3>Profile Completion</h3>
        <div className="progress-bar">
          <div
            className="progress"
            style={{ width: `${profileCompletion}%` }}
          ></div>
        </div>
        <p>{profileCompletion}% completed</p>
        <button className="secondary-btn">Complete Profile</button>
      </div>

      {/* Active Drives */}
      <div className="card">
        <h3>Active Company Drives</h3>

        {activeDrives.map((drive) => (
          <div key={drive.id} className="drive-row">
            <div>
              <strong>{drive.company}</strong>
              <p>{drive.role}</p>
            </div>
            <button
              className={
                drive.status === "Applied" ? "disabled-btn" : "primary-btn"
              }
              disabled={drive.status === "Applied"}
            >
              {drive.status}
            </button>
          </div>
        ))}
      </div>

      {/* Applications */}
      <div className="card">
        <h3>Active Applications</h3>

        {applications.map((app) => (
          <div key={app.id} className="application-row">
            <span>{app.company}</span>
            <span className={`status ${app.status.replace(" ", "").toLowerCase()}`}>
              {app.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentDashboard;
