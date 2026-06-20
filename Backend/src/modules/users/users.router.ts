import { Router } from 'express';
import { usersController } from './users.controller';
import { authenticate } from '../../middleware/auth.middleware';
import { requireAdmin } from '../../middleware/rbac.middleware';

const router = Router();

// All user management is admin-only
router.use(authenticate, requireAdmin);

router.get('/', usersController.list.bind(usersController));
router.get('/:id', usersController.getById.bind(usersController));
router.patch('/:id', usersController.update.bind(usersController));
router.delete('/:id', usersController.deactivate.bind(usersController));

export { router as usersRouter };
