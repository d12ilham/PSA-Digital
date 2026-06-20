import { Router } from 'express';
import { strategiesController } from './strategies.controller';
import { authenticate, optionalAuthenticate } from '../../middleware/auth.middleware';
import { requireEditor, requireAdmin } from '../../middleware/rbac.middleware';

const router = Router({ mergeParams: true });

router.get('/', optionalAuthenticate, strategiesController.list.bind(strategiesController));
router.post('/', authenticate, requireEditor, strategiesController.create.bind(strategiesController));
router.patch('/:id', authenticate, requireEditor, strategiesController.update.bind(strategiesController));
router.delete('/:id', authenticate, requireAdmin, strategiesController.delete.bind(strategiesController));

export { router as strategiesRouter };
