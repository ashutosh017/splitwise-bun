import express from 'express';
import { AuthService } from './services/auth.service';
import { AppError } from './errors/app_error';
import { PrismaMemberRepository } from './repos/prisma.member.repo';
import z from 'zod';
import { AuthRouter } from './routes/auth.routes';

export const app = express();
app.use(express.json());


app.use("/api/v1", AuthRouter);

app.post("/api/v1/signin",)
