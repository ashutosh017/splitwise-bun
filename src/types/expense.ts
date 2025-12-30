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