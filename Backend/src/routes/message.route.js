import express from 'express';
import messageController from "../controllers/message.controller.js"
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = express.Router();
const controller = messageController();

router.use(authMiddleware); // Auth middleware on all message routes
// Routes
router.get("/contacts", controller.getAllContacts);
router.get("/chats", controller.getChatPartners);
router.get('/chat/:id', controller.getMessagesByUserId);
router.post('/send', controller.sendMessage);

export default router;