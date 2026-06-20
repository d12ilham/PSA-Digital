import { Router } from 'express';
import { authController } from './auth.controller';
import { authenticate } from '../../middleware/auth.middleware';

const router = Router();

// POST /api/v1/auth/register  — Admin only (existing user must call this)
router.post('/register', authenticate, authController.register.bind(authController));

// POST /api/v1/auth/login
router.post('/login', authController.login.bind(authController));

// POST /api/v1/auth/refresh
router.post('/refresh', authController.refresh.bind(authController));

// POST /api/v1/auth/logout
router.post('/logout', authController.logout.bind(authController));

// GET  /api/v1/auth/me
router.get('/me', authenticate, authController.me.bind(authController));

// POST /api/v1/auth/change-password
router.post('/change-password', authenticate, authController.changePassword.bind(authController));

export { router as authRouter };
