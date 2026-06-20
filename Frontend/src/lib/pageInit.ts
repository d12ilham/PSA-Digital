import { api } from './api';

export interface PageInitItem {
  title: string;
  pageType: string;
  slug: string;
  sortOrder: number;
  parentPathway?: 'introduction' | 'executive_summary';
}

export const DEFAULT_REPORT_PAGES: PageInitItem[] = [
  { title: 'About', pageType: 'about', slug: 'about', sortOrder: 1 },
  { title: 'Executive Summary', pageType: 'executive_summary', slug: 'executive-summary', sortOrder: 2 },
  { title: 'Drivers of Change', pageType: 'drivers_of_change', slug: 'drivers-of-change', sortOrder: 3 },
  { title: 'Sector Overview', pageType: 'industry_overview', slug: 'sector-overview', sortOrder: 4, parentPathway: 'executive_summary' },
  { title: 'State & Territory Profile', pageType: 'state_territory', slug: 'state-territory-profile', sortOrder: 5, parentPathway: 'executive_summary' },
  { title: 'Industry Profile', pageType: 'industry_profile', slug: 'industry-profile', sortOrder: 6, parentPathway: 'executive_summary' },
  { title: 'Workforce Insights', pageType: 'workforce_insights', slug: 'workforce-insights', sortOrder: 7 },
  { title: 'Workforce Strategies', pageType: 'strategies', slug: 'workforce-strategies', sortOrder: 8 },
  { title: 'Looking Forward', pageType: 'looking_forward', slug: 'looking-forward', sortOrder: 9 },
];

export async function initializeReportPages(reportId: string): Promise<void> {
  for (const page of DEFAULT_REPORT_PAGES) {
    try {
      await api.post(`/reports/${reportId}/pages`, {
        pageType: page.pageType,
        title: page.title,
        slug: page.slug,
        sortOrder: page.sortOrder,
        parentPathway: page.parentPathway,
        isPublished: true,
      });
    } catch (error) {
      console.error(`Failed to initialize default page [${page.title}] for report [${reportId}]:`, error);
    }
  }
}
