import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { insightsService } from './insights.service';
import { successResponse } from '../../types/common';
import { param } from '../../types/params';

const insightSchema = z.object({
  theme: z.enum(['theme_1', 'theme_2', 'theme_3']).optional(),
  insightNumber: z.number().int().min(1),
  title: z.string().min(1),
  summary: z.string().optional(),
  detail: z.string().optional(),
  evidenceText: z.string().optional(),
  sourceNote: z.string().optional(),
  tags: z.array(z.string()).optional(),
  isPublished: z.boolean().optional(),
  sortOrder: z.number().optional(),
});

const driverSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  megatrendTags: z.array(z.string()).optional(),
  sortOrder: z.number().optional(),
});

export class InsightsController {
  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await insightsService.list(param(req.params.reportId), !req.user);
      res.json(successResponse(data));
    } catch (e) { next(e); }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = insightSchema.parse(req.body);
      const row = await insightsService.create({ ...data, reportId: param(req.params.reportId) });
      res.status(201).json(successResponse(row));
    } catch (e) { next(e); }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const data = insightSchema.partial().parse(req.body);
      const row = await insightsService.update(param(req.params.id), data);
      res.json(successResponse(row));
    } catch (e) { next(e); }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await insightsService.delete(param(req.params.id));
      res.json(successResponse({ message: 'Deleted' }));
    } catch (e) { next(e); }
  }

  async listDrivers(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await insightsService.listDrivers(param(req.params.reportId));
      res.json(successResponse(data));
    } catch (e) { next(e); }
  }

  async createDriver(req: Request, res: Response, next: NextFunction) {
    try {
      const data = driverSchema.parse(req.body);
      const row = await insightsService.createDriver({ ...data, reportId: param(req.params.reportId) });
      res.status(201).json(successResponse(row));
    } catch (e) { next(e); }
  }

  async updateDriver(req: Request, res: Response, next: NextFunction) {
    try {
      const data = driverSchema.partial().parse(req.body);
      const row = await insightsService.updateDriver(param(req.params.id), data);
      res.json(successResponse(row));
    } catch (e) { next(e); }
  }

  async deleteDriver(req: Request, res: Response, next: NextFunction) {
    try {
      await insightsService.deleteDriver(param(req.params.id));
      res.json(successResponse({ message: 'Deleted' }));
    } catch (e) { next(e); }
  }
}

export const insightsController = new InsightsController();
