import { prisma } from "../prisma";
import type { SigninData, SignupData } from "../types/auth";
import type { Member, MemberRepository } from "../types/member";

export class PrismaMemberRepository implements MemberRepository {
    async create(data: SignupData): Promise<Member> {
        const user = await prisma.member.create({
            data
        })
        return user;
    }
    async findByCredentials(data: SigninData): Promise<Member | null> {
        const user = await prisma.member.findUnique({
            where: data
        })
        return user;
    }
    async findByEmail(email: string): Promise<Member | null> {
        const user = await prisma.member.findUnique({
            where: {
                email
            }
        })
        return user;
    }
}