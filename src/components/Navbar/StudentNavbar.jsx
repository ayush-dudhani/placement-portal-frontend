import { Link } from "react-router-dom";
import "./StudentNavbar.css";

const StudentNavbar = () => {
  return (
    <nav className="navbar">
      
      {/* Left Section */}
      <div className="navbar-left">
        <div className="college-info">
          <img src="/college-logo.png" alt="College Logo" className="college-logo" />
          <div>
            {/* <h3 className="college-name">ABC Engineering College</h3> */}
            {/* <span className="college-subtitle">Placement Portal</span> */}
          </div>
        </div>

        <ul className="nav-links">
          <li><Link to="/student/dashboard">Dashboard</Link></li>
          <li><Link to="/student/drives">Upcoming Drives</Link></li>
          <li><Link to="/student/applications">My Applications</Link></li>
          <li><Link to="/student/profile">My Profile</Link></li>
        </ul>
      </div>

      {/* Right Section */}
      <div className="navbar-right">
        <button className="icon-btn">🔔</button>

        <div className="user-info">
          <span className="avatar">👤</span>
          <span className="username">Ayush</span>
        </div>

        <button className="logout-btn">Logout</button>
      </div>

    </nav>
  );
};

export default StudentNavbar;
