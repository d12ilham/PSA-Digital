import { db } from '../../config/database';
import { industries, reportYears } from '../../db/schema';
import { eq, sql } from 'drizzle-orm';
import { AppError } from '../../middleware/error.middleware';

export class IndustriesService {
  async listIndustries() {
    return db.select().from(industries).orderBy(industries.sortOrder, industries.name);
  }

  async createIndustry(data: { name: string; slug: string; description?: string; sortOrder?: number }) {
    const [row] = await db.insert(industries).values(data).returning();
    return row;
  }

  async updateIndustry(id: string, data: Partial<typeof industries.$inferInsert>) {
    const [row] = await db.update(industries)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(industries.id, id))
      .returning();
    if (!row) throw new AppError('Industry not found', 404, 'NOT_FOUND');
    return row;
  }

  async deleteIndustry(id: string) {
    await db.delete(industries).where(eq(industries.id, id));
  }

  // ── Report Years ────────────────────────────────────────────────────────────
  async listYears() {
    return db.select().from(reportYears).orderBy(reportYears.year);
  }

  async createYear(data: { year: number; label: string }) {
    const [row] = await db.insert(reportYears).values(data).returning();
    return row;
  }

  async updateYear(id: string, data: Partial<typeof reportYears.$inferInsert>) {
    const [row] = await db.update(reportYears)
      .set(data)
      .where(eq(reportYears.id, id))
      .returning();
    if (!row) throw new AppError('Year not found', 404, 'NOT_FOUND');
    return row;
  }
}

export const industriesService = new IndustriesService();
