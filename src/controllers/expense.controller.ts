import type { Request, Response } from "express";
import { catchAsync } from "../utils/catch_async";
import type { CreateExpenseInput, ExpenseIdInput, ExpenseSummary, GroupIdInput, UpdateExpenseInput } from "../zod";
import type { ApiResponse } from "../interfaces/api_response";
import type { ExpenseService } from "../services/expense.service";

export class ExpenseController {
    constructor(
        private expenseService: ExpenseService
    ) { }
    get = catchAsync(async (req: Request<ExpenseIdInput>, res: Response<ApiResponse<ExpenseSummary>>) => {
        const expenseId = req.params.expenseId;
        const expense = await this.expenseService.findById(expenseId)
        res.status(200).json({
            success: true, data: expense
        })
    })
    create = catchAsync(async (req: Request<{}, {}, CreateExpenseInput>, res: Response<ApiResponse<ExpenseSummary>>) => {
        const data = await this.expenseService.create(req.body);
        res.status(200).json({
            success: true,
            data
        })
    })
    delete = catchAsync(async (req: Request<ExpenseIdInput>, res: Response<ApiResponse<void>>) => {
        const expenseId = req.params.expenseId
        await this.expenseService.delete(expenseId);
        res.status(200).json({
            success: true
        })
    })
    update = catchAsync(async (req: Request<{}, {}, UpdateExpenseInput>, res: Response<ApiResponse<ExpenseSummary>>) => {
        const data = await this.expenseService.update(req.body);
        res.status(200).json({
            success: true, data
        })
    })
    listByGroup = catchAsync(async (req: Request<GroupIdInput>, res: Response<ApiResponse<ExpenseSummary[]>>) => {
        const groupId = req.params.groupId;
        const expenses = await this.expenseService.listByGroup(groupId)
        res.status(200).json({
            success: true,
            data: expenses
        })
    })

}