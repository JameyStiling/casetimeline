import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import timelineRouter from './routes/timeline.js';
import { errorHandler } from './middleware/errorHandler.js';
import { logger } from './services/logger.js';

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Global security middleware
app.use(helmet());
app.use(cors());

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message: {
    error: 'Too many requests from this IP, please try again after 15 minutes'
  }
});
app.use('/api', limiter);

app.use(express.json({ limit: '10mb' })); // Allow large document uploads

// API Routes
app.use('/api', timelineRouter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'Case Timeline Builder API' });
});

// Centralized error handling middleware (must be registered after routes)
app.use(errorHandler);

// Process-level safety: catch uncaught errors to prevent silent crashes
process.on('uncaughtException', (error) => {
  logger.error(error, 'Uncaught Exception caught globally');
  // Gracefully exit so process manager can restart
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error({ reason, promise }, 'Unhandled Rejection caught globally');
  // Gracefully exit so process manager can restart
  process.exit(1);
});

// Start listening
app.listen(port, () => {
  logger.info(`Server running at http://localhost:${port}`);
});
