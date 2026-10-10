"use client";

import Link from "next/link";
import { Cpu, Download, Globe2, TrendingUp } from "lucide-react";
import ReportHeader from "@/components/layout/ReportHeader";
import ReportFooter from "@/components/layout/ReportFooter";
import ReportNavButtons from "@/components/layout/ReportNavButtons";

interface Report {
  id: string;
  title: string;
  slug: string;
  status: string;
  pdfFileUrl?: string;
  contactUrl?: string;
  year?: { label: string };
}

const enquiries = [
  {
    label: "LINE OF ENQUIRY 1",
    title: "Inclusion and participation of First Nations people, women and other genders in the Public Safety and Government workforces.",
    Icon: Globe2,
  },
  {
    label: "LINE OF ENQUIRY 2",
    title: "The use of AI and digital transformation and the impact of these technologies on the Public Safety and Government Workforces.",
    Icon: Cpu,
  },
  {
    label: "CONTINUING",
    title: "Additionally, the 2027 Workforce Insights Reports will focus on any other emerging priorities impacting Federal and State/Territory Government industry-sectors including building capability within the public service to be future ready.",
    Icon: TrendingUp,
  },
];

const heroIcons = [
  { x: 30, y: 156, r: 31 },
  { x: 125, y: 88, r: 51 },
  { x: 247, y: 73, r: 31 },
  { x: 397, y: 50, r: 51 },
  { x: 480, y: 105, r: 31 },
  { x: 350, y: 158, r: 31 },
  { x: 245, y: 189, r: 51 },
  { x: 140, y: 209, r: 31 },
];

function LookingForwardArtwork() {
  const image = "/images/hero-graphic-looking-forward.png";

  return (
    <svg viewBox="0 0 512 240" role="img" aria-label="Looking forward priorities" className="fstg-forward-artwork mx-auto h-auto w-full max-w-[512px] transition-transform duration-500 hover:scale-[1.03] motion-reduce:transform-none">
      <defs>
        <mask id="fstg-forward-connectors-mask">
          <rect width="512" height="240" fill="white" />
          {heroIcons.map(({ x, y, r }) => <circle key={`${x}-${y}`} cx={x} cy={y} r={r} fill="black" />)}
        </mask>
        {heroIcons.map(({ x, y, r }, index) => (
          <clipPath id={`fstg-forward-icon-${index}`} key={`${x}-${y}`}>
            <circle cx={x} cy={y} r={r} />
          </clipPath>
        ))}
      </defs>
      <image href={image} width="512" height="240" mask="url(#fstg-forward-connectors-mask)" className="fstg-forward-connectors" />
      {heroIcons.map(({ x, y }, index) => (
        <g key={`${x}-${y}`} clipPath={`url(#fstg-forward-icon-${index})`} className="fstg-forward-icon" style={{ animationDelay: `${0.2 + index * 0.18}s`, transformOrigin: `${x}px ${y}px` }}>
          <image href={image} width="512" height="240" />
        </g>
      ))}
    </svg>
  );
}

export default function FederalStateLookingForwardView({ slug, report }: { slug: string; report: Report }) {
  return (
    <div className="flex min-h-screen flex-col bg-[#FAFAF0] font-sans text-[#252D02] antialiased">
      <ReportHeader slug={slug} report={report} currentPage="looking_forward" />

      <main className="mx-auto w-full max-w-[1440px] flex-1 space-y-6 px-4 py-5 sm:px-6 lg:px-8">
        <ReportNavButtons
          slug={slug}
          currentPage="looking_forward"
          pagesOrder={[{ key: "looking_forward", label: "Looking Forward" }]}
          prev={{ label: "Federal Government Initiatives", href: `/reports/${slug}/federal_initiatives` }}
          prevPrefix="Back to"
        />

        <section className="grid min-h-[295px] items-center gap-8 rounded-md border border-[#ECECE5] bg-white px-6 py-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(320px,0.7fr)] lg:px-8">
          <div className="animate-slide-up motion-reduce:animate-none">
            <p className="text-xs font-medium uppercase text-[#54710F]">Federal Government Initiatives 2026 · Looking Forward</p>
            <h1 className="mt-6 text-[34px] font-bold leading-tight text-[#006C30] sm:text-[40px]">2027 and Beyond</h1>
            <p className="mt-5 max-w-[760px] text-sm leading-6">
              Public Skills Australia has built on the 2024 Workforce Plans and the 2025 Government Workforce Insights Reports to deliver the 2026 Federal and State/Territory Government Workforce Insights Report. These reports continue to be the strategic centrepiece guiding annual Business Plans for Public Skills Australia, alongside Ministerial, industry-sector and other priorities (e.g. Royal Commissions and Inquiries).
            </p>
          </div>
          <LookingForwardArtwork />
        </section>

        <section aria-label="2027 lines of enquiry" className="grid gap-6 md:grid-cols-3">
          {enquiries.map(({ label, title, Icon }, index) => (
            <div key={label} className="animate-card-entrance motion-reduce:animate-none" style={{ animationDelay: `${0.12 + index * 0.14}s` }}>
              <article className="group min-h-[305px] overflow-hidden rounded-md border border-[#ECECE5] bg-white transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-[#90AF57] hover:shadow-md motion-reduce:hover:translate-y-0">
                <div className={`h-2 ${index === 1 ? "bg-[#9EAD59]" : "bg-[#006C30]"}`} />
                <div className="px-6 py-6">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#E9EDDF] text-[#006C30] transition-[background-color,transform] duration-300 group-hover:scale-110 group-hover:bg-[#DDE8C8] motion-reduce:transform-none"><Icon aria-hidden="true" className="h-7 w-7 stroke-[1.5]" /></div>
                  <p className="mt-6 text-xs font-medium text-[#54710F]">{label}</p>
                  <h2 className="mt-4 text-lg font-semibold leading-6">{title}</h2>
                </div>
              </article>
            </div>
          ))}
        </section>

        <p className="animate-slide-up rounded-md border-2 border-[#8AC900] bg-[#EFF4D6] px-6 py-5 text-sm leading-6 transition-[background-color,box-shadow] duration-300 hover:bg-[#E9F1CE] hover:shadow-sm motion-reduce:animate-none" style={{ animationDelay: "0.5s" }}>
          Beyond these focused lines of enquiry, the 2027 Workforce Insights Reports will seek to examine the impact of the Drivers of Change identified in this year&apos;s reports on our industry-sector workforces.
        </p>

        <div className="animate-slide-up flex flex-wrap items-center justify-center gap-3 pb-4 motion-reduce:animate-none" style={{ animationDelay: "0.65s" }}>
          <Link href={`/reports/${slug}/downloads`} className="inline-flex min-h-10 items-center gap-2 rounded-full bg-[#006C30] px-5 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#005426]">
            Download 2026 PDF <Download aria-hidden="true" className="h-4 w-4" />
          </Link>
          <Link href={`/reports/${slug}/executive_summary`} className="inline-flex min-h-10 items-center rounded-full border border-[#B2DB79] px-5 py-2 text-xs font-semibold text-[#54710F] transition-colors hover:bg-white">
            Revisit the Executive Summary
          </Link>
          <a href={report.contactUrl || "https://www.publicskillsaustralia.org.au/contact"} className="inline-flex min-h-10 items-center rounded-full border border-[#ECECE5] px-5 py-2 text-xs font-semibold transition-colors hover:bg-white">
            Contact Public Skills Australia
          </a>
        </div>
      </main>

      <ReportFooter contactUrl={report.contactUrl} />
    </div>
  );
}
