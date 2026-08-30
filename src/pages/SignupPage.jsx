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
import { GraduationCap, ShieldCheck } from "lucide-react";

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
        `${API_BASE_URL}/api/v1/auth/register`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            institutionCode: collegeName,
            username: email,
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

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600 dark:bg-indigo-950"><GraduationCap className="h-7 w-7" aria-hidden="true" /></div>

          <CardTitle className="text-2xl font-bold tracking-tight">
            Create your student account
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
              <Label htmlFor="signup-college">
                Institution Code
              </Label>

              <Input
                id="signup-college"
                type="text"
                autoComplete="organization"
                placeholder="DEFAULT"
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
              <Label htmlFor="signup-name">
                Full Name
              </Label>

              <Input
                id="signup-name"
                type="text"
                autoComplete="name"
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
              <Label htmlFor="signup-email">
                College Email
              </Label>

              <Input
                id="signup-email"
                type="email"
                autoComplete="email"
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
              <Label htmlFor="signup-password">
                Password
              </Label>

              <Input
                id="signup-password"
                type="password"
                autoComplete="new-password"
                minLength={8}
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
              <div role="alert" className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-destructive dark:border-rose-950 dark:bg-rose-950/30">
                {error}
              </div>
            )}

            {success && (
              <div role="status" className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700 dark:border-emerald-950 dark:bg-emerald-950/30 dark:text-emerald-300">
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
                : "Create account"}
            </Button>

          </form>

          <div className="mt-6 text-center">
            <Link
              to="/login"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Already registered? Sign in
            </Link>
          </div>

          <p className="mt-6 flex items-center justify-center gap-1.5 text-center text-xs text-muted-foreground"><ShieldCheck className="h-3.5 w-3.5" />Student access may require placement-cell verification.</p>

        </CardContent>

      </Card>

    </div>
  );
}
