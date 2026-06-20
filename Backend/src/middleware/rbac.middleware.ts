import { Request, Response, NextFunction } from 'express';
import { AppError } from './error.middleware';

type Role = 'admin' | 'editor' | 'viewer';

const ROLE_HIERARCHY: Record<Role, number> = {
  viewer: 0,
  editor: 1,
  admin: 2,
};

/**
 * Guard factory — checks that the authenticated user has at least the required role.
 * Usage: router.post('/', authenticate, requireRole('editor'), handler)
 */
export function requireRole(...allowedRoles: Role[]) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.user) {
      return next(new AppError('Authentication required', 401, 'UNAUTHORIZED'));
    }

    const userRoleLevel = ROLE_HIERARCHY[req.user.role as Role] ?? -1;
    const hasPermission = allowedRoles.some(
      (role) => userRoleLevel >= ROLE_HIERARCHY[role]
    );

    if (!hasPermission) {
      return next(
        new AppError(
          `Access denied. Required role: ${allowedRoles.join(' or ')}`,
          403,
          'FORBIDDEN'
        )
      );
    }

    next();
  };
}

/** Shorthand guards */
export const requireAdmin = requireRole('admin');
export const requireEditor = requireRole('editor');
export const requireViewer = requireRole('viewer');
