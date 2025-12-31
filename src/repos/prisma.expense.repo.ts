import { prisma } from "../prisma";
import type { CreateExpenseInput, ExpenseRepository, ExpenseSummary, UpdateExpenseInput } from "../types/expense";
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
    async findById(expenseId: string): Promise<ExpenseSummary | null> {
        const expense = await prisma.expense.findUnique({
            where: {
                id: expenseId
            }
        })
        if (!expense) return null;
        return this.toSummary(expense);
    }
    async listByGroup(groupId: string): Promise<ExpenseSummary[]> {
        const expenses = await prisma.expense.findMany({
            where: {
                groupId
            }
        })
        return expenses.map((e) => this.toSummary(e))
    }
    async delete(expenseId: string): Promise<void> {
        await prisma.expense.delete({
            where: {
                id: expenseId
            }
        })
    }
    async update(expenseId: string, updateInput: UpdateExpenseInput): Promise<ExpenseSummary> {
        const expense = await prisma.expense.update({
            where: {
                id: expenseId
            },
            data: updateInput
        })
        return this.toSummary(expense)
    }

    private toSummary(expense: PrismaExpense): ExpenseSummary {
        return {
            id: expense.id,
            whoPaidId: expense.whoPaidId,
            groupId: expense.groupId,
            amount: Number(expense.amount),
            description: expense.description
        }
    }
}