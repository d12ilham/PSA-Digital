"use client";

import React from "react";
import Image from "next/image";
import ReportFooter from "@/components/layout/ReportFooter";
import ReportHeader from "@/components/layout/ReportHeader";
import ReportNavButtons from "@/components/layout/ReportNavButtons";
import AnimatedCounter from "@/components/common/AnimatedCounter";

type CorrectionalServicesReport = {
  pdfFileUrl?: string;
  contactUrl?: string;
  year?: {
    label: string;
  };
  industry?: {
    slug?: string;
    name?: string;
  };
};

const undertakes = [
  {
    title: "Workforce Insight and Strategy",
    icon: "/images/reports/about/Workforce.svg",
    description:
      "Undertakes data analysis, research and consultation to deepen understandings of contemporary workforce challenges and what can be done to mitigate these challenges.",
  },
  {
    title: "Training Product Quality & Development",
    icon: "/images/reports/about/Training.svg",
    description:
      "Develops quality training products to strengthen the skills and capabilities of Public Safety and Government workforces.",
  },
  {
    title: "Supports Career Pathways",
    icon: "/images/reports/about/Supports.svg",
    description:
      "Monitors and promotes the implementation of training products to support career pathways for the Public Safety and Government industry-sectors.",
  },
  {
    title: "Industry Stewardship",
    icon: "/images/reports/about/Industry.svg",
    description:
      "Consults with, advocates for and promotes the needs of the Public Safety and Government industry-sectors.",
  },
];

const sectors = [
  "Correctional Services",
  "Fire and Emergency Services",
  "Police",
  "Federal, State/Territory and Local Government",
  "Defence",
];

export default function CorrectionalServicesAboutView({
  slug,
  report,
}: {
  slug: string;
  report: CorrectionalServicesReport;
}) {
  const undertakesRef = React.useRef<HTMLDivElement>(null);
  const [isUndertakesVisible, setIsUndertakesVisible] = React.useState(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsUndertakesVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    if (undertakesRef.current) observer.observe(undertakesRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[#F7F8F0] text-[#1B240E] font-sans flex flex-col justify-between selection:bg-[#38BDF8]/30 antialiased">
      <ReportHeader slug={slug} report={report} currentPage="about" />

      <main className="max-w-360 mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8 flex-1">
        <ReportNavButtons slug={slug} currentPage="about" />

        <section className="relative overflow-hidden rounded-2xl border border-[#E9EAEB] bg-white p-6 min-h-[430px]">
          <Image
            src="/images/wave-right.png"
            alt=""
            width={420}
            height={540}
            priority
            className="pointer-events-none absolute -right-10 top-0 h-full w-auto object-cover object-left opacity-70 animate-hero-rotate"
          />

          <div className="relative z-10 grid gap-8 lg:grid-cols-[minmax(0,820px)_360px]">
            <div className="space-y-6">
              <div className="animate-slide-up space-y-4">
                <h1 className="text-3xl sm:text-4xl font-bold leading-[1.35] text-[#063B5D]">
                  About Public Skills Australia
                </h1>
                <p className="max-w-[820px] text-sm leading-6 text-[#535862] animate-slide-up-delay">
                  Public Skills Australia is the Jobs and Skills Council (JSC)
                  for the Public Safety and Government industry, comprising
                  Correctional Services, Defence, Federal, State/Territory and
                  Local Government, Fire and Emergency Services and Police
                  industry-sectors.
                </p>
              </div>

              <div className="flex max-w-[780px] items-start gap-5 rounded-2xl border border-[#E9EAEB] bg-white p-5 animate-card-entrance">
                <Image
                  src="/images/reports/about/working-in-partnership.svg"
                  alt=""
                  width={92}
                  height={92}
                  className="h-[92px] w-[92px] shrink-0 object-contain animate-zoom-in"
                />
                <div>
                  <h2 className="text-base font-bold leading-7 text-[#252D02]">
                    Working in partnership
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-[#535862]">
                    Through its work, Public Skills Australia actively supports
                    employer and employee bodies in these industries and
                    associated volunteer associations. Public Skills Australia
                    works in partnership with the Department of Employment and
                    Workplace Relations (DEWR) and other JSCs to give effect to
                    broader Ministerial and government priorities.
                  </p>
                </div>
              </div>
            </div>

            <aside className="relative z-10 rounded-2xl border border-[#BEEBFB] bg-[#E8F7FE] p-5 animate-zoom-in">
              <span className="text-xs font-semibold uppercase text-[#0B6DA8]">
                The Public Safety and Government industry
              </span>
              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-white p-4">
                  <strong className="block text-3xl font-semibold text-[#0B6DA8]">
                    <AnimatedCounter target={6} />
                  </strong>
                  <span className="mt-2 block text-xs font-semibold leading-5 text-[#535862]">
                    priority industry-sectors
                  </span>
                </div>
                <div className="rounded-xl bg-white p-4">
                  <strong className="block text-3xl font-semibold text-[#0B6DA8]">
                    <AnimatedCounter target={10} />
                  </strong>
                  <span className="mt-2 block text-xs font-semibold leading-5 text-[#535862]">
                    Jobs and Skills Councils nationally
                  </span>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {sectors.map((sector) => (
                  <span
                    key={sector}
                    className="rounded-full bg-white px-3 py-1 text-[10px] font-bold leading-5 text-[#075D87]"
                  >
                    {sector}
                  </span>
                ))}
              </div>
            </aside>
          </div>
        </section>

        <section ref={undertakesRef} className="space-y-6">
          <div className="border-b border-[#D5D7DA] pb-3">
            <h2
              className={`text-xl sm:text-2xl font-bold text-[#252D02] ${
                isUndertakesVisible ? "animate-slide-up" : "opacity-0"
              }`}
            >
              Public Skills Australia Undertakes:
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {undertakes.map((item, index) => (
              <article
                key={item.title}
                style={
                  isUndertakesVisible
                    ? { animationDelay: `${index * 0.12 + 0.1}s` }
                    : undefined
                }
                className={`group flex min-h-[376px] cursor-pointer flex-col justify-between rounded-2xl border border-[#E9EAEB] bg-white p-6 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] hover:-translate-y-2 hover:scale-[1.02] hover:border-[#0B6DA8] hover:shadow-xl ${
                  isUndertakesVisible
                    ? "animate-card-entrance"
                    : "opacity-0 translate-y-6"
                }`}
              >
                <div className="space-y-8">
                  <Image
                    src={item.icon}
                    alt=""
                    width={100}
                    height={100}
                    className="h-[100px] w-[100px] object-contain transition-transform duration-500 group-hover:scale-110"
                  />
                  <div>
                    <h3 className="max-w-[294px] text-base font-bold leading-7 text-[#252D02] transition-colors duration-500 group-hover:text-[#0B6DA8]">
                      {item.title}
                    </h3>
                    <p className="mt-3 max-w-[294px] text-sm leading-6 text-[#535862]">
                      {item.description}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="flex min-h-[156px] items-center rounded-2xl border border-[#E9EAEB] bg-white p-6 animate-card-entrance">
            <Image
              src="/images/reports/about/Commitment.svg"
              alt=""
              width={100}
              height={100}
              className="h-[100px] w-[100px] shrink-0 object-contain animate-zoom-in"
            />
            <div className="ml-6 self-start pt-1">
              <h2 className="text-base font-bold leading-7 text-[#252D02]">
                Our commitment
              </h2>
              <p className="mt-2 max-w-[860px] text-sm leading-6 text-[#535862]">
                Public Skills Australia remains committed to encouraging the
                participation of First Nations people,<sup>1</sup> those from
                culturally and linguistically diverse backgrounds, those living
                with or experiencing disabilities, women and other gender
                diverse people and mature people in the Public Safety and
                Government industry workforces.
              </p>
            </div>
          </div>

          <aside className="rounded-2xl border border-[#BEEBFB] bg-[#E8F7FE] p-6 text-xs leading-6 text-[#535862]">
            <p className="max-w-[920px]">
              <sup>1.</sup> Please note, First Nations people will be used as
              preferred terminology inclusive of Aboriginal and Torres Strait
              Islanders. When citing a data source (such as government
              strategies or state of the sector reports) the terminology of the
              data source will be used to maintain accurate data representation.
            </p>
          </aside>
        </section>
      </main>

      <ReportFooter contactUrl={report.contactUrl} />
    </div>
  );
}
