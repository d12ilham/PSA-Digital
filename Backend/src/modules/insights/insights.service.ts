import { db } from '../../config/database';
import { insights, driversOfChange } from '../../db/schema';
import { eq, and, asc } from 'drizzle-orm';
import { AppError } from '../../middleware/error.middleware';

export class InsightsService {
  async list(reportId: string, isPublic: boolean) {
    const conditions = [eq(insights.reportId, reportId)];
    if (isPublic) conditions.push(eq(insights.isPublished, true));
    return db.select().from(insights).where(and(...conditions)).orderBy(asc(insights.sortOrder));
  }

  async findById(id: string) {
    const [row] = await db.select().from(insights).where(eq(insights.id, id)).limit(1);
    if (!row) throw new AppError('Insight not found', 404, 'NOT_FOUND');
    return row;
  }

  async create(data: typeof insights.$inferInsert) {
    const [row] = await db.insert(insights).values(data).returning();
    return row;
  }

  async update(id: string, data: Partial<typeof insights.$inferInsert>) {
    const [row] = await db.update(insights).set({ ...data, updatedAt: new Date() }).where(eq(insights.id, id)).returning();
    if (!row) throw new AppError('Insight not found', 404, 'NOT_FOUND');
    return row;
  }

  async delete(id: string) {
    await db.delete(insights).where(eq(insights.id, id));
  }

  // Drivers
  async listDrivers(reportId: string) {
    return db.select().from(driversOfChange).where(eq(driversOfChange.reportId, reportId)).orderBy(asc(driversOfChange.sortOrder));
  }

  async createDriver(data: typeof driversOfChange.$inferInsert) {
    const [row] = await db.insert(driversOfChange).values(data).returning();
    return row;
  }

  async updateDriver(id: string, data: Partial<typeof driversOfChange.$inferInsert>) {
    const [row] = await db.update(driversOfChange).set({ ...data, updatedAt: new Date() }).where(eq(driversOfChange.id, id)).returning();
    if (!row) throw new AppError('Driver not found', 404, 'NOT_FOUND');
    return row;
  }

  async deleteDriver(id: string) {
    await db.delete(driversOfChange).where(eq(driversOfChange.id, id));
  }
}

export const insightsService = new InsightsService();
