import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { pagesService } from './pages.service';
import { successResponse } from '../../types/common';
import { param } from '../../types/params';

const createSchema = z.object({
  pageType: z.enum([
    'transition_landing', 'introduction', 'executive_summary', 'about', 'methodology',
    'drivers_of_change', 'industry_overview', 'state_territory', 'industry_profile',
    'workforce_insights', 'strategies', 'strategy_update', 'existing_strategies',
    'federal_initiatives', 'looking_forward', 'pdf_download', 'custom',
  ]),
  title: z.string().min(1),
  slug: z.string().min(1),
  parentPathway: z.string().nullable().optional(),
  sortOrder: z.number().optional(),
  metaTitle: z.string().nullable().optional(),
  metaDescription: z.string().nullable().optional(),
});

export class PagesController {
  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await pagesService.listByReport(param(req.params.reportId), !req.user);
      res.json(successResponse(data));
    } catch (e) { next(e); }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await pagesService.findById(param(req.params.id), !req.user);
      res.json(successResponse(data));
    } catch (e) { next(e); }
  }

  async getByType(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await pagesService.findByType(param(req.params.reportId), param(req.params.pageType), !req.user);
      res.json(successResponse(data));
    } catch (e) { next(e); }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = createSchema.parse(req.body);
      const page = await pagesService.create({ ...data, reportId: param(req.params.reportId) });
      res.status(201).json(successResponse(page));
    } catch (e) { next(e); }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const updateSchema = createSchema.partial().extend({
        isPublished: z.boolean().optional(),
      });
      const data = updateSchema.parse(req.body);
      const page = await pagesService.update(param(req.params.id), data);
      res.json(successResponse(page));
    } catch (e) { next(e); }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await pagesService.delete(param(req.params.id));
      res.json(successResponse({ message: 'Page deleted' }));
    } catch (e) { next(e); }
  }

  async reorder(req: Request, res: Response, next: NextFunction) {
    try {
      const { orderedIds } = z.object({ orderedIds: z.array(z.string().uuid()) }).parse(req.body);
      await pagesService.reorder(param(req.params.reportId), orderedIds);
      res.json(successResponse({ message: 'Reordered' }));
    } catch (e) { next(e); }
  }
}

export const pagesController = new PagesController();
