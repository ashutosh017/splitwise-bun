import { prisma } from "../prisma";
import type { PrismaMemberRepository } from "../repos/prisma.member.repo";
import type { } from "./splitwiseManger";

export class PrismaGroupRepository {
    constructor() { }
}

export class GroupService {
    constructor(
        members: PrismaMemberRepository,
        group: PrismaGroupRepository
    ) { }
    async create(name: string) {
        // await prisma.
    }
}