"use client";

import React from "react";
import ReportFooter from "@/components/layout/ReportFooter";
import ReportHeader from "@/components/layout/ReportHeader";
import ReportNavButtons from "@/components/layout/ReportNavButtons";

type Report = {
  contactUrl?: string;
  pdfFileUrl?: string;
  year?: { label: string };
  industry?: { slug?: string; name?: string };
};

const source = "Source: Productivity Commission 2026, Report on Government Services 2026 Justice Part C – 8 Corrective Services, Table 8A.9";

const nationalRatios = [
  { year: "2015-16", value: 16.5 },
  { year: "2016-17", value: 16.7 },
  { year: "2017-18", value: 15.3 },
  { year: "2018-19", value: 16.4 },
  { year: "2019-20", value: 16.9 },
  { year: "2020-21", value: 15.6 },
  { year: "2021-22", value: 15.9 },
  { year: "2023-24", value: 15.6 },
  { year: "2024-25", value: 15.4 },
];

const jurisdictions = [
  { name: "NT", value: 9.7 },
  { name: "QLD", value: 18.4 },
  { name: "WA", value: 13 },
  { name: "SA", value: 31.1 },
  { name: "NSW", value: 18.4 },
  { name: "ACT", value: 6.4 },
  { name: "VIC", value: 7.3 },
  { name: "TAS", value: 16 },
];

const orderTypes = [
  { name: "Post-sentence", color: "#788EDE" },
  { name: "Supervision", color: "#9DA8D0" },
  { name: "Reparation", color: "#6869A7" },
  { name: "Restricted movement", color: "#424996" },
] as const;

const orders = [
  { year: "2024-2025", values: [521, 74888, 12771, 1993] },
  { year: "2023-2024", values: [470, 74359, 12827, 1774] },
  { year: "2022-2023", values: [448, 73190, 12320, 1710] },
  { year: "2021-2022", values: [469, 73506, 12671, 1728] },
];

function useChartReveal() {
  const ref = React.useRef<HTMLDivElement>(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const frame = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(frame);
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.12 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

function Figure({ title, axis, children }: { title: string; axis?: string; children: React.ReactNode }) {
  return (
    <figure className="w-full rounded-lg border border-[#E9EAEB] bg-white px-5 py-6 sm:px-7">
      <figcaption className="text-base font-bold leading-6 text-[#252D02] sm:text-lg">{title}</figcaption>
      {axis && <p className="mt-0.5 text-[11px] leading-4 text-[#667085]">{axis}</p>}
      {children}
      <p className="mt-4 text-[11px] italic leading-5 text-[#667085]">{source}</p>
    </figure>
  );
}

function NationalRatioChart() {
  const { ref, visible } = useChartReveal();
  const width = 1000;
  const height = 340;
  const left = 60;
  const right = 24;
  const top = 34;
  const bottom = 55;
  const plotWidth = width - left - right;
  const plotHeight = height - top - bottom;
  const x = (index: number) => left + (index / (nationalRatios.length - 1)) * plotWidth;
  const y = (value: number) => top + ((17 - value) / 2.5) * plotHeight;
  const points = nationalRatios.map(({ value }, index) => `${x(index)},${y(value)}`).join(" ");

  return (
    <div ref={ref} className="mt-5 overflow-x-auto">
      <svg viewBox={`0 0 ${width} ${height}`} className="min-w-[660px] w-full" role="img" aria-label="Australia community corrections offender-to-staff ratio from 2015-16 to 2024-25">
        {[17, 16.5, 16, 15.5, 15, 14.5].map((tick) => (
          <g key={tick}>
            <line x1={left} x2={width - right} y1={y(tick)} y2={y(tick)} stroke="#ECEDEF" strokeWidth="1" />
            <text x={left - 22} y={y(tick) + 4} textAnchor="end" fill="#83868E" fontSize="13">{tick.toFixed(1)}</text>
          </g>
        ))}
        <line x1={left} x2={width - right} y1={y(14.5)} y2={y(14.5)} stroke="#252D02" strokeWidth="2" />
        <polyline
          fill="none"
          stroke="#9DA8D0"
          strokeWidth="3"
          strokeLinejoin="round"
          strokeLinecap="round"
          points={points}
          style={{ strokeDasharray: 1500, strokeDashoffset: visible ? 0 : 1500, transition: "stroke-dashoffset 1.2s ease-out" }}
        />
        {nationalRatios.map(({ year, value }, index) => (
          <g key={year} style={{ opacity: visible ? 1 : 0, transition: `opacity 250ms ease-out ${350 + index * 95}ms` }}>
            <circle cx={x(index)} cy={y(value)} r="6" fill="#9DA8D0" />
            <text x={x(index)} y={y(value) + (value === 15.3 || index > 4 ? 28 : -15)} textAnchor="middle" fill="#172036" fontSize="16" fontWeight="700">{value.toFixed(1)}</text>
            <text x={x(index)} y={height - 20} textAnchor="middle" fill="#252D02" fontSize="13">{year}</text>
            <title>{`${year}: ${value.toFixed(1)}`}</title>
          </g>
        ))}
      </svg>
    </div>
  );
}

function JurisdictionRatios() {
  return (
    <div className="mt-5 grid grid-cols-4 gap-2 sm:grid-cols-8">
      {jurisdictions.map(({ name, value }) => (
        <div key={name} title={`${name}: ${value}`} className="flex min-h-[76px] flex-col items-center justify-center rounded-md bg-[#F0F1F9] px-1 py-2 text-center transition-colors duration-200 hover:bg-[#DEE2F3]">
          <span className="text-[11px] font-semibold leading-4 text-[#424996]">{name}</span>
          <strong className="text-xl leading-7 tabular-nums text-[#172036]">{value}</strong>
        </div>
      ))}
    </div>
  );
}

function OrderTypesChart() {
  const { ref, visible } = useChartReveal();

  return (
    <div ref={ref} className="mt-5 overflow-x-auto">
      <div className="min-w-[680px]">
        <div className="space-y-4">
          {orders.map(({ year, values }, yearIndex) => (
            <div key={year} className="grid grid-cols-[90px_minmax(0,1fr)] items-center gap-4">
              <strong className="text-xs text-[#424996]">{year}</strong>
              <div className="space-y-1.5">
                {values.map((value, typeIndex) => (
                  <div key={orderTypes[typeIndex].name} className="relative h-3.5">
                    <div
                      className="h-full rounded-r-sm transition-[width,filter] duration-700 ease-out hover:brightness-90"
                      style={{ width: visible ? `${(value / 80000) * 100}%` : "0%", backgroundColor: orderTypes[typeIndex].color, transitionDelay: `${yearIndex * 100 + typeIndex * 35}ms` }}
                      title={`${year} ${orderTypes[typeIndex].name}: ${value.toLocaleString()}`}
                    />
                    <span className="absolute top-1/2 -translate-y-1/2 pl-2 text-[10px] font-semibold tabular-nums text-[#424996]" style={{ left: `${(value / 80000) * 100}%` }}>{value.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="ml-[106px] mt-3 grid grid-cols-9 border-t border-[#D5D7DA] pt-2 text-[10px] tabular-nums text-[#667085]">
          {[0, 10000, 20000, 30000, 40000, 50000, 60000, 70000, 80000].map((tick) => <span key={tick} className="text-center first:text-left last:text-right">{tick.toLocaleString()}</span>)}
        </div>
        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-[11px] text-[#424996]">
          {orderTypes.map(({ name, color }) => <span key={name} className="inline-flex items-center gap-2"><i className="size-2.5 rounded-sm" style={{ backgroundColor: color }} />{name}</span>)}
        </div>
      </div>
    </div>
  );
}

export default function CorrectionalServicesIndustryProfileCommunityView({ slug, report }: { slug: string; report: Report }) {
  return (
    <div className="flex min-h-screen flex-col bg-[#FAFAF0] font-sans text-[#252D02] antialiased">
      <ReportHeader slug={slug} report={report} currentPage="industry_profile" />
      <main className="mx-auto w-full max-w-[1504px] flex-1 space-y-6 px-4 py-10 sm:px-6 lg:px-8">
        <ReportNavButtons
          slug={slug}
          currentPage="industry_profile"
          prev={{ label: "Industry Profile", href: `/reports/${slug}/industry_profile` }}
          next={{ label: "Industry Profile", href: `/reports/${slug}/industry_profile_presentation` }}
        />
        <section className="rounded-2xl border border-[#E9EAEB] bg-white p-6">
          <p className="text-xs font-bold uppercase leading-6 text-[#598303]">Data Story 2</p>
          <h1 className="mt-3 text-[32px] font-bold leading-tight text-[#424996] sm:text-[40px] sm:leading-[54px]">Demand for Community Corrections</h1>
        </section>
        <section aria-label="Demand for Community Corrections charts" className="space-y-6 bg-white px-4 py-8 sm:px-6 lg:px-8">
          <div className="max-w-[1120px] space-y-6">
            <Figure title="Community Corrections Offender-to-Staff Ratio – Australia" axis="Y axis: Ratio, 14.5–17.0">
              <NationalRatioChart />
            </Figure>
            <Figure title="Community Corrections Offender-to-Staff Ratio – by Jurisdiction">
              <JurisdictionRatios />
            </Figure>
            <Figure title="Community Corrections Offender-to-Staff Ratio – by Jurisdiction" axis="X axis: 0–80,000 · rows by financial year">
              <OrderTypesChart />
            </Figure>
          </div>
        </section>
      </main>
      <ReportFooter contactUrl={report.contactUrl} reportName="Correctional Services Workforce Insights Report" />
    </div>
  );
}
