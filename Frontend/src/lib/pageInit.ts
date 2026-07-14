import { api } from './api';

export interface PageTemplate {
  id: string;
  title: string;
  pageType: string;
  slug: string;
  parentPathway?: string | null;
  sortOrder: number;
}

// Legacy hardcoded fallback used only when no templates are defined in the DB
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
  { title: 'Workforce Strategies', pageType: 'strategies', slug: 'workforce-strategies', sortOrder: 10 },
  { title: 'Looking Forward', pageType: 'looking_forward', slug: 'looking-forward', sortOrder: 11 },
];

/**
 * Fetches templates from the API (admin-managed).
 * Falls back to hardcoded defaults if none exist yet.
 */
export async function fetchPageTemplates(): Promise<Omit<PageTemplate, 'id'>[]> {
  try {
    const templates = await api.get<PageTemplate[]>('/page-templates');
    if (templates && templates.length > 0) {
      return templates.sort((a, b) => a.sortOrder - b.sortOrder);
    }
  } catch (err) {
    console.warn('Could not fetch page templates from API, using defaults:', err);
  }
  return DEFAULT_REPORT_PAGES;
}

/**
 * Seeds chapter pages for a report using the global admin-defined template.
 * Already-existing pages (same slug) are silently skipped.
 */
export async function initializeReportPages(reportId: string): Promise<void> {
  const templates = await fetchPageTemplates();
  for (const tpl of templates) {
    try {
      await api.post(`/reports/${reportId}/pages`, {
        pageType: tpl.pageType,
        title: tpl.title,
        slug: tpl.slug,
        sortOrder: tpl.sortOrder,
        parentPathway: tpl.parentPathway ?? undefined,
        isPublished: false,
      });
    } catch (error: any) {
      // Skip duplicate slug errors silently; log everything else
      if (!error.message?.includes('duplicate') && !error.message?.includes('already')) {
        console.error(`Failed to initialize page [${tpl.title}]:`, error);
      }
    }
  }
}
