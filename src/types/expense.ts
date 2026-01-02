import type { Prisma } from "../generated/prisma/client";
import type { SplitType } from "../generated/prisma/enums";
import type { SplitSummary } from "./split";

export interface ExpenseRepository {
    create(input: CreateExpenseRepoInput, tx?: Prisma.TransactionClient): Promise<ExpenseSummary>
    findById(expenseId: string): Promise<ExpenseSummary | null>,
    listByGroup(groupId: string): Promise<ExpenseSummary[]>
    delete(expenseId: string, tx?: Prisma.TransactionClient): Promise<void>
    update(expenseId: string, updateInput: UpdateExpenseInput, tx?: Prisma.TransactionClient): Promise<ExpenseSummary>
}
export interface UpdateExpenseInput {
    whoPaidId?: string;
    description?: string | null;
    amount?: number;
    splitType: SplitType;
}

export interface ExpenseSummary {
    id: string;
    whoPaidId: string;
    description: string | null;
    amount: number;
    groupId: string;
    splitType: SplitType;
}
export interface CreateExpenseRepoInput {
    splitType: SplitType;
    description: string | null;
    amount: number;
    whoPaidId: string;
    groupId: string;
}
export interface CreateExpenseInput extends CreateExpenseRepoInput {
    splits: SplitSummary[]
}