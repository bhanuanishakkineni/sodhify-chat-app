import express from 'express';
import messageController from "../controllers/message.controller.js"

const router = express.Router();
const controller = messageController();

router.post('/send', controller.sendMessage);

export default router;