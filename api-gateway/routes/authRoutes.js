import express from 'express';
import { login,refreshTokenHandler } from '../controllers/authController.js';

const router = express.Router();
router.post('/login', login);
router.post('/refresh',refreshTokenHandler);

export default router;