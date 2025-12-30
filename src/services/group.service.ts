import type { CreateGroupInput, GroupRepository, GroupSummary } from "../types/group";
import type { MemberRepository } from "../types/member";


export class GroupService {
    constructor(
        private readonly members: MemberRepository,
        private readonly group: GroupRepository
    ) {
    }
    async createGroup(input: CreateGroupInput): Promise<GroupSummary> {
        const group = await this.group.create(input);
        return group;
    }

}