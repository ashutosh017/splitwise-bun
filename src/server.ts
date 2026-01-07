import express from 'express';
import { AuthRouter } from './routes/auth.routes';
import { errorHandler } from './middlewares/error.middleware';

export const app = express();
app.use(express.json());

app.use("/api/v1/auth", AuthRouter);

app.use(errorHandler);

