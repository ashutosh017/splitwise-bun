import { prisma } from "../prisma";
import type { SigninData, SignupData } from "../types/auth";
import type { Member, MemberRepository } from "../types/member";
import type { Member as PrismaMember } from '../generated/prisma/client'

export class PrismaMemberRepository implements MemberRepository {
    async create(data: SignupData): Promise<Member> {
        const user = await prisma.member.create({
            data
        })
        return this.toDomain(user);
    }
    async findByEmail(email: string): Promise<Member | null> {
        const user = await prisma.member.findUnique({
            where: {
                email
            }
        })
        return user ? this.toDomain(user) : null
    }
    private toDomain(member: PrismaMember): Member {
        return {
            id: member.id,
            name: member.name,
            password: member.password,
            email: member.email
        }
    }
}