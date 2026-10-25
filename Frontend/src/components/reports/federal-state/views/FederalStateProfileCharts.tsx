"use client";

import type { ReactNode } from "react";
import { GenderChartHeading } from "./DocumentGenderGraphic";
import chartStyles from "./FederalStateProfileCharts.module.css";

export function ChartScroll({ children }: { children: ReactNode }) {
  return <div role="region" aria-label="Chart years and values" tabIndex={0} className="min-w-0 overflow-x-auto pb-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#754C2D]">{children}</div>;
}

export function ProfileColumnChart({ title, data, source, surface = "standard", wide = false, accent, genderGraphic = false }: {
  title: string;
  data: { label: ReactNode; value: number; text: string; muted?: boolean }[];
  source: string;
  surface?: "standard" | "representation";
  wide?: boolean;
  accent?: string;
  genderGraphic?: boolean;
}) {
  const positive = Math.max(0, ...data.map(item => item.value));
  const negative = Math.min(0, ...data.map(item => item.value));
  const range = positive - negative || 1;
  const baseline = negative < 0 ? 24 + (-negative / range) * 190 : 0;
  const columns = `repeat(${data.length}, minmax(0, 1fr))`;
  return (
    <article data-profile-chart data-chart-type="column" data-chart-surface={surface} className={`${chartStyles[surface]} flex h-full min-w-0 flex-col rounded-md p-4 text-black sm:p-5 ${wide ? "lg:col-span-2" : ""}`} style={{ borderTop: accent ? `10px solid ${accent}` : undefined }}>
      {genderGraphic ? <GenderChartHeading>{title}</GenderChartHeading> : <h3 className="min-h-[84px] text-lg font-bold leading-7">{title}</h3>}
      <ChartScroll>
        <div style={{ minWidth: `${Math.max(320, data.length * 100)}px` }}>
          <div data-chart-plot className="relative mt-3 grid h-[260px] gap-4 px-2" style={{ gridTemplateColumns: columns }}>
            <div className="pointer-events-none absolute inset-x-2 border-t-2 border-[#9E9087]" style={{ bottom: baseline }} />
            {data.map((item, index) => {
              const height = item.value === 0 ? 0 : Math.max(2, Math.abs(item.value) / range * 190);
              const down = item.value < 0;
              return <div key={index} className="relative min-w-0">
                <span data-chart-value className="absolute inset-x-0 text-center text-base font-bold tabular-nums" style={{ bottom: down ? baseline - height - 28 : baseline + height + 8 }}>{item.text}</span>
                {height > 0 && <div data-chart-bar className={`absolute left-1/2 w-[94%] max-w-[128px] -translate-x-1/2 ${down ? "rounded-b-sm" : "rounded-t-sm"} ${item.muted ? "bg-[#B7A89D]" : "bg-[#754D32]"}`} style={{ height, bottom: down ? baseline - height : baseline }} />}
              </div>;
            })}
          </div>
          <div className="mt-3 grid min-h-[100px] gap-4 px-2" style={{ gridTemplateColumns: columns }}>
            {data.map((item, index) => <span key={index} className="text-center text-sm leading-5">{item.label}</span>)}
          </div>
        </div>
      </ChartScroll>
      <p data-chart-source className="mt-auto min-h-[80px] border-t border-[#E6DCD5] pt-4 text-xs leading-5">{source}</p>
    </article>
  );
}
