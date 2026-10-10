"use client";

import React from "react";
import { ArrowRight, Binoculars, Download } from "lucide-react";
import { useRouter } from "next/navigation";
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
    label: "Broader priority 1",
    title:
      "Inclusion and participation of First Nations people, women and other genders in the Public Safety and Government workforces.",
  },
  {
    label: "Broader priority 2",
    title:
      "The use of AI and digital transformation and the impact of these technologies on the Public Safety and Government workforces.",
  },
];

const emergingPriorities = [
  "Workforce training, recruitment and retention in rural regional and remote areas.",
  "Language, Literacy, Numeracy and Digital (LLND) skills support in training the Correctional Services workforce.",
];

export default function CorrectionalServicesLookingForwardView({
  slug,
  report,
}: {
  slug: string;
  report: CorrectionalServicesReport;
}) {
  const router = useRouter();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-[#F7F8F0] text-[#1B240E] font-sans flex flex-col justify-between selection:bg-[#38BDF8]/30 antialiased">
      <ReportHeader slug={slug} report={report} currentPage="looking_forward" />

      <main className="max-w-360 mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-6 flex-1">
        <ReportNavButtons slug={slug} currentPage="looking_forward" />

        <section className="grid grid-cols-1 items-center gap-8 rounded-2xl border border-[#E9EAEB] bg-white p-6 lg:grid-cols-12">
          <div className="lg:col-span-8 space-y-4">
            <p className="animate-slide-up text-xs font-semibold uppercase leading-6 text-[#0B6DA8]">
              Federal Government Initiatives 2026 · Looking Forward
            </p>
            <h1 className="animate-slide-up text-3xl sm:text-4xl font-bold text-[#063B5D]">
              2027 and Beyond
            </h1>
            <div className="animate-slide-up-delay space-y-3">
              <p className="max-w-4xl text-sm leading-6 text-[#535862]">
                Public Skills Australia has built on the 2024 Workforce Plans and the 2025
                Correctional Services Workforce Insights Report in the development and delivery of
                the 2026 Correctional Services Insights Report.
              </p>
              <p className="max-w-4xl text-sm leading-6 text-[#535862]">
                These reports continue to be the strategic centrepiece guiding annual Business Plans
                for Public Skills Australia, alongside Ministerial, industry-sector and other
                priorities, including Royal Commissions and Inquiries.
              </p>
            </div>
          </div>
          <div className="lg:col-span-4 flex justify-center lg:justify-end">
            <div className="animate-hero-pulse-settle flex h-36 w-36 items-center justify-center rounded-full bg-[#E8F7FE]">
              <Binoculars className="h-20 w-20 text-[#0B6DA8]" strokeWidth={1.5} />
            </div>
          </div>
        </section>

        <section className="rounded-2xl border border-[#E9EAEB] bg-white p-6">
          <p className="text-xs font-bold uppercase text-[#0B6DA8]">
            2027 Workforce Insights Reports
          </p>
          <h2 className="mt-2 text-2xl font-bold text-[#252D02]">
            Broader priorities for 2026-27
          </h2>
          <p className="mt-3 max-w-4xl text-sm leading-6 text-[#535862]">
            The 2027 Workforce Insights Reports will firstly focus on the broader priorities
            detailed below and may be delivered throughout 2026-27.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-2">
            {broaderPriorities.map((priority, index) => (
              <article
                key={priority.label}
                style={{ animationDelay: `${index * 0.15}s` }}
                className={`rounded-2xl border border-[#BEEBFB] bg-[#E8F7FE] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#0B6DA8] hover:shadow-md ${
                  mounted ? "animate-card-entrance" : "opacity-0 translate-y-6"
                }`}
              >
                <span className="text-xs font-bold uppercase text-[#0B6DA8]">
                  {priority.label}
                </span>
                <h3 className="mt-3 text-xl font-bold leading-7 text-[#252D02]">
                  {priority.title}
                </h3>
              </article>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <article className="rounded-2xl border-2 border-[#0B6DA8] bg-white p-6 lg:col-span-2">
            <p className="text-xs font-bold uppercase text-[#0B6DA8]">
              Emerging priority
            </p>
            <h2 className="mt-2 text-2xl font-bold text-[#063B5D]">
              Correctional Services industry-sector priorities
            </h2>
            <div className="mt-5 grid gap-4">
              {emergingPriorities.map((priority, index) => (
                <div
                  key={priority}
                  style={{ animationDelay: `${index * 0.12}s` }}
                  className={`rounded-xl border border-[#E9EAEB] bg-[#FBFCFD] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#0B6DA8] hover:shadow-md ${
                    mounted ? "animate-card-entrance" : "opacity-0 translate-y-6"
                  }`}
                >
                  <span className="text-[10px] font-bold uppercase text-[#0B6DA8]">
                    Emerging priority {index + 1}
                  </span>
                  <p className="mt-2 text-base font-bold leading-6 text-[#252D02]">
                    {priority}
                  </p>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-2xl border border-[#E9EAEB] bg-white p-6">
            <p className="text-xs font-bold uppercase text-[#0B6DA8]">Continuing focus</p>
            <h2 className="mt-2 text-xl font-bold text-[#252D02]">
              Drivers of Change
            </h2>
            <p className="mt-3 text-sm leading-6 text-[#535862]">
              Beyond these focused lines of enquiry, the 2027 Workforce Insights Reports will
              examine the impact of the Drivers of Change identified in this year&apos;s reports on
              industry-sector workforces.
            </p>
            <button
              type="button"
              onClick={() => router.push(`/reports/${slug}/drivers_of_change`)}
              className="mt-5 inline-flex h-10 items-center gap-2 rounded-full bg-[#38BDF8] px-5 text-xs font-bold text-[#063B5D] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#0B6DA8] hover:text-white hover:shadow-md"
            >
              Revisit Drivers of Change <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </article>
        </section>

        <section className="rounded-2xl border border-[#BEEBFB] bg-[#E8F7FE] p-6">
          <h2 className="text-xl font-bold text-[#252D02]">
            Correctional Services Workforce Insights Reports downloadable PDFs
          </h2>
          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => router.push(`/reports/${slug}/downloads`)}
              className="inline-flex h-11 items-center gap-2 rounded-full bg-[#0B6DA8] px-5 text-xs font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#063B5D] hover:shadow-md"
            >
              Download PDF <Download className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => router.push(`/reports/${slug}/executive_summary`)}
              className="inline-flex h-11 items-center gap-2 rounded-full border border-[#0B6DA8] bg-white px-5 text-xs font-bold text-[#0B6DA8] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#FBFCFD] hover:shadow-md"
            >
              Revisit Executive Summary
            </button>
          </div>
        </section>
      </main>

      <ReportFooter contactUrl={report.contactUrl} />
    </div>
  );
}
