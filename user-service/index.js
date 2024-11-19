import express from 'express';
import { configDotenv } from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import { connectDB } from './config/db.js';
import userRouter from './routes/userRoutes.js';
import { startGrpcServer } from './grpc/userServer.js';

configDotenv();

// const { PORT, MONGODB_URI } = process.env;

const PORT = process.env.PORT||5000

const MONGODB_URI = process.env.MONGODB_URI||"mongodb+srv://rafikpmty:hPVIsrVXBihPdKWd@cluster0.i3fnlhj.mongodb.net/UMS-user-serivce";

connectDB(MONGODB_URI);

console.log(MONGODB_URI)

const app = express();

app.use(morgan('dev'));

app.use(cors({
    origin: 'http://localhost:3000' 
}));

// app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', userRouter);

app.listen(PORT, async () => {
    console.log(`Express server is running on port ${PORT}`);
    console.log("changes occuring...");

    await startGrpcServer();
    
  });