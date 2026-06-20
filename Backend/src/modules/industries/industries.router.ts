import { Router } from 'express';
import { industriesController } from './industries.controller';
import { authenticate } from '../../middleware/auth.middleware';
import { requireAdmin, requireEditor } from '../../middleware/rbac.middleware';

const router = Router();

// Public reads
router.get('/', industriesController.listIndustries.bind(industriesController));
router.get('/years', industriesController.listYears.bind(industriesController));

// Protected writes
router.post('/', authenticate, requireEditor, industriesController.createIndustry.bind(industriesController));
router.patch('/:id', authenticate, requireEditor, industriesController.updateIndustry.bind(industriesController));
router.delete('/:id', authenticate, requireAdmin, industriesController.deleteIndustry.bind(industriesController));

router.post('/years', authenticate, requireEditor, industriesController.createYear.bind(industriesController));
router.patch('/years/:id', authenticate, requireEditor, industriesController.updateYear.bind(industriesController));

export { router as industriesRouter };
