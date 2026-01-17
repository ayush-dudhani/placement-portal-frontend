import "./MyApplications.css";

const applications = [
  {
    id: 1,
    company: "Google",
    role: "Software Engineer",
    appliedOn: "10 Oct 2026",
    status: "UNDER_REVIEW",
  },
  {
    id: 2,
    company: "Infosys",
    role: "System Engineer",
    appliedOn: "05 Oct 2026",
    status: "REJECTED",
  },
  {
    id: 3,
    company: "Amazon",
    role: "SDE-1",
    appliedOn: "12 Oct 2026",
    status: "SHORTLISTED",
  },
];

const getStatusLabel = (status) => {
  switch (status) {
    case "APPLIED":
      return "Applied";
    case "UNDER_REVIEW":
      return "Under Review";
    case "SHORTLISTED":
      return "Shortlisted";
    case "REJECTED":
      return "Not Selected";
    case "SELECTED":
      return "Selected";
    default:
      return status;
  }
};

const MyApplications = () => {
  return (
    <div className="applications-container">
      <div className="status-legend">
        <h4>Application Status Guide</h4>

        <ul>
          <li>
            <span className="status-dot applied"></span>
            <strong>Applied</strong> – Successfully applied
          </li>
          <li>
            <span className="status-dot under_review"></span>
            <strong>Under Review</strong> – Resume / eligibility being checked
          </li>
          <li>
            <span className="status-dot shortlisted"></span>
            <strong>Shortlisted</strong> – Selected for next round
          </li>
          <li>
            <span className="status-dot rejected"></span>
            <strong>Not Selected</strong> – Application Got Rejected
          </li>
          <li>
            <span className="status-dot selected"></span>
            <strong>Selected</strong> – Final offer
          </li>
        </ul>
      </div>

      <h2 className="page-title">My Applications</h2>

      <div className="applications-list">
        {applications.map((app) => (
          <div className="application-card" key={app.id}>
            <div className="app-left">
              <h3>{app.company}</h3>
              <p className="role">{app.role}</p>
              <p className="date">Applied On: {app.appliedOn}</p>
            </div>

            <div className="app-right">
              <span className={`status-badge ${app.status.toLowerCase()}`}>
                {getStatusLabel(app.status)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyApplications;
