import express from 'express';
import authController from '../controllers/auth.controller.js';

const router = express.Router();
const controller = authController();
// Auth Routers
router.post('/signup', controller.signup);
router.post('/signin', controller.signin);

export default router;