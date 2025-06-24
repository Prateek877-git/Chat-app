import {app, server} from './socket/socket.js'
import express from "express";
import { connectDB } from './DB/monogdb.js';
import userRoute from './routes/user.route.js'
import messageRoute from './routes/message.route.js'
import cookieParser from 'cookie-parser';
import cors from 'cors'


connectDB();

const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}))
app.use(cookieParser())

//routes
app.use('/api/v1/user', userRoute);
app.use('/api/v1/message', messageRoute)

//middlware
import { errorMiddleware } from './middleware/error.middleware.js';
app.use(errorMiddleware);

server.listen(PORT, () => {
    console.log(`server running at ${PORT}`)
})