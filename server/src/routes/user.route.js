import express from 'express';
import { login, logout, signup } from '../controllers/user.controller.js';
import verify from '../middleware/verify.middleware.js';

const router=express.Router();

router.post('/register', signup);

router.post('/login', login);

router.post('/logout',verify, logout);

export default router;