import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { industryProfilesService } from './industry-profiles.service';
import { successResponse } from '../../types/common';
import { param } from '../../types/params';

const schema = z.object({
  stateOrTerritory: z.string().min(2).max(50),
  stateLabel: z.string().optional(),
  totalEmployees: z.number().int().optional(),
  totalCouncils: z.number().int().optional(),
  totalOrganisations: z.number().int().optional(),
  vetStudents: z.number().int().optional(),
  vetCourses: z.number().int().optional(),
  firstNationsPct: z.string().optional(),
  regionalPct: z.string().optional(),
  femalePct: z.string().optional(),
  dataYear: z.number().int().optional(),
  sourceNote: z.string().optional(),
  rawData: z.record(z.string(), z.unknown()).optional(),
  sortOrder: z.number().optional(),
  isNational: z.boolean().optional(),
});

export class IndustryProfilesController {
  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await industryProfilesService.list(param(req.params.reportId));
      res.json(successResponse(data));
    } catch (e) { next(e); }
  }

  async getByState(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await industryProfilesService.findByState(param(req.params.reportId), param(req.params.state));
      res.json(successResponse(data));
    } catch (e) { next(e); }
  }

  async upsert(req: Request, res: Response, next: NextFunction) {
    try {
      const data = schema.parse(req.body);
      const row = await industryProfilesService.upsert({
        ...data,
        stateOrTerritory: data.stateOrTerritory.toUpperCase(),
        reportId: param(req.params.reportId),
      });
      res.json(successResponse(row));
    } catch (e) { next(e); }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await industryProfilesService.delete(param(req.params.id));
      res.json(successResponse({ message: 'Deleted' }));
    } catch (e) { next(e); }
  }
}

export const industryProfilesController = new IndustryProfilesController();
