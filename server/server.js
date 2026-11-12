import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';

import authRoutes from './routes/auth.js';
import customerRoutes from './routes/customers.js';
import carRoutes from './routes/cars.js';
import serviceRoutes from './routes/services.js';
import userRoutes from './routes/users.js';
import { seedDatabase } from './seed.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') });
dotenv.config(); // fallback to cwd

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes (Support both direct /api and cPanel /decode_car/api mount paths)
const apiRoutes = [
  { path: '/auth', router: authRoutes },
  { path: '/customers', router: customerRoutes },
  { path: '/cars', router: carRoutes },
  { path: '/services', router: serviceRoutes },
  { path: '/users', router: userRoutes },
];

apiRoutes.forEach(({ path, router }) => {
  app.use(`/api${path}`, router);
  app.use(`/decode_car/api${path}`, router);
});

// Root health check & cPanel Passenger ping check
const healthResponse = (req, res) => {
  res.status(200).send('DECODE Backend API is running successfully.');
};

app.get('/', healthResponse);
app.get('/decode_car', healthResponse);
app.get('/decode_car/', healthResponse);

const apiHealthHandler = (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date(),
    service: 'DECODE Car Service Center Management API',
    dbConnected: mongoose.connection.readyState === 1,
    dbState: ['disconnected', 'connected', 'connecting', 'disconnecting'][mongoose.connection.readyState] || 'unknown',
  });
};

app.get('/api/health', apiHealthHandler);
app.get('/decode_car/api/health', apiHealthHandler);

const DEFAULT_MONGODB_URI =
  'mongodb+srv://decodetech37_db_user:zw2LqSLKH0pjiBxi@cluster0.uzddyrb.mongodb.net/decode_car_db?retryWrites=true&w=majority';

// Database Connection — Atlas only, no in-memory fallback
async function connectDB() {
  const mongoUri = process.env.MONGODB_URI || DEFAULT_MONGODB_URI;
  await mongoose.connect(mongoUri, {
    dbName: 'decode_car_db',
    serverSelectionTimeoutMS: 15000,
    socketTimeoutMS: 45000,
  });
  const maskedUri = mongoUri.replace(/:([^:@]{3})[^:@]*@/, ':***@');
  console.log(`🚀 Connected to MongoDB at ${maskedUri}`);

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
