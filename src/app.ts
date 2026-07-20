import express from 'express';
import cors from 'cors';
import routes from './routes';
import { errorHandler } from './middleware/errorHandler';
import { ENV } from './config/env';

const app = express();

// Enable CORS with dynamic environment support
const allowedOrigin = ENV.CORS_ORIGIN === '*' 
  ? '*' 
  : ENV.CORS_ORIGIN.split(',').map(origin => origin.trim());

const corsOptions = {
  origin: allowedOrigin,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// Enable express.json()
app.use(express.json());

// Root endpoint
app.get('/', (req: express.Request, res:express.Response) => {
  res.json({
    success: true,
    message: "WriteFlow Backend Running"
  });
});

// Health check endpoints (root /health & /api/health)
const healthHandler = (req: express.Request, res: express.Response) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString()
  });
};

app.get('/health', healthHandler);
app.get('/api/health', healthHandler);

// Mount all APIs under /api
app.use('/api', routes);

// Add JSON 404 middleware to prevent Express default HTML 404 responses
app.use((req: express.Request, res:express.Response) => {
  res.status(404).json({
    success: false,
    error: "Route Not Found"
  });
});

// Global error handler
app.use(errorHandler);

export default app;
