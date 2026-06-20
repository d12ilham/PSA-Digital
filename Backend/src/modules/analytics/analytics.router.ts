import { Router, Request, Response, NextFunction } from 'express';
import { db } from '../../config/database';
import { auditLogs, users } from '../../db/schema';
import { sql, eq } from 'drizzle-orm';
import { authenticate } from '../../middleware/auth.middleware';
import { requireAdmin } from '../../middleware/rbac.middleware';
import { successResponse, paginationMeta } from '../../types/common';
import { z } from 'zod';

const router = Router();

// GET /api/v1/analytics/audit-logs
router.get('/audit-logs', authenticate, requireAdmin, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const schema = z.object({
      page: z.coerce.number().min(1).default(1),
      limit: z.coerce.number().min(1).max(100).default(20),
      entityType: z.string().optional(),
      action: z.string().optional(),
    });

    const { page, limit, entityType, action } = schema.parse(req.query);
    const offset = (page - 1) * limit;

    const entityFilter = entityType ? sql`AND al.entity_type = ${entityType}` : sql``;
    const actionFilter = action ? sql`AND al.action = ${action}` : sql``;

    const rows = await db.execute(sql`
      SELECT al.id, al.action, al.entity_type AS "entityType", al.entity_id AS "entityId",
             al.ip_address AS "ipAddress", al.created_at AS "createdAt",
             u.email AS "userEmail", u.first_name || ' ' || u.last_name AS "userName"
      FROM audit_logs al
      LEFT JOIN users u ON u.id = al.user_id
      WHERE 1=1 ${entityFilter} ${actionFilter}
      ORDER BY al.created_at DESC
      LIMIT ${limit} OFFSET ${offset}
    `);

    const countResult = await db.execute(sql`
      SELECT count(*)::int AS count FROM audit_logs al WHERE 1=1 ${entityFilter} ${actionFilter}
    `);

    const total = (countResult.rows[0] as { count: number })?.count ?? 0;
    res.json(successResponse(rows.rows, paginationMeta(total, page, limit)));
  } catch (e) { next(e); }
});

// GET /api/v1/analytics/report-stats
router.get('/report-stats', authenticate, requireAdmin, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const stats = await db.execute(sql`
      SELECT
        r.id,
        r.title,
        r.slug,
        r.status,
        COUNT(al.id) FILTER (WHERE al.action = 'PUBLISH') AS publishes,
        COUNT(al.id) FILTER (WHERE al.action = 'UPDATE') AS updates,
        r.published_at AS "publishedAt"
      FROM reports r
      LEFT JOIN audit_logs al ON al.entity_id = r.id AND al.entity_type = 'report'
      GROUP BY r.id
      ORDER BY r.created_at DESC
    `);

    res.json(successResponse(stats.rows));
  } catch (e) { next(e); }
});

export { router as analyticsRouter };
