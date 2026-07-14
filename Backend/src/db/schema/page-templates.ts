import {
  pgTable,
  uuid,
  varchar,
  integer,
  timestamp,
} from 'drizzle-orm/pg-core';

/**
 * Global chapter structure template.
 * Admin defines these once; when "Init Chapters Structure" is clicked on any
 * report, its entries are used to seed the report's pages.
 */
export const pageTemplates = pgTable('page_templates', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: varchar('title', { length: 255 }).notNull(),
  pageType: varchar('page_type', { length: 100 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull(),
  // null = top-level chapter; otherwise = pageType of its parent chapter
  parentPathway: varchar('parent_pathway', { length: 100 }),
  sortOrder: integer('sort_order').notNull().default(0),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});
