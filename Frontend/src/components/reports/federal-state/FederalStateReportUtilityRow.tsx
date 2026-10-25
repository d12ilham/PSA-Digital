"use client";

import type { ReactNode } from "react";

export default function FederalStateReportUtilityRow({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div data-fstg-report-utility className="flex w-full flex-wrap items-center justify-between gap-3">
      <p className="min-w-0 flex-1 basis-[480px] text-[20px] font-bold leading-7 text-gray800">
        Federal and State/Territory Government Workforce Insights Report
      </p>
      <nav aria-label="Report page navigation" className="ml-auto max-w-full [&>div]:justify-end">
        {children}
      </nav>
    </div>
  );
}
