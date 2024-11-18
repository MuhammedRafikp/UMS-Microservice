import express from 'express';
import { configDotenv } from 'dotenv';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';
import authRouter from './routes/authRoutes.js';

configDotenv();

const { PORT, MONGODB_URI } = process.env;

mongoose.connect(MONGODB_URI);

console.log(MONGODB_URI)

const app = express();

app.use(cors({
    origin:'http://api-gateway:3000'
}));

// app.use(cors());

app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/',authRouter);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});