import express from 'express';
import { forgotPassword, login, logout, resetPassword, signup, verifyResetLink } from '../controllers/user.controller.js';
import verify from '../middleware/verify.middleware.js';

const router=express.Router();

router.post('/register', signup);

router.post('/login', login);

router.post('/logout',verify, logout);

router.post('/forgotpassword', forgotPassword);

router.post('/resetpassword/:resetToken', resetPassword);

router.get('/verifyresetlink/:resetToken', verifyResetLink);

export default router;