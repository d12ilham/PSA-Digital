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

export const strategyTypeEnum = pgEnum('strategy_type', [
  'proposed',    // 2026 Proposed strategies
  'existing',    // Existing industry-sector strategies
  'federal',     // Federal government initiatives
  'update',      // Update on 2025 strategies
]);

export const strategyStatusEnum = pgEnum('strategy_status', ['draft', 'active', 'archived']);

export const strategies = pgTable('strategies', {
  id: uuid('id').primaryKey().defaultRandom(),
  reportId: uuid('report_id')
    .notNull()
    .references(() => reports.id, { onDelete: 'cascade' }),
  strategyType: strategyTypeEnum('strategy_type').notNull(),
  strategyYear: integer('strategy_year'), // e.g. 2025 or 2026
  strategyNumber: integer('strategy_number'),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  deliveryTimeline: varchar('delivery_timeline', { length: 100 }),
  leadAgency: varchar('lead_agency', { length: 255 }),
  updateNote: text('update_note'), // For 'update' type — progress note on 2025 strategy
  status: strategyStatusEnum('status').notNull().default('active'),
  sortOrder: integer('sort_order').notNull().default(0),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

export const strategiesRelations = relations(strategies, ({ one }) => ({
  report: one(reports, { fields: [strategies.reportId], references: [reports.id] }),
}));
