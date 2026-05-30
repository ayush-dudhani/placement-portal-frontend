import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/login.css";

const ForgotPasswordPage = () => {
  const [collegeName, setCollegeName] = useState("");
  const [email, setEmail] = useState("");

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
        "http://localhost:8080/auth/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            collegeName,
            email,
          }),
        }
      );

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(
          data?.message || "Failed to process request"
        );
      }

      setSuccess(
        "If an account exists, password reset instructions have been sent."
      );

      setCollegeName("");
      setEmail("");
    } catch (err) {
      setError(
        err.message || "Failed to process request"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h2 className="login-title">
          College Placement Portal
        </h2>

        <p className="login-subtitle">
          Reset your password
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>College Name</label>
            <input
              type="text"
              placeholder="PCCOE"
              value={collegeName}
              onChange={(e) =>
                setCollegeName(e.target.value)
              }
              required
            />
          </div>

          <div className="form-group">
            <label>College Email</label>
            <input
              type="email"
              placeholder="john@college.edu"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
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
              ? "Processing..."
              : "Reset Password"}
          </button>
        </form>

        <div className="auth-links">
          <Link to="/login">
            Back to Login
          </Link>
        </div>

        <p className="login-footer">
          Managed by your College Placement Cell
        </p>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;