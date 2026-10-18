"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ReportFooter from "@/components/layout/ReportFooter";
import ReportHeader from "@/components/layout/ReportHeader";

type CorrectionalServicesReport = {
  pdfFileUrl?: string;
  contactUrl?: string;
  year?: { label: string };
  industry?: { slug?: string; name?: string };
};

const undertakes = [
  {
    title: "Workforce Insight and Strategy",
    icon: "/images/reports/about/Workforce.svg",
    description:
      "undertakes data analysis, research and consultation to deepen understandings of contemporary workforce challenges and what can be done to mitigate these challenges",
  },
  {
    title: "Training Product Quality & Development",
    icon: "/images/reports/about/Training.svg",
    description:
      "develops quality training products to strengthen the skills and capabilities of Public Safety and Government workforces",
  },
  {
    title: "Supports Career Pathways",
    icon: "/images/reports/about/Supports.svg",
    description:
      "monitors and promotes the implementation of training products to support career pathways for the Public Safety and Government industry-sectors",
  },
  {
    title: "Industry Stewardship",
    icon: "/images/reports/about/Industry.svg",
    description:
      "consults with, advocates for and promotes the needs of the Public Safety and Government industry-sectors.",
  },
];

export default function CorrectionalServicesAboutView({
  slug,
  report,
}: {
  slug: string;
  report: CorrectionalServicesReport;
}) {
  const undertakesRef = React.useRef<HTMLElement>(null);
  const [isUndertakesVisible, setIsUndertakesVisible] = React.useState(false);

  React.useEffect(() => {
    const node = undertakesRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsUndertakesVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-[#FAFAF0] font-sans text-[#252D02] antialiased selection:bg-[#B2DB79]/40">
      <ReportHeader slug={slug} report={report} currentPage="about" />

      <main className="mx-auto flex w-full max-w-[1504px] flex-1 flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <nav className="flex flex-wrap items-center gap-3" aria-label="Report sections">
          <Link
            href={"/reports/" + slug + "/introduction"}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-[#B2DB79] bg-[#FAFAF0] px-5 text-sm font-bold text-[#598303] no-underline transition-colors hover:bg-[#F0F5DF]"
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back to Introduction
          </Link>
          <Link
            href={"/reports/" + slug + "/methodology"}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-[#8AC900] px-5 text-sm font-bold text-[#252D02] no-underline transition-colors hover:bg-[#79B600]"
          >
            Next Section: Methodology
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </nav>

        <section className="relative min-h-[400px] overflow-hidden rounded-2xl border border-[#E9EAEB] bg-white p-6">
          <Image
            src="/images/wave-right.png"
            alt=""
            width={392}
            height={936}
            priority
            className="pointer-events-none absolute right-0 top-0 hidden h-full w-auto animate-hero-rotate object-contain lg:block"
          />

          <div className="relative z-10 flex max-w-[800px] flex-col gap-10">
            <div className="flex flex-col gap-4 animate-slide-up">
              <h1 className="text-[32px] font-bold leading-[1.25] text-[#252D02] sm:text-[40px] sm:leading-[54px]">
                About Public Skills Australia
              </h1>
              <p className="text-sm font-medium leading-6 text-[#535862]">
                Public Skills Australia is the Jobs and Skills Council (JSC) for
                the Public Safety and Government industry, comprising Correctional
                Services, Defence, Federal, State/Territory and Local Government,
                Fire and Emergency Services and Police industry-sectors.
              </p>
            </div>

            <div className="flex flex-col items-start gap-5 rounded-2xl border border-[#E9EAEB] bg-white p-5 animate-card-entrance sm:flex-row">
              <Image
                src="/images/reports/about/working-in-partnership.svg"
                alt=""
                width={92}
                height={92}
                className="size-[92px] shrink-0 object-contain animate-zoom-in"
              />
              <div className="flex flex-col gap-2">
                <h2 className="text-xl font-bold leading-7 text-[#252D02]">
                  Working in partnership
                </h2>
                <p className="text-sm font-medium leading-6 text-[#535862]">
                  Through its work, Public Skills Australia actively supports
                  employer and employee bodies in these industries and associated
                  volunteer associations. Public Skills Australia works in
                  partnership with the Department of Employment and Workplace
                  Relations (DEWR) and other JSCs to give effect to broader
                  Ministerial and government priorities.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section ref={undertakesRef} className="flex flex-col gap-6">
          <div className="border-b border-[#D5D7DA] pb-2">
            <h2 className="text-2xl font-bold leading-8 text-[#252D02]">
              Public Skills Australia Undertakes:
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {undertakes.map((item, index) => (
              <article
                key={item.title}
                style={
                  isUndertakesVisible
                    ? { animationDelay: `${index * 0.12 + 0.1}s` }
                    : undefined
                }
                className={
                  "group flex min-h-[376px] flex-col gap-10 rounded-[14px] border border-[#E9EAEB] bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-[#B2DB79] hover:shadow-md " +
                  (isUndertakesVisible
                    ? "animate-card-entrance"
                    : "opacity-0 translate-y-6")
                }
              >
                <Image
                  src={item.icon}
                  alt=""
                  width={100}
                  height={100}
                  className="size-[100px] shrink-0 object-contain transition-transform duration-300 group-hover:scale-105"
                />
                <div className="flex flex-col gap-3">
                  <h3 className="text-xl font-bold leading-7 text-[#252D02]">
                    {item.title}
                  </h3>
                  <p className="text-sm font-medium leading-6 text-[#535862]">
                    {item.description}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div className="flex flex-col items-start gap-6 rounded-[14px] border border-[#E9EAEB] bg-white p-6 sm:flex-row sm:items-center">
            <Image
              src="/images/reports/about/Commitment.svg"
              alt=""
              width={100}
              height={100}
              className="size-[100px] shrink-0 object-contain"
            />
            <div className="flex max-w-[800px] flex-col gap-2">
              <h2 className="text-xl font-bold leading-7 text-[#252D02]">
                Our commitment
              </h2>
              <p className="text-sm font-medium leading-6 text-[#535862]">
                Public Skills Australia remains committed to encouraging the
                participation of First Nations people,<sup>1</sup> those from
                culturally and linguistically diverse backgrounds, those living
                with or experiencing disabilities, women and other gender
                diverse people and mature people in the Public Safety and
                Government industry workforces.
              </p>
            </div>
          </div>

          <aside className="rounded-2xl border border-[#E9EAEB] bg-[#F0F5DF] p-6 text-sm font-medium leading-6 text-[#535862]">
            <ol className="max-w-[800px] list-decimal pl-5">
              <li>
                Please note, First Nations people will be used as preferred
                terminology inclusive of Aboriginal and Torres Strait Islanders.
                When citing a data source (such as government strategies or state
                of the sector reports) the terminology of the data source will be
                used to maintain accurate data representation.
              </li>
            </ol>
          </aside>
        </section>
      </main>

      <ReportFooter
        contactUrl={report.contactUrl}
        reportName="Correctional Services Workforce Insights Report"
      />
    </div>
  );
}
