import { GroupNotFoundError, MemberDoesNotExistsError } from "../errors/errors";
import type { CreateGroupInput, GroupRepository, GroupSummary } from "../types/group";
import type { MemberRepository } from "../types/member";

export class GroupService {
    constructor(
        private readonly membersRepo: MemberRepository,
        private readonly groupRepo: GroupRepository
    ) {
    }
    async createGroup(input: CreateGroupInput): Promise<GroupSummary> {
        const group = await this.groupRepo.create(input);
        return group;
    }
    // async findById(id: string): Promise<GroupSummary | null> {
    //     const group = this.groupRepo.findById(id);
    //     if (!group)
    //         throw GroupNotFoundError
    //     return group;
    // }
    async addMember(groupId: string, memberId: string): Promise<void> {
        const group = this.groupRepo.findById(groupId);
        if (!group) throw GroupNotFoundError;
        const member = this.membersRepo.findById(memberId);
        if (!member) throw MemberDoesNotExistsError;
        this.groupRepo.addMember(groupId, memberId)

    }

}