import { db } from '../../config/database';
import { pages, contentBlocks } from '../../db/schema';
import { eq, and, asc } from 'drizzle-orm';
import { AppError } from '../../middleware/error.middleware';

export class PagesService {
  async listByReport(reportId: string, isPublic: boolean) {
    const conditions = [eq(pages.reportId, reportId)];
    if (isPublic) conditions.push(eq(pages.isPublished, true));

    return db.select().from(pages).where(and(...conditions)).orderBy(asc(pages.sortOrder));
  }

  async findById(id: string, isPublic: boolean) {
    const conditions = [eq(pages.id, id)];
    if (isPublic) conditions.push(eq(pages.isPublished, true));

    const [page] = await db.select().from(pages).where(and(...conditions)).limit(1);
    if (!page) throw new AppError('Page not found', 404, 'NOT_FOUND');

    const blocks = await db
      .select()
      .from(contentBlocks)
      .where(and(eq(contentBlocks.pageId, id), eq(contentBlocks.isVisible, true)))
      .orderBy(asc(contentBlocks.sortOrder));

    return { ...page, contentBlocks: blocks };
  }

  async findByType(reportId: string, pageType: string, isPublic: boolean) {
    const conditions = [eq(pages.reportId, reportId), eq(pages.pageType, pageType as any)];
    if (isPublic) conditions.push(eq(pages.isPublished, true));

    const [page] = await db.select().from(pages).where(and(...conditions)).limit(1);
    if (!page) throw new AppError(`Page type '${pageType}' not found for this report`, 404, 'NOT_FOUND');

    const blocks = await db
      .select()
      .from(contentBlocks)
      .where(and(eq(contentBlocks.pageId, page.id), eq(contentBlocks.isVisible, true)))
      .orderBy(asc(contentBlocks.sortOrder));

    return { ...page, contentBlocks: blocks };
  }

  async create(data: typeof pages.$inferInsert) {
    const [row] = await db.insert(pages).values(data).returning();
    return row;
  }

  async update(id: string, data: Partial<typeof pages.$inferInsert>) {
    const [row] = await db
      .update(pages)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(pages.id, id))
      .returning();
    if (!row) throw new AppError('Page not found', 404, 'NOT_FOUND');
    return row;
  }

  async delete(id: string) {
    await db.delete(pages).where(eq(pages.id, id));
  }

  async reorder(reportId: string, orderedIds: string[]) {
    await Promise.all(
      orderedIds.map((id, index) =>
        db.update(pages).set({ sortOrder: index }).where(and(eq(pages.id, id), eq(pages.reportId, reportId)))
      )
    );
  }
}

export const pagesService = new PagesService();
