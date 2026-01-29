import express from 'express';
import profileController from '../controllers/profile.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = express.Router();
const controller = profileController();
router.use(authMiddleware);
// Profile Routers
router.put('/update-profile', controller.updateProfile);

export default router;