import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { env } from './config/env';
import { logger } from './config/logger';

// Routers
import { authRouter } from './modules/auth/auth.router';
import { usersRouter } from './modules/users/users.router';
import { industriesRouter } from './modules/industries/industries.router';
import { reportsRouter } from './modules/reports/reports.router';
import { pagesRouter } from './modules/pages/pages.router';
import { contentBlocksRouter } from './modules/content-blocks/content-blocks.router';
import { insightsRouter } from './modules/insights/insights.router';
import { strategiesRouter } from './modules/strategies/strategies.router';
import { industryProfilesRouter } from './modules/industry-profiles/industry-profiles.router';
import { mediaRouter } from './modules/media/media.router';
import { searchRouter } from './modules/search/search.router';
import { analyticsRouter } from './modules/analytics/analytics.router';

// Middleware
import { errorHandler, notFoundHandler } from './middleware/error.middleware';

export function createApp(): Application {
  const app = express();

  // ── Security ─────────────────────────────────────────────────────────────────
  app.use(helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' }, // Allow static file access
  }));

  // ── CORS ──────────────────────────────────────────────────────────────────────
  const allowedOrigins = env.CORS_ORIGINS.split(',').map((o) => o.trim());
  app.use(cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (curl, Postman, mobile apps)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }));

  // ── Body Parsing ──────────────────────────────────────────────────────────────
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true }));

  // ── Request Logging ───────────────────────────────────────────────────────────
  app.use(morgan(
    env.NODE_ENV === 'production' ? 'combined' : 'dev',
    { stream: { write: (msg) => logger.http(msg.trim()) } }
  ));

  // ── Static File Serving (uploads) ─────────────────────────────────────────────
  app.use('/uploads', express.static(path.resolve(env.UPLOAD_DIR)));

  // ── Health Check ──────────────────────────────────────────────────────────────
  app.get('/health', (_req, res) => {
    res.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      environment: env.NODE_ENV,
      version: process.env.npm_package_version ?? '1.0.0',
    });
  });

  // ── API Routes ────────────────────────────────────────────────────────────────
  const API = env.API_PREFIX;

  app.use(`${API}/auth`, authRouter);
  app.use(`${API}/users`, usersRouter);
  app.use(`${API}/industries`, industriesRouter);
  app.use(`${API}/reports`, reportsRouter);

  // Nested resource routes
  // /api/v1/reports/:reportId/pages
  app.use(`${API}/reports/:reportId/pages`, pagesRouter);
  // /api/v1/pages/:pageId/blocks
  app.use(`${API}/pages/:pageId/blocks`, contentBlocksRouter);
  // /api/v1/reports/:reportId/insights (includes /drivers sub-route)
  app.use(`${API}/reports/:reportId/insights`, insightsRouter);
  // /api/v1/reports/:reportId/strategies
  app.use(`${API}/reports/:reportId/strategies`, strategiesRouter);
  // /api/v1/reports/:reportId/industry-profiles
  app.use(`${API}/reports/:reportId/industry-profiles`, industryProfilesRouter);

  app.use(`${API}/media`, mediaRouter);
  app.use(`${API}/search`, searchRouter);
  app.use(`${API}/analytics`, analyticsRouter);

  // ── API Root Info ─────────────────────────────────────────────────────────────
  app.get(API, (_req, res) => {
    res.json({
      name: 'PSA Workforce Insights Report API',
      version: '1.0.0',
      documentation: `${API}/docs`,
      endpoints: {
        auth: `${API}/auth`,
        users: `${API}/users`,
        industries: `${API}/industries`,
        reports: `${API}/reports`,
        media: `${API}/media`,
        search: `${API}/search`,
        analytics: `${API}/analytics`,
      },
    });
  });

  // ── Error Handling ────────────────────────────────────────────────────────────
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
