import { Router } from 'express';
import { pagesController } from './pages.controller';
import { authenticate, optionalAuthenticate } from '../../middleware/auth.middleware';
import { requireEditor, requireAdmin } from '../../middleware/rbac.middleware';

const router = Router({ mergeParams: true });

// Public reads
router.get('/', optionalAuthenticate, pagesController.list.bind(pagesController));
router.get('/by-type/:pageType', optionalAuthenticate, pagesController.getByType.bind(pagesController));
router.get('/:id', optionalAuthenticate, pagesController.getById.bind(pagesController));

// Protected writes
router.post('/', authenticate, requireEditor, pagesController.create.bind(pagesController));
router.patch('/:id', authenticate, requireEditor, pagesController.update.bind(pagesController));
router.delete('/:id', authenticate, requireAdmin, pagesController.delete.bind(pagesController));
router.patch('/reorder', authenticate, requireEditor, pagesController.reorder.bind(pagesController));

export { router as pagesRouter };
