"use client";

import { useId, type ReactNode } from "react";
import Image from "next/image";

export default function IndustryInsightCard({ children, attribution, headingAs: Heading = "h3", className = "" }: {
  children: ReactNode;
  attribution?: string;
  headingAs?: "h2" | "h3";
  className?: string;
}) {
  const headingId = useId();
  return (
    <aside data-industry-insight="" aria-labelledby={headingId} className={`min-w-0 rounded-2xl border border-[#E8DED6] border-l-[12px] border-l-[#754C2D] bg-[#F8EEE8] p-5 text-[#252b37] motion-reduce:animate-none sm:p-6 ${className}`}>
      <div className="flex flex-wrap items-center gap-3">
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white" aria-hidden="true">
          <Image data-industry-insight-icon="" src="/images/reports/federal-state/industry-insight.svg" alt="" width={40} height={40} className="h-8 w-8 object-contain" />
        </span>
        <Heading id={headingId} className="min-w-0 flex-1 basis-[150px] text-xl font-bold leading-7">Industry Insight</Heading>
      </div>
      <div data-insight-body="" className="mt-4 space-y-4 text-sm leading-6 text-[#42463B]">{children}</div>
      {attribution && <p className="mt-5 border-t border-[#DECFC5] pt-3 text-xs font-medium uppercase leading-5 text-[#754C2D]">{attribution}</p>}
    </aside>
  );
}
