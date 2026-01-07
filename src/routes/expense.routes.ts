import { Router } from "express";
import { validate } from "../middlewares/validate.middleware";
import { CreateExpenseInputSchema, ExpenseIdInputSchema, GroupIdInputSchema, UpdateExpenseInputSchema } from "../zod";
import { expenseController } from "../di/container";

export const ExpenseRouter = Router()

ExpenseRouter.get("/:expenseId", validate({
    params: ExpenseIdInputSchema
}), expenseController.get)

ExpenseRouter.get("/", validate({
    body: CreateExpenseInputSchema
}), expenseController.create)

ExpenseRouter.delete("/:expenseId", validate({
    params: ExpenseIdInputSchema
}), expenseController.delete)

ExpenseRouter.put("/", validate({
    body: UpdateExpenseInputSchema
}), expenseController.update)

ExpenseRouter.get("/group/:groupId", validate({
    params: GroupIdInputSchema
}), expenseController.listByGroup)
