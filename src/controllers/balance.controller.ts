import type { Request, Response } from "express";
import type { BalanceService } from "../services/balance.service";
import { catchAsync } from "../utils/catch_async";
import type { BalanceSummary, CreateBalanceInput, ExpenseSummary, SplitSummary } from "../zod";
import type { ApiResponse } from "../interfaces/api_response";

export class BalanceController {
    constructor(
        private readonly balanceService: BalanceService
    ) { }
    createOrUpdate = catchAsync(async (req: Request<{}, {}, CreateBalanceInput>, res: Response<ApiResponse<BalanceSummary>>) => {
        const balance = await this.balanceService.createOrUpdate(req.body);
        res.status(200).json({
            success: true,
            data: balance
        })
    })
    listByGroup = catchAsync(async (req: Request<{
        groupId: string
    }, {}, CreateBalanceInput>, res: Response<ApiResponse<BalanceSummary[]>>) => {
        const balances = await this.balanceService.listByGroup(req.params.groupId);
        res.status(200).json({
            success: true,
            data: balances
        })
    })

    find = catchAsync(async (req: Request<{}, {}, {}, {
        groupId: string,
        fromMemberId: string,
        toMemberId: string
    }>, res: Response<ApiResponse<BalanceSummary>>) => {
        const { groupId, fromMemberId, toMemberId } = req.query
        const balance = await this.balanceService.find(groupId, fromMemberId, toMemberId);
        res.status(200).json({
            success: true,
            data: balance
        })
    })
    delete = catchAsync(async (req: Request<{}, {}, {}, {
        groupId: string,
        fromMemberId: string,
        toMemberId: string
    }>, res: Response<ApiResponse<void>>) => {
        const { groupId, fromMemberId, toMemberId } = req.query
        const balance = await this.balanceService.delete(groupId, fromMemberId, toMemberId);
        res.status(200).json({
            success: true,
        })
    })
    decrement = catchAsync(async (req: Request<{}, {}, {
        groupId: string,
        fromMemberId: string,
        toMemberId: string,
        amount: number
    }, {}>, res: Response<ApiResponse<BalanceSummary>>) => {
        const { groupId, fromMemberId, toMemberId, amount } = req.body
        const balance = await this.balanceService.decrement(groupId, fromMemberId, toMemberId, amount);
        res.status(200).json({
            success: true,
            data: balance
        })
    })
    increment = catchAsync(async (req: Request<{}, {}, {
        groupId: string,
        fromMemberId: string,
        toMemberId: string,
        amount: number
    }, {}>, res: Response<ApiResponse<BalanceSummary>>) => {
        const { groupId, fromMemberId, toMemberId, amount } = req.body
        const balance = await this.balanceService.increment(groupId, fromMemberId, toMemberId, amount);
        res.status(200).json({
            success: true,
            data: balance
        })
    })
    applyExpense = catchAsync(async (req: Request<{}, {}, {
        expenses: ExpenseSummary,
        normalizedSplits: Map<string, number>
    }>, res: Response<ApiResponse<void>>) => {
        const { expenses, normalizedSplits } = req.body
        await this.balanceService.applyExpense(expenses, normalizedSplits);
        res.status(200).json({
            success: true
        })
    })
    reverseExpense = catchAsync(async (req: Request<{}, {}, {
        expenses: ExpenseSummary,
        splits: SplitSummary[]
    }>, res: Response<ApiResponse<void>>) => {
        const { expenses, splits } = req.body
        await this.balanceService.reverseExpense(expenses, splits);
        res.status(200).json({
            success: true
        })
    })
}