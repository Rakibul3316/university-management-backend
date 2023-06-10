import express, { Application } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import routers from './app/routes';

const app: Application = express();

app.use(cors());

// Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// All Routes
app.use('/api/v1', routers);

// app.get('/', (req: Request, res: Response, next: NextFunction) => {
//   throw new Error('error logger');
// });

// Global Error Handler
app.use(globalErrorHandler);

export default app;
