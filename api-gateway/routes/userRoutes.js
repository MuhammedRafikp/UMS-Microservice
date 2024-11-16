import express from 'express';
import { register,getUserProfile, editUserProfile } from '../controllers/userController.js';
import { validateAccessToken}  from '../middlewares/auth.js';

const router = express.Router();

router.post('/register',register);
router.get('/user-profile', validateAccessToken, getUserProfile);
router.put('/edit-profile',validateAccessToken,editUserProfile);

export default router;