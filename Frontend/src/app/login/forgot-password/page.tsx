"use client";

import React, { useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setSubmitting(true);

    try {
      await api.post("/auth/forgot-password", { email });
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

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
            ADMIN SYSTEM / PASSWORD RESET
          </span>
        </div>

        {/* Form Body */}
        {success ? (
          <div className="space-y-6">
            <div className="border border-green-200 bg-green-50/50 p-4 text-xs text-green-700 font-mono leading-relaxed">
              * SUCCESS: IF THE EMAIL "{email.toUpperCase()}" MATCHES AN ACTIVE
              ACCOUNT, PASSWORD RESET INSTRUCTIONS HAVE BEEN SENT.
            </div>
            <p className="text-xs text-muted font-sans leading-relaxed">
              Please check your spam or junk folder if the email does not arrive
              in a few minutes.
            </p>
            <div className="pt-2">
              <Link
                href="/login"
                className="block w-full text-center bg-primary py-2.5 font-mono text-xs uppercase text-white transition-all hover:bg-active focus:outline-none"
              >
                Return to Sign In
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <p className="text-xs text-muted font-sans leading-relaxed mb-4">
              Enter your registered email address below, and we will send you a
              secure link to reset your administrator credentials.
            </p>

            {error && (
              <div className="border border-red-200 bg-red-50/50 p-3 text-xs text-red-600 font-mono">
                * ERROR: {error.toUpperCase()}
              </div>
            )}

            <div className="space-y-1">
              <label className="block font-mono text-xs uppercase text-muted">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. admin@psa.gov.au"
                className="w-full border border-border bg-[#fdfdfc] px-3 py-2 text-sm text-primary focus:border-primary focus:outline-none placeholder:text-muted/60"
              />
            </div>

            <div className="pt-2 flex flex-col gap-3">
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-primary py-2.5 font-mono text-xs uppercase text-white transition-all hover:bg-active focus:outline-none disabled:opacity-50"
              >
                {submitting ? "Processing..." : "Send Reset Link"}
              </button>
              <Link
                href="/login"
                className="text-center font-mono text-xs uppercase text-muted hover:text-primary transition-colors underline underline-offset-2 py-1"
              >
                Cancel and return
              </Link>
            </div>
          </form>
        )}

        <div className="mt-8 border-t border-border/60 pt-4 flex justify-between items-center text-xs font-mono text-muted">
          <span>SECURE SYSTEM</span>
          <span>© 2026 PSA DIGITAL</span>
        </div>
      </div>
    </div>
  );
}
