import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/login.css";

const SignupPage = () => {
  const [collegeName, setCollegeName] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:8080/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            collegeName,
            fullName,
            email,
            password,
          }),
        }
      );

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.message || "Registration failed");
      }

      setSuccess(
        "Registration successful. Please login with your credentials."
      );

      setCollegeName("");
      setFullName("");
      setEmail("");
      setPassword("");
    } catch (err) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h2 className="login-title">College Placement Portal</h2>

        <p className="login-subtitle">
          Create your student account
        </p>

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
            <label>Full Name</label>
            <input
              type="text"
              placeholder="John Doe"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>College Email</label>
            <input
              type="email"
              placeholder="john@college.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <p className="error-text">{error}</p>
          )}

          {success && (
            <p
              style={{
                color: "green",
                marginBottom: "12px",
              }}
            >
              {success}
            </p>
          )}

          <button type="submit" disabled={loading}>
            {loading
              ? "Creating Account..."
              : "Create Account"}
          </button>
        </form>

        <div className="auth-links">
          <Link to="/login">
            Already have an account? Login
          </Link>
        </div>

        <p className="login-footer">
          Managed by your College Placement Cell
        </p>
      </div>
    </div>
  );
};

export default SignupPage;