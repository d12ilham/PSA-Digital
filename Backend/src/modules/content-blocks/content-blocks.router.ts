import { Router } from 'express';
import { contentBlocksController } from './content-blocks.controller';
import { authenticate, optionalAuthenticate } from '../../middleware/auth.middleware';
import { requireEditor, requireAdmin } from '../../middleware/rbac.middleware';

const router = Router({ mergeParams: true });

router.get('/', optionalAuthenticate, contentBlocksController.list.bind(contentBlocksController));
router.post('/', authenticate, requireEditor, contentBlocksController.create.bind(contentBlocksController));
router.patch('/reorder', authenticate, requireEditor, contentBlocksController.reorder.bind(contentBlocksController));
router.patch('/:id', authenticate, requireEditor, contentBlocksController.update.bind(contentBlocksController));
router.delete('/:id', authenticate, requireAdmin, contentBlocksController.delete.bind(contentBlocksController));

export { router as contentBlocksRouter };
