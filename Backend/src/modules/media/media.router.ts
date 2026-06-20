import { Router, Request, Response, NextFunction } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../../config/database';
import { mediaAssets } from '../../db/schema';
import { eq, sql } from 'drizzle-orm';
import { env } from '../../config/env';
import { authenticate } from '../../middleware/auth.middleware';
import { requireEditor, requireAdmin } from '../../middleware/rbac.middleware';
import { AppError } from '../../middleware/error.middleware';
import { successResponse, paginationMeta } from '../../types/common';
import { param } from '../../types/params';

const UPLOAD_DIR = path.resolve(env.UPLOAD_DIR);
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOAD_DIR),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${uuidv4()}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: env.MAX_FILE_SIZE_MB * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml', 'application/pdf'];
    if (allowed.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error(`File type ${file.mimetype} not allowed`));
    }
  },
});

const router = Router();

// POST /api/v1/media/upload
router.post('/upload', authenticate, requireEditor, upload.single('file'), async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.file) throw new AppError('No file uploaded', 400, 'BAD_REQUEST');

    const fileUrl = `/uploads/${req.file.filename}`;
    const altText = (req.body.altText as string) ?? req.file.originalname;

    const [asset] = await db.insert(mediaAssets).values({
      filename: req.file.filename,
      originalName: req.file.originalname,
      mimeType: req.file.mimetype,
      sizeBytes: req.file.size,
      storagePath: req.file.path,
      url: fileUrl,
      altText,
      uploadedBy: req.user!.id,
    }).returning();

    res.status(201).json(successResponse(asset));
  } catch (e) { next(e); }
});

// GET /api/v1/media
router.get('/', authenticate, requireEditor, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = Number(req.query.page ?? 1);
    const limit = Number(req.query.limit ?? 20);
    const offset = (page - 1) * limit;

    const [assets, countResult] = await Promise.all([
      db.select().from(mediaAssets).limit(limit).offset(offset).orderBy(mediaAssets.createdAt),
      db.select({ count: sql<number>`count(*)::int` }).from(mediaAssets),
    ]);

    const total = countResult[0]?.count ?? 0;
    res.json(successResponse(assets, paginationMeta(total, page, limit)));
  } catch (e) { next(e); }
});

// DELETE /api/v1/media/:id
router.delete('/:id', authenticate, requireAdmin, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = param(req.params.id);
    const [asset] = await db.select().from(mediaAssets).where(eq(mediaAssets.id, id)).limit(1);
    if (!asset) throw new AppError('Asset not found', 404, 'NOT_FOUND');

    if (fs.existsSync(asset.storagePath)) fs.unlinkSync(asset.storagePath);
    await db.delete(mediaAssets).where(eq(mediaAssets.id, id));

    res.json(successResponse({ message: 'Asset deleted' }));
  } catch (e) { next(e); }
});

export { router as mediaRouter };
