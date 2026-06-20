import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { strategiesService } from './strategies.service';
import { successResponse } from '../../types/common';
import { param } from '../../types/params';

const schema = z.object({
  strategyType: z.enum(['proposed', 'existing', 'federal', 'update']),
  strategyYear: z.number().int().optional(),
  strategyNumber: z.number().int().optional(),
  title: z.string().min(1),
  description: z.string().optional(),
  deliveryTimeline: z.string().optional(),
  leadAgency: z.string().optional(),
  updateNote: z.string().optional(),
  status: z.enum(['draft', 'active', 'archived']).optional(),
  sortOrder: z.number().optional(),
});

const listQuerySchema = z.object({
  strategyType: z.enum(['proposed', 'existing', 'federal', 'update']).optional(),
  strategyYear: z.coerce.number().optional(),
});

export class StrategiesController {
  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const query = listQuerySchema.parse(req.query);
      const data = await strategiesService.list(param(req.params.reportId), query);
      res.json(successResponse(data));
    } catch (e) { next(e); }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = schema.parse(req.body);
      const row = await strategiesService.create({ ...data, reportId: param(req.params.reportId) });
      res.status(201).json(successResponse(row));
    } catch (e) { next(e); }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const data = schema.partial().parse(req.body);
      const row = await strategiesService.update(param(req.params.id), data);
      res.json(successResponse(row));
    } catch (e) { next(e); }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await strategiesService.delete(param(req.params.id));
      res.json(successResponse({ message: 'Deleted' }));
    } catch (e) { next(e); }
  }
}

export const strategiesController = new StrategiesController();
