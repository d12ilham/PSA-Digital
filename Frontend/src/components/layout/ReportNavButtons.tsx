"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";

export interface NavTarget {
  label: string;
  href: string;
}

interface ReportNavButtonsProps {
  prev?: NavTarget;
  next?: NavTarget;
}

export default function ReportNavButtons({ prev, next }: ReportNavButtonsProps) {
  const router = useRouter();

  if (!prev && !next) return null;

  return (
    <div className="flex flex-wrap items-center gap-3">
      {prev && (
        <button
          onClick={() => router.push(prev.href)}
          className="border border-[#B2DB79] bg-[#FAFAF0] hover:bg-[#e1e4d2] text-notes font-semibold text-xs px-5 py-2.5 rounded-full flex items-center gap-2 transition-colors cursor-pointer"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to {prev.label}
        </button>
      )}
      {next && (
        <button
          onClick={() => router.push(next.href)}
          className="bg-[#8AC900] hover:bg-[#77A60D] text-gray800 font-bold text-xs px-5 py-2.5 rounded-full flex items-center gap-2 transition-colors cursor-pointer"
        >
          Next Section: {next.label} <ArrowRight className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}
