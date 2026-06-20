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

export const insightThemeEnum = pgEnum('insight_theme', ['theme_1', 'theme_2', 'theme_3']);

// ── Workforce Insights ────────────────────────────────────────────────────────
export const insights = pgTable('insights', {
  id: uuid('id').primaryKey().defaultRandom(),
  reportId: uuid('report_id')
    .notNull()
    .references(() => reports.id, { onDelete: 'cascade' }),
  theme: insightThemeEnum('theme').notNull().default('theme_1'),
  insightNumber: integer('insight_number').notNull(),
  title: varchar('title', { length: 255 }).notNull(),
  summary: text('summary'),
  detail: text('detail'),
  evidenceText: text('evidence_text'),
  sourceNote: text('source_note'),
  tags: varchar('tags', { length: 100 }).array(),
  isPublished: boolean('is_published').notNull().default(false),
  sortOrder: integer('sort_order').notNull().default(0),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

// ── Drivers of Change ─────────────────────────────────────────────────────────
export const driversOfChange = pgTable('drivers_of_change', {
  id: uuid('id').primaryKey().defaultRandom(),
  reportId: uuid('report_id')
    .notNull()
    .references(() => reports.id, { onDelete: 'cascade' }),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  megatrendTags: varchar('megatrend_tags', { length: 100 }).array(),
  sortOrder: integer('sort_order').notNull().default(0),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

// ── Relations ─────────────────────────────────────────────────────────────────
export const insightsRelations = relations(insights, ({ one }) => ({
  report: one(reports, { fields: [insights.reportId], references: [reports.id] }),
}));

export const driversRelations = relations(driversOfChange, ({ one }) => ({
  report: one(reports, { fields: [driversOfChange.reportId], references: [reports.id] }),
}));
