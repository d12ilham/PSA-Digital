import Image from "next/image";
import type { ReactNode } from "react";
import chartStyles from "./FederalStateProfileCharts.module.css";

// Vector artwork extracted from the approved report, also used by National.
export function DocumentGenderGraphic({ panel = false }: { panel?: boolean }) {
  return <Image data-document-gender="" src="/images/reports/federal-state/industry-profile/gender-document.svg" alt="" width={117} height={145} className={panel ? "mx-auto h-[180px] w-[144px] max-w-full shrink-0 object-contain" : "h-16 w-16 shrink-0 object-contain"} />;
}

export function GenderChartHeading({ children }: { children: ReactNode }) {
  return <div className="flex min-h-[84px] flex-wrap items-center gap-3"><DocumentGenderGraphic /><h3 className="min-w-0 flex-1 basis-[180px] text-lg font-bold leading-7">{children}</h3></div>;
}

export function GenderPayGapCard({ value, source, className = "", inset = false }: { value: string; source: string; className?: string; inset?: boolean }) {
  return <div data-gender-pay-gap="" className={`flex min-w-0 flex-col rounded-md p-4 text-black sm:p-5 ${inset ? "border border-[#E8E3DF] bg-white" : chartStyles.standard} ${className}`}>
    <div className="flex flex-wrap items-center gap-4 pb-4">
      <DocumentGenderGraphic />
      <div className="min-w-0 flex-1 basis-[100px]"><strong className="block text-3xl font-bold text-[#754D32]">{value}</strong><p className="mt-1 text-base font-semibold leading-6">Gender Pay Gap</p></div>
    </div>
    <p className="mt-auto border-t border-[#DECFC5] pt-3 text-xs leading-5">{source}</p>
  </div>;
}
