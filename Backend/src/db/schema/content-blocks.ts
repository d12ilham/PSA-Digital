import {
  pgTable,
  uuid,
  varchar,
  text,
  boolean,
  timestamp,
  integer,
  jsonb,
  pgEnum,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { pages } from './pages';

export const blockTypeEnum = pgEnum('block_type', [
  'heading',
  'paragraph',
  'rich_text',
  'kpi_card',
  'chart',
  'image',
  'quote',
  'callout',
  'table',
  'driver_card',
  'strategy_card',
  'insight_card',
  'map',
  'timeline',
  'download_button',
  'cta_button',
  'video',
  'divider',
  'stat_group',
  'two_column',
]);

export const contentBlocks = pgTable('content_blocks', {
  id: uuid('id').primaryKey().defaultRandom(),
  pageId: uuid('page_id')
    .notNull()
    .references(() => pages.id, { onDelete: 'cascade' }),
  blockType: blockTypeEnum('block_type').notNull(),
  // Flexible JSON payload — structure depends on blockType:
  // heading: { level: 1-6, text: string }
  // paragraph: { text: string, sourceNote?: string }
  // chart: { chartType: 'bar'|'line'|'pie'|'donut', title, data: [...], accessibleDescription }
  // kpi_card: { value, label, prefix, suffix }
  // image: { url, alt, caption }
  // table: { headers: [], rows: [[]] }
  // driver_card: { title, description, megatrendTags: [] }
  // strategy_card: { title, description, timeline, status }
  // insight_card: { insightNumber, title, summary }
  // download_button: { label, url }
  // two_column: { left: blocks[], right: blocks[] }
  content: jsonb('content').notNull().default({}),
  sortOrder: integer('sort_order').notNull().default(0),
  isVisible: boolean('is_visible').notNull().default(true),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

export const contentBlocksRelations = relations(contentBlocks, ({ one }) => ({
  page: one(pages, { fields: [contentBlocks.pageId], references: [pages.id] }),
}));
