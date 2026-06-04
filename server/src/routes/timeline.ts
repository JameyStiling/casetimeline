import { Router } from 'express';
import type { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { extractTimeline, APEX_DEMO_EVENTS, CONTRACT_DEMO_EVENTS } from '../services/gemini.js';
import { logger } from '../services/logger.js';

const router = Router();

// Zod schema for extract payload
const extractSchema = z.object({
  documents: z.array(
    z.object({
      name: z.string().min(1, 'Document name is required'),
      content: z.string().min(1, 'Document content cannot be empty'),
    })
  ).min(1, 'At least one document must be uploaded'),
  apiKey: z.string().optional(),
});

// Zod schema for demo parameters
const demoQuerySchema = z.object({
  case: z.enum(['apex', 'contract']).optional().default('apex'),
});

// Extract timeline events from uploaded documents/notes
router.post(
  '/extract',
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const parsedBody = extractSchema.safeParse(req.body);
      if (!parsedBody.success) {
        res.status(400).json({
          error: 'Validation failed',
          details: parsedBody.error.flatten(),
        });
        return;
      }

      const { documents, apiKey } = parsedBody.data;

      // Use environment variable GEMINI_API_KEY if no user-specific key is passed
      const activeApiKey = apiKey || process.env.GEMINI_API_KEY;

      logger.info(
        { docCount: documents.length, hasUserApiKey: !!apiKey },
        'Starting timeline extraction request'
      );

      const events = await extractTimeline(documents, activeApiKey);
      res.json({ events });
    } catch (error) {
      next(error);
    }
  }
);

// Serve high-fidelity mock timeline scenarios for demo mode
router.get(
  '/demo',
  (req: Request, res: Response, next: NextFunction): void => {
    try {
      const parsedQuery = demoQuerySchema.safeParse(req.query);
      if (!parsedQuery.success) {
        res.status(400).json({
          error: 'Validation failed',
          details: parsedQuery.error.flatten(),
        });
        return;
      }

      const caseType = parsedQuery.data.case;
      logger.info({ caseType }, 'Fetching demo scenario events');

      if (caseType === 'contract') {
        res.json({ events: CONTRACT_DEMO_EVENTS });
        return;
      }

      res.json({ events: APEX_DEMO_EVENTS });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
