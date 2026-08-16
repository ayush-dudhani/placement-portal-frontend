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

      const role = data.role?.toUpperCase();
      sessionStorage.setItem("role", role || "");

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

      if (role === "STUDENT") {
        navigate("/student/dashboard");
      } else if (role === "ADMIN") {
        navigate("/admin/dashboard");
      } else {
        throw new Error("Your account does not have a recognised portal role.");
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
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-violet-100 px-4 py-10 dark:from-slate-950 dark:via-slate-950 dark:to-indigo-950">
      <div className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-indigo-300/30 blur-3xl" />

      <Card className="relative w-full max-w-md border-white/80 bg-white/90 shadow-2xl shadow-indigo-950/15 backdrop-blur dark:border-slate-700 dark:bg-slate-900/90">

        <CardHeader className="space-y-2 text-center">

          <div className="flex justify-center">
            <img
              src="/college-logo.png"
              alt="College Logo"
              className="h-16 w-16 object-contain"
            />
          </div>

          <CardTitle className="text-2xl font-bold tracking-tight">
            Welcome back
          </CardTitle>

          <p className="text-sm text-muted-foreground">
            Sign in to continue your career journey
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
              className="h-11 w-full bg-indigo-600 text-white hover:bg-indigo-700"
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
