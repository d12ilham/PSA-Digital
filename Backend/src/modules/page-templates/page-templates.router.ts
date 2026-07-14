import { Router, Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { db } from '../../config/database';
import { pageTemplates } from '../../db/schema';
import { eq, asc } from 'drizzle-orm';
import { authenticate } from '../../middleware/auth.middleware';
import { requireAdmin, requireEditor } from '../../middleware/rbac.middleware';
import { successResponse } from '../../types/common';
import { param } from '../../types/params';

const templateSchema = z.object({
  title: z.string().min(1),
  pageType: z.string().min(1),
  slug: z.string().min(1),
  parentPathway: z.string().nullable().optional(),
  sortOrder: z.number().optional(),
});

const router = Router();

// GET /api/v1/page-templates  (public — reports use this to init structure)
router.get('/', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const rows = await db
      .select()
      .from(pageTemplates)
      .orderBy(asc(pageTemplates.sortOrder));
    res.json(successResponse(rows));
  } catch (e) { next(e); }
});

// POST /api/v1/page-templates  (admin only)
router.post('/', authenticate, requireAdmin, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = templateSchema.parse(req.body);
    const [row] = await db
      .insert(pageTemplates)
      .values({
        title: data.title,
        pageType: data.pageType,
        slug: data.slug,
        parentPathway: data.parentPathway ?? null,
        sortOrder: data.sortOrder ?? 0,
      })
      .returning();
    res.status(201).json(successResponse(row));
  } catch (e) { next(e); }
});

// PATCH /api/v1/page-templates/:id  (admin only)
router.patch('/:id', authenticate, requireAdmin, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = templateSchema.partial().parse(req.body);
    const [row] = await db
      .update(pageTemplates)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(pageTemplates.id, param(req.params.id)))
      .returning();
    res.json(successResponse(row));
  } catch (e) { next(e); }
});

// DELETE /api/v1/page-templates/:id  (admin only)
router.delete('/:id', authenticate, requireAdmin, async (req: Request, res: Response, next: NextFunction) => {
  try {
    await db.delete(pageTemplates).where(eq(pageTemplates.id, param(req.params.id)));
    res.json(successResponse({ message: 'Template deleted' }));
  } catch (e) { next(e); }
});

// POST /api/v1/page-templates/reorder
router.post('/reorder', authenticate, requireAdmin, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { orderedIds } = z.object({ orderedIds: z.array(z.string().uuid()) }).parse(req.body);
    await Promise.all(
      orderedIds.map((id, index) =>
        db.update(pageTemplates).set({ sortOrder: index }).where(eq(pageTemplates.id, id))
      )
    );
    res.json(successResponse({ message: 'Reordered' }));
  } catch (e) { next(e); }
});

export { router as pageTemplatesRouter };
