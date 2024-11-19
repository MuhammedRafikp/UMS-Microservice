import express from 'express';
import { configDotenv } from 'dotenv';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';
import authRouter from './routes/authRoutes.js';

configDotenv();

const PORT = process.env.PORT||4000;
const MONGODB_URI = process.env.PORT||'mongodb+srv://rafikpmty:hPVIsrVXBihPdKWd@cluster0.i3fnlhj.mongodb.net/UMS-auth-serivce';

mongoose.connect(MONGODB_URI);

console.log(MONGODB_URI)

const app = express();

app.use(cors({
    origin:'http://35.154.233.89:3000'
}));

// app.use(cors());

app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/',authRouter);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});