import { useState } from "react";
import "../styles/login.css";

const LoginPage = () => {
  const [collegeCode, setCollegeCode] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // call backend
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h2 className="login-title">College Placement Portal</h2>
        <p className="login-subtitle">
          Login with your college credentials
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>College Code</label>
            <input
              type="text"
              placeholder="e.g. MITPUNE"
              value={collegeCode}
              onChange={(e) => setCollegeCode(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Username / Email</label>
            <input
              type="text"
              placeholder="Enter username or college email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit">Login</button>
        </form>

        <p className="login-footer">
          Managed by your College Placement Cell
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
