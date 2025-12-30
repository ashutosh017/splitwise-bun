import type { Expense } from "./expense";
import type { Member } from "./member";

export interface GroupRepository {
    create(data: Group): Promise<Group>
}
export interface Group {
    id: string;
    name: string;
    description?: string
    members: Member[]
    expenses: Expense[]
}