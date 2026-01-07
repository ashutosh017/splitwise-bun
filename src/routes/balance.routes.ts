import { Router } from "express";
import { validate } from "../middlewares/validate.middleware";
import { ApplyExpenseInputSchema, BalanceSummarySchema, CreateBalanceInputSchema, GroupIdInputSchema, QueryBalanceInputSchema, ReverseExpenseInputSchema } from "../zod";
import { balanceController } from "../di/container";

export const BalanceRouter = Router();

BalanceRouter.post("/", validate({
    body: CreateBalanceInputSchema
}), balanceController.createOrUpdate)

BalanceRouter.get("/group/:groupId", validate({
    params: GroupIdInputSchema
}), balanceController.listByGroup)

BalanceRouter.get("/", validate({
    query: QueryBalanceInputSchema
}), balanceController.find)

BalanceRouter.delete("/", validate({
    query: QueryBalanceInputSchema
}), balanceController.delete)

BalanceRouter.put("/decrement", validate({
    body: BalanceSummarySchema
}), balanceController.decrement)

BalanceRouter.put("/increment", validate({
    body: BalanceSummarySchema
}), balanceController.increment)

BalanceRouter.post("/expense", validate({
    body: ApplyExpenseInputSchema
}), balanceController.applyExpense)

BalanceRouter.delete("/expense", validate({
    body: ReverseExpenseInputSchema
}), balanceController.reverseExpense)

