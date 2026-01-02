import type { Prisma } from "../generated/prisma/client";

export interface Split {
    id: string;
    value: number;
    expenseId: string;
    memberId: string;
}

export interface SplitInput {
    value: number;
    memberId: string;
}
export interface CreateManySplitInput {
    expenseId: string;
    normalizedSplits: Map<string, number>,
}

export interface SplitSummary {
    value: number;
    memberId: string;
}

export interface SplitRepository {
    findByExpenseId(expenseId: string, tx?: Prisma.TransactionClient): Promise<SplitSummary[]>
    createMany(input: CreateManySplitInput, tx?: Prisma.TransactionClient): Promise<void>,
    deleteByExpenseId(expenseId: string, tx?: Prisma.TransactionClient): Promise<void>
}

export type SplitType = 'AMOUNT' | 'SHARE' | 'PERCENTAGE' | 'EQUAL'