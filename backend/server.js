import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import userRouter from './routes/userRoute.js';
import listRouter from './routes/listRoute.js';
import enquiryRouter from './routes/enquiryRoute.js';

import 'dotenv/config.js';    
//app config
const app = express();
const port = 4000;

//middleware
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:5173', 'https://gusto-admin.vercel.app'] // Replace with your frontend and admin domains
}));

//db connection
connectDB();

//api endpoints
app.use('/api/user', userRouter);
app.use('/api/list', listRouter);
app.use('/api/enquiry', enquiryRouter);



app.get('/', (req, res) => {
    res.send('API Working');
});

app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});



