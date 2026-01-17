import "../styles/footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Sitemap / Links */}
        <div className="footer-section">
          <h4>Quick Links</h4>
          <button>Student Dashboard</button>
          <button>Company Drives</button>
          <button>Placement Statistics</button>
          <button>Contact Placement Cell</button>
        </div>

        {/* Support */}
        <div className="footer-section">
          <h4>Support</h4>
          <button>Help</button>
          <button>Guidelines</button>
          <button>FAQs</button>
        </div>

        {/* College Address */}
        <div className="footer-section">
          <h4>College Address</h4>
          <p>
            ABC Institute of Technology<br />
            Pune, Maharashtra – 411001<br />
            India
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} ABC Institute of Technology | Placement Portal
      </div>
    </footer>
  );
};

export default Footer;
