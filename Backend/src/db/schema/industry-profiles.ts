import {
  pgTable,
  uuid,
  varchar,
  text,
  boolean,
  timestamp,
  integer,
  numeric,
  jsonb,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { reports } from './reports';

// Represents one state/territory row from the "State and Territory Workforce Profile" section
export const industryProfiles = pgTable('industry_profiles', {
  id: uuid('id').primaryKey().defaultRandom(),
  reportId: uuid('report_id')
    .notNull()
    .references(() => reports.id, { onDelete: 'cascade' }),
  // e.g. 'NSW', 'VIC', 'QLD', 'SA', 'WA', 'TAS', 'NT', 'ACT', 'National'
  stateOrTerritory: varchar('state_or_territory', { length: 50 }).notNull(),
  stateLabel: varchar('state_label', { length: 100 }), // Full name, e.g. "New South Wales"
  totalEmployees: integer('total_employees'),
  totalCouncils: integer('total_councils'),
  totalOrganisations: integer('total_organisations'),
  vetStudents: integer('vet_students'),
  vetCourses: integer('vet_courses'),
  firstNationsPct: numeric('first_nations_pct', { precision: 5, scale: 2 }),
  regionalPct: numeric('regional_pct', { precision: 5, scale: 2 }),
  femalePct: numeric('female_pct', { precision: 5, scale: 2 }),
  dataYear: integer('data_year'),
  sourceNote: text('source_note'),
  // Flexible extra fields for any additional stats not captured above
  rawData: jsonb('raw_data').default({}),
  sortOrder: integer('sort_order').notNull().default(0),
  isNational: boolean('is_national').notNull().default(false),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

export const industryProfilesRelations = relations(industryProfiles, ({ one }) => ({
  report: one(reports, { fields: [industryProfiles.reportId], references: [reports.id] }),
}));
