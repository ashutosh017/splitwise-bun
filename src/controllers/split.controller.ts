import type { Request, Response } from "express";
import type { SplitService } from "../services/split.service";
import { catchAsync } from "../utils/catch_async";
import type { ApiResponse } from "../interfaces/api_response";
import type { CreateManySplitInput, SplitSummary } from "../zod";

export class SplitController {
    constructor(
        private readonly splitService: SplitService
    ) { }
    finByExpenseId = catchAsync(async (req: Request<{
        expenseId: string
    }>, res: Response<ApiResponse<SplitSummary[]>>) => {
        const split = await this.splitService.findByExpenseId(req.params.expenseId)
        res.status(200).json({
            success: true,
            data: split
        })
    })
    deleteByExpenseId = catchAsync(async (req: Request<{
        expenseId: string
    }>, res: Response<ApiResponse<void>>) => {
        await this.splitService.deleteByExpenseId(req.params.expenseId)
        res.status(200).json({
            success: true,
        })
    })
    createMany = catchAsync(async (req: Request<{
    }, {}, {
        input: CreateManySplitInput
    }>, res: Response<ApiResponse<void>>) => {
        await this.splitService.createMany(req.body.input)
        res.status(200).json({
            success: true,
        })
    })
}