import { db } from '../../config/database';
import { reports, reportKpis, industries, reportYears } from '../../db/schema';
import { eq, and, sql, ilike, inArray } from 'drizzle-orm';
import { AppError } from '../../middleware/error.middleware';

type ReportStatus = 'draft' | 'published' | 'archived';

export class ReportsService {
  private publicWhere() {
    return eq(reports.status, 'published');
  }

  async list(params: {
    page: number;
    limit: number;
    industryId?: string;
    yearId?: string;
    status?: ReportStatus;
    isPublic: boolean;
  }) {
    const { page, limit, industryId, yearId, status, isPublic } = params;
    const offset = (page - 1) * limit;

    const conditions = [];
    if (isPublic) conditions.push(this.publicWhere());
    else if (status) conditions.push(eq(reports.status, status));
    if (industryId) conditions.push(eq(reports.industryId, industryId));
    if (yearId) conditions.push(eq(reports.yearId, yearId));

    const where = conditions.length > 0 ? and(...conditions) : undefined;

    const [rows, [{ count }]] = await Promise.all([
      db.select({
        id: reports.id,
        title: reports.title,
        slug: reports.slug,
        shortDescription: reports.shortDescription,
        coverImageUrl: reports.coverImageUrl,
        pdfFileUrl: reports.pdfFileUrl,
        status: reports.status,
        isFeatured: reports.isFeatured,
        sortOrder: reports.sortOrder,
        cardNote: reports.cardNote,
        publishedAt: reports.publishedAt,
        industryId: reports.industryId,
        yearId: reports.yearId,
        createdAt: reports.createdAt,
        updatedAt: reports.updatedAt,
      })
        .from(reports)
        .where(where)
        .limit(limit)
        .offset(offset)
        .orderBy(reports.sortOrder, reports.createdAt),
      db.select({ count: sql<number>`count(*)::int` }).from(reports).where(where),
    ]);

    return { rows, total: count };
  }

  async findBySlug(slug: string, isPublic: boolean) {
    const conditions = [eq(reports.slug, slug)];
    if (isPublic) conditions.push(this.publicWhere());

    const [report] = await db
      .select()
      .from(reports)
      .where(and(...conditions))
      .limit(1);

    if (!report) throw new AppError('Report not found', 404, 'NOT_FOUND');

    const [industry, year, kpis] = await Promise.all([
      db.select().from(industries).where(eq(industries.id, report.industryId)).limit(1),
      db.select().from(reportYears).where(eq(reportYears.id, report.yearId)).limit(1),
      db.select().from(reportKpis).where(eq(reportKpis.reportId, report.id)).orderBy(reportKpis.sortOrder),
    ]);

    return {
      ...report,
      industry: industry[0] ?? null,
      year: year[0] ?? null,
      kpis,
    };
  }

  async findById(id: string) {
    const [report] = await db.select().from(reports).where(eq(reports.id, id)).limit(1);
    if (!report) throw new AppError('Report not found', 404, 'NOT_FOUND');
    return report;
  }

  async create(data: typeof reports.$inferInsert) {
    const [row] = await db.insert(reports).values(data).returning();
    return row;
  }

  async update(id: string, data: Partial<typeof reports.$inferInsert>) {
    await this.findById(id);
    const [row] = await db
      .update(reports)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(reports.id, id))
      .returning();
    return row;
  }

  async publish(id: string) {
    return this.update(id, { status: 'published', publishedAt: new Date() });
  }

  async archive(id: string) {
    return this.update(id, { status: 'archived' });
  }

  // ── KPIs ────────────────────────────────────────────────────────────────────
  async listKpis(reportId: string) {
    return db.select().from(reportKpis).where(eq(reportKpis.reportId, reportId)).orderBy(reportKpis.sortOrder);
  }

  async createKpi(data: typeof reportKpis.$inferInsert) {
    const [row] = await db.insert(reportKpis).values(data).returning();
    return row;
  }

  async updateKpi(id: string, data: Partial<typeof reportKpis.$inferInsert>) {
    const [row] = await db.update(reportKpis).set({ ...data, updatedAt: new Date() }).where(eq(reportKpis.id, id)).returning();
    if (!row) throw new AppError('KPI not found', 404, 'NOT_FOUND');
    return row;
  }

  async deleteKpi(id: string) {
    await db.delete(reportKpis).where(eq(reportKpis.id, id));
  }
}

export const reportsService = new ReportsService();
