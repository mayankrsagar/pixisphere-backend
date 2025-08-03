import cors from 'cors';
import express from 'express';
import morgan from 'morgan';

import { connectMongo } from './config/db.js';
import { errorHandler } from './middlewares/errorHandler.js';
import adminRoutes from './routes/adminRoutes.js';
import authRoutes from './routes/authRoutes.js';
import inquiryRoutes from './routes/inquiryRoutes.js';
import partnerRoutes from './routes/partnerRoutes.js';

const app=express();

//middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

//routes
app.use('/api/auth', authRoutes);
app.use('/api/inquiry', inquiryRoutes);
app.use('/api/partner', partnerRoutes);
app.use('/api/admin', adminRoutes);

//error handling
app.use(errorHandler);

// Initialize the database
await connectMongo();
// await connectPostgres();
export default app;