import type { Expense } from "./expense";
import type { Member } from "./member";

export interface Split {
    id: string;
    type: SplitType;
    value: number;
    expense: Expense;
    member: Member;
}

export type SplitType = 'AMOUNT' | 'SHARE' | 'PERCENTAGE' | 'EQUAL'