import express from 'express';
import authController from '../controllers/auth.controller.js';

const router = express.Router();
const controller = authController();

// Auth Routers
router.post('/signup', controller.signup);
router.post('/login', controller.login);
router.post('/logout', controller.logout);

// Test endpoint for rate limiting
router.get('/test', async (req, res) => {
    res.status(200).json({msg: "Test endpoint for rate limiter"});
})

export default router;