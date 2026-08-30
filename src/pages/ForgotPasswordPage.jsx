import { useState } from "react";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../config";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { KeyRound } from "lucide-react";

export default function ForgotPasswordPage() {
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
        `${API_BASE_URL}/api/v1/auth/forgot-password`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            institutionCode: collegeName,
            email,
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
            "Failed to process request"
        );
      }

      setSuccess(
        "If an account exists, password reset instructions have been sent."
      );

      setCollegeName("");
      setEmail("");
    } catch (err) {
      setError(
        err.message ||
          "Failed to process request"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-violet-100 px-4 py-10 dark:from-slate-950 dark:via-slate-950 dark:to-indigo-950">
      <div className="absolute -left-24 bottom-16 h-72 w-72 rounded-full bg-indigo-300/30 blur-3xl" />

      <Card className="relative w-full max-w-md border-white/80 bg-white/90 shadow-2xl shadow-indigo-950/15 backdrop-blur dark:border-slate-700 dark:bg-slate-900/90">

        <CardHeader className="space-y-2 text-center">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600 dark:bg-indigo-950"><KeyRound className="h-7 w-7" aria-hidden="true" /></div>

          <CardTitle className="text-2xl font-bold tracking-tight">
            Reset your password
          </CardTitle>

          <p className="text-sm text-muted-foreground">
            Enter your college details to
            reset your password
          </p>

        </CardHeader>

        <CardContent>

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >

            <div className="space-y-2">
              <Label htmlFor="reset-college">
                Institution Code
              </Label>

              <Input
                id="reset-college"
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
              <Label htmlFor="reset-email">
                College Email
              </Label>

              <Input
                id="reset-email"
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
                ? "Processing..."
                : "Send reset instructions"}
            </Button>

          </form>

          <div className="mt-6 text-center">
            <Link
              to="/login"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Back to sign in
            </Link>
          </div>

          <p className="text-center text-xs text-muted-foreground mt-6">
            Managed by the College Placement
            Cell
          </p>

        </CardContent>

      </Card>

    </div>
  );
}
