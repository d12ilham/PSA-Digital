import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { reportsService } from './reports.service';
import { successResponse, paginationMeta } from '../../types/common';
import { createAuditLog } from '../../middleware/audit.middleware';
import { param } from '../../types/params';

const listQuerySchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(20),
  industryId: z.string().uuid().optional(),
  yearId: z.string().uuid().optional(),
  status: z.enum(['draft', 'published', 'archived']).optional(),
});

const createSchema = z.object({
  industryId: z.string().uuid(),
  yearId: z.string().uuid(),
  title: z.string().min(1),
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/),
  shortDescription: z.string().optional(),
  coverImageUrl: z.string().optional().nullable(),
  pdfFileUrl: z.string().optional(),
  previousPdfUrl: z.string().optional(),
  psaSectorPageUrl: z.string().optional(),
  contactUrl: z.string().optional(),
  cardNote: z.string().optional(),
  isFeatured: z.boolean().optional(),
  sortOrder: z.number().optional(),
  status: z.enum(['draft', 'published', 'archived']).optional(),
});

const updateSchema = createSchema.partial();

const kpiSchema = z.object({
  label: z.string().min(1),
  value: z.string().min(1),
  prefix: z.string().optional(),
  suffix: z.string().optional(),
  description: z.string().optional(),
  sortOrder: z.number().optional(),
});

export class ReportsController {
  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const query = listQuerySchema.parse(req.query);
      const isPublic = !req.user;
      const { rows, total } = await reportsService.list({ ...query, isPublic });
      res.json(successResponse(rows, paginationMeta(total, query.page, query.limit)));
    } catch (e) { next(e); }
  }

  async getBySlug(req: Request, res: Response, next: NextFunction) {
    try {
      const report = await reportsService.findBySlug(param(req.params.slug), !req.user);
      res.json(successResponse(report));
    } catch (e) { next(e); }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = createSchema.parse(req.body);
      const report = await reportsService.create({ ...data, createdBy: req.user!.id });
      await createAuditLog(req, { action: 'CREATE', entityType: 'report', entityId: report.id, diff: { after: report } });
      res.status(201).json(successResponse(report));
    } catch (e) { next(e); }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const data = updateSchema.parse(req.body);
      const id = param(req.params.id);
      const before = await reportsService.findById(id);
      const report = await reportsService.update(id, data);
      await createAuditLog(req, { action: 'UPDATE', entityType: 'report', entityId: report.id, diff: { before, after: report } });
      res.json(successResponse(report));
    } catch (e) { next(e); }
  }

  async publish(req: Request, res: Response, next: NextFunction) {
    try {
      const report = await reportsService.publish(param(req.params.id));
      await createAuditLog(req, { action: 'PUBLISH', entityType: 'report', entityId: report.id });
      res.json(successResponse(report));
    } catch (e) { next(e); }
  }

  async archive(req: Request, res: Response, next: NextFunction) {
    try {
      const report = await reportsService.archive(param(req.params.id));
      await createAuditLog(req, { action: 'ARCHIVE', entityType: 'report', entityId: report.id });
      res.json(successResponse(report));
    } catch (e) { next(e); }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = param(req.params.id);
      const before = await reportsService.findById(id);
      await reportsService.delete(id);
      await createAuditLog(req, { action: 'DELETE', entityType: 'report', entityId: id, diff: { before } });
      res.json(successResponse({ message: 'Report deleted successfully' }));
    } catch (e) { next(e); }
  }


  async listKpis(req: Request, res: Response, next: NextFunction) {
    try {
      const kpis = await reportsService.listKpis(param(req.params.id));
      res.json(successResponse(kpis));
    } catch (e) { next(e); }
  }

  async createKpi(req: Request, res: Response, next: NextFunction) {
    try {
      const data = kpiSchema.parse(req.body);
      const kpi = await reportsService.createKpi({ ...data, reportId: param(req.params.id) });
      res.status(201).json(successResponse(kpi));
    } catch (e) { next(e); }
  }

  async updateKpi(req: Request, res: Response, next: NextFunction) {
    try {
      const data = kpiSchema.partial().parse(req.body);
      const kpi = await reportsService.updateKpi(param(req.params.kpiId), data);
      res.json(successResponse(kpi));
    } catch (e) { next(e); }
  }

  async deleteKpi(req: Request, res: Response, next: NextFunction) {
    try {
      await reportsService.deleteKpi(param(req.params.kpiId));
      res.json(successResponse({ message: 'KPI deleted' }));
    } catch (e) { next(e); }
  }
}

export const reportsController = new ReportsController();
