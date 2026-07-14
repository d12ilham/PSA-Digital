import { Router, Request, Response, NextFunction } from 'express';
import { db } from '../../config/database';
import { siteSettings } from '../../db/schema';
import { eq } from 'drizzle-orm';
import { authenticate } from '../../middleware/auth.middleware';
import { requireEditor } from '../../middleware/rbac.middleware';
import { successResponse } from '../../types/common';

const router = Router();

// GET /api/v1/site-settings
router.get('/', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    let [settings] = await db.select().from(siteSettings).limit(1);
    
    if (!settings) {
      // Auto-initialize default settings
      [settings] = await db.insert(siteSettings).values({
        id: 1,
        title: 'PSA Workforce Insights',
        description: 'Workforce insights, strategies and data for government sectors across Australia.',
      }).returning();
    }
    
    res.json(successResponse(settings));
  } catch (e) { next(e); }
});

// PATCH /api/v1/site-settings
router.patch('/', authenticate, requireEditor, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, description, logoLightUrl, logoDarkUrl, faviconUrl } = req.body;
    
    let [settings] = await db.select().from(siteSettings).limit(1);
    
    if (!settings) {
      // Auto-create if not exists
      [settings] = await db.insert(siteSettings).values({
        id: 1,
        title: title ?? 'PSA Workforce Insights',
        description,
        logoLightUrl,
        logoDarkUrl,
        faviconUrl,
      }).returning();
    } else {
      // Update
      [settings] = await db.update(siteSettings)
        .set({
          title: title !== undefined ? title : settings.title,
          description: description !== undefined ? description : settings.description,
          logoLightUrl: logoLightUrl !== undefined ? logoLightUrl : settings.logoLightUrl,
          logoDarkUrl: logoDarkUrl !== undefined ? logoDarkUrl : settings.logoDarkUrl,
          faviconUrl: faviconUrl !== undefined ? faviconUrl : settings.faviconUrl,
          updatedAt: new Date(),
        })
        .where(eq(siteSettings.id, 1))
        .returning();
    }
    
    res.json(successResponse(settings));
  } catch (e) { next(e); }
});

export { router as siteSettingsRouter };
