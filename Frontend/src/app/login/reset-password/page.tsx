"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { api } from "@/lib/api";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!token) {
      setError("Invalid reset token or link has expired.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setSubmitting(true);

    try {
      await api.post("/auth/reset-password", { token, password });
      setSuccess(true);
    } catch (err: any) {
      setError(
        err.message || "Failed to reset password. The link may have expired.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (!token) {
    return (
      <div className="space-y-6">
        <div className="border border-red-200 bg-red-50/50 p-4 text-xs text-red-600 font-mono leading-relaxed">
          * ERROR: INVALID OR MISSING PASSWORD RESET TOKEN.
        </div>
        <p className="text-xs text-muted font-sans leading-relaxed">
          The link you followed is incorrect or has expired. Please request a
          new password reset link.
        </p>
        <div className="pt-2">
          <Link
            href="/login/forgot-password"
            className="block w-full text-center bg-primary py-2.5 font-mono text-xs uppercase text-white transition-all hover:bg-active focus:outline-none"
          >
            Request New Link
          </Link>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="space-y-6">
        <div className="border border-green-200 bg-green-50/50 p-4 text-xs text-green-700 font-mono leading-relaxed">
          * SUCCESS: YOUR PASSWORD HAS BEEN SUCCESSFULLY RESET.
        </div>
        <p className="text-xs text-muted font-sans leading-relaxed">
          You can now sign in with your new administrator credentials.
        </p>
        <div className="pt-2">
          <Link
            href="/login"
            className="block w-full text-center bg-primary py-2.5 font-mono text-xs uppercase text-white transition-all hover:bg-active focus:outline-none"
          >
            Go to Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <p className="text-xs text-muted font-sans leading-relaxed mb-4">
        Enter a new secure password for your administrator account. Password
        must be at least 8 characters.
      </p>

      {error && (
        <div className="border border-red-200 bg-red-50/50 p-3 text-xs text-red-600 font-mono">
          * ERROR: {error.toUpperCase()}
        </div>
      )}

      <div className="space-y-1">
        <label className="block font-mono text-xs uppercase text-muted">
          New Password
        </label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          className="w-full border border-border bg-[#fdfdfc] px-3 py-2 text-sm text-primary focus:border-primary focus:outline-none placeholder:text-muted/60"
        />
      </div>

      <div className="space-y-1">
        <label className="block font-mono text-xs uppercase text-muted">
          Confirm New Password
        </label>
        <input
          type="password"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="••••••••"
          className="w-full border border-border bg-[#fdfdfc] px-3 py-2 text-sm text-primary focus:border-primary focus:outline-none placeholder:text-muted/60"
        />
      </div>

      <div className="pt-2 flex flex-col gap-3">
        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-primary py-2.5 font-mono text-xs uppercase text-white transition-all hover:bg-active focus:outline-none disabled:opacity-50"
        >
          {submitting ? "Resetting..." : "Reset Password"}
        </button>
        <Link
          href="/login"
          className="text-center font-mono text-xs uppercase text-muted hover:text-primary transition-colors underline underline-offset-2 py-1"
        >
          Cancel and return
        </Link>
      </div>
    </form>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      {/* Container Card */}
      <div className="w-full max-w-md border border-border bg-card p-8 shadow-sm">
        {/* Header Logo */}
        <div className="mb-8 flex flex-col items-start">
          <div className="flex items-center gap-2 mb-2">
            <span className="flex h-7 w-7 items-center justify-center border border-primary bg-sidebar text-xs font-bold font-mono">
              PSA
            </span>
            <span className="font-sans text-lg font-bold text-primary">
              Workforce Insights
            </span>
          </div>
          <span className="font-mono text-xs uppercase text-muted">
            ADMIN SYSTEM / RESET PASSWORD
          </span>
        </div>

        {/* Form Body inside Suspense Boundary */}
        <Suspense
          fallback={
            <div className="text-center py-6 font-mono text-xs uppercase text-muted">
              Loading recovery details...
            </div>
          }
        >
          <ResetPasswordForm />
        </Suspense>

        <div className="mt-8 border-t border-border/60 pt-4 flex justify-between items-center text-xs font-mono text-muted">
          <span>SECURE SYSTEM</span>
          <span>© 2026 PSA DIGITAL</span>
        </div>
      </div>
    </div>
  );
}
