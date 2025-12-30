import { prisma } from "../prisma";
import type { Group } from "./group";
import type { Member } from "./member";
import type { Split } from "./split";

export interface Expense {
    id: string;
    description?: string;
    amount: number;
    group: Group;
    whoPaid: Member;
    splits: Split[]
}
export interface ExpenseRepository {
    create(input: CreateExpenseInput): Promise<ExpenseSummary>
}

export interface ExpenseSummary {
    id: string;
    whoPaidId: string;
    description: string | null;
    amount: number;
    groupId: string;

}
export interface CreateExpenseInput {
    amount: number;
    whoPaidId: string;
    groupId: string;
}