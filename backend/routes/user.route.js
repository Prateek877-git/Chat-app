import express from 'express';
import { getOtherUsers, getProfile, login, logout, register } from '../controller/user.controller.js';
import { isAuthenticated } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/getprofile', isAuthenticated, getProfile);
router.post('/logout', isAuthenticated, logout);
router.get('/getOtherUsers', isAuthenticated, getOtherUsers);


export default router; 