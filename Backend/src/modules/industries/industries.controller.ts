import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { industriesService } from './industries.service';
import { successResponse } from '../../types/common';
import { param } from '../../types/params';

const createIndustrySchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/),
  description: z.string().optional(),
  sortOrder: z.number().optional(),
});

const createYearSchema = z.object({
  year: z.number().int().min(2000).max(2100),
  label: z.string().min(1),
});

export class IndustriesController {
  async listIndustries(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await industriesService.listIndustries();
      res.json(successResponse(data));
    } catch (e) { next(e); }
  }

  async createIndustry(req: Request, res: Response, next: NextFunction) {
    try {
      const data = createIndustrySchema.parse(req.body);
      const row = await industriesService.createIndustry(data);
      res.status(201).json(successResponse(row));
    } catch (e) { next(e); }
  }

  async updateIndustry(req: Request, res: Response, next: NextFunction) {
    try {
      const row = await industriesService.updateIndustry(param(req.params.id), req.body);
      res.json(successResponse(row));
    } catch (e) { next(e); }
  }

  async deleteIndustry(req: Request, res: Response, next: NextFunction) {
    try {
      await industriesService.deleteIndustry(param(req.params.id));
      res.json(successResponse({ message: 'Deleted' }));
    } catch (e) { next(e); }
  }

  async listYears(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await industriesService.listYears();
      res.json(successResponse(data));
    } catch (e) { next(e); }
  }

  async createYear(req: Request, res: Response, next: NextFunction) {
    try {
      const data = createYearSchema.parse(req.body);
      const row = await industriesService.createYear(data);
      res.status(201).json(successResponse(row));
    } catch (e) { next(e); }
  }

  async updateYear(req: Request, res: Response, next: NextFunction) {
    try {
      const row = await industriesService.updateYear(param(req.params.id), req.body);
      res.json(successResponse(row));
    } catch (e) { next(e); }
  }
}

export const industriesController = new IndustriesController();
