import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';
import { AppError } from './error.middleware';

type ValidateTarget = 'body' | 'query' | 'params';

export function validate(schema: ZodSchema, target: ValidateTarget = 'body') {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req[target]);

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors;
      const messages = Object.entries(errors)
        .map(([field, msgs]) => `${field}: ${Array.isArray(msgs) ? msgs.join(', ') : String(msgs)}`)
        .join('; ');

      return next(new AppError(`Validation failed: ${messages}`, 400, 'VALIDATION_ERROR'));
    }

    // Replace the raw data with the parsed/coerced version
    (req as unknown as Record<string, unknown>)[target] = result.data;
    next();
  };
}
