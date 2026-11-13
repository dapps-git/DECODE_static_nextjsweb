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
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  next();
});
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database readiness check for API routes
const checkDbReady = (req, res, next) => {
  if (req.path.endsWith('/health')) return next();
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({
      message: 'Database is currently connecting to MongoDB Atlas. Please retry in a few seconds.',
      dbState: ['disconnected', 'connected', 'connecting', 'disconnecting'][mongoose.connection.readyState] || 'unknown',
    });
  }
  next();
};
app.use('/api', checkDbReady);
app.use('/decode_car/api', checkDbReady);

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

// Database Connection with auto-reconnect and resilience
let isConnecting = false;
async function connectDB() {
  if (isConnecting || mongoose.connection.readyState === 1) return;
  isConnecting = true;
  const mongoUri = process.env.MONGODB_URI || DEFAULT_MONGODB_URI;
  try {
    await mongoose.connect(mongoUri, {
      dbName: 'decode_car_db',
      serverSelectionTimeoutMS: 15000,
      socketTimeoutMS: 45000,
    });
    const maskedUri = mongoUri.replace(/:([^:@]{3})[^:@]*@/, ':***@');
    console.log(`🚀 Connected to MongoDB at ${maskedUri}`);

    // Seed / ensure primary admin user decode@service.com exists
    await seedDatabase();
  } catch (err) {
    console.error('⚠️ MongoDB Atlas connection error:', err.message);
    console.log('🔄 Will retry MongoDB connection in 5 seconds...');
    setTimeout(() => {
      isConnecting = false;
      connectDB();
    }, 5000);
    return;
  }
  isConnecting = false;
}

mongoose.connection.on('disconnected', () => {
  console.warn('⚠️ MongoDB connection lost. Attempting reconnection...');
  connectDB();
});

// Start Express server immediately so cPanel / Passenger never times out with 503
app.listen(PORT, () => {
  console.log(`🏎️ Car Service Server running on port ${PORT}`);
  // Connect to DB asynchronously
  connectDB();
});
