import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { API_BASE_URL } from "../config";

const LoginPage = () => {
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
      const response = await fetch(
        `${API_BASE_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
          }),
        }
      );

      if (!response.ok) {
        const data = await response.json().catch(() => null);

        throw new Error(
          data?.message || "Login failed"
        );
      }

      const data = await response.json();

      sessionStorage.setItem(
        "token",
        data.token
      );

      sessionStorage.setItem(
        "role",
        data.role
      );

      if (data.username) {
        sessionStorage.setItem(
          "username",
          data.username
        );
      }

      if (data.email) {
        sessionStorage.setItem(
          "email",
          data.email
        );
      }

      if (data.role === "STUDENT") {
        navigate("/student/dashboard");
      } else if (data.role === "ADMIN") {
        navigate("/admin/dashboard");
      } else {
        navigate("/login");
      }
    } catch (err) {
      setError(
        err.message || "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">

      <Card className="w-full max-w-md">

        <CardHeader className="space-y-2 text-center">

          <div className="flex justify-center">
            <img
              src="/college-logo.png"
              alt="College Logo"
              className="h-16 w-16 object-contain"
            />
          </div>

          <CardTitle className="text-2xl">
            Placement Portal
          </CardTitle>

          <p className="text-sm text-muted-foreground">
            Login using your college credentials
          </p>

        </CardHeader>

        <CardContent>

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >

            <div className="space-y-2">
              <Label>
                Username / Email
              </Label>

              <Input
                type="text"
                placeholder="Enter username or email"
                value={username}
                onChange={(e) =>
                  setUsername(
                    e.target.value
                  )
                }
              />
            </div>

            <div className="space-y-2">
              <Label>
                Password
              </Label>

              <Input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
              />
            </div>

            {error && (
              <p className="text-sm text-destructive">
                {error}
              </p>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading
                ? "Logging in..."
                : "Login"}
            </Button>

            <div className="flex justify-between text-sm">

              <Link
                to="/forgot-password"
                className="text-muted-foreground hover:text-foreground"
              >
                Forgot Password?
              </Link>

              <Link
                to="/signup"
                className="text-muted-foreground hover:text-foreground"
              >
                Create Account
              </Link>

            </div>

          </form>

          <p className="text-center text-xs text-muted-foreground mt-6">
            Managed by the College Placement Cell
          </p>

        </CardContent>

      </Card>

    </div>
  );
};

export default LoginPage;