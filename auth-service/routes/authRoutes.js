import express from "express";
import { login,validateRefreshToken } from "../controllers/authController.js";

const router = express.Router();

router.post('/login',login);
router.post('/refresh',validateRefreshToken);

export default router;