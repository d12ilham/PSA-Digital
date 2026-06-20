import { db } from '../../config/database';
import { contentBlocks } from '../../db/schema';
import { eq, asc } from 'drizzle-orm';
import { AppError } from '../../middleware/error.middleware';

export class ContentBlocksService {
  async listByPage(pageId: string) {
    return db.select().from(contentBlocks).where(eq(contentBlocks.pageId, pageId)).orderBy(asc(contentBlocks.sortOrder));
  }

  async findById(id: string) {
    const [block] = await db.select().from(contentBlocks).where(eq(contentBlocks.id, id)).limit(1);
    if (!block) throw new AppError('Content block not found', 404, 'NOT_FOUND');
    return block;
  }

  async create(data: typeof contentBlocks.$inferInsert) {
    const [row] = await db.insert(contentBlocks).values(data).returning();
    return row;
  }

  async update(id: string, data: Partial<typeof contentBlocks.$inferInsert>) {
    const [row] = await db
      .update(contentBlocks)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(contentBlocks.id, id))
      .returning();
    if (!row) throw new AppError('Content block not found', 404, 'NOT_FOUND');
    return row;
  }

  async delete(id: string) {
    await db.delete(contentBlocks).where(eq(contentBlocks.id, id));
  }

  async reorder(pageId: string, orderedIds: string[]) {
    await Promise.all(
      orderedIds.map((id, index) =>
        db.update(contentBlocks).set({ sortOrder: index }).where(eq(contentBlocks.id, id))
      )
    );
  }
}

export const contentBlocksService = new ContentBlocksService();
