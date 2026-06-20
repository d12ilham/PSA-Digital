import { Router } from 'express';
import { reportsController } from './reports.controller';
import { authenticate, optionalAuthenticate } from '../../middleware/auth.middleware';
import { requireAdmin, requireEditor } from '../../middleware/rbac.middleware';

const router = Router();

// Public (optionalAuth to allow editors to see drafts via token)
router.get('/', optionalAuthenticate, reportsController.list.bind(reportsController));
router.get('/:slug', optionalAuthenticate, reportsController.getBySlug.bind(reportsController));

// Protected
router.post('/', authenticate, requireEditor, reportsController.create.bind(reportsController));
router.patch('/:id', authenticate, requireEditor, reportsController.update.bind(reportsController));
router.post('/:id/publish', authenticate, requireAdmin, reportsController.publish.bind(reportsController));
router.post('/:id/archive', authenticate, requireAdmin, reportsController.archive.bind(reportsController));

// KPIs (nested under report)
router.get('/:id/kpis', optionalAuthenticate, reportsController.listKpis.bind(reportsController));
router.post('/:id/kpis', authenticate, requireEditor, reportsController.createKpi.bind(reportsController));
router.patch('/:id/kpis/:kpiId', authenticate, requireEditor, reportsController.updateKpi.bind(reportsController));
router.delete('/:id/kpis/:kpiId', authenticate, requireEditor, reportsController.deleteKpi.bind(reportsController));

export { router as reportsRouter };
