import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/login.css";

const LoginPage = () => {
  const [collegeName, setCollegeName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          collegeName,
          username,
          password,
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.message || "Login failed");
      }

      const data = await response.json();
      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("username", data.username);
      sessionStorage.setItem("collegeName", data.collegeName);
      sessionStorage.setItem("role", data.role);

      if (data.role === "STUDENT") {
        navigate("/student/dashboard");
      } else if (data.role === "ADMIN") {
        navigate("/admin/dashboard");
      } else {
        navigate("/login");
      }
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h2 className="login-title">College Placement Portal</h2>
        <p className="login-subtitle">Login with your college credentials</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>College Name</label>
            <input
              type="text"
              placeholder="PCCOE"
              value={collegeName}
              onChange={(e) => setCollegeName(e.target.value)}
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

          {error && <p className="error-text">{error}</p>}

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          <div className="auth-links">
            <Link to="/forgot-password">Forgot Password?</Link>
            <Link to="/signup">Create Account</Link>
          </div>
        </form>

        <p className="login-footer">Managed by your College Placement Cell</p>
      </div>
    </div>
  );
};

export default LoginPage;
