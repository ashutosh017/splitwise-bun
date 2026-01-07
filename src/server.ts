import express, { type NextFunction, type Request, type Response } from 'express';
import { AuthRouter } from './routes/auth.routes';
import { errorHandler } from './middlewares/error.middleware';
import { MemberRouter } from './routes/member.routes';
import { BalanceRouter } from './routes/balance.routes';
import { ExpenseRouter } from './routes/expense.routes';
import { GroupRouter } from './routes/group.routes';
import { SplitRouter } from './routes/split.routes';
import type { ApiResponse } from './interfaces/api_response';
import helmet from 'helmet';
import cors from 'cors'
import { authenticate } from './middlewares/auth.milddleware';

export const app = express();

app.use(helmet())
app.use(cors())
app.use(express.json());

app.use("/api/v1/auth", AuthRouter);
app.use("/api/v1/members", authenticate, MemberRouter)
app.use("/api/v1/balances", authenticate, BalanceRouter)
app.use("/api/v1/expenses", authenticate, ExpenseRouter)
app.use("/api/v1/groups", authenticate, GroupRouter)
app.use("/api/v1/splits", authenticate, SplitRouter)

app.use((req: Request, res: Response<ApiResponse<void>>, next: NextFunction) => {
    res.status(404).json({
        success: false,
        message: `Route ${req.originalUrl} not found`
    })
})
app.use(errorHandler);

