import { pgTable, text, timestamp, integer } from 'drizzle-orm/pg-core';

export const siteSettings = pgTable('site_settings', {
  id: integer('id').primaryKey().default(1),
  title: text('title').notNull().default('PSA Workforce Insights'),
  description: text('description'),
  logoLightUrl: text('logo_light_url'),
  logoDarkUrl: text('logo_dark_url'),
  faviconUrl: text('favicon_url'),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});
