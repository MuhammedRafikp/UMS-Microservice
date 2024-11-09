import express from 'express';
import cors from 'cors';
import { configDotenv } from 'dotenv';
import morgan from 'morgan';
import authRouter from './routes/authRoutes.js'

configDotenv();

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/", authRouter);

const { PORT } = process.env;

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})