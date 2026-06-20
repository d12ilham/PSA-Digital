import { Router } from 'express';
import { industryProfilesController } from './industry-profiles.controller';
import { authenticate, optionalAuthenticate } from '../../middleware/auth.middleware';
import { requireEditor, requireAdmin } from '../../middleware/rbac.middleware';

const router = Router({ mergeParams: true });

router.get('/', optionalAuthenticate, industryProfilesController.list.bind(industryProfilesController));
router.get('/:state', optionalAuthenticate, industryProfilesController.getByState.bind(industryProfilesController));
router.put('/', authenticate, requireEditor, industryProfilesController.upsert.bind(industryProfilesController));
router.delete('/:id', authenticate, requireAdmin, industryProfilesController.delete.bind(industryProfilesController));

export { router as industryProfilesRouter };
