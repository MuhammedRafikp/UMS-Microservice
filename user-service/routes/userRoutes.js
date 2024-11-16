import express from "express";
import { register, getUserProfile ,editUserProfile} from '../controllers/userController.js';

const router = express.Router();

router.post('/register', register);
router.get('/user-profile/:userId',getUserProfile);
router.put('/edit-profile/:userId',editUserProfile);

export default router;