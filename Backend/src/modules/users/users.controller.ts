import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { usersService } from './users.service';
import { successResponse, paginationMeta } from '../../types/common';
import { param } from '../../types/params';

const listQuerySchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(20),
  search: z.string().optional(),
  role: z.enum(['admin', 'editor', 'viewer']).optional(),
});

const updateSchema = z.object({
  role: z.enum(['admin', 'editor', 'viewer']).optional(),
  isActive: z.boolean().optional(),
  firstName: z.string().min(1).optional(),
  lastName: z.string().min(1).optional(),
});

export class UsersController {
  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const query = listQuerySchema.parse(req.query);
      const { rows, total } = await usersService.list(query);
      res.json(successResponse(rows, paginationMeta(total, query.page, query.limit)));
    } catch (e) { next(e); }
  }

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await usersService.findById(param(req.params.id));
      res.json(successResponse(user));
    } catch (e) { next(e); }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const data = updateSchema.parse(req.body);
      const user = await usersService.update(param(req.params.id), data);
      res.json(successResponse(user));
    } catch (e) { next(e); }
  }

  async deactivate(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await usersService.deactivate(param(req.params.id));
      res.json(successResponse(user));
    } catch (e) { next(e); }
  }
}

export const usersController = new UsersController();
