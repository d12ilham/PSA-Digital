"use client";

import Image from "next/image";
import Link from "next/link";
import { BrainCircuit, Download, Languages, MapPin, UsersRound } from "lucide-react";
import ReportFooter from "@/components/layout/ReportFooter";
import ReportHeader from "@/components/layout/ReportHeader";
import ReportNavButtons from "@/components/layout/ReportNavButtons";

type CorrectionalServicesReport = {
  pdfFileUrl?: string;
  contactUrl?: string;
  year?: { label: string };
  industry?: { slug?: string; name?: string };
};

const broaderPriorities = [
  {
    title: "Inclusion and participation of First Nations people, women and other genders in the Public Safety and Government workforces.",
    Icon: UsersRound,
  },
  {
    title: "The use of AI and digital transformation and the impact of these technologies on the Public Safety and Government workforces.",
    Icon: BrainCircuit,
  },
];

const emergingPriorities = [
  {
    title: "Workforce training, recruitment and retention in rural regional and remote areas.",
    Icon: MapPin,
  },
  {
    title: "Language, Literacy, Numeracy and Digital (LLND) skills support in training the Correctional Services workforce.",
    Icon: Languages,
  },
];

export default function CorrectionalServicesLookingForwardView({ slug, report }: { slug: string; report: CorrectionalServicesReport }) {
  return (
    <div className="flex min-h-screen flex-col bg-[#FAFAF0] font-sans text-[#252D02] antialiased selection:bg-[#B2DB79]">
      <ReportHeader slug={slug} report={report} currentPage="looking_forward" />

      <main className="mx-auto w-full max-w-[1440px] flex-1 space-y-6 px-4 py-6 sm:px-6 lg:px-8">
        <ReportNavButtons
          slug={slug}
          currentPage="looking_forward"
          pagesOrder={[{ key: "looking_forward", label: "Looking Forward" }]}
          prev={{ label: "Commonwealth Government Initiatives", href: `/reports/${slug}/federal_initiatives` }}
        />

        <section className="grid min-h-[285px] items-center gap-8 rounded-md border border-[#ECECE5] bg-white px-6 py-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(320px,0.7fr)] lg:px-8">
          <div className="animate-slide-up motion-reduce:animate-none">
            <p className="text-xs font-medium uppercase text-[#54710F]">Looking Forward</p>
            <h1 className="mt-5 text-[34px] font-bold leading-tight text-[#006C30] sm:text-[40px]">2027 and Beyond</h1>
            <p className="mt-5 max-w-[780px] text-sm leading-6">
              Public Skills Australia has built on the 2024 Workforce Plans and the 2025 Correctional Services Workforce Insights Report in the development and delivery of the 2026 Correctional Services Insights Report. These reports continue to be the strategic centrepiece guiding annual Business Plans for Public Skills Australia, alongside Ministerial, industry-sector and other priorities (e.g. Royal Commissions and Inquiries).
            </p>
          </div>
          <Image
            src="/images/hero-graphic-looking-forward.png"
            width={512}
            height={240}
            alt=""
            className="mx-auto h-auto w-full max-w-[512px] animate-zoom-in transition-transform duration-300 hover:scale-[1.03] motion-reduce:animate-none motion-reduce:hover:transform-none"
          />
        </section>

        <p className="animate-slide-up text-sm leading-6 motion-reduce:animate-none">
          The 2027 Workforce Insights Reports will firstly focus on the broader priorities detailed below and may be delivered throughout 2026-27:
        </p>

        <section aria-label="Broader priorities" className="grid gap-6 md:grid-cols-2">
          {broaderPriorities.map(({ title, Icon }, index) => (
            <article key={title} className="group min-h-[208px] overflow-hidden rounded-md border border-[#ECECE5] bg-white animate-card-entrance transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-[#90AF57] hover:shadow-md motion-reduce:animate-none motion-reduce:hover:translate-y-0" style={{ animationDelay: `${0.12 + index * 0.12}s` }}>
              <div className="h-2 bg-[#006C30]" />
              <div className="p-6">
                <span className="grid size-14 place-items-center rounded-full bg-[#E9EDDF] text-[#006C30] transition-transform duration-300 group-hover:scale-110 motion-reduce:transform-none">
                  <Icon className="size-7" strokeWidth={1.5} aria-hidden="true" />
                </span>
                <p className="mt-5 text-xs font-medium text-[#54710F]">Broader priority</p>
                <h2 className="mt-2 text-lg font-semibold leading-6">{title}</h2>
              </div>
            </article>
          ))}
        </section>

        <p className="animate-slide-up text-sm leading-6 motion-reduce:animate-none">
          Additionally, the 2027 Workforce Insights Reports will focus on any other emerging priorities impacting the Correctional Services industry-sector, including:
        </p>

        <section aria-label="Emerging priorities" className="grid gap-6 md:grid-cols-2">
          {emergingPriorities.map(({ title, Icon }, index) => (
            <article key={title} className="group min-h-[208px] overflow-hidden rounded-md border border-[#ECECE5] bg-white animate-card-entrance transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-[#9DA7D0] hover:shadow-md motion-reduce:animate-none motion-reduce:hover:translate-y-0" style={{ animationDelay: `${0.36 + index * 0.12}s` }}>
              <div className={`h-2 ${index === 0 ? "bg-[#9DA7D0]" : "bg-[#424996]"}`} />
              <div className="p-6">
                <span className="grid size-14 place-items-center rounded-full bg-[#ECEEF8] text-[#424996] transition-transform duration-300 group-hover:scale-110 motion-reduce:transform-none">
                  <Icon className="size-7" strokeWidth={1.5} aria-hidden="true" />
                </span>
                <p className="mt-5 text-xs font-medium text-[#424996]">Emerging priority</p>
                <h2 className="mt-2 text-lg font-semibold leading-6">{title}</h2>
              </div>
            </article>
          ))}
        </section>

        <p className="animate-slide-up rounded-md border border-[#8AC900] bg-[#EFF4D6] px-6 py-5 text-sm leading-6 transition-colors duration-300 hover:bg-[#E9F1CE] motion-reduce:animate-none">
          Beyond these focused lines of inquiry, the 2027 Workforce Insights Reports will seek to examine the impact of the Drivers of Change identified in this year&apos;s reports on our industry-sector workforces.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pb-4">
          <Link href={`/reports/${slug}/downloads`} className="inline-flex min-h-10 items-center gap-2 rounded-full bg-[#006C30] px-5 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#005426]">
            Download 2026 PDF <Download className="size-4" aria-hidden="true" />
          </Link>
          <Link href={`/reports/${slug}/executive_summary`} className="inline-flex min-h-10 items-center rounded-full border border-[#B2DB79] px-5 py-2 text-xs font-semibold text-[#54710F] transition-colors hover:bg-white">
            Revisit the Executive Summary
          </Link>
          <a href={report.contactUrl || "https://publicskillsaustralia.org.au/contact"} className="inline-flex min-h-10 items-center rounded-full border border-[#ECECE5] px-5 py-2 text-xs font-semibold transition-colors hover:bg-white">
            Contact Public Skills Australia
          </a>
        </div>
      </main>

      <ReportFooter contactUrl={report.contactUrl} reportName="Correctional Services Workforce Insights Report" />
    </div>
  );
}
