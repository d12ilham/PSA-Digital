import { Router, Request, Response, NextFunction } from 'express';
import { db } from '../../config/database';
import { reports, insights, pages } from '../../db/schema';
import { sql, eq } from 'drizzle-orm';
import { optionalAuthenticate } from '../../middleware/auth.middleware';
import { successResponse } from '../../types/common';
import { z } from 'zod';

const router = Router();

const querySchema = z.object({
  q: z.string().min(1),
  limit: z.coerce.number().min(1).max(50).default(20),
});

/**
 * GET /api/v1/search?q=...
 * Full-text search across reports (title, description), insights (title, summary), and pages (title)
 * Uses PostgreSQL built-in to_tsvector + plainto_tsquery for FTS.
 */
router.get('/', optionalAuthenticate, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { q, limit } = querySchema.parse(req.query);
    const isPublic = !req.user;

    const [matchedReports, matchedInsights, matchedPages] = await Promise.all([
      // Search reports
      db.execute(sql`
        SELECT id, title, slug, short_description AS "shortDescription", status, 'report' AS "type"
        FROM reports
        WHERE ${isPublic ? sql`status = 'published' AND` : sql``}
          to_tsvector('english', coalesce(title,'') || ' ' || coalesce(short_description,''))
          @@ plainto_tsquery('english', ${q})
        LIMIT ${limit}
      `),
      // Search insights
      db.execute(sql`
        SELECT i.id, i.title, i.summary, r.slug AS "reportSlug", 'insight' AS "type"
        FROM insights i
        JOIN reports r ON r.id = i.report_id
        WHERE ${isPublic ? sql`i.is_published = true AND r.status = 'published' AND` : sql``}
          to_tsvector('english', coalesce(i.title,'') || ' ' || coalesce(i.summary,''))
          @@ plainto_tsquery('english', ${q})
        LIMIT ${limit}
      `),
      // Search pages
      db.execute(sql`
        SELECT p.id, p.title, p.slug, p.page_type AS "pageType", r.slug AS "reportSlug", 'page' AS "type"
        FROM pages p
        JOIN reports r ON r.id = p.report_id
        WHERE ${isPublic ? sql`p.is_published = true AND r.status = 'published' AND` : sql``}
          to_tsvector('english', coalesce(p.title,''))
          @@ plainto_tsquery('english', ${q})
        LIMIT ${limit}
      `),
    ]);

    res.json(successResponse({
      query: q,
      results: {
        reports: matchedReports.rows,
        insights: matchedInsights.rows,
        pages: matchedPages.rows,
      },
      total: matchedReports.rows.length + matchedInsights.rows.length + matchedPages.rows.length,
    }));
  } catch (e) { next(e); }
});

export { router as searchRouter };
