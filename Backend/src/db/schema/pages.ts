import {
  pgTable,
  uuid,
  varchar,
  text,
  boolean,
  timestamp,
  integer,
  pgEnum,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { reports } from './reports';

export const pageTypeEnum = pgEnum('page_type', [
  'transition_landing',   // P-02: Decision page (Intro vs Exec Summary)
  'introduction',         // P-03: Reference anchor page
  'executive_summary',    // P-04: Presentation anchor page
  'about',                // P-05: About PSA / informational text
  'methodology',          // P-05: Methodology info page
  'drivers_of_change',    // P-06: Megatrends / drivers template
  'industry_overview',    // P-07: Sector overview data dashboard
  'state_territory',      // P-07: State & territory workforce profile
  'industry_profile',     // P-07: Industry profile data dashboard
  'workforce_insights',   // P-08: Insights hub + detail template
  'strategies',           // P-09: Proposed strategies template
  'strategy_update',      // P-09: Update on previous strategies
  'existing_strategies',  // P-10: Existing industry strategies
  'federal_initiatives',  // P-10: Federal government initiatives
  'looking_forward',      // P-11: 2027 and beyond
  'pdf_download',         // P-12: Download and reference utility
  'custom',               // Catch-all for any additional page type
]);

export const pages = pgTable('pages', {
  id: uuid('id').primaryKey().defaultRandom(),
  reportId: uuid('report_id')
    .notNull()
    .references(() => reports.id, { onDelete: 'cascade' }),
  pageType: pageTypeEnum('page_type').notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull(),
  // Navigation context: which anchor page should the back button link to?
  // 'introduction' | 'executive_summary' | null (for top-level pages)
  parentPathway: varchar('parent_pathway', { length: 50 }),
  sortOrder: integer('sort_order').notNull().default(0),
  isPublished: boolean('is_published').notNull().default(false),
  metaTitle: varchar('meta_title', { length: 255 }),
  metaDescription: text('meta_description'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

export const pagesRelations = relations(pages, ({ one }) => ({
  report: one(reports, { fields: [pages.reportId], references: [reports.id] }),
}));
