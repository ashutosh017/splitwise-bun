import type { Expense } from "./expense";
import type { Member } from "./member";

export interface GroupRepository {
    create(data: CreateGroupInput): Promise<GroupSummary>
    findById(groupId: string): Promise<GroupSummary | null>
    hasMember(groupId: string, memberId: string): Promise<boolean>
    addMember(groupId: string, memberId: string): Promise<void>
    removeMember(groupId: string, memberId: string): Promise<void>
    listGroups(): Promise<GroupSummary[]>
    listMembers(groupId: string): Promise<Member[]>
    listGroupsForMember(memberId: string): Promise<GroupSummary[]>
    delete(groupId: string): Promise<void>
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