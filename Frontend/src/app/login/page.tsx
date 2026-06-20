'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      await login(email, password);
    } catch (err: any) {
      setError(err.message || 'Invalid email or password.');
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
            <span className="flex h-7 w-7 items-center justify-center border border-primary bg-sidebar text-[10px] font-bold tracking-wider font-mono">
              PSA
            </span>
            <span className="font-sans text-lg font-bold tracking-tight text-primary">
              Workforce Insights
            </span>
          </div>
          <span className="font-mono text-[9px] uppercase tracking-widest text-muted">
            ADMIN SYSTEM / ACCESS GATEWAY
          </span>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="border border-red-200 bg-red-50/50 p-3 text-xs text-red-600 font-mono">
              * ERROR: {error.toUpperCase()}
            </div>
          )}

          <div className="space-y-1">
            <label className="block font-mono text-[9px] uppercase tracking-wider text-muted">
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

          <div className="space-y-1">
            <label className="block font-mono text-[9px] uppercase tracking-wider text-muted">
              Password
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

          <div className="pt-2">
            <button
              type="submit"
              disabled={submitting}
              className="w-full border border-primary bg-primary py-2.5 font-mono text-xs uppercase tracking-widest text-white transition-all hover:bg-active focus:outline-none disabled:opacity-50"
            >
              {submitting ? 'Authenticating...' : 'Sign In'}
            </button>
          </div>
        </form>

        <div className="mt-8 border-t border-border/60 pt-4 flex justify-between items-center text-[9px] font-mono text-muted">
          <span>SECURE SYSTEM</span>
          <span>© 2026 PSA DIGITAL</span>
        </div>
      </div>
    </div>
  );
}
