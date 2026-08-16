import { useState } from "react";
import { Link } from "react-router-dom";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";
import { API_BASE_URL } from "../config";

export default function SignupPage() {
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
        `${API_BASE_URL}/auth/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
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
        const data =
          await response
            .json()
            .catch(() => null);

        throw new Error(
          data?.message ||
            "Registration failed"
        );
      }

      setSuccess(
        "Registration successful. Please login with your credentials."
      );

      setCollegeName("");
      setFullName("");
      setEmail("");
      setPassword("");
    } catch (err) {
      setError(
        err.message ||
          "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-violet-100 px-4 py-10 dark:from-slate-950 dark:via-slate-950 dark:to-indigo-950">
      <div className="absolute -right-24 bottom-16 h-80 w-80 rounded-full bg-violet-300/30 blur-3xl" />

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
            Create Account
          </CardTitle>

          <p className="text-sm text-muted-foreground">
            Create your student placement portal account
          </p>

        </CardHeader>

        <CardContent>

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >

            <div className="space-y-2">
              <Label>
                College Name
              </Label>

              <Input
                type="text"
                placeholder="PCCOE"
                value={collegeName}
                onChange={(e) =>
                  setCollegeName(
                    e.target.value
                  )
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label>
                Full Name
              </Label>

              <Input
                type="text"
                placeholder="John Doe"
                value={fullName}
                onChange={(e) =>
                  setFullName(
                    e.target.value
                  )
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label>
                College Email
              </Label>

              <Input
                type="email"
                placeholder="john@college.edu"
                value={email}
                onChange={(e) =>
                  setEmail(
                    e.target.value
                  )
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label>
                Password
              </Label>

              <Input
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
                required
              />
            </div>

            {error && (
              <div className="text-sm text-destructive">
                {error}
              </div>
            )}

            {success && (
              <div className="text-sm text-green-600">
                {success}
              </div>
            )}

            <Button
              type="submit"
              className="h-11 w-full bg-indigo-600 text-white hover:bg-indigo-700"
              disabled={loading}
            >
              {loading
                ? "Creating Account..."
                : "Create Account"}
            </Button>

          </form>

          <div className="mt-6 text-center">
            <Link
              to="/login"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Already have an account? Login
            </Link>
          </div>

          <p className="text-center text-xs text-muted-foreground mt-6">
            Managed by the College Placement Cell
          </p>

        </CardContent>

      </Card>

    </div>
  );
}
