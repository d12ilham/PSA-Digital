import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { contentBlocksService } from './content-blocks.service';
import { successResponse } from '../../types/common';
import { param } from '../../types/params';

const BLOCK_TYPES = [
  'heading', 'paragraph', 'rich_text', 'kpi_card', 'chart', 'image', 'quote',
  'callout', 'table', 'driver_card', 'strategy_card', 'insight_card', 'map',
  'timeline', 'download_button', 'cta_button', 'video', 'divider', 'stat_group', 'two_column',
] as const;

const createSchema = z.object({
  blockType: z.enum([...BLOCK_TYPES] as [string, ...string[]]),
  content: z.record(z.string(), z.unknown()).default({}),
  sortOrder: z.number().optional(),
  isVisible: z.boolean().optional(),
});

export class ContentBlocksController {
  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await contentBlocksService.listByPage(param(req.params.pageId));
      res.json(successResponse(data));
    } catch (e) { next(e); }
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = createSchema.parse(req.body);
      const block = await contentBlocksService.create({ ...data, pageId: param(req.params.pageId), blockType: data.blockType as any });
      res.status(201).json(successResponse(block));
    } catch (e) { next(e); }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const data = createSchema.partial().parse(req.body);
      const block = await contentBlocksService.update(param(req.params.id), data as any);
      res.json(successResponse(block));
    } catch (e) { next(e); }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await contentBlocksService.delete(param(req.params.id));
      res.json(successResponse({ message: 'Block deleted' }));
    } catch (e) { next(e); }
  }

  async reorder(req: Request, res: Response, next: NextFunction) {
    try {
      const { orderedIds } = z.object({ orderedIds: z.array(z.string().uuid()) }).parse(req.body);
      await contentBlocksService.reorder(param(req.params.pageId), orderedIds);
      res.json(successResponse({ message: 'Reordered' }));
    } catch (e) { next(e); }
  }
}

export const contentBlocksController = new ContentBlocksController();
