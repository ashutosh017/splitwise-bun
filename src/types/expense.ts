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
export interface CreateExpenseInput {
    description: string | null;
    amount: number;
    whoPaidId: string;
    groupId: string;
}