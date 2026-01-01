import type { Prisma } from "../generated/prisma/client";
import type { SplitType } from "../generated/prisma/enums";
import type { Group } from "./group";
import type { Member } from "./member";
import type { Split, SplitInput } from "./split";

export interface Expense {
    id: string;
    description?: string;
    amount: number;
    group: Group;
    whoPaid: Member;
    splitType: SplitType;
    splits: SplitInput[]
}
export interface ExpenseRepository {
    create(input: CreateExpenseInput, tx?: Prisma.TransactionClient): Promise<ExpenseSummary>
    findById(expenseId: string): Promise<ExpenseSummary | null>,
    listByGroup(groupId: string): Promise<ExpenseSummary[]>
    delete(expenseId: string): Promise<void>
    update(expenseId: string, updateInput: UpdateExpenseInput): Promise<ExpenseSummary>
}
export interface UpdateExpenseInput {
    whoPaidId?: string;
    description?: string | null;
    amount?: number;
}

export interface ExpenseSummary {
    id: string;
    whoPaidId: string;
    description: string | null;
    amount: number;
    groupId: string;

}
export interface CreateExpenseRepoInput {
    splitType: SplitType;
    description: string | null;
    amount: number;
    whoPaidId: string;
    groupId: string;
}
export interface CreateExpenseInput extends CreateExpenseRepoInput {
    splits: SplitInput[]
}