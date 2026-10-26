import { api } from './api';
import { resolveSector } from '@/config/reports/sectors';

export interface PageTemplate {
  id?: string;
  title: string;
  pageType: string;
  slug: string;
  parentPathway?: string | null;
  sortOrder: number;
}

// Legacy hardcoded fallback used only when no sector matches
export const DEFAULT_REPORT_PAGES: Omit<PageTemplate, 'id'>[] = [
  { title: 'About', pageType: 'about', slug: 'about', sortOrder: 1 },
  { title: 'Introduction', pageType: 'introduction', slug: 'introduction', sortOrder: 2, parentPathway: 'about' },
  { title: 'Methodology', pageType: 'methodology', slug: 'methodology', sortOrder: 3, parentPathway: 'about' },
  { title: 'Executive Summary', pageType: 'executive_summary', slug: 'executive-summary', sortOrder: 4 },
  { title: 'Drivers of Change', pageType: 'drivers_of_change', slug: 'drivers-of-change', sortOrder: 5 },
  { title: 'Sector Overview', pageType: 'industry_overview', slug: 'sector-overview', sortOrder: 6, parentPathway: 'executive_summary' },
  { title: 'State & Territory Profile', pageType: 'state_territory', slug: 'state-territory-profile', sortOrder: 7, parentPathway: 'executive_summary' },
  { title: 'Industry Profile', pageType: 'industry_profile', slug: 'industry-profile', sortOrder: 8, parentPathway: 'executive_summary' },
  { title: 'Workforce Insights', pageType: 'workforce_insights', slug: 'workforce-insights', sortOrder: 9 },
  { title: 'Workforce Strategies', pageType: 'workforce_strategies', slug: 'workforce-strategies', sortOrder: 10 },
  { title: 'Looking Forward', pageType: 'looking_forward', slug: 'looking-forward', sortOrder: 11 },
  { title: 'Downloads & References', pageType: 'downloads', slug: 'downloads', sortOrder: 12 },
];

/**
 * Returns chapter templates specifically configured for the requested sector/template.
 */
export function getSectorTemplates(sectorOrIndustry?: string | null): Omit<PageTemplate, 'id'>[] {
  const sector = resolveSector(sectorOrIndustry);
  if (sector && sector.defaultChapters && sector.defaultChapters.length > 0) {
    return sector.defaultChapters.map((ch, idx) => ({
      title: ch.label,
      pageType: ch.key,
      slug: ch.key.replace(/_/g, '-'),
      sortOrder: idx + 1,
      parentPathway: ch.parentPathway ?? null,
    }));
  }
  return DEFAULT_REPORT_PAGES;
}

/**
 * Fetches templates from the API (admin-managed).
 * Falls back to sector-specific templates or default fallback.
 */
export async function fetchPageTemplates(sectorOrIndustry?: string | null): Promise<Omit<PageTemplate, 'id'>[]> {
  try {
    const templates = await api.get<PageTemplate[]>('/page-templates');
    if (templates && templates.length > 0) {
      return templates.sort((a, b) => a.sortOrder - b.sortOrder);
    }
  } catch (err) {
    console.warn('Could not fetch page templates from API, using sector defaults:', err);
  }
  return getSectorTemplates(sectorOrIndustry);
}

/**
 * Seeds chapter pages for a report using the sector-specific template.
 * Automatically marks seeded chapters as published so they are immediately accessible in the reader.
 * Already-existing pages (same slug) are silently skipped.
 */
export async function initializeReportPages(
  reportId: string,
  sectorOrIndustry?: string | null,
): Promise<void> {
  const templates = getSectorTemplates(sectorOrIndustry);
  for (const tpl of templates) {
    try {
      await api.post(`/reports/${reportId}/pages`, {
        pageType: tpl.pageType,
        title: tpl.title,
        slug: tpl.slug,
        sortOrder: tpl.sortOrder,
        parentPathway: tpl.parentPathway ?? undefined,
        isPublished: true,
      });
    } catch (error: any) {
      // Skip duplicate slug errors silently; log everything else
      if (!error.message?.includes('duplicate') && !error.message?.includes('already')) {
        console.error(`Failed to initialize page [${tpl.title}]:`, error);
      }
    }
  }
}
