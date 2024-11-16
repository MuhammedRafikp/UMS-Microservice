import express from 'express';
import { configDotenv } from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import { connectDB } from './config/db.js';
import userRouter from './routes/userRoutes.js';

configDotenv();

const { PORT,MONGODB_URI } = process.env;

connectDB(MONGODB_URI);

console.log(MONGODB_URI)

const app = express();

app.use(morgan('dev'));

app.use(cors({
    origin:'http://localhost:3000' 
}));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/',userRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});