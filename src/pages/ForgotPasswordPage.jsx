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
        `${API_BASE_URL}/auth/forgot-password`,
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            collegeName,
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
            Forgot Password
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
              className="w-full"
              disabled={loading}
            >
              {loading
                ? "Processing..."
                : "Reset Password"}
            </Button>

          </form>

          <div className="mt-6 text-center">
            <Link
              to="/login"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Back to Login
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