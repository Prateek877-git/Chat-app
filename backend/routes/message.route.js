import express from 'express';
import { isAuthenticated } from '../middleware/auth.middleware.js';
import { getMessages, sendMessage } from '../controller/message.controller.js';

const router = express.Router();

router.post('/send/:recieverId', isAuthenticated, sendMessage);
router.get('/getmessages/:otherParticipantId', isAuthenticated, getMessages);

export default router;

