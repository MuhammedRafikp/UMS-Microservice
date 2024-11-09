import express from 'express';
import {getProfile} from '../controllers/userController';

const userRouter = express.Router();

userRouter.get('/profile')