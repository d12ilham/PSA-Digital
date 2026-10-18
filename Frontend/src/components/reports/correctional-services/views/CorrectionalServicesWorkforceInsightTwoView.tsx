"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import ReportFooter from "@/components/layout/ReportFooter";
import ReportHeader from "@/components/layout/ReportHeader";
import ReportNavButtons from "@/components/layout/ReportNavButtons";

type Report = {
  contactUrl?: string;
  pdfFileUrl?: string;
  year?: { label: string };
  industry?: { slug?: string; name?: string };
};

type ChartRow = readonly [year: string, enrolments: number, completions: number];

const certificateThree: readonly ChartRow[] = [
  ["2020", 5229, 3275],
  ["2021", 4419, 2540],
  ["2022", 3952, 2060],
  ["2023", 5301, 2180],
  ["2024", 5762, 2298],
];

const certificateFour: readonly ChartRow[] = [
  ["2020", 1516, 670],
  ["2021", 1648, 809],
  ["2022", 1288, 716],
  ["2023", 1167, 561],
  ["2024", 1558, 763],
];

function QualificationChart({ title, rows, maximum, loaded }: { title: string; rows: readonly ChartRow[]; maximum: number; loaded: boolean }) {
  return (
    <figure className="mt-auto rounded-lg border border-[#D5DBE8] bg-white px-3 py-4 sm:px-5">
      <figcaption className="text-sm font-semibold text-[#12224F]">{title}</figcaption>
      <p className="mt-1 text-[11px] text-[#68769A]">Y axis: Enrolments vs Completions, 0–{maximum.toLocaleString()}</p>
      <div className="mt-5 grid h-[220px] grid-cols-5 gap-2 border-b border-[#3B4C77] px-1 sm:gap-4" role="img" aria-label={`${title}: ${rows.map(([year, enrolments, completions]) => `${year}, ${enrolments} enrolments and ${completions} completions`).join("; ")}`}>
        {rows.map(([year, enrolments, completions], index) => (
          <div key={year} className="flex min-w-0 items-end justify-center gap-1 sm:gap-2">
            <div className="flex h-full w-[43%] flex-col justify-end">
              <span className="mb-1 text-center text-[9px] font-semibold text-[#12224F] sm:text-[10px]">{enrolments.toLocaleString()}</span>
              <span
                className="block w-full origin-bottom bg-[#596990] transition-[height,background-color] duration-700 ease-out hover:bg-[#424996] motion-reduce:transition-none"
                style={{ height: loaded ? `${(enrolments / maximum) * 175}px` : "0px", transitionDelay: `${index * 90}ms` }}
                title={`${year}: ${enrolments.toLocaleString()} enrolments`}
              />
            </div>
            <div className="flex h-full w-[43%] flex-col justify-end">
              <span className="mb-1 text-center text-[9px] font-semibold text-[#12224F] sm:text-[10px]">{completions.toLocaleString()}</span>
              <span
                className="block w-full origin-bottom bg-[#12224F] transition-[height,background-color] duration-700 ease-out hover:bg-[#424996] motion-reduce:transition-none"
                style={{ height: loaded ? `${(completions / maximum) * 175}px` : "0px", transitionDelay: `${index * 90 + 90}ms` }}
                title={`${year}: ${completions.toLocaleString()} completions`}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-5 gap-2 px-1 pt-2 text-center text-[11px] text-[#68769A] sm:gap-4">
        {rows.map(([year]) => <span key={year}>{year}</span>)}
      </div>
      <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-[11px] text-[#68769A]">
        <span className="inline-flex items-center gap-1"><span className="size-2.5 bg-[#596990]" />Enrolments</span>
        <span className="inline-flex items-center gap-1"><span className="size-2.5 bg-[#12224F]" />Completions</span>
      </div>
      <p className="mt-1 text-[10px] text-[#68769A]">Source: NCVER 2025, Total VET students and courses 2024<a href="#correctional-insight-two-source-22" className="ml-0.5 text-[#424996] hover:underline"><sup>22</sup></a></p>
    </figure>
  );
}

function SpecialisationPanel({ title, items, rows, maximum, accent, loaded }: { title: string; items: readonly string[]; rows: readonly ChartRow[]; maximum: number; accent: string; loaded: boolean }) {
  return (
    <section className="flex flex-col rounded-lg border border-[#E9EAEB] border-t-[9px] bg-white px-5 py-6 sm:px-6" style={{ borderTopColor: accent }}>
      <h2 className="text-xl font-semibold">{title} specialisations</h2>
      <ul className="mt-3 min-h-[175px] list-disc space-y-1 pl-5 text-sm leading-6 text-[#535862]">
        {items.map((item) => <li key={item}>{item}</li>)}
      </ul>
      <QualificationChart title={`${title} in Correctional Practice`} rows={rows} maximum={maximum} loaded={loaded} />
    </section>
  );
}

export default function CorrectionalServicesWorkforceInsightTwoView({ slug, report }: { slug: string; report: Report }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoaded(true), 120);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-[#FAFAF0] font-sans text-[#252D02] antialiased">
      <ReportHeader slug={slug} report={report} currentPage="workforce_insights" />
      <main className="mx-auto w-full max-w-[1504px] flex-1 space-y-6 px-4 py-6 sm:px-6 lg:px-8">
        <ReportNavButtons
          slug={slug}
          currentPage="workforce_insights"
          prev={{ label: "Theme 1 – PSA Insight 1", href: `/reports/${slug}/workforce_insights_skills_capabilities` }}
          next={{ label: "Theme 1 – PSA Insight 3", href: `/reports/${slug}/workforce_insights_career_pathways` }}
          prevPrefix=""
          nextPrefix="Next Insight:"
        />

        <section className="rounded-[14px] border border-[#E9EAEB] bg-white p-5 sm:p-6">
          <div className="flex min-h-[274px] flex-col gap-6 rounded-[14px] border-l-[12px] border-[#424996] bg-[#E8E9EF] px-5 py-6 sm:px-7 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex min-w-0 gap-5 animate-slide-up motion-reduce:animate-none">
              <span className="shrink-0 text-5xl font-light leading-none text-[#C8CCDF]">2</span>
              <div className="max-w-[810px]">
                <p className="text-sm font-medium text-[#424996]">Theme One, Insight Two</p>
                <p className="mt-5 text-xl font-semibold">Use of Specialisations</p>
                <h1 className="mt-5 text-2xl font-semibold leading-8">CCO roles require more specialised capability provided in Certificate IV in Correctional Practice</h1>
                <p className="mt-5 text-sm leading-6">The CCO role is comparatively complex, often requiring an understanding of advanced concepts such as behavioural change, acceptance and commitment theory, trauma-informed response, alcohol and other drug treatments and training for dealing with sex offenders. As such, it is seen as more specialised than what the current Certificate III in Correctional Practice offers. Several jurisdictions reported that they only offered Certificate IV level training for CCO roles.</p>
              </div>
            </div>
            <Image
              src="/images/reports/correctional-workforce-insight-two-frame-8.svg"
              width={220}
              height={220}
              alt=""
              aria-hidden="true"
              className="size-[180px] shrink-0 self-center animate-zoom-in motion-reduce:animate-none xl:size-[220px]"
            />
          </div>
        </section>

        <section className="rounded-[14px] border border-[#E9EAEB] bg-white p-6">
          <h2 className="text-2xl font-semibold">Certificate III and IV in Correctional Practice</h2>
          <p className="mt-5 max-w-[850px] text-sm leading-6">For the 2026 Workforce Insights Report, Public Skills Australia sought to explore and better understand the evidence gaps around the CCO workforce and the training available for these occupations. To better understand the challenges for CCOs, the interrelationship between the Certificate III and IV in Correctional Practice was explored, as well as current training and recruitment practices in different jurisdictions (including the acceptance of higher education degrees). The Certificate III and IV in Correctional Practice are qualifications in the CSC Correctional Services Training Package designed as entry level requirements for both COs and CCOs. The two tables below highlight the specialisations relevant to CCOs.</p>
        </section>

        <div className="h-px bg-[#E9EAEB]" aria-hidden="true" />

        <div className="grid gap-6 lg:grid-cols-2">
          <SpecialisationPanel
            title="Certificate III"
            items={["Adult Custodial specialisation", "Adult Community specialisation", "Youth Custodial specialisation", "Youth Community specialisation"]}
            rows={certificateThree}
            maximum={6000}
            accent="#9DA8D0"
            loaded={loaded}
          />
          <SpecialisationPanel
            title="Certificate IV"
            items={["Case Management specialisation", "Community specialisation", "Emergency Response specialisation", "Supervision specialisation", "Health and Safety electives", "Dog Handling electives", "General electives"]}
            rows={certificateFour}
            maximum={1800}
            accent="#424996"
            loaded={loaded}
          />
        </div>

        <section aria-labelledby="correctional-insight-two-sources-heading" className="rounded-[14px] border border-[#E9EAEB] bg-white p-6">
          <h2 id="correctional-insight-two-sources-heading" className="text-2xl font-semibold">Sources</h2>
          <p id="correctional-insight-two-source-22" className="mt-5 flex scroll-mt-24 gap-3 text-sm leading-6">
            <span className="grid size-5 shrink-0 place-items-center rounded-full bg-[#598303] text-xs font-semibold text-white">22</span>
            <span>Graph data based on NCVER, <em>Total VET students and courses: VOCSTATS</em>, [data set], NCVER, 2025, accessed 23 March 2026.</span>
          </p>
        </section>
      </main>
      <ReportFooter contactUrl={report.contactUrl} reportName="Correctional Services Workforce Insights Report" />
    </div>
  );
}
