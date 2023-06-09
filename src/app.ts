import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import routers from './app/routes';
import httpStatus from 'http-status';
import cookieParser from 'cookie-parser';
import globalErrorHandler from './app/middlewares/globalErrorHandler';

const app: Application = express();

app.use(cors());

// Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// All Routes
app.use('/api/v1', routers);

// app.get('/', (req: Request, res: Response, next: NextFunction) => {
//   throw new Error('error logger');
// });

// Global Error Handler
app.use(globalErrorHandler);

// Handle not found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'Api not found',
      },
    ],
  });
  next();
});

export default app;
