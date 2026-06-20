import { Router } from 'express';
import { insightsController } from './insights.controller';
import { authenticate, optionalAuthenticate } from '../../middleware/auth.middleware';
import { requireEditor, requireAdmin } from '../../middleware/rbac.middleware';

const router = Router({ mergeParams: true });

// Workforce Insights
router.get('/', optionalAuthenticate, insightsController.list.bind(insightsController));
router.post('/', authenticate, requireEditor, insightsController.create.bind(insightsController));
router.patch('/:id', authenticate, requireEditor, insightsController.update.bind(insightsController));
router.delete('/:id', authenticate, requireAdmin, insightsController.delete.bind(insightsController));

// Drivers of Change
router.get('/drivers', optionalAuthenticate, insightsController.listDrivers.bind(insightsController));
router.post('/drivers', authenticate, requireEditor, insightsController.createDriver.bind(insightsController));
router.patch('/drivers/:id', authenticate, requireEditor, insightsController.updateDriver.bind(insightsController));
router.delete('/drivers/:id', authenticate, requireAdmin, insightsController.deleteDriver.bind(insightsController));

export { router as insightsRouter };
