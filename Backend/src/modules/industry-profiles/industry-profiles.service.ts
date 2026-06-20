import { db } from '../../config/database';
import { industryProfiles } from '../../db/schema';
import { eq, and } from 'drizzle-orm';
import { AppError } from '../../middleware/error.middleware';

export class IndustryProfilesService {
  async list(reportId: string) {
    return db.select().from(industryProfiles).where(eq(industryProfiles.reportId, reportId)).orderBy(industryProfiles.sortOrder);
  }

  async findByState(reportId: string, stateOrTerritory: string) {
    const [row] = await db.select().from(industryProfiles)
      .where(and(eq(industryProfiles.reportId, reportId), eq(industryProfiles.stateOrTerritory, stateOrTerritory.toUpperCase())))
      .limit(1);
    if (!row) throw new AppError('Profile not found for this state/territory', 404, 'NOT_FOUND');
    return row;
  }

  async upsert(data: typeof industryProfiles.$inferInsert) {
    const existing = await db.select({ id: industryProfiles.id })
      .from(industryProfiles)
      .where(and(eq(industryProfiles.reportId, data.reportId), eq(industryProfiles.stateOrTerritory, data.stateOrTerritory)))
      .limit(1);

    if (existing.length > 0) {
      const [row] = await db.update(industryProfiles)
        .set({ ...data, updatedAt: new Date() })
        .where(eq(industryProfiles.id, existing[0].id))
        .returning();
      return row;
    } else {
      const [row] = await db.insert(industryProfiles).values(data).returning();
      return row;
    }
  }

  async delete(id: string) {
    await db.delete(industryProfiles).where(eq(industryProfiles.id, id));
  }
}

export const industryProfilesService = new IndustryProfilesService();
