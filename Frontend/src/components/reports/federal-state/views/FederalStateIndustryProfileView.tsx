"use client";

import React, { useEffect, useRef, useState } from "react";
import ReportHeader from "@/components/layout/ReportHeader";
import ReportFooter from "@/components/layout/ReportFooter";
import ReportNavButtons from "@/components/layout/ReportNavButtons";
import mapDataRaw from "@/data/australia_map_data.json";

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
  WA: "8,839",
  NT: "2,285",
  QLD: "26,448",
  SA: "14,311",
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
  NSW: [602, 435],
  VIC: [575, 498],
  TAS: [569, 581],
};

const selectableStates = ["NSW", "NT", "QLD", "SA", "TAS", "VIC", "WA"] as const;
type ProfileState = "NATIONAL" | (typeof selectableStates)[number];

const profileDetails = {
  NATIONAL: {
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
    publicServiceLabel: "ACT Public Service Employees",
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
  return (
    <div className="relative h-[310px] overflow-hidden rounded-md bg-[#FBF5F1] p-2 sm:h-[380px] lg:h-[390px]">
      <svg
        viewBox="55 20 740 605"
        role="img"
        aria-label="Australian Public Service employee locations by state and territory"
        className="block h-full w-full"
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
              x={x - 19}
              y={y - 18}
              width="38"
              height="23"
              rx="11.5"
              fill={selectedState === code ? "#F0D9CF" : "#694834"}
            />
            <text
              x={x}
              y={y - 6}
              fill={selectedState === code ? "#694834" : "#FFFFFF"}
              fontFamily="inherit"
              fontSize="11"
              fontWeight="700"
              textAnchor="middle"
            >
              {code}
            </text>
            <text
              x={x}
              y={y + 13}
              fill={selectedState === code ? "#FFFFFF" : "#694834"}
              fontFamily="inherit"
              fontSize="8.5"
              fontWeight="500"
              textAnchor="middle"
            >
              Employees {stateEmployees[code]}
            </text>
          </g>
        ))}

        <circle cx="670" cy="455" r="5" fill="#694834" />
        <path d="M670 455H728" stroke="#694834" strokeWidth="1.4" />
        <rect x="728" y="444" width="48" height="23" rx="11.5" fill="#694834" />
        <text
          x="752"
          y="459"
          fill="#FFFFFF"
          fontFamily="inherit"
          fontSize="11"
          fontWeight="700"
          textAnchor="middle"
        >
          ACT
        </text>
        <text
          x="752"
          y="480"
          fill="#694834"
          fontFamily="inherit"
          fontSize="8.5"
          fontWeight="500"
          textAnchor="middle"
        >
          Employees 70,221
        </text>
      </svg>
      <p className="absolute bottom-3 left-4 text-[9px] leading-3 text-[#598303]">
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
    <article className="rounded-md bg-[#FBF5F1] p-4 sm:p-5">
      <h3 className="text-sm font-bold text-[#382219]">{title}</h3>
      <div className="mt-4 grid h-[170px] grid-cols-6 items-end gap-2 border-b border-[#CDBEB5] px-1 sm:h-[190px] sm:gap-3">
        {bars.map((bar, index) => (
          <div
            key={bar.label}
            className={`flex h-full flex-col items-center justify-end gap-1 ${
              bars.length === 2
                ? index === 0
                  ? "col-span-2 col-start-2"
                  : "col-span-2 col-start-4"
                : ""
            }`}
          >
            <span
              className="text-[9px] font-medium text-[#382219] animate-card-entrance"
              style={{ animationDelay: `${index * 0.09}s` }}
            >
              {bar.display}
            </span>
            <div className="flex min-h-0 w-full flex-1 items-end">
              <div
                className="w-full origin-bottom animate-defence-bar rounded-t-[3px]"
                style={{
                  height: `${(bar.value / maxValue) * 76}%`,
                  backgroundColor: bar.color,
                  animationDelay: `${index * 0.1}s`,
                }}
              />
            </div>
            <span className="min-h-7 text-center text-[8px] leading-[10px] text-[#382219]">
              {bar.label}
            </span>
          </div>
        ))}
      </div>
      <p className="mt-3 text-[9px] leading-3 text-[#598303]">{source}</p>
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
      setVisible(true);
      return;
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
      className={`${visible ? "animate-card-entrance" : "translate-y-5 opacity-0"} ${className}`}
      style={visible ? { animationDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  );
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

  return (
    <div className="flex min-h-screen flex-col justify-between bg-[#FAFAF0] font-sans text-[#1B240E] antialiased selection:bg-[#8AC900]/20">
      <ReportHeader slug={slug} report={report} currentPage="industry_profile" />

      <main className="mx-auto w-full max-w-[1440px] flex-1 space-y-3 px-4 py-5 sm:px-6 lg:px-8">
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

        <Reveal>
          <section className="rounded-lg border border-[#E9E5DE] bg-white px-5 py-4 sm:px-6">
            <p className="text-[10px] font-medium text-[#598303]">Industry Overview</p>
            <h1 className="mt-2 text-2xl font-bold text-[#694834] sm:text-[28px]">
              Industry Profile
            </h1>
            <p className="mt-2 text-[10px] leading-4 text-[#535862]">
              Select a state or territory on the map, or from the list, to open
              its Workforce Overview.
            </p>
          </section>
        </Reveal>

        <Reveal delay={0.08}>
          <section className="rounded-lg border border-[#E9E5DE] bg-white p-4 sm:p-5">
            <h2 className="text-base font-bold text-[#252D02]">
              Location of Australian Public Service (APS) Employees
            </h2>
            <div className="mt-3 flex flex-wrap items-center gap-1.5 border-b border-[#E9E5DE] pb-3">
              <span className="mr-2 text-[9px] font-semibold uppercase text-[#598303]">
                Choose a state or territory
              </span>
              {["NATIONAL", "NSW", "NT", "QLD", "SA", "TAS", "VIC", "WA"].map((tab) => {
                const active = tab === selectedState;
                const available = tab === "NATIONAL" || selectableStates.some((code) => code === tab);
                const className = `rounded-full border px-3 py-1 text-[9px] font-semibold ${
                  active
                    ? "border-[#8AC900] text-[#252D02]"
                    : "border-[#E9E5DE] bg-white text-[#535862]"
                }`;
                return available ? (
                  <button
                    key={tab}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setSelectedState(tab as ProfileState)}
                    className={`${className} transition-colors hover:border-[#8AC900]`}
                    style={active ? { backgroundColor: "#8AC900" } : undefined}
                  >
                    {tab}
                  </button>
                ) : (
                  <span key={tab} className={className}>{tab}</span>
                );
              })}
            </div>

            <div className="mt-4 grid items-start gap-3 lg:grid-cols-[minmax(0,2.55fr)_minmax(270px,1fr)]">
              <div className="min-w-0 space-y-3">
                <Reveal>
                  <WorkforceMap selectedState={selectedState} onSelectState={setSelectedState} />
                </Reveal>

                <div className="grid gap-3 lg:grid-cols-2">
                  <Reveal delay={0.12}>
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
                  <Reveal delay={0.18}>
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

              <div className="space-y-2.5">
                <Reveal>
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
                      href={selectedState === "NATIONAL" ? `/reports/${slug}/industry_profile_act` : selectedState === "NSW" ? `/reports/${slug}/industry_profile_nsw` : selectedState === "NT" ? `/reports/${slug}/industry_profile_nt` : selectedState === "QLD" ? `/reports/${slug}/industry_profile_qld` : selectedState === "SA" ? `/reports/${slug}/industry_profile_sa` : selectedState === "TAS" ? `/reports/${slug}/industry_profile_tas` : selectedState === "VIC" ? `/reports/${slug}/industry_profile_vic` : `/reports/${slug}/industry_profile_wa`}
                      className="mt-2.5 flex min-h-8 items-center justify-center gap-2 rounded-full bg-[#8AC900] px-3 text-[9px] font-bold text-[#252D02] transition-colors hover:bg-[#79B700]"
                    >
                      {profile.workforceCode} Workforce Overview <span aria-hidden="true">→</span>
                    </a>
                  </section>
                </Reveal>

                <Reveal delay={0.06}>
                  <section className="rounded-md bg-[#754D32] p-3.5 text-white">
                    <p className="text-[9px]">Total</p>
                    <strong className="mt-0.5 block text-lg leading-5">198,529</strong>
                    <p className="mt-1 text-[9px] leading-3.5 text-white/90">
                      The APS workforce spans 586 locations, 102 agencies and
                      234 job roles.
                    </p>
                  </section>
                </Reveal>

                {[
                  { label: "Capital Cities", value: "172,015", share: "86.6%" },
                  { label: "Regional", value: "24,918", share: "12.6%" },
                  { label: "Overseas", value: "1,596", share: "0.8%" },
                ].map((item, index) => (
                  <Reveal key={item.label} delay={0.1 + index * 0.05}>
                    <div className="flex items-center justify-between rounded-md bg-[#F8EEE8] px-3.5 py-2.5">
                      <div>
                        <p className="text-[9px] text-[#535862]">{item.label}</p>
                        <strong className="mt-0.5 block text-base leading-5 text-[#694834]">
                          {item.value}
                        </strong>
                      </div>
                      <span className="text-[9px] text-[#535862]">({item.share})</span>
                    </div>
                  </Reveal>
                ))}

                <Reveal delay={0.24}>
                  <section className="rounded-md bg-[#F0D7CC] p-3.5">
                    <strong className="block text-base leading-5 text-[#694834]">
                      4.4%
                    </strong>
                    <p className="text-[9px] text-[#535862]">Gender Pay Gap</p>
                    <p className="mt-2 border-t border-[#D9BCAF] pt-2 text-[8px] leading-3 text-[#535862]">
                      Source: Australian Government, State of the Service
                      Report 2024–25, 2025.
                    </p>
                  </section>
                </Reveal>
              </div>
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
