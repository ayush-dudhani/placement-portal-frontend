import "./UpcomingDrives.css";

const drives = [
  {
    id: 1,
    company: "Google",
    role: "Software Engineer",
    ctc: "30 LPA",
    date: "20 Oct 2026",
    eligibility: "CGPA ≥ 8.0",
    applied: false,
  },
  {
    id: 2,
    company: "Infosys",
    role: "System Engineer",
    ctc: "3.6 LPA",
    date: "25 Oct 2026",
    eligibility: "CGPA ≥ 6.0",
    applied: true,
  },
];

const UpcomingDrives = () => {
  return (
    <div className="drives-container">
      <h2 className="page-title">Upcoming Placement Drives</h2>

      <div className="drives-list">
        {drives.map((drive) => (
          <div className="drive-card" key={drive.id}>
            
            <div className="drive-left">
              <h3 className="company-name">{drive.company}</h3>
              <p className="role">{drive.role}</p>
              <p className="ctc">CTC: {drive.ctc}</p>
              <p className="eligibility">
                Eligibility: {drive.eligibility}
              </p>
              <p className="date">Drive Date: {drive.date}</p>
            </div>

            <div className="drive-right">
              {drive.applied ? (
                <span className="status applied">Applied</span>
              ) : (
                <button className="apply-btn">Apply</button>
              )}
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingDrives;
