import { Request, Response, NextFunction } from 'express';
import { db } from '../config/database';
import { auditLogs } from '../db/schema';
import { logger } from '../config/logger';

export interface AuditContext {
  action: string;
  entityType: string;
  entityId?: string;
  diff?: { before?: unknown; after?: unknown };
}

/**
 * Creates an audit log entry. Called from service layer after mutations.
 */
export async function createAuditLog(
  req: Request,
  context: AuditContext
): Promise<void> {
  try {
    await db.insert(auditLogs).values({
      userId: req.user?.id ?? null,
      action: context.action,
      entityType: context.entityType,
      entityId: context.entityId,
      diff: context.diff ?? null,
      ipAddress: req.ip ?? null,
      userAgent: req.headers['user-agent']?.slice(0, 500) ?? null,
    });
  } catch (error) {
    // Never throw from audit log — just warn
    logger.warn('Failed to write audit log', { error, context });
  }
}
