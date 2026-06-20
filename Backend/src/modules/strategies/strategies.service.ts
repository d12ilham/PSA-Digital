import { db } from '../../config/database';
import { strategies } from '../../db/schema';
import { eq, and, asc } from 'drizzle-orm';
import { AppError } from '../../middleware/error.middleware';

export class StrategiesService {
  async list(reportId: string, filters?: { strategyType?: string; strategyYear?: number }) {
    const conditions = [eq(strategies.reportId, reportId)];
    if (filters?.strategyType) conditions.push(eq(strategies.strategyType, filters.strategyType as any));

    return db.select().from(strategies).where(and(...conditions)).orderBy(asc(strategies.strategyType), asc(strategies.sortOrder));
  }

  async findById(id: string) {
    const [row] = await db.select().from(strategies).where(eq(strategies.id, id)).limit(1);
    if (!row) throw new AppError('Strategy not found', 404, 'NOT_FOUND');
    return row;
  }

  async create(data: typeof strategies.$inferInsert) {
    const [row] = await db.insert(strategies).values(data).returning();
    return row;
  }

  async update(id: string, data: Partial<typeof strategies.$inferInsert>) {
    const [row] = await db.update(strategies).set({ ...data, updatedAt: new Date() }).where(eq(strategies.id, id)).returning();
    if (!row) throw new AppError('Strategy not found', 404, 'NOT_FOUND');
    return row;
  }

  async delete(id: string) {
    await db.delete(strategies).where(eq(strategies.id, id));
  }
}

export const strategiesService = new StrategiesService();
