import { prisma } from "../prisma";
import type { CreateExpenseInput, ExpenseRepository, ExpenseSummary } from "../types/expense";
import type { Expense as PrismaExpense } from '../generated/prisma/client'

export class PrismaExpenseRepository implements ExpenseRepository {
    async create(input: CreateExpenseInput): Promise<ExpenseSummary> {
        const expense = await prisma.expense.create({
            data: {
                amount: input.amount,
                whoPaid: {
                    connect: {
                        id: input.whoPaidId
                    }
                },
                group: {
                    connect: {
                        id: input.groupId
                    }
                }
            },
        })
        return this.toSummary(expense)
    }
    private toSummary(expense: PrismaExpense): ExpenseSummary {
        return {
            id: expense.id,
            whoPaidId: expense.whoPaidId,
            groupId: expense.groupId,
            amount: expense.amount,
            description: expense.description
        }
    }
}