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

export interface SplitRepository {
    create(input: SplitInput, tx?: Prisma.TransactionClient): Promise<void>
    // createMany()
}

export type SplitType = 'AMOUNT' | 'SHARE' | 'PERCENTAGE' | 'EQUAL'