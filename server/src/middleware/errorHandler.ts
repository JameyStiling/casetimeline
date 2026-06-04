import type { Request, Response, NextFunction } from 'express';
import { logger } from '../services/logger.js';

export interface CustomError extends Error {
  status?: number;
}

export function errorHandler(
  err: CustomError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
): void {
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';

  logger.error(
    {
      err: {
        message: err.message,
        stack: process.env.NODE_ENV !== 'production' ? err.stack : undefined,
      },
      request: {
        method: req.method,
        url: req.url,
      },
    },
    `Request Error: ${message}`
  );

  res.status(status).json({
    error: message,
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }),
  });
}
