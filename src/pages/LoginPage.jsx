import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { API_BASE_URL } from "../config";
import { GraduationCap } from "lucide-react";

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
        `${API_BASE_URL}/api/v1/auth/login`,
        {
          method: "POST",
          credentials: "include",
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

      const role = data.user?.role?.toUpperCase();
      if (!["STUDENT", "ADMIN"].includes(role)) {
        throw new Error("Your account does not have a recognised portal role.");
      }

      sessionStorage.setItem(
        "accessToken",
        data.accessToken
      );

      sessionStorage.setItem("role", role || "");

      if (data.user?.username) {
        sessionStorage.setItem(
          "username",
          data.user.username
        );
      }

      if (data.user?.email) {
        sessionStorage.setItem(
          "email",
          data.user.email
        );
      }

      if (role === "STUDENT") {
        navigate("/student/dashboard");
      } else if (role === "ADMIN") {
        navigate("/admin/dashboard");
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

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600 dark:bg-indigo-950"><GraduationCap className="h-7 w-7" aria-hidden="true" /></div>

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
              <Label htmlFor="login-identifier">
                Username / Email
              </Label>

              <Input
                id="login-identifier"
                type="text"
                placeholder="Enter username or email"
                autoComplete="username"
                required
                value={username}
                onChange={(e) =>
                  setUsername(
                    e.target.value
                  )
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="login-password">
                Password
              </Label>

              <Input
                id="login-password"
                type="password"
                placeholder="Enter password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
              />
            </div>

            {error && (
              <p role="alert" className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-destructive dark:border-rose-950 dark:bg-rose-950/30">
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
                Forgot password?
              </Link>

              <Link
                to="/signup"
                className="text-muted-foreground hover:text-foreground"
              >
                Create account
              </Link>

            </div>

          </form>

          <p className="text-center text-xs text-muted-foreground mt-6">
            Students sign in with college-issued or approved credentials.
          </p>

        </CardContent>

      </Card>

    </div>
  );
};

export default LoginPage;
