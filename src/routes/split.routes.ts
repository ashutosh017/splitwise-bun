import { Router } from "express";
import { validate } from "../middlewares/validate.middleware";
import { CreateManySplitSchema, ExpenseIdInputSchema } from "../zod";
import { splitController } from "../di/container";

export const SplitRouter = Router();

SplitRouter.get("/:expenseId", validate({
    params: ExpenseIdInputSchema
}), splitController.finByExpenseId)

SplitRouter.get("/:expenseId", validate({
    params: ExpenseIdInputSchema
}), splitController.deleteByExpenseId)

SplitRouter.post("/", validate({
    body: CreateManySplitSchema
}), splitController.createMany)