import { prisma } from "../prisma";
import type { CreateGroupInput, Group, GroupRepository, GroupSummary } from "../types/group";
import type { Group as PrismaGroup } from '../generated/prisma/client'

export class PrismaGroupRepository implements GroupRepository {
    async create(groupInput: CreateGroupInput): Promise<GroupSummary> {
        const group = await prisma.group.create({
            data: groupInput
        })
        return this.toSummary(group);
    }
    private toSummary(group: PrismaGroup): GroupSummary {
        return {
            id: group.id,
            name: group.name,
            description: group.description
        }

    }
}