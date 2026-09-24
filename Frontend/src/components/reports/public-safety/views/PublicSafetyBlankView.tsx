"use client";

import { FileText } from "lucide-react";
import { PUBLIC_SAFETY_PAGE_INVENTORY } from "../data/pageInventory";
import PublicSafetyPageShell, { type PublicSafetyReport } from "./PublicSafetyPageShell";

export default function PublicSafetyBlankView({ slug, report, pageType }: { slug: string; report: PublicSafetyReport; pageType?: string }) {
  const key = pageType || "drivers_of_change";
  const index = PUBLIC_SAFETY_PAGE_INVENTORY.findIndex((page) => page.key === key);
  const page = PUBLIC_SAFETY_PAGE_INVENTORY[index] || { key, title: key.replaceAll("_", " "), group: "Public Safety" };
  const previous = index > 0 ? PUBLIC_SAFETY_PAGE_INVENTORY[index - 1] : undefined;
  const next = index >= 0 ? PUBLIC_SAFETY_PAGE_INVENTORY[index + 1] : undefined;
  const hrefFor = (targetKey: string) => targetKey === "report_landing" ? `/reports/${slug}` : `/reports/${slug}/${targetKey}`;

  return (
    <PublicSafetyPageShell
      slug={slug}
      report={report}
      currentPage={key}
      navigation={{
        prev: previous ? { label: previous.title, href: hrefFor(previous.key) } : undefined,
        next: next ? { label: next.title, href: hrefFor(next.key) } : undefined,
      }}
    >
      <section className="min-h-[520px] rounded-2xl border border-[#E9EAEB] bg-white p-8 sm:p-12">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#F0F3E5] text-[#598303]">
          <FileText className="h-7 w-7" />
        </div>
        <p className="mt-8 text-xs font-bold uppercase text-[#598303]">{page.group}</p>
        <h1 className="mt-3 max-w-4xl text-4xl font-bold leading-tight text-[#046D2A]">{page.title}</h1>
        <div className="mt-8 border-t border-[#E9EAEB] pt-8">
          <p className="text-sm font-medium text-[#535862]">Blank page structure ready for Figma implementation.</p>
        </div>
      </section>
    </PublicSafetyPageShell>
  );
}
