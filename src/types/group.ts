import type { Expense } from "./expense";
import type { Member } from "./member";

export interface GroupRepository {
    create(data: CreateGroupInput): Promise<GroupSummary>
}
export interface CreateGroupInput {
    name: string;
    description: string | null;
}
export interface GroupSummary {
    id: string;
    name: string;
    description: string | null;
}
export interface Group {
    id: string;
    name: string;
    description: string | null
    members: Member[]
    expenses: Expense[]
}