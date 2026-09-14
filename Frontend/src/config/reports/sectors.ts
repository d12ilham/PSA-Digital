export interface SectorConfig {
  id: string; // Internal identifier: 'local-government' | 'public-safety' | 'federal-state' | 'correctional-services'
  industrySlugs: string[]; // Slugs from DB industries table that map to this sector
  name: string;
  badgeText: string;
  shortCode: string; // e.g. "LG WIR", "PS WIR"
  theme: {
    badgeBg: string;
    headerBg: string;
    headerText: string;
    accentColor: string;
    primaryColor: string;
    heroGradient?: string;
  };
  subtitle?: string;
  defaultCoverImage: string;
  defaultYear: string;
  defaultSlug: string;
  subsectors?: string[];
  defaultChapters: { key: string; label: string }[];
}

export const SECTOR_CONFIGS: Record<string, SectorConfig> = {
  "local-government": {
    id: "local-government",
    industrySlugs: ["local-government"],
    name: "Local Government",
    badgeText: "LOCAL GOVERNMENT",
    shortCode: "LG WIR",
    theme: {
      badgeBg: "bg-lg-dark",
      headerBg: "#252D02",
      headerText: "#FFFFFF",
      accentColor: "#85CC00",
      primaryColor: "#046D2A",
    },
    subtitle: "Councils and Regional Authorities across Australia",
    defaultCoverImage: "/images/reports/local-government.png",
    defaultYear: "2026",
    defaultSlug: "local-government-workforce-insights-report",
    defaultChapters: [
      { key: "introduction", label: "Introduction" },
      { key: "about", label: "About Public Skills Australia" },
      { key: "methodology", label: "Methodology" },
      { key: "executive_summary", label: "Executive Summary" },
      { key: "drivers_of_change", label: "Drivers of Change" },
      { key: "industry_overview", label: "Industry-Sector Overview" },
      { key: "state_territory", label: "State and Territory Profile" },
      { key: "industry_profile", label: "Industry Profile" },
      { key: "workforce_insights", label: "Workforce Insights" },
      { key: "workforce_strategies", label: "2026 Proposed Strategies" },
      { key: "update_2025_strategies", label: "Update on 2025 Strategies" },
      { key: "existing_strategies", label: "Existing Industry-Sector Strategies" },
      { key: "federal_initiatives", label: "Federal Government Initiatives" },
      { key: "looking_forward", label: "Looking Forward" },
      { key: "downloads", label: "Downloads & References" },
    ],
  },

  "public-safety": {
    id: "public-safety",
    industrySlugs: ["public-safety"],
    name: "Public Safety",
    badgeText: "PUBLIC SAFETY",
    shortCode: "PS WIR",
    theme: {
      badgeBg: "bg-[#38485B]",
      headerBg: "#1E293B",
      headerText: "#FFFFFF",
      accentColor: "#FF8400",
      primaryColor: "#38485B",
    },
    subtitle: "Fire and Emergency Services · Police · Defence",
    defaultCoverImage: "/images/reports/public-safety.png",
    defaultYear: "2026",
    defaultSlug: "public-safety-wir-2026",
    subsectors: ["Fire and Emergency Services", "Police", "Defence"],
    defaultChapters: [
      { key: "introduction", label: "Introduction" },
      { key: "about", label: "About Public Skills Australia" },
      { key: "methodology", label: "Methodology" },
      { key: "executive_summary", label: "Executive Summary" },
      { key: "drivers_of_change", label: "Drivers of Change" },
      { key: "industry_overview", label: "Industry-Sector Overview" },
      { key: "state_territory", label: "State and Territory Profile" },
      { key: "workforce_insights", label: "Workforce Insights" },
      { key: "workforce_strategies", label: "Workforce Strategies" },
      { key: "looking_forward", label: "Looking Forward" },
      { key: "downloads", label: "Downloads & References" },
    ],
  },

  "federal-state": {
    id: "federal-state",
    industrySlugs: [
      "federal-state",
      "federal-state-territory-government",
      "federal-and-state-territory-government",
    ],
    name: "Federal and State/Territory Government",
    badgeText: "FEDERAL AND STATE/TERRITORY GOVERNMENT",
    shortCode: "FS WIR",
    theme: {
      badgeBg: "bg-[#694834]",
      headerBg: "#382219",
      headerText: "#FFFFFF",
      accentColor: "#E07A5F",
      primaryColor: "#694834",
    },
    subtitle: "Federal Agencies and State/Territory Public Services",
    defaultCoverImage: "/images/reports/federal-state.png",
    defaultYear: "2026",
    defaultSlug: "federal-state-territory-wir-2026",
    subsectors: ["Federal Public Service", "State & Territory Public Sector"],
    defaultChapters: [
      { key: "introduction", label: "Introduction" },
      { key: "about", label: "About Public Skills Australia" },
      { key: "methodology", label: "Methodology" },
      { key: "executive_summary", label: "Executive Summary" },
      { key: "drivers_of_change", label: "Drivers of Change" },
      { key: "industry_overview", label: "Industry-Sector Overview" },
      { key: "state_territory", label: "State and Territory Profile" },
      { key: "workforce_insights", label: "Workforce Insights" },
      { key: "workforce_strategies", label: "Workforce Strategies" },
      { key: "looking_forward", label: "Looking Forward" },
      { key: "downloads", label: "Downloads & References" },
    ],
  },

  "correctional-services": {
    id: "correctional-services",
    industrySlugs: ["correctional-services"],
    name: "Correctional Services",
    badgeText: "CORRECTIONAL SERVICES",
    shortCode: "CS WIR",
    theme: {
      badgeBg: "bg-[#0B6DA8]",
      headerBg: "#063B5D",
      headerText: "#FFFFFF",
      accentColor: "#38BDF8",
      primaryColor: "#0B6DA8",
    },
    subtitle: "Custodial and Community Corrections across Australia",
    defaultCoverImage: "/images/reports/correctional-services.png",
    defaultYear: "2026",
    defaultSlug: "correctional-services-wir-2026",
    subsectors: ["Custodial Corrections", "Community Corrections"],
    defaultChapters: [
      { key: "introduction", label: "Introduction" },
      { key: "about", label: "About Public Skills Australia" },
      { key: "methodology", label: "Methodology" },
      { key: "executive_summary", label: "Executive Summary" },
      { key: "drivers_of_change", label: "Drivers of Change" },
      { key: "industry_overview", label: "Industry-Sector Overview" },
      { key: "state_territory", label: "State and Territory Profile" },
      { key: "workforce_insights", label: "Workforce Insights" },
      { key: "workforce_strategies", label: "Workforce Strategies" },
      { key: "looking_forward", label: "Looking Forward" },
      { key: "downloads", label: "Downloads & References" },
    ],
  },
};

/**
 * Resolves the sector configuration by checking:
 * 1. Industry slug/name from API (e.g. from report.industry.slug or report.industry.name)
 * 2. Fallback check against the report's URL slug
 */
export function resolveSector(
  industrySlugOrName?: string | null,
  reportSlug?: string | null,
): SectorConfig {
  const normIndustry = (industrySlugOrName || "").toLowerCase().trim();
  const normSlug = (reportSlug || "").toLowerCase().trim();

  // 1. Direct check against industrySlugs
  for (const sector of Object.values(SECTOR_CONFIGS)) {
    if (
      sector.industrySlugs.some(
        (slug) => slug === normIndustry || normIndustry.includes(slug),
      ) ||
      normIndustry.includes(sector.name.toLowerCase())
    ) {
      return sector;
    }
  }

  // 2. Fallback check against reportSlug keywords
  if (normSlug.includes("public-safety")) return SECTOR_CONFIGS["public-safety"];
  if (normSlug.includes("federal") || normSlug.includes("state-territory")) {
    return SECTOR_CONFIGS["federal-state"];
  }
  if (normSlug.includes("correctional")) {
    return SECTOR_CONFIGS["correctional-services"];
  }

  // 3. Default fallback to Local Government
  return SECTOR_CONFIGS["local-government"];
}
