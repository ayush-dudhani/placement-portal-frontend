import "../styles/header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="header-left">
        <img
          src="/college-logo.png"
          alt="College Logo"
          className="college-logo"
        />
        <div className="college-info">
          <h1 className="college-name">ABC Institute of Technology</h1>
          <p className="college-subtitle">
            College Placement & Career Portal
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
