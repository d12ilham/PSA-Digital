import React from "react";
import { localGovernmentViews } from "./local-government";
import { publicSafetyViews } from "./public-safety";
import { federalStateViews } from "./federal-state";
import { correctionalServicesViews } from "./correctional-services";
import SectorViewPlaceholder from "./SectorViewPlaceholder";
import { resolveSector } from "@/config/reports/sectors";

/**
 * Sector registry dictionary mapping sector ID to its views
 */
const SECTOR_VIEW_REGISTRY: Record<
  string,
  Record<string, React.ComponentType<{ slug: string; report: any; pageType?: string }>>
> = {
  "local-government": localGovernmentViews,
  "public-safety": publicSafetyViews,
  "federal-state": federalStateViews,
  "correctional-services": correctionalServicesViews,
};

/**
 * Resolves the appropriate chapter view for a given report and pageType.
 * If the view has been developed, it returns that component.
 * If not, it returns a high-fidelity, sector-branded SectorViewPlaceholder.
 */
export function getReportView({
  slug,
  pageType,
  report,
}: {
  slug: string;
  pageType: string;
  report: any;
}): React.ReactElement {
  const sector = resolveSector(report?.industry?.slug || report?.industry?.name, slug);
  const sectorViews = SECTOR_VIEW_REGISTRY[sector.id] || {};

  // Standardize pageType key lookup
  const normalizedPageType = pageType.toLowerCase().trim();

  // Check if sector has a dedicated view for this pageType
  const Component = sectorViews[normalizedPageType];

  if (Component) {
    return <Component slug={slug} report={report} pageType={pageType} />;
  }

  // Fallback: If the sector hasn't built their own view yet, render the placeholder
  return (
    <SectorViewPlaceholder
      slug={slug}
      pageType={pageType}
      report={report}
      sector={sector}
    />
  );
}
