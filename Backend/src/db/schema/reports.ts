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
import { users } from './users';

export const reportStatusEnum = pgEnum('report_status', ['draft', 'published', 'archived']);

// ── Industries (separate dimension) ─────────────────────────────────────────
export const industries = pgTable('industries', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 100 }).notNull().unique(),
  slug: varchar('slug', { length: 100 }).notNull().unique(),
  description: text('description'),
  sortOrder: integer('sort_order').notNull().default(0),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

// ── Report Years (separate dimension) ────────────────────────────────────────
export const reportYears = pgTable('report_years', {
  id: uuid('id').primaryKey().defaultRandom(),
  year: integer('year').notNull().unique(),
  label: varchar('label', { length: 20 }).notNull(), // e.g. "2026"
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});

// ── Reports ──────────────────────────────────────────────────────────────────
export const reports = pgTable('reports', {
  id: uuid('id').primaryKey().defaultRandom(),
  industryId: uuid('industry_id')
    .notNull()
    .references(() => industries.id, { onDelete: 'restrict' }),
  yearId: uuid('year_id')
    .notNull()
    .references(() => reportYears.id, { onDelete: 'restrict' }),
  title: varchar('title', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  shortDescription: text('short_description'),
  coverImageUrl: text('cover_image_url'),
  pdfFileUrl: text('pdf_file_url'),
  previousPdfUrl: text('previous_pdf_url'),
  psaSectorPageUrl: text('psa_sector_page_url'), // "Back to PSA website" link
  contactUrl: text('contact_url'),
  status: reportStatusEnum('status').notNull().default('draft'),
  publishedAt: timestamp('published_at', { withTimezone: true }),
  isFeatured: boolean('is_featured').notNull().default(false),
  sortOrder: integer('sort_order').notNull().default(0),
  // Notes for the home page card (e.g., "Includes Defence, Fire and Emergency Services, and Police")
  cardNote: text('card_note'),
  createdBy: uuid('created_by').references(() => users.id, { onDelete: 'set null' }),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

// ── Report KPI Cards ─────────────────────────────────────────────────────────
export const reportKpis = pgTable('report_kpis', {
  id: uuid('id').primaryKey().defaultRandom(),
  reportId: uuid('report_id')
    .notNull()
    .references(() => reports.id, { onDelete: 'cascade' }),
  label: varchar('label', { length: 100 }).notNull(),
  value: varchar('value', { length: 100 }).notNull(),
  prefix: varchar('prefix', { length: 20 }),
  suffix: varchar('suffix', { length: 20 }),
  description: text('description'),
  sortOrder: integer('sort_order').notNull().default(0),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

// ── Relations ─────────────────────────────────────────────────────────────────
export const industriesRelations = relations(industries, ({ many }) => ({
  reports: many(reports),
}));

export const reportYearsRelations = relations(reportYears, ({ many }) => ({
  reports: many(reports),
}));

export const reportsRelations = relations(reports, ({ one, many }) => ({
  industry: one(industries, { fields: [reports.industryId], references: [industries.id] }),
  year: one(reportYears, { fields: [reports.yearId], references: [reportYears.id] }),
  createdBy: one(users, { fields: [reports.createdBy], references: [users.id] }),
  kpis: many(reportKpis),
}));

export const reportKpisRelations = relations(reportKpis, ({ one }) => ({
  report: one(reports, { fields: [reportKpis.reportId], references: [reports.id] }),
}));
