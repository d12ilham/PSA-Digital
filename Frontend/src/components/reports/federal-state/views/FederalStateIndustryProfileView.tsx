"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import ReportHeader from "@/components/layout/ReportHeader";
import ReportFooter from "@/components/layout/ReportFooter";
import ReportNavButtons from "@/components/layout/ReportNavButtons";
import mapDataRaw from "@/data/australia_map_data.json";
import FederalStateActProfileView from "./FederalStateActProfileView";
import { FederalStateNswProfileContent } from "./FederalStateNswProfileView";
import FederalStateNtProfileView from "./FederalStateNtProfileView";
import FederalStateQldProfileView from "./FederalStateQldProfileView";
import FederalStateSaProfileView from "./FederalStateSaProfileView";
import FederalStateTasProfileView from "./FederalStateTasProfileView";
import FederalStateVicProfileView from "./FederalStateVicProfileView";
import FederalStateWaProfileView from "./FederalStateWaProfileView";

interface Report {
  id: string;
  title: string;
  slug: string;
  status: string;
  pdfFileUrl?: string;
  psaSectorPageUrl?: string;
  contactUrl?: string;
  year?: { label: string };
}

interface MapState {
  code: string;
  name: string;
  d: string;
}

const mapData = mapDataRaw as unknown as {
  states: Record<string, MapState>;
  nationalViewBox: [number, number, number, number];
};

const stateEmployees: Record<string, string> = {
  WA: "9,839",
  NT: "2,255",
  QLD: "26,448",
  SA: "14,111",
  NSW: "33,646",
  VIC: "35,679",
  TAS: "4,734",
  ACT: "70,221",
};

const stateLabelPositions: Record<string, [number, number]> = {
  WA: [215, 312],
  NT: [404, 205],
  QLD: [572, 258],
  SA: [427, 385],
  NSW: [602, 410],
  VIC: [575, 498],
  TAS: [569, 581],
};

const selectableStates = ["ACT", "NSW", "NT", "QLD", "SA", "TAS", "VIC", "WA"] as const;
type ProfileState = "NATIONAL" | (typeof selectableStates)[number];

const profileDetails = {
  NATIONAL: {
    name: "Australian Capital Territory",
    apsEmployees: "70,221",
    publicServiceEmployees: "31,825",
    publicServiceLabel: "ACT Public Service Employees",
    workforceCode: "ACT",
  },
  ACT: {
    name: "Australian Capital Territory",
    apsEmployees: "70,221",
    publicServiceEmployees: "31,825",
    publicServiceLabel: "ACT Public Service Employees",
    workforceCode: "ACT",
  },
  NSW: {
    name: "New South Wales",
    apsEmployees: "33,646",
    publicServiceEmployees: "84,780",
    publicServiceLabel: "NSW Public Service Employees",
    workforceCode: "NSW",
  },
  NT: {
    name: "Northern Territory",
    apsEmployees: "2,255",
    publicServiceEmployees: "25,786",
    publicServiceLabel: "Northern Territory Public Service Employees",
    workforceCode: "NT",
  },
  QLD: {
    name: "Queensland",
    apsEmployees: "26,448",
    publicServiceEmployees: "74,410",
    publicServiceLabel: "Queensland Public Service Employees",
    workforceCode: "QLD",
  },
  SA: {
    name: "South Australia",
    apsEmployees: "14,111",
    publicServiceEmployees: "122,644",
    publicServiceLabel: "South Australia Public Service Employees",
    workforceCode: "SA",
  },
  TAS: {
    name: "Tasmania",
    apsEmployees: "4,734",
    publicServiceEmployees: "36,168",
    publicServiceLabel: "Tasmania Public Service Employees",
    workforceCode: "TAS",
  },
  VIC: {
    name: "Victoria",
    apsEmployees: "35,679",
    publicServiceEmployees: "58,169",
    publicServiceLabel: "Victoria Public Service Employees",
    workforceCode: "VIC",
  },
  WA: {
    name: "Western Australia",
    apsEmployees: "9,839",
    publicServiceEmployees: "179,490",
    publicServiceLabel: "WA Public Service Employees",
    workforceCode: "WA",
  },
} as const;

function WorkforceMap({ selectedState, onSelectState }: { selectedState: ProfileState; onSelectState: (state: Exclude<ProfileState, "NATIONAL">) => void }) {
  const national = selectedState === "NATIONAL";

  return (
    <div className={`relative rounded-md bg-[#FBF5F1] p-2 pb-16 ${national ? "h-[470px] overflow-x-auto lg:h-[540px] lg:overflow-hidden" : "h-[310px] overflow-hidden sm:h-[380px] lg:h-[390px]"}`}>
      <svg
        viewBox="55 20 740 605"
        role="img"
        aria-label="Australian Public Service employee locations by state and territory"
        className={national ? "block h-full min-w-[600px] w-full lg:mx-auto lg:min-w-0 lg:max-w-[640px]" : "block h-full w-full"}
      >
        {Object.values(mapData.states).map((state) => (
          <path
            key={state.code}
            d={state.d}
            fill={selectedState === state.code ? "#754D32" : "#F0D9CF"}
            stroke="#FBF5F1"
            strokeWidth="1.5"
            strokeLinejoin="round"
            className={selectableStates.some((code) => code === state.code) ? "cursor-pointer transition-colors" : undefined}
            onClick={selectableStates.some((code) => code === state.code) ? () => onSelectState(state.code as Exclude<ProfileState, "NATIONAL">) : undefined}
          />
        ))}

        {Object.entries(stateLabelPositions).map(([code, [x, y]]) => (
          <g key={code} className="animate-profile-operation-text">
            <rect
              x={x - (national ? 27 : 19)}
              y={y - (national ? 23 : 18)}
              width={national ? 54 : 38}
              height={national ? 33 : 23}
              rx={national ? 16.5 : 11.5}
              fill={selectedState === code ? "#F0D9CF" : "#694834"}
            />
            <text
              x={x}
              y={y - (national ? 1 : 6)}
              fill={selectedState === code ? "#694834" : "#FFFFFF"}
              fontFamily="inherit"
              fontSize={national ? 17 : 11}
              fontWeight="700"
              textAnchor="middle"
            >
              {code}
            </text>
            <text
              x={x}
              y={y + (national ? 30 : 13)}
              fill={selectedState === code ? "#FFFFFF" : "#000000"}
              fontFamily="inherit"
              fontSize={national ? 18 : 8.5}
              fontWeight={national ? 600 : 500}
              textAnchor="middle"
            >
              Employees {stateEmployees[code]}
            </text>
          </g>
        ))}

        <circle cx="670" cy="455" r="5" fill="#694834" />
        <path d={national ? "M670 455H712" : "M670 455H728"} stroke="#694834" strokeWidth="1.4" />
        <rect x={national ? 709 : 728} y={national ? 439 : 444} width={national ? 54 : 48} height={national ? 33 : 23} rx={national ? 16.5 : 11.5} fill="#694834" />
        <text
          x={national ? 736 : 752}
          y={national ? 462 : 459}
          fill="#FFFFFF"
          fontFamily="inherit"
          fontSize={national ? 17 : 11}
          fontWeight="700"
          textAnchor="middle"
        >
          ACT
        </text>
        <text
          x={national ? 720 : 752}
          y={national ? 495 : 480}
          fill="#000000"
          fontFamily="inherit"
          fontSize={national ? 18 : 8.5}
          fontWeight={national ? 600 : 500}
          textAnchor="middle"
        >
          Employees 70,221
        </text>
      </svg>
      <p className={`absolute bottom-3 left-4 text-black ${national ? "pr-4 text-xs leading-5" : "text-[9px] leading-3"}`}>
        Source: Australian Government, State of the Service Report 2024–25,
        Table 13
      </p>
    </div>
  );
}

function BarChart({
  title,
  bars,
  source,
}: {
  title: string;
  bars: { label: string; value: number; color: string; display: string }[];
  source: string;
}) {
  const maxValue = Math.max(...bars.map((bar) => bar.value));

  return (
    <article data-national-chart className="flex h-full min-w-0 flex-col rounded-md bg-[#FBF5F1] p-4 text-black sm:p-5">
      <h3 className="min-h-14 text-lg font-bold leading-7">{title}</h3>
      <div role="region" aria-label={`${title} chart`} tabIndex={0} className="mt-4 overflow-x-auto pb-2 focus-visible:outline-2 focus-visible:outline-[#754C2D]">
        <div className={bars.length === 2 ? "min-w-[260px]" : "min-w-[620px]"}>
          <div className="grid h-[230px] items-end gap-3 border-b-2 border-[#CDBEB5] px-2" style={{ gridTemplateColumns: `repeat(${bars.length}, minmax(0, 1fr))` }}>
            {bars.map((bar, index) => (
              <div key={bar.label} className="relative h-full">
                <span data-bar-value className="absolute left-1/2 -translate-x-1/2 text-base font-bold tabular-nums" style={{ bottom: `calc(${(bar.value / maxValue) * 76}% + 8px)` }}>{bar.display}</span>
                <div data-bar className="absolute bottom-0 left-1/2 w-full max-w-[120px] -translate-x-1/2 origin-bottom animate-defence-bar rounded-t-[3px] motion-reduce:animate-none" style={{ height: `${(bar.value / maxValue) * 76}%`, backgroundColor: bar.color, animationDelay: `${index * 0.1}s` }} />
              </div>
            ))}
          </div>
          <div className="mt-2 grid gap-3 px-2" style={{ gridTemplateColumns: `repeat(${bars.length}, minmax(0, 1fr))` }}>
            {bars.map((bar) => <span key={bar.label} className="text-center text-sm leading-5">{bar.label}</span>)}
          </div>
        </div>
      </div>
      <p className="mt-auto pt-4 text-xs leading-5">{source}</p>
    </article>
  );
}

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      typeof IntersectionObserver === "undefined"
    ) {
      const frame = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(frame);
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setVisible(true);
        observer.disconnect();
      },
      { threshold: 0.12 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${visible ? "animate-card-entrance motion-reduce:animate-none" : "translate-y-5 opacity-0 motion-reduce:translate-y-0 motion-reduce:opacity-100"} ${className}`}
      style={visible ? { animationDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  );
}

function CountUp({ value, decimals = 0, suffix = "" }: { value: number; decimals?: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [current, setCurrent] = useState(0);
  const formatted = (number: number) => `${number.toLocaleString("en-AU", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}${suffix}`;

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || typeof IntersectionObserver === "undefined") {
      const frame = requestAnimationFrame(() => setCurrent(value));
      return () => cancelAnimationFrame(frame);
    }

    let frame = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const start = performance.now();
      const step = (now: number) => {
        const progress = Math.min((now - start) / 1200, 1);
        setCurrent(value * (1 - (1 - progress) ** 3));
        if (progress < 1) frame = requestAnimationFrame(step);
      };
      frame = requestAnimationFrame(step);
    }, { threshold: 0.2 });
    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);

  return <span ref={ref} aria-label={formatted(value)} className="tabular-nums"><span aria-hidden="true">{formatted(current)}</span></span>;
}

export default function FederalStateIndustryProfileView({
  slug,
  report,
}: {
  slug: string;
  report: Report;
}) {
  const [selectedState, setSelectedState] = useState<ProfileState>("NATIONAL");
  const profile = profileDetails[selectedState];
  const otherStateView = selectedState === "ACT" ? <FederalStateActProfileView slug={slug} report={report} embedded />
    : selectedState === "NT" ? <FederalStateNtProfileView slug={slug} report={report} embedded />
    : selectedState === "QLD" ? <FederalStateQldProfileView slug={slug} report={report} embedded />
    : selectedState === "SA" ? <FederalStateSaProfileView slug={slug} report={report} embedded />
    : selectedState === "TAS" ? <FederalStateTasProfileView slug={slug} report={report} embedded />
    : selectedState === "VIC" ? <FederalStateVicProfileView slug={slug} report={report} embedded />
    : selectedState === "WA" ? <FederalStateWaProfileView slug={slug} report={report} embedded />
    : null;

  return (
    <div className="flex min-h-screen flex-col justify-between bg-[#FAFAF0] font-sans text-[#1B240E] antialiased selection:bg-[#8AC900]/20">
      <ReportHeader slug={slug} report={report} currentPage="industry_profile" />

      <main className="mx-auto w-full max-w-[1440px] flex-1 space-y-3 px-4 py-5 sm:px-6 lg:px-8">
        <Reveal>
          <ReportNavButtons
            slug={slug}
            currentPage="industry_profile"
            prev={{
              label: "Federal Government Industry-Sector Overview",
              href: `/reports/${slug}/industry_overview`,
            }}
            next={{
              label: "ACT Workforce Overview",
              href: `/reports/${slug}/industry_profile_act`,
            }}
            prevPrefix=""
            nextPrefix="Next Section:"
          />
        </Reveal>

        <Reveal delay={0.06}>
          <section className="rounded-lg border border-[#E9E5DE] bg-white px-5 py-4 sm:px-6">
            <p className="text-sm font-medium text-black">Industry Overview</p>
            <h1 className="mt-2 text-2xl font-bold text-black sm:text-[28px]">
              Industry Profile
            </h1>
            <p className="mt-2 text-base leading-6 text-black">
              Select a state or territory on the map, or from the list, to open
              its Workforce Overview.
            </p>
          </section>
        </Reveal>

        <Reveal delay={0.12}>
          <section className="rounded-lg border border-[#E9E5DE] bg-white p-4 sm:p-5">
            <h2 className="text-xl font-bold text-black">
              Location of Australian Public Service (APS) Employees
            </h2>
            <div className="mt-3 flex flex-wrap items-center gap-1.5 border-b border-[#E9E5DE] pb-3">
              <span className="mr-2 text-xs font-semibold uppercase text-black">
                Choose a state or territory
              </span>
              {["NATIONAL", ...selectableStates].map((tab, index) => {
                const active = tab === selectedState;
                const available = tab === "NATIONAL" || selectableStates.some((code) => code === tab);
                const className = `rounded-full border px-3 py-2 text-xs font-semibold ${
                  active
                    ? "border-[#8AC900] text-black"
                    : "border-[#E9E5DE] bg-white text-black"
                }`;
                return available ? (
                  <button
                    key={tab}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setSelectedState(tab as ProfileState)}
                    className={`${className} animate-card-entrance transition-colors hover:border-[#8AC900] motion-reduce:animate-none`}
                    style={{ animationDelay: `${0.18 + index * 0.045}s`, ...(active ? { backgroundColor: "#8AC900" } : {}) }}
                  >
                    {tab}
                  </button>
                ) : (
                  <span key={tab} className={className}>{tab}</span>
                );
              })}
            </div>

            <div key={selectedState} className="animate-content-switch motion-reduce:animate-none">
            {selectedState === "NSW" ? (
              <div className="mt-4">
                <FederalStateNswProfileContent slug={slug} showJurisdictionLinks={false} />
              </div>
            ) : otherStateView ? (
              <div className="mt-4">{otherStateView}</div>
            ) : (
            <div className="mt-4 grid items-start gap-3 lg:grid-cols-[minmax(270px,1fr)_minmax(0,2.55fr)]">
              <div className="min-w-0 space-y-3 lg:order-2">
                <Reveal>
                  <WorkforceMap selectedState={selectedState} onSelectState={setSelectedState} />
                </Reveal>


              </div>

              <div className="space-y-2.5 lg:order-1">
                {selectedState !== "NATIONAL" && <Reveal>
                  <section className="rounded-md bg-[#F8EEE8] p-3.5">
                    <h3 className="text-sm font-bold text-[#382219]">
                      {profile.name}
                    </h3>
                    <div className="mt-2.5 rounded-md bg-white px-3 py-2.5">
                      <strong className="block text-lg leading-5 text-[#694834]">
                        {profile.apsEmployees}
                      </strong>
                      <span className="text-[9px] text-[#535862]">
                        APS Employees Located Here
                      </span>
                    </div>
                    <div className="mt-1.5 rounded-md bg-white px-3 py-2.5">
                      <strong className="block text-lg leading-5 text-[#694834]">
                        {profile.publicServiceEmployees}
                      </strong>
                      <span className="text-[9px] text-[#535862]">
                        {profile.publicServiceLabel}
                      </span>
                    </div>
                    <a
                      href={selectedState === "NT" ? `/reports/${slug}/industry_profile_nt` : selectedState === "QLD" ? `/reports/${slug}/industry_profile_qld` : selectedState === "SA" ? `/reports/${slug}/industry_profile_sa` : selectedState === "TAS" ? `/reports/${slug}/industry_profile_tas` : selectedState === "VIC" ? `/reports/${slug}/industry_profile_vic` : `/reports/${slug}/industry_profile_wa`}
                      className="mt-2.5 flex min-h-8 items-center justify-center gap-2 rounded-full bg-[#8AC900] px-3 text-[9px] font-bold text-[#252D02] transition-colors hover:bg-[#79B700]"
                    >
                      {profile.workforceCode} Workforce Overview <span aria-hidden="true">→</span>
                    </a>
                  </section>
                </Reveal>}

                <Reveal delay={0.06}>
                  <section className="rounded-md bg-[#EDE9DC] p-4 text-black">
                    <p className="text-base font-semibold">Total</p>
                    <strong className="mt-1 block text-3xl leading-tight"><CountUp value={198529} /></strong>
                    <p className="mt-2 text-sm leading-6">The APS workforce spans 586 locations, 102 agencies and 234 job roles.</p>
                  </section>
                </Reveal>

                {[
                  { label: "Capital Cities", value: 172015, share: "86.6%", graphic: "capital-cities" },
                  { label: "Regional", value: 24918, share: "12.6%", graphic: "regional" },
                  { label: "Overseas", value: 1596, share: "0.8%", graphic: "overseas" },
                ].map((item, index) => (
                  <Reveal key={item.label} delay={0.1 + index * 0.05}>
                    <div data-national-metric className="flex items-center gap-4 rounded-md bg-[#F8EEE8] p-4 text-black">
                      <Image src={`/images/reports/federal-state/industry-profile/${item.graphic}-document.svg`} alt="" width={64} height={64} className="h-16 w-16 shrink-0 object-contain" />
                      <div className="min-w-0">
                        <p className="text-base font-semibold">{item.label}</p>
                        <strong className="mt-1 block text-2xl leading-7"><CountUp value={item.value} /></strong>
                        <span className="mt-1 block text-base tabular-nums">({item.share})</span>
                      </div>
                    </div>
                  </Reveal>
                ))}

                <Reveal delay={0.24}>
                  <section className="rounded-md bg-[#F0D7CC] p-4 text-black">
                    <div className="flex items-center gap-4">
                      <Image src="/images/reports/federal-state/industry-profile/gender-document.svg" alt="" width={64} height={64} className="h-16 w-16 shrink-0 object-contain" />
                      <div>
                        <strong className="block text-3xl leading-tight"><CountUp value={4.4} decimals={1} suffix="%" /></strong>
                        <p className="mt-1 text-base font-semibold">Gender Pay Gap</p>
                      </div>
                    </div>
                    <p className="mt-3 border-t border-[#D9BCAF] pt-3 text-xs leading-5">Source: Australian Government, State of the Service Report 2024–25, 2025.</p>
                  </section>
                </Reveal>
              </div>
                <div className="grid min-w-0 items-stretch gap-3 lg:order-3 lg:col-span-2 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.7fr)]">
                  <Reveal delay={0.12} className="h-full min-w-0">
                    <BarChart
                      title="First Nations Employment in the APS"
                      bars={[
                        {
                          label: "First Nations employees at 30 June 2025",
                          value: 3.4,
                          display: "3.4%",
                          color: "#BBA295",
                        },
                        {
                          label: "Target First Nations employees by 2030",
                          value: 5,
                          display: "5.0%",
                          color: "#754D32",
                        },
                      ]}
                      source="SOURCE: Australian Government, State of the Service Report 2024–25, 2025, Table A8 and p.31"
                    />
                  </Reveal>
                  <Reveal delay={0.18} className="h-full min-w-0">
                    <BarChart
                      title="Diversity in the APS"
                      bars={[
                        { label: "First Nations", value: 3.4, display: "3.4%", color: "#E8D9D1" },
                        { label: "Employees with disability", value: 5.8, display: "5.8%", color: "#CDB9AD" },
                        { label: "Neurodivergent", value: 10.8, display: "10.8%", color: "#BBA295" },
                        { label: "LGBTQIA+", value: 9.5, display: "9.5%", color: "#8E654A" },
                        { label: "CALD", value: 26.8, display: "26.8%", color: "#754D32" },
                        { label: "Women", value: 60.5, display: "60.5%", color: "#694834" },
                      ]}
                      source="SOURCE: Australian Government, State of the Service Report 2024–25, 2025, Table 5"
                    />
                  </Reveal>
                </div>
            </div>
            )}
            </div>

          </section>
        </Reveal>
      </main>

      <ReportFooter
        contactUrl={report?.contactUrl}
        reportName={
          report?.title?.replace(/\s*\b20\d{2}\b/g, "").trim() ||
          "Federal and State/Territory Government Workforce Insights Report"
        }
      />
    </div>
  );
}
