import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

import authRoutes from './routes/auth.js';
import customerRoutes from './routes/customers.js';
import carRoutes from './routes/cars.js';
import serviceRoutes from './routes/services.js';
import userRoutes from './routes/users.js';
import { seedDatabase } from './seed.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/cars', carRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/users', userRoutes);

// Root health check & cPanel Passenger ping check
app.get('/', (req, res) => {
  res.status(200).send('DECODE Backend API is running successfully.');
});

app.get('/decode_car', (req, res) => {
  res.status(200).send('DECODE Backend API is running successfully.');
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date(),
    service: 'DECODE Car Service Center Management API',
  });
});

// Database Connection with graceful fallback to MongoMemoryServer
async function connectDB() {
  const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/decode_car_db';
  try {
    await mongoose.connect(mongoUri, {
      dbName: 'decode_car_db',
      serverSelectionTimeoutMS: 10000,
    });
    const maskedUri = mongoUri.replace(/:([^:@]{3})[^:@]*@/, ':***@');
    console.log(`🚀 Connected to MongoDB at ${maskedUri}`);
  } catch (err) {
    console.warn('⚠️ Remote/local MongoDB connection failed:', err.message);
    console.warn('Starting embedded in-memory MongoDB server fallback...');
    const mongod = await MongoMemoryServer.create();
    const memUri = mongod.getUri();
    await mongoose.connect(memUri, { dbName: 'decode_car_db' });
    console.log(`🚀 Connected to In-Memory MongoDB at ${memUri}`);
  }

  // Seed / ensure primary admin user decode@service.com exists
  await seedDatabase();
}

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🏎️ Car Service Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to start server:', err);
  });
